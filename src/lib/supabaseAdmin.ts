import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const json = Buffer.from(
      part.replace(/-/g, "+").replace(/_/g, "/"),
      "base64",
    ).toString("utf8");
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Server-only Supabase client using SUPABASE_SERVICE_ROLE_KEY (never the anon key). */
export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  console.log("[supabaseAdmin] NEXT_PUBLIC_SUPABASE_URL present:", Boolean(url));
  console.log(
    "[supabaseAdmin] SUPABASE_SERVICE_ROLE_KEY present:",
    Boolean(serviceRoleKey),
  );
  console.log(
    "[supabaseAdmin] SUPABASE_SERVICE_ROLE_KEY length:",
    serviceRoleKey?.length ?? 0,
  );

  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY — must use the service_role secret, not the anon key",
    );
  }

  // Guard: reject if someone accidentally put the anon key in this env var
  const payload = decodeJwtPayload(serviceRoleKey);
  const role = payload?.role;
  console.log("[supabaseAdmin] JWT role claim:", role ?? "(could not decode)");

  if (role && role !== "service_role") {
    throw new Error(
      `SUPABASE_SERVICE_ROLE_KEY has role="${String(role)}" — expected "service_role", not anon`,
    );
  }

  // Always create with the service role key explicitly (no anon fallback)
  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  });
}

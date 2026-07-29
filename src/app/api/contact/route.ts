import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const INTEREST_OPTIONS = new Set([
  "FirmFlow",
  "Site web profesional",
  "Automatizări AI",
  "Altceva",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendNotificationEmail(data: {
  name: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — skipping contact notification email",
    );
    return;
  }

  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Krevo <onboarding@resend.dev>";

  const lines = [
    "Cerere nouă de contact de pe krevo.ro",
    "",
    `Nume: ${data.name}`,
    `Email: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    `Interes: ${data.interest}`,
    "",
    "Mesaj:",
    data.message,
  ];

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["teodor@krevo.ro"],
      reply_to: data.email,
      subject: `Contact nou: ${data.name} — ${data.interest}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error("[contact] Resend email failed:", {
      status: response.status,
      body,
    });
  } else {
    console.log("[contact] Notification email sent to teodor@krevo.ro");
  }
}

export async function POST(request: Request) {
  console.log("[contact] POST /api/contact — start");

  try {
    const body = (await request.json()) as ContactPayload;
    console.log("[contact] Raw body keys:", Object.keys(body ?? {}));

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const phone =
      typeof body.phone === "string" && body.phone.trim()
        ? body.phone.trim()
        : null;
    const interest = isNonEmptyString(body.interest) ? body.interest.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";

    console.log("[contact] Validated fields:", {
      name: Boolean(name),
      email: Boolean(email),
      phone: phone ? "set" : null,
      interest,
      messageLength: message.length,
    });

    if (!name || !email || !interest || !message) {
      console.error("[contact] Validation failed: missing required fields", {
        name: Boolean(name),
        email: Boolean(email),
        interest: Boolean(interest),
        message: Boolean(message),
      });
      return NextResponse.json(
        { error: "Completează toate câmpurile obligatorii." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      console.error("[contact] Validation failed: invalid email", { email });
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });
    }

    if (!INTEREST_OPTIONS.has(interest)) {
      console.error("[contact] Validation failed: invalid interest", {
        interest,
      });
      return NextResponse.json(
        { error: "Opțiune de interes invalidă." },
        { status: 400 },
      );
    }

    if (message.length > 5000 || name.length > 200) {
      console.error("[contact] Validation failed: payload too long", {
        nameLength: name.length,
        messageLength: message.length,
      });
      return NextResponse.json({ error: "Mesaj prea lung." }, { status: 400 });
    }

    console.log(
      "[contact] Using SUPABASE_SERVICE_ROLE_KEY (not anon) for insert into contact_requests",
    );

    let supabase;
    try {
      supabase = getSupabaseAdmin();
    } catch (clientErr) {
      console.error("[contact] Failed to create Supabase admin client:", {
        message:
          clientErr instanceof Error ? clientErr.message : String(clientErr),
        stack: clientErr instanceof Error ? clientErr.stack : undefined,
      });
      throw clientErr;
    }

    const row = {
      name,
      email,
      phone,
      interest,
      message,
      read: false,
    };

    console.log("[contact] Inserting into table 'contact_requests' with columns:", {
      name: true,
      email: true,
      phone: phone !== null,
      interest: true,
      message: true,
      read: false,
    });

    const { data, error } = await supabase
      .from("contact_requests")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[contact] Supabase insert FAILED — exact error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        full: JSON.stringify(error, null, 2),
      });
      return NextResponse.json(
        {
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 },
      );
    }

    console.log("[contact] Supabase insert OK:", { id: data?.id });

    await sendNotificationEmail({ name, email, phone, interest, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] Unhandled exception — exact error:", {
      message,
      name: err instanceof Error ? err.name : typeof err,
      stack: err instanceof Error ? err.stack : undefined,
      full: err,
    });
    return NextResponse.json(
      {
        error: message,
        details: err instanceof Error ? err.stack : undefined,
      },
      { status: 500 },
    );
  }
}

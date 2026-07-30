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
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = isNonEmptyString(body.name) ? body.name.trim() : "";
    const email = isNonEmptyString(body.email) ? body.email.trim() : "";
    const phone =
      typeof body.phone === "string" && body.phone.trim()
        ? body.phone.trim()
        : null;
    const interest = isNonEmptyString(body.interest) ? body.interest.trim() : "";
    const message = isNonEmptyString(body.message) ? body.message.trim() : "";

    if (!name || !email || !interest || !message) {
      return NextResponse.json(
        { error: "Completează toate câmpurile obligatorii." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Email invalid." }, { status: 400 });
    }

    if (!INTEREST_OPTIONS.has(interest)) {
      return NextResponse.json(
        { error: "Opțiune de interes invalidă." },
        { status: 400 },
      );
    }

    if (message.length > 5000 || name.length > 200) {
      return NextResponse.json({ error: "Mesaj prea lung." }, { status: 400 });
    }

    let supabase;
    try {
      supabase = getSupabaseAdmin();
    } catch (clientErr) {
      console.error("[contact] Failed to create Supabase admin client:", {
        message:
          clientErr instanceof Error ? clientErr.message : String(clientErr),
      });
      return NextResponse.json(
        {
          error:
            "Nu am putut trimite mesajul. Te rugăm să încerci din nou.",
        },
        { status: 500 },
      );
    }

    const row = {
      name,
      email,
      phone,
      interest,
      message,
      read: false,
    };

    const { error } = await supabase.from("contact_requests").insert(row);

    if (error) {
      console.error("[contact] Supabase insert failed:", {
        message: error.message,
        code: error.code,
      });
      return NextResponse.json(
        {
          error:
            "Nu am putut trimite mesajul. Te rugăm să încerci din nou.",
        },
        { status: 500 },
      );
    }

    await sendNotificationEmail({ name, email, phone, interest, message });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unhandled exception:", {
      message: err instanceof Error ? err.message : String(err),
    });
    return NextResponse.json(
      {
        error: "Nu am putut trimite mesajul. Te rugăm să încerci din nou.",
      },
      { status: 500 },
    );
  }
}

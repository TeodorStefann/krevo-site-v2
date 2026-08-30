import { anuntaMesajNou } from "@/lib/krevo/telegram";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const INTEREST_OPTIONS = new Set([
  "FirmFlow",
  "Site web profesional",
  "Automatizări AI",
  "Contact general",
  "Altceva",
]);

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  /** honeypot — câmp invizibil pentru oameni; boții îl completează */
  website?: unknown;
  /** bifa de acord cu politica de confidențialitate */
  consent?: unknown;
};

/* Textul exact pe care omul l-a acceptat. Fără el nu poți demonstra
   temeiul prelucrării dacă cineva întreabă. */
const TEXT_CONSIMTAMANT =
  "Sunt de acord cu prelucrarea datelor mele conform Politicii de Confidențialitate.";

/* Limitare simplă per IP: max 3 mesaje / 10 minute. E în memorie, deci pe
   serverless se resetează la rece — dar taie 95% din spamul naiv. */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
const rateMap = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_MAX) {
    rateMap.set(ip, hits);
    return true;
  }
  hits.push(now);
  rateMap.set(ip, hits);
  if (rateMap.size > 5000) rateMap.clear();
  return false;
}

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
      /* Numele vine de la un necunoscut. Fără curățare, cine punea un
         rând nou în el putea insera anteturi în emailul trimis. */
      subject: `Contact nou: ${data.name.replace(/[\r\n]+/g, " ").slice(0, 120)} — ${data.interest}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    /* Răspunsul Resend conține adresa expeditorului. Jurnalele Vercel nu
       sunt locul pentru date personale — păstrăm doar codul de eroare. */
    console.error("[contact] Resend a refuzat trimiterea:", response.status);
  }
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "necunoscut";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Prea multe mesaje. Încearcă din nou în câteva minute." },
        { status: 429 },
      );
    }

    /* Fără limită, oricine putea trimite un corp de zeci de megabytes și
       ocupa funcția degeaba. 16 KB e de zece ori mai mult decât are
       nevoie cel mai lung mesaj real. */
    const marime = Number(request.headers.get("content-length") ?? 0);
    if (marime > 16_000) {
      return NextResponse.json({ error: "Mesaj prea lung." }, { status: 413 });
    }

    const brut = await request.text();
    if (brut.length > 16_000) {
      return NextResponse.json({ error: "Mesaj prea lung." }, { status: 413 });
    }

    let body: ContactPayload;
    try {
      body = JSON.parse(brut) as ContactPayload;
    } catch {
      return NextResponse.json({ error: "Date invalide." }, { status: 400 });
    }

    /* honeypot: oamenii nu văd câmpul, boții îl completează */
    if (isNonEmptyString(body.website)) {
      return NextResponse.json({ ok: true });
    }

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

    /* Toate câmpurile, nu doar două. Un email de 10.000 de caractere
       trecea nestingherit până în baza de date. */
    if (
      message.length > 5000 ||
      name.length > 200 ||
      email.length > 254 ||
      (phone && phone.length > 40) ||
      interest.length > 60
    ) {
      return NextResponse.json({ error: "Date prea lungi." }, { status: 400 });
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

    /* Consimțământul se verifică ÎNAINTE de orice atingere a bazei de
       date — fără el, nu numărăm și nu stocăm nimic. */
    if (body.consent !== true) {
      return NextResponse.json(
        { error: "Trebuie să accepți Politica de Confidențialitate." },
        { status: 400 },
      );
    }

    /* Limita REALĂ, care funcționează și pe serverless.
       Cea din memorie (mai sus) se pierde la fiecare pornire la rece și
       fiecare cerere poate nimeri altă instanță — deci nu apăra nimic.
       Numărăm direct în baza de date câte mesaje a trimis aceeași adresă
       în ultimele 10 minute. Nu stocăm IP-uri, deci nici nu adăugăm date
       personale noi doar ca să ne apărăm de spam. */
    const acumZeceMinute = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { count: recente } = await supabase
      .from("contact_requests")
      .select("id", { count: "exact", head: true })
      .eq("email", email)
      .gte("created_at", acumZeceMinute);

    if ((recente ?? 0) >= RATE_MAX) {
      return NextResponse.json(
        { error: "Ai trimis deja câteva mesaje. Îți răspund în curând." },
        { status: 429 },
      );
    }


    const row = {
      name,
      email,
      phone,
      interest,
      message,
      read: false,
      consent_at: new Date().toISOString(),
      consent_text: TEXT_CONSIMTAMANT,
    };

    let { error } = await supabase.from("contact_requests").insert(row);

    /* Dacă proiectul n-are încă coloanele de consimțământ, salvăm mesajul
       oricum — nu pierdem o cerere pentru o migrare nerulată.
       Rulează supabase/contact-consimtamant.sql. */
    if (error) {
      const deBaza = {
        name: row.name,
        email: row.email,
        phone: row.phone,
        interest: row.interest,
        message: row.message,
        read: row.read,
      };
      ({ error } = await supabase.from("contact_requests").insert(deBaza));
    }

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

    /* Două canale, în paralel: emailul pentru urmă scrisă, Telegram
       pentru sunetul pe telefon. Dacă unul cade, celălalt merge — și
       niciunul nu poate bloca răspunsul către om. */
    await Promise.allSettled([
      sendNotificationEmail({ name, email, phone, interest, message }),
      anuntaMesajNou({
        nume: name,
        email,
        telefon: phone,
        interes: interest,
        mesaj: message,
      }),
    ]);

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

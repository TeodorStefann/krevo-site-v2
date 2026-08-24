/**
 * DIAGNOSTIC — de ce nu merge formularul de contact.
 *
 * Verifică pe rând tot lanțul: variabile → cheie → tabelă → scriere →
 * email. La final îți spune exact unde s-a rupt.
 *
 * Rulare:  node scripts/verifica-contact.mjs
 */

import fs from "node:fs";
import path from "node:path";

const caleEnv = path.join(process.cwd(), ".env.local");
if (!fs.existsSync(caleEnv)) {
  console.error("Nu gasesc .env.local. Ruleaza din folderul krevo-site-animatie.");
  process.exit(1);
}

const env = {};
for (const linie of fs.readFileSync(caleEnv, "utf8").split(/\r?\n/)) {
  const m = linie.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
}

const URL_SB = env.NEXT_PUBLIC_SUPABASE_URL;
const CHEIE = env.SUPABASE_SERVICE_ROLE_KEY;

console.log("\n=== DIAGNOSTIC FORMULAR CONTACT ===\n");

if (!URL_SB || !CHEIE) {
  console.error("[X] 1. Lipseste NEXT_PUBLIC_SUPABASE_URL sau SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}
console.log("[OK] 1. Variabilele exista");

const refUrl = new URL(URL_SB).hostname.split(".")[0];
try {
  const p = JSON.parse(Buffer.from(CHEIE.split(".")[1], "base64").toString("utf8"));
  console.log("     rol: " + p.role + " | proiect cheie: " + p.ref + " | proiect URL: " + refUrl);
  if (p.role !== "service_role") {
    console.error("[X] 2. Cheia NU e service_role. Ia cheia service_role din Settings -> API.");
    process.exit(1);
  }
  if (p.ref !== refUrl) {
    console.error("[X] 2. Cheia e din ALT proiect decat URL-ul.");
    process.exit(1);
  }
  console.log("[OK] 2. Cheia se potriveste cu proiectul");
} catch {
  console.log("[..] 2. Nu am putut decoda cheia. Continuam.");
}

const antet = {
  apikey: CHEIE,
  Authorization: "Bearer " + CHEIE,
  "Content-Type": "application/json",
};

const r1 = await fetch(URL_SB + "/rest/v1/contact_requests?select=id&limit=1", { headers: antet });
if (!r1.ok) {
  const text = await r1.text();
  console.error("[X] 3. Tabela nu raspunde (HTTP " + r1.status + ")");
  console.error("    " + text);
  console.error("\n-> Cel mai probabil ai rulat SQL-ul in ALT proiect Supabase.");
  console.error("   Deschide proiectul cu ref-ul \"" + refUrl + "\" si ruleaza acolo");
  console.error("   supabase/contact-requests.sql");
  process.exit(1);
}
console.log("[OK] 3. Tabela contact_requests exista si e accesibila");

const r2 = await fetch(URL_SB + "/rest/v1/contact_requests", {
  method: "POST",
  headers: { ...antet, Prefer: "return=representation" },
  body: JSON.stringify({
    name: "Test automat",
    email: "test@krevo.ro",
    phone: null,
    interest: "Contact general",
    message: "Rand de verificare - il poti sterge din Table Editor.",
    read: false,
  }),
});
if (!r2.ok) {
  console.error("[X] 4. Scrierea a esuat (HTTP " + r2.status + ")");
  console.error("    " + (await r2.text()));
  console.error("\n-> Trimite-mi textul de mai sus.");
  process.exit(1);
}
console.log("[OK] 4. Scrierea functioneaza - vezi randul \"Test automat\" in Table Editor");

if (!env.RESEND_API_KEY) {
  console.log("[..] 5. RESEND_API_KEY lipseste - mesajul se salveaza, dar nu primesti email.");
} else {
  const r3 = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + env.RESEND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Krevo <onboarding@resend.dev>",
      to: ["teodor@krevo.ro"],
      subject: "Test formular Krevo",
      text: "Daca ai primit asta, notificarile de contact functioneaza.",
    }),
  });
  if (r3.ok) console.log("[OK] 5. Emailul a plecat - verifica inboxul (si Spam)");
  else {
    console.log("[..] 5. Resend a refuzat (HTTP " + r3.status + ") - formularul MERGE, doar emailul nu:");
    console.log("    " + (await r3.text()));
  }
}

console.log("\nGata. Daca toate au [OK] si formularul tot da eroare in browser,");
console.log("serverul de dev ruleaza cu variabilele VECHI.");
console.log("Opreste-l cu Ctrl+C si porneste-l din nou: npm run dev\n");

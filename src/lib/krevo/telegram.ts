/**
 * Notificare instant pe telefon, prin Telegram.
 *
 * DE CE
 * Un mesaj din formular ajunge azi doar pe email. Emailul îl vezi când îl
 * vezi — poate peste patru ore, poate a doua zi. Un patron care a scris
 * duminică seara și primește răspuns marți dimineața a vorbit deja cu
 * altcineva. Telegram sună pe telefon în două secunde, gratis, fără
 * dependențe noi în proiect.
 *
 * E complet opțional: dacă lipsesc variabilele, funcția nu face nimic și
 * nu blochează nimic. Formularul funcționează la fel.
 *
 * Cum se pune (o dată, cinci minute):
 *  1. În Telegram, scrie-i lui @BotFather → /newbot → primești un token.
 *  2. Scrie-i botului tău orice mesaj (altfel nu-ți poate răspunde).
 *  3. Deschide https://api.telegram.org/bot<TOKEN>/getUpdates și caută
 *     `"chat":{"id":123456789` — ăla e TELEGRAM_CHAT_ID.
 *  4. Pune TELEGRAM_BOT_TOKEN și TELEGRAM_CHAT_ID în .env.local și Vercel.
 */

/** Telegram interpretează HTML în mesaje — escapăm ce vine de la om. */
function escapa(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export type MesajFormular = {
  nume: string;
  email: string;
  telefon: string | null;
  interes: string;
  mesaj: string;
};

export async function anuntaMesajNou(m: MesajFormular): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const linii = [
    "🔵 <b>Mesaj nou pe krevo.ro</b>",
    "",
    `<b>${escapa(m.nume)}</b>`,
    m.telefon ? `📞 ${escapa(m.telefon)}` : "",
    `✉️ ${escapa(m.email)}`,
    `Interes: ${escapa(m.interes)}`,
    "",
    escapa(m.mesaj.slice(0, 700)),
    m.mesaj.length > 700 ? "…" : "",
  ].filter(Boolean);

  try {
    /* Cu termen scurt: dacă Telegram e lent, nu ținem omul în formular. */
    const controler = new AbortController();
    const oprire = setTimeout(() => controler.abort(), 4000);
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: linii.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controler.signal,
    });
    clearTimeout(oprire);
  } catch (err) {
    /* Nicio dată personală în log — doar faptul că n-a mers. */
    console.error(
      "[telegram] Notificarea nu a plecat:",
      err instanceof Error ? err.name : "eroare necunoscută"
    );
  }
}

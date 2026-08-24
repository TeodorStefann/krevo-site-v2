/**
 * Discuția de 15 minute — un singur loc care decide unde ajunge omul.
 *
 * Cât timp CAL_LINK e gol, toate butoanele de programare duc pe WhatsApp,
 * cu mesajul deja scris. Când îți faci contul Cal.com, pui linkul aici și
 * tot site-ul trece automat pe calendar — nu mai umbli prin componente.
 *
 * Cal.com: cont gratuit → creezi un tip de eveniment de 15 minute →
 * copiezi linkul public (arată ca https://cal.com/numele-tau/15min).
 */

export const CAL_LINK = "https://cal.com/teodor-krevo/15-min";

export const NUMAR_WHATSAPP = "40774451822";

const MESAJ_IMPLICIT =
  "Salut! Am văzut site-ul Krevo și vreau să programez discuția de 15 minute pentru firma mea.";

/**
 * Construiește linkul de programare.
 * @param context ce a selectat omul pe site — ajunge în mesaj, ca să știi
 *                despre ce vorbiți înainte să suni.
 */
export function linkProgramare(context?: string): string {
  const nota = context
    ? `${MESAJ_IMPLICIT}\n\nContext: ${context}`
    : MESAJ_IMPLICIT;

  if (CAL_LINK) {
    const url = new URL(CAL_LINK);
    if (context) url.searchParams.set("notes", nota);
    return url.toString();
  }

  return `https://wa.me/${NUMAR_WHATSAPP}?text=${encodeURIComponent(nota)}`;
}

/** Programarea se deschide mereu în tab nou — nu scoatem omul de pe site. */
export const PROGRAMARE_EXTERN = true;

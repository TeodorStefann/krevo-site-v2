/**
 * Toate căile prin care cineva te poate găsi — într-un singur loc.
 *
 * Le schimbi aici o dată și se schimbă peste tot: în secțiunea Fondator,
 * în subsol, oriunde apar. Nu mai umbli prin componente.
 */

/** Profilul tău public de LinkedIn.
 *  ⚠️ Cât timp e gol, iconițele de LinkedIn NU apar nicăieri — nu rămân
 *  linkuri moarte. Îl iei din LinkedIn → Me → View Profile → copiezi
 *  adresa din bara browserului (arată ca .../in/numele-tau/). */
export const LINKEDIN_HREF = "https://www.linkedin.com/in/teodor-chiurtu-a04b07317/";

export const EMAIL = "teodor@krevo.ro";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const TELEFON = "0774 451 822";
export const TELEFON_HREF = "tel:+40774451822";

const MESAJ_WHATSAPP =
  "Salut! Am văzut site-ul Krevo și vreau să programez discuția de 15 minute pentru firma mea.";

export const WHATSAPP_HREF = `https://wa.me/40774451822?text=${encodeURIComponent(MESAJ_WHATSAPP)}`;

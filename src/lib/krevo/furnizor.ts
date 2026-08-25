/**
 * Cine e furnizorul serviciului — un singur loc, pentru toate paginile.
 *
 * DE CE EXISTĂ COMUTATORUL DE MAI JOS
 * Paginile legale spuneau „Krevo Digital SRL”, o firmă care nu există. Un
 * document care numește o entitate inexistentă nu acoperă pe nimeni, iar
 * clientul crede că semnează cu altcineva. Dar nici „PFA” nu e adevărat
 * cât timp nu ai certificatul în mână — ar fi aceeași minciună, mai mică.
 *
 * Deci: cât timp `INREGISTRAT` e `false`, site-ul spune exact ce ești —
 * o persoană care lucrează sub numele Krevo — și nu inventează niciun
 * număr. Când primești certificatul de la Registrul Comerțului, pui
 * `true`, completezi cele patru câmpuri de sub el, și tot site-ul se
 * actualizează singur. Nu mai umbli prin nicio pagină.
 */

/** ⚠️ Pune `true` DUPĂ ce ai certificatul de înregistrare în mână. */
export const INREGISTRAT = false;

/** Se completează odată cu `INREGISTRAT = true`. Până atunci, ignorate. */
const DUPA_INREGISTRARE = {
  /** Denumirea exactă din certificat, ex. „Krevo Systems S.R.L.” */
  denumire: "",
  cui: "",
  regCom: "",
  /** Sediul social din certificat. */
  adresa: "",
};

export const FURNIZOR = {
  /** Numele sub care apari în documente. */
  denumire: INREGISTRAT ? DUPA_INREGISTRARE.denumire : "Teodor Chiurtu",
  /** Marca sub care lucrezi — nu se schimbă. */
  numeScurt: "Krevo",
  /** `null` = nu ai încă, și atunci nu se afișează deloc. */
  cui: INREGISTRAT ? DUPA_INREGISTRARE.cui : null,
  regCom: INREGISTRAT ? DUPA_INREGISTRARE.regCom : null,
  adresa: INREGISTRAT ? DUPA_INREGISTRARE.adresa : "Craiova, județul Dolj, România",
  email: "teodor@krevo.ro",
  telefon: "0774 451 822",
} as const;

/**
 * Rândul de identificare din subsolul paginilor legale.
 * Arată doar ce e adevărat: fără firmă înregistrată nu apare niciun număr.
 */
export function identificareFurnizor(): string {
  const parti: string[] = [FURNIZOR.denumire, FURNIZOR.adresa];
  if (FURNIZOR.cui) parti.push(`CUI ${FURNIZOR.cui}`);
  if (FURNIZOR.regCom) parti.push(`Reg. Com. ${FURNIZOR.regCom}`);
  parti.push(FURNIZOR.email, FURNIZOR.telefon);
  return parti.join(" · ");
}

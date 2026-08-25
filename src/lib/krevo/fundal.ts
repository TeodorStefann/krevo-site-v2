/** Fundalurile secțiunilor — o singură rețetă, ca toate să arate la fel.
 *
 *  Regula de la care am plecat: lumină doar unde nu e text.
 *
 *  Voalul e o bandă VERTICALĂ, nu o elipsă. E important: o elipsă se
 *  recentrează când secțiunea crește (bifezi ceva, apare rezultatul), deci
 *  lumina ajunge exact peste cuvinte. O bandă pe axa X nu depinde deloc de
 *  înălțime — coloana de text stă mereu la umbră, marginile rămân vii, iar
 *  când secțiunea crește nu se schimbă nimic.
 *
 *  Straturi, de deasupra în jos:
 *    1. banda de umbră peste coloana de text;
 *    2. cusătura sus/jos, ca secțiunile să se topească una într-alta;
 *    3. imaginea.
 */
const BANDA_TEXT =
  "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.30) 8%, rgba(0,0,0,0.80) 24%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.80) 76%, rgba(0,0,0,0.30) 92%, rgba(0,0,0,0) 100%)";

const CUSATURA =
  "linear-gradient(180deg, #000 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 78%, #000 100%)";

export function fundalSectiune(imagine: string): { background: string } {
  return {
    background: [
      BANDA_TEXT,
      CUSATURA,
      `url('${imagine}') center / cover no-repeat #000`,
    ].join(", "),
  };
}

/** Aceeași rețetă pentru o pagină întreagă (fundal fix, conținutul alunecă
 *  peste el): fără cusătură, fiindcă nu are vecini de care să se lege. */
export function fundalPagina(imagine: string): { background: string } {
  return {
    background: [
      BANDA_TEXT,
      `url('${imagine}') center / cover no-repeat #000`,
    ].join(", "),
  };
}

/** Suprafața unui card așezat peste o imagine. Destul de opacă încât textul să
 *  se citească perfect, dar nu un dreptunghi mort — lasă o urmă din fundal. */
export const SUPRAFATA_CARD = "bg-[#05080F]/82 backdrop-blur-[3px]";

/** Pentru textul mare care stă direct peste imagine, fără card sub el.
 *  Umbra e invizibilă pe negru și devine plasă de siguranță peste lumină. */
export const TEXT_PESTE_IMAGINE =
  "[text-shadow:0_2px_22px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.7)]";

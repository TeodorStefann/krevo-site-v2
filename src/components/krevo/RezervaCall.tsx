"use client";

import { MotionButton } from "@/components/ui/MotionButton";
import { linkProgramare, PROGRAMARE_EXTERN } from "@/lib/krevo/programare";

/**
 * Butonul de programare, folosit în cele patru momente în care omul e
 * cel mai aproape de decizie: în hero, sub calculatorul de pierderi, la
 * finalul diagnosticului și în bara fixă de pe mobil.
 *
 * `context` ajunge în mesajul precompletat — patronul nu mai explică de
 * la zero, iar tu intri în discuție știind deja despre ce e vorba.
 */

type Props = {
  eticheta?: string;
  context?: string;
  varianta?: "principal" | "secundar";
  className?: string;
};

export function RezervaCall({
  eticheta = "Rezervă 15 minute",
  context,
  varianta = "secundar",
  className = "",
}: Props) {
  return (
    <MotionButton
      label={eticheta}
      href={linkProgramare(context)}
      extern={PROGRAMARE_EXTERN}
      varianta={varianta}
      className={className}
      ariaLabel={`${eticheta} — discuție online, fără deplasare`}
    />
  );
}

export default RezervaCall;

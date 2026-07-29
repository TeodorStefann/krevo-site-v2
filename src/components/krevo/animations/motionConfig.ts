export const springNatural = {
  type: "spring" as const,
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};

export const springSoft = {
  type: "spring" as const,
  stiffness: 90,
  damping: 20,
};

export const springBounce = {
  type: "spring" as const,
  stiffness: 260,
  damping: 18,
};

// =====================================================================
// Registre des phases.
// Pour ajouter une nouvelle phase rédigée : édite phase-X.js,
// passe son `meta.status` de "upcoming" à "active", et c'est tout.
// =====================================================================

import phase1 from "./phase-1.js";
import phase2 from "./phase-2.js";
import phase3 from "./phase-3.js";
import phase4 from "./phase-4.js";

export const phases = [phase1, phase2, phase3, phase4];

export function getDefaultPhaseId() {
  // La plus récente phase "active" gagne, sinon la première.
  const active = phases.filter((p) => p.meta.status === "active").pop();
  return active ? active.meta.id : phases[0].meta.id;
}

export function getPhaseById(id) {
  return phases.find((p) => p.meta.id === id);
}

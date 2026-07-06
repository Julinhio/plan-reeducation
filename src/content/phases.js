import phase1 from "./phase-1.js";
import phase2 from "./phase-2.js";
import phase3 from "./phase-3.js";
import phase4 from "./phase-4.js";
import phase5 from "./phase-5.js";
import { getPhaseStatus } from "./timeline.js";

const STATUS_LABELS = {
  done: "Terminée",
  active: "En cours",
  upcoming: "À venir",
};

// Statut calendaire (fenêtres Palmieri depuis SURGERY_DATE), calculé au
// chargement. La progression fine reste criteriée via la vue Critères.
function withStatus(phase) {
  const status = getPhaseStatus(phase.meta.id);
  return {
    ...phase,
    meta: { ...phase.meta, status, statusLabel: STATUS_LABELS[status] },
  };
}

export const phases = [phase1, phase2, phase3, phase4, phase5].map(withStatus);

export function getDefaultPhaseId() {
  const active = phases.find((p) => p.meta.status === "active");
  return active ? active.meta.id : phases[0].meta.id;
}

export function getPhaseById(id) {
  return phases.find((p) => p.meta.id === id);
}

export function getActiveExercises(phaseId) {
  const phase = getPhaseById(phaseId);
  if (!phase) return [];
  return phase.exercises ?? [];
}

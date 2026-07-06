// =====================================================================
// Timeline post-opératoire.
// Source de vérité unique pour la date de chirurgie, les fenêtres de
// phases du protocole Palmieri DT4 et les échéances médicales.
// Le statut des phases est calendaire (le protocole Palmieri l'est),
// la progression fine reste criteriée via la vue Critères.
// =====================================================================

import { differenceInCalendarDays, parseISO } from "date-fns";

export const SURGERY_DATE = "2026-06-29";

// Forcer une phase active (ex: feu vert médical retardé). null = auto.
export const PHASE_OVERRIDE = null;

// Fenêtres en jours post-op, bornes incluses. Phase I officielle J4-J21,
// les jours J0-J3 sont rattachés à la phase 1 côté app.
export const PHASE_WINDOWS = [
  { id: 1, fromDay: 0, toDay: 21 },
  { id: 2, fromDay: 22, toDay: 45 },
  { id: 3, fromDay: 46, toDay: 90 },
  { id: 4, fromDay: 91, toDay: 122 },
  { id: 5, fromDay: 123, toDay: Infinity },
];

export const MILESTONES = [
  {
    date: "2026-07-15",
    label: "RDV Palmieri, Aubagne",
    detail:
      "Levée du pansement, feu vert phase II, question BFR, date de vol Vietnam.",
  },
  {
    date: "2026-07-28",
    label: "Retour Ho Chi Minh City (fin juillet)",
    detail: "Base rééducation 3 mois, matériel SAGA + cryo dans les bagages.",
    approx: true,
  },
  {
    date: "2026-08-12",
    label: "RDV Palmieri, contrôle J45",
    detail: "Validation passage phase III. Présentiel ou visio, à négocier le 15/07.",
  },
  {
    date: "2026-11-15",
    label: "Transition Chiang Mai (nov-déc)",
    detail: "Kinés du sport dispo sur place. Identifier le centre isocinétique.",
    approx: true,
  },
  {
    date: "2026-11-29",
    label: "Test isocinétique + Dr Boissinot (J+5 mois)",
    detail:
      "Test à faire en amont dans un centre équipé (France, Vinmec HCMC ou Bangkok). Cible : déficit quad < 10 %, ratio IJ/Q > 0.6.",
  },
  {
    date: "2027-01-29",
    label: "Dr Boissinot, contrôle (J+7 mois)",
    detail: "Après reprise progressive des sports de pivot.",
  },
];

export function daysSinceSurgery(date = new Date()) {
  return differenceInCalendarDays(date, parseISO(SURGERY_DATE));
}

export function getCalendarPhaseId(date = new Date()) {
  if (PHASE_OVERRIDE) return PHASE_OVERRIDE;
  const day = daysSinceSurgery(date);
  if (day < 0) return 1;
  const win = PHASE_WINDOWS.find((w) => day >= w.fromDay && day <= w.toDay);
  return win ? win.id : PHASE_WINDOWS[PHASE_WINDOWS.length - 1].id;
}

export function getPhaseStatus(phaseId, date = new Date()) {
  const activeId = getCalendarPhaseId(date);
  if (phaseId < activeId) return "done";
  if (phaseId === activeId) return "active";
  return "upcoming";
}

export function nextMilestone(date = new Date()) {
  const key = toKey(date);
  return MILESTONES.find((m) => m.date >= key) ?? null;
}

function toKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

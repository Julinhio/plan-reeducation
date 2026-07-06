-- =============================================================
-- Refonte post-op (chirurgie du 29/06/2026, ligamentoplastie
-- d'augmentation LCA DT4 + ménisectomie bilatérale, Dr Palmieri).
-- Extensions de schéma, cumulatives et non destructives.
-- =============================================================

-- ---------- measurements : mesures qui comptent en post-op ----------
-- Circonférence de cuisse (à 10 cm du bord supérieur de la rotule,
-- même repère à chaque mesure) : la mesure n°1 de l'atrophie quadri.
-- ROM flexion actif/passif : la contrainte Palmieri est 0-90° les
-- 3 premières semaines, puis récupération progressive.
-- Poids : vigilance charge articulaire à vie (ménisectomie externe).

alter table public.measurements
  add column if not exists thigh_circ_op_cm        numeric(5,1),
  add column if not exists thigh_circ_sain_cm      numeric(5,1),
  add column if not exists flexion_active_degrees  smallint
    check (flexion_active_degrees between 0 and 160),
  add column if not exists flexion_passive_degrees smallint
    check (flexion_passive_degrees between 0 and 160),
  add column if not exists weight_kg               numeric(4,1);

-- ---------- exercise_sessions : support BFR ----------
-- Le BFR se prescrit en % de LOP (Limb Occlusion Pressure), jamais en
-- pression absolue. limb = 'sain' couvre le plan B (BFR jambe saine
-- uniquement si Palmieri refuse le côté opéré).

alter table public.exercise_sessions
  add column if not exists with_bfr    boolean not null default false,
  add column if not exists lop_percent smallint
    check (lop_percent between 10 and 100),
  add column if not exists limb        text not null default 'op'
    check (limb in ('op', 'sain'));

-- ---------- phase_criteria : cycle de vie des critères ----------
-- Les critères pré-op ("conservateur d'abord") sont désactivés, pas
-- supprimés : l'historique reste lisible, l'app filtre sur active.

alter table public.phase_criteria
  add column if not exists active boolean not null default true;

-- ---------- coach_analyses : nouveaux presets ----------
-- Le check figé sur les 6 types v1 empêche d'ajouter des presets.
-- L'app whitelist déjà les types côté serveur (PRESET_LABELS).

alter table public.coach_analyses
  drop constraint if exists coach_analyses_prompt_type_check;

alter table public.coach_analyses
  add constraint coach_analyses_prompt_type_check
  check (prompt_type in (
    'free', 'weekly', 'phase_check', 'kine_synthesis', 'patterns',
    'custom', 'rdv_prep'
  ));

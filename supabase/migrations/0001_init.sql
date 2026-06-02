-- =============================================================
-- Plan de rééducation, schéma initial.
-- App mono-utilisateur, gate par mot de passe côté front.
-- RLS désactivé sur les 4 tables, accès via la clé anon.
-- =============================================================

-- ---------- exercise_sessions ----------
-- Une ligne par log d'exercice. Le quad set fait 3x/jour donne 3 lignes.
-- La compliance et le volume se calculent en agrégeant côté app.

create table if not exists public.exercise_sessions (
  id            uuid primary key default gen_random_uuid(),
  session_date  date not null,
  phase_id      smallint not null,
  exercise_key  text not null,
  sets          smallint,
  reps          smallint,
  duration_sec  integer,
  sensation     smallint check (sensation between 1 and 10),
  notes         text,
  created_at    timestamptz not null default now()
);

create index if not exists exercise_sessions_date_idx
  on public.exercise_sessions (session_date desc);

create index if not exists exercise_sessions_phase_date_idx
  on public.exercise_sessions (phase_id, session_date desc);

create index if not exists exercise_sessions_exercise_date_idx
  on public.exercise_sessions (exercise_key, session_date desc);

alter table public.exercise_sessions disable row level security;


-- ---------- journal_entries ----------
-- Une ligne par jour, contrainte unique sur entry_date.

create table if not exists public.journal_entries (
  id             uuid primary key default gen_random_uuid(),
  entry_date     date not null unique,
  knee_morning   text,
  swelling       boolean,
  mobility       smallint check (mobility between 1 and 10),
  pain           smallint check (pain between 1 and 10),
  mood           text,
  notes          text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists journal_entries_date_idx
  on public.journal_entries (entry_date desc);

alter table public.journal_entries disable row level security;

-- Trigger pour updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists journal_entries_touch on public.journal_entries;
create trigger journal_entries_touch
  before update on public.journal_entries
  for each row execute function public.touch_updated_at();


-- ---------- measurements ----------
-- Mesures objectives pour les courbes.

create table if not exists public.measurements (
  id                         uuid primary key default gen_random_uuid(),
  measured_on                date not null,
  extension_deficit_degrees  numeric(4,1),
  vmo_quality                smallint check (vmo_quality between 1 and 10),
  notes                      text,
  created_at                 timestamptz not null default now()
);

create index if not exists measurements_date_idx
  on public.measurements (measured_on desc);

alter table public.measurements disable row level security;


-- ---------- phase_criteria ----------
-- Critères d'entrée vers la phase suivante.

create table if not exists public.phase_criteria (
  id            uuid primary key default gen_random_uuid(),
  target_phase  smallint not null,
  key           text not null,
  label         text not null,
  description   text,
  order_index   smallint not null default 0,
  status        text not null default 'pending'
                check (status in ('pending', 'in_progress', 'validated')),
  validated_on  date,
  notes         text,
  updated_at    timestamptz not null default now(),
  unique (target_phase, key)
);

create index if not exists phase_criteria_target_idx
  on public.phase_criteria (target_phase, order_index);

alter table public.phase_criteria disable row level security;

drop trigger if exists phase_criteria_touch on public.phase_criteria;
create trigger phase_criteria_touch
  before update on public.phase_criteria
  for each row execute function public.touch_updated_at();

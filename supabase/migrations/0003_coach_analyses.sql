-- =============================================================
-- Coach IA, table d'historique des analyses.
-- Le coach a accès à toutes les analyses précédentes pour avoir
-- une mémoire continue de son raisonnement.
-- =============================================================

create table if not exists public.coach_analyses (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  prompt_type       text not null
                    check (prompt_type in ('free', 'weekly', 'phase_check', 'kine_synthesis', 'patterns', 'custom')),
  user_prompt       text not null,
  response          text not null,
  context_snapshot  jsonb,
  model_used        text
);

create index if not exists coach_analyses_created_idx
  on public.coach_analyses (created_at desc);

alter table public.coach_analyses disable row level security;

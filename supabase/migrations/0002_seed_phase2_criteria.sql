-- =============================================================
-- Seed des critères d'entrée en phase 2.
-- Repris du contenu phase-1.js, colonne "Quand passer à la suite".
-- =============================================================

insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (2, 'quad-vmo-firm',
   'Contraction du quad franche, VMO qui durcit nettement',
   'Tu contractes le quad franchement et tu vois le VMO durcir nettement, comme la jambe saine.',
   1),
  (2, 'extension-complete',
   'Extension active complète',
   'Plus de déficit notable en charge, l''extension active revient.',
   2),
  (2, 'no-apprehension-step-down',
   'Plus d''appréhension à la descente de marche',
   'La descente de marche ne déclenche plus de réticence.',
   3),
  (2, 'no-reactive-swelling',
   'Aucun gonflement réactionnel',
   'Aucun gonflement après le travail neuromusculaire.',
   4)
on conflict (target_phase, key) do nothing;

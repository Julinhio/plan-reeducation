-- =============================================================
-- Critères de passage post-op, alignés protocole Palmieri DT4
-- + addendum J+7 (BFR Rothman, test isocinétique).
-- Les critères pré-op sont désactivés (jamais supprimés).
-- target_phase = 6 : critères de retour aux sports de pivot.
-- =============================================================

-- Désactivation des critères pré-op "conservateur d'abord"
update public.phase_criteria
set active = false
where target_phase = 2
  and key in (
    'quad-vmo-firm',
    'extension-complete',
    'no-apprehension-step-down',
    'no-reactive-swelling'
  );

-- ---------- Vers phase 2 (Phase II Palmieri, J22-J45) ----------
insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (2, 'feu-vert-palmieri-j15',
   'Feu vert Palmieri au RDV du 15/07',
   'Contrôle clinique J+15 : levée du pansement, évaluation de l''amplitude, validation d''entrée en phase II. Poser la question BFR à ce RDV.',
   1),
  (2, 'slr-5-verrouilles',
   '5 SLR consécutifs, genou verrouillé',
   'Critère du protocole DT4 pour la reprise d''appui : élever 5 fois d''affilée le membre opéré, genou tendu, sans que le genou plie.',
   2),
  (2, 'extension-verrouillage',
   'Verrouillage en extension complète',
   'L''objectif n°1 de la phase I. Extension passive fluide et verrouillage actif du quadriceps acquis.',
   3),
  (2, 'marche-sans-cannes',
   'Sevrage des cannes',
   'Cannes anglaises 15 jours post-op selon consignes. Marche stable, sans esquive d''appui.',
   4),
  (2, 'gonflement-controle',
   'Inflammation contrôlée',
   'Pas de poussée inflammatoire type J+5 (surcharge + alcool + escaliers). Genou froid et calme au réveil.',
   5)
on conflict (target_phase, key) do nothing;

-- ---------- Vers phase 3 (Phase III Palmieri, J45-J90) ----------
insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (3, 'feu-vert-palmieri-j45',
   'Feu vert Palmieri au RDV du 12/08',
   'Contrôle J+45, présentiel ou visio/relais à négocier dès le 15/07 (retour HCMC fin juillet).',
   1),
  (3, 'flexion-120',
   'Flexion ≥ 120°',
   'Mobilité suffisante pour la presse et les demi-squats du secteur 30-90° de la phase III.',
   2),
  (3, 'marche-normale',
   'Schéma de marche normalisé',
   'Marche sans boiterie, y compris en fin de journée et en terrain irrégulier léger.',
   3),
  (3, 'velo-ok',
   'Vélo sans douleur ni réaction',
   'Vélo repris en phase II dès que les amplitudes le permettent. Aucune réaction articulaire le lendemain.',
   4),
  (3, 'bfr-tolere',
   'BFR phase 1 Rothman maîtrisé',
   'LOP auto-calibrée à chaque séance, format 3×15/30s toléré sur les 5 exos, aucune paresthésie ni douleur inhabituelle sous cuff.',
   5)
on conflict (target_phase, key) do nothing;

-- ---------- Vers phase 4 (Phase IV Palmieri, J90-M4) ----------
insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (4, 'amplitudes-completes',
   'Amplitudes complètes et symétriques',
   'Flexion et extension identiques au côté sain, sans douleur en butée.',
   1),
  (4, 'force-ckc-sans-reaction',
   'Charge phase III encaissée',
   'Presse, stepper, demi-squats 30-90° en progression, sans douleur ni épanchement réactionnel.',
   2),
  (4, 'proprio-unipodale',
   'Appui unipodal stable côté opéré',
   'Tenue unipodale solide, yeux ouverts puis fermés, sans stratégie de hanche excessive.',
   3),
  (4, 'ischio-sans-douleur',
   'Ischios sans douleur au site de prélèvement',
   'Travail ischio-jambiers en chaîne fermée toléré (vigilance site de prélèvement DT4).',
   4)
on conflict (target_phase, key) do nothing;

-- ---------- Vers phase 5 (Phase V Palmieri, M4-M6) ----------
insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (5, 'charge-lourde-toleree',
   'Montée en charge phase IV encaissée',
   'Progression de charge et de proprioception sans réaction articulaire (trophicité surveillée).',
   1),
  (5, 'pas-epanchement-recurrent',
   'Pas d''épanchement récurrent',
   'Aucun gonflement récurrent après les séances lourdes.',
   2),
  (5, 'quad-symetrie-en-route',
   'Atrophie quadri en voie de résorption',
   'Écart de circonférence de cuisse op/sain en réduction nette (cible < 2 cm avant la course).',
   3)
on conflict (target_phase, key) do nothing;

-- ---------- Vers "phase 6" : retour aux sports de pivot ----------
insert into public.phase_criteria (target_phase, key, label, description, order_index)
values
  (6, 'isocinetique-deficit-10',
   'Isocinétique : déficit quadriceps < 10 %',
   'Test isocinétique en centre équipé (France, Vinmec HCMC ou Bangkok, à identifier avant fin nov). Lu par le Dr Boissinot à J+5 mois.',
   1),
  (6, 'isocinetique-ratio-06',
   'Isocinétique : ratio IJ/Q > 0.6',
   'Ratio ischios/quadriceps supérieur à 0.6 sur le même test.',
   2),
  (6, 'six-mois-revolus',
   '6 mois post-op révolus',
   'Plancher temporel Palmieri pour les sports de pivot (padel, boxe) : fin décembre 2026 au plus tôt.',
   3),
  (6, 'feu-vert-final',
   'Feu vert Palmieri / Boissinot',
   'Validation médicale après lecture du test isocinétique et contrôle clinique.',
   4),
  (6, 'course-appuis-ok',
   'Course et changements d''appui sans appréhension',
   'Course sur terrain stable acquise (M3-M4), pliométrie et changements d''appui de la phase V sans réaction ni appréhension.',
   5)
on conflict (target_phase, key) do nothing;

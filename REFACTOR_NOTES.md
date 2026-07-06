# REFACTOR_NOTES — Refonte post-op (juillet 2026)

Trace des décisions du refactor "post-op" mené à J+7 (06/07/2026), après la
ligamentoplastie d'augmentation LCA DT4 + ménisectomie bilatérale du 29/06/2026
(Dr Palmieri, Clinique Juge).

Sources de vérité médicale utilisées :
- `Dossier_Genou_Droit_Julien_Addendum_J+7.md` (06/07/2026) — CR opératoire réel,
  évolution J+1→J+7, plan BFR complet, calendrier, logistique HCMC/Chiang Mai.
- Protocole officiel Palmieri DT4 phases I→V, extrait du document clinique
  `GAICHET_Julien_ENTREE MP AMBU DT4_426744` (consignes post-op, secteur 0-90°,
  RDV J+15 / J+45 / J+5 mois / J+7 mois, repères de reprise sportive).
- Dossier v1 (30/05/2026) pour l'historique et l'imagerie.

Note : le dossier v2 du 28/06 (`Dossier_Genou_Droit___Julien_Frederic_David_Gaichet.md`)
n'existe pas sur ce disque ; le protocole Palmieri qu'il contenait a été récupéré
directement depuis le document clinique source, qui fait davantage autorité.

---

## Décisions clés

### 1. Passage de 4 à 5 phases, alignées Palmieri
Les 4 phases pré-op ("conservateur d'abord") sont remplacées par les 5 phases du
protocole officiel : I `J4-J21`, II `J22-J45`, III `J45-J90`, IV `J90-M4`, V `M4-M6`.
La numérotation app 1-5 = phases Palmieri I-V. L'historique de tracking n'est pas
cassé : les 4 clés d'exercices de l'ancienne phase 1 (`quad-set`, `slr`,
`amplitude`, `flexion-talon`) restent valides en phase 1 post-op — ce sont les
mêmes gestes, recalibrés post-op.

### 2. Statut de phase calculé par la date, progression criteriée par ailleurs
`src/content/timeline.js` centralise `SURGERY_DATE`, les fenêtres de phases et
les échéances. Le statut (`done`/`active`/`upcoming`) est calculé depuis J+N :
le protocole Palmieri est calendaire et les RDV chirurgien tombent aux
frontières de phases. La dimension "criteriée, pas calendaire" (leçon J+5) vit
dans la vue Critères : les critères fonctionnels d'entrée de chaque phase sont
seedés en base et à valider à la main. `PHASE_OVERRIDE` permet de forcer une
phase si le feu vert médical est retardé.

### 3. Modèle de données (migrations 0004, 0005 — cumulatives, non destructives)
- `measurements` : + `thigh_circ_op_cm`, `thigh_circ_sain_cm` (atrophie quadri,
  la mesure n°1 du post-op), `flexion_active_degrees`, `flexion_passive_degrees`,
  `weight_kg` (vigilance arthrose post-ménisectomie externe). L'existant
  (`extension_deficit_degrees`, `vmo_quality`) reste pertinent et est conservé.
- `exercise_sessions` : + `with_bfr`, `lop_percent` (le BFR se prescrit en %LOP,
  jamais en pression absolue), `limb` (`op`/`sain` — plan B jambe saine si refus
  Palmieri). Le BFR est loggé dans le même flux que les autres exercices : une
  seule UI de log, la compliance s'agrège pareil.
- `phase_criteria` : + colonne `active` — les critères pré-op sont désactivés
  (pas supprimés), les nouveaux critères post-op phases 2→6 sont seedés.
  `target_phase = 6` = critères de retour aux sports de pivot (isocinétique).
- `coach_analyses` : check `prompt_type` élargi (nouveau preset `rdv_prep`).

### 4. BFR intégré comme outil de première classe
Le programme Rothman est porté dans le contenu des phases 2 et 3 (5 exos phase 1
Rothman en phase II Palmieri, exos phase 2 Rothman en phase III). Les cartes
d'exercice portent un bloc `bfr` (cible %LOP, format 3×15/30s, plafond 30 min) ;
la carte affiche un badge BFR et le log propose le champ %LOP. La vue Lecture de
la phase 2 embarque l'explainer LOP + sécurité (phlébite, paresthésies) + plan B.

### 5. Coach IA réécrit
`api/coach-context.js` : profil inchangé sur le fond mais bascule "récupération
optimale" ; historique genou réécrit (CR opératoire, augmentation vs
reconstruction, évolution J+1→J+7 et ses leçons, protocole Palmieri, plan BFR,
calendrier, logistique Vietnam/Thaïlande, rôle du père kiné). `api/coach.js`
injecte la date du jour + J+N + phase calendaire au moment de l'appel. Presets
mis à jour (bilan hebdo, point de phase, synthèse kiné, patterns, préparation
RDV). Mécanique OpenRouter + presets + question libre + choix de modèle intacte.

### 6. UI
- Masthead : compteur J+N post-op + prochaine échéance (depuis timeline.js).
- Stepper : 5 phases, scroll horizontal sur mobile (grille 2×2 ne tient plus).
- Progression : 2 nouveaux graphiques (différentiel de circonférence de cuisse
  op vs sain, flexion active/passive) + formulaire de mesure enrichi.
- Vue Critères : cible 6 = "Retour aux sports de pivot", filtre `active = true`.
- Direction visuelle dark athlétique inchangée (tokens `index.css` intacts).

### 7. Hors périmètre / dettes assumées
- RLS toujours désactivé (choix v1 documenté : app mono-utilisateur, gate par
  mot de passe, clé anon). Signalé par l'advisor Supabase ; à traiter un jour
  via RLS + policies si l'app devient multi-user.
- Les phases 4 et 5 ont un contenu de lecture complet mais pas de cartes
  d'exercices structurées : à préciser aux passages de phase, selon les RDV
  J+45 et le test isocinétique (cohérent avec "une variable à la fois").

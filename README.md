# Plan de rééducation, Genou droit

App de suivi de rééducation post-opératoire (ligamentoplastie d'augmentation
LCA DT4 + ménisectomie bilatérale, 29/06/2026, Dr Palmieri). 5 phases alignées
sur le protocole officiel Palmieri, tracking quotidien des exercices (dont BFR
en %LOP), journal, mesures et courbes de progression (circonférence de cuisse,
amplitudes), critères de passage, coach IA. Mono-utilisateur, gate par mot de
passe côté front, mobile-first (usage quotidien depuis le Vietnam/Thaïlande).

Stack, Vite + React + Tailwind v4 + Supabase. Hébergement Vercel.
Les décisions du refactor post-op sont documentées dans `REFACTOR_NOTES.md`.

## Setup local

```bash
npm install
cp .env.example .env.local
# remplir VITE_APP_PASSWORD et vérifier VITE_SUPABASE_ANON_KEY
npm run dev
```

Si `VITE_APP_PASSWORD` est vide, l'app déverrouille toute seule en local.

## Variables d'environnement

```
VITE_SUPABASE_URL       URL du projet Supabase
VITE_SUPABASE_ANON_KEY  clé publique anon
VITE_APP_PASSWORD       mot de passe d'accès à l'app
```

Côté serverless (coach IA) : `OPENROUTER_API_KEY`, `APP_PASSWORD`,
`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (ou anon). À déclarer en local dans
`.env.local`, gitignored, et sur Vercel dans le projet.

## Schéma Supabase

Migrations dans `supabase/migrations/`, cumulatives, jamais destructives.

- `0001_init.sql`, tables exercise_sessions, journal_entries, measurements,
  phase_criteria, RLS désactivé.
- `0002_seed_phase2_criteria.sql`, critères pré-op (désactivés depuis).
- `0003_coach_analyses.sql`, historique du coach IA.
- `0004_postop_schema.sql`, modèle post-op : circonférences de cuisse,
  flexion active/passive, poids, colonnes BFR (`with_bfr`, `lop_percent`,
  `limb`), `phase_criteria.active`.
- `0005_postop_criteria.sql`, critères post-op phases 2→6 (la cible 6 =
  retour aux sports de pivot, test isocinétique).

Les tables sont accessibles par la clé `anon`, l'accès est protégé par le
password côté app, pas au niveau base. C'est assumé pour ce projet perso.

## Architecture

```
api/
├── coach.js                serverless Vercel, coach IA via OpenRouter
└── coach-context.js        contexte médical stable injecté au coach (server only)
src/
├── App.jsx                 routing par state, phase active + vue active
├── content/                contenu structuré, source de vérité métier
│   ├── timeline.js         SURGERY_DATE, fenêtres de phases Palmieri, échéances
│   ├── phases.js           statuts calculés depuis la timeline
│   └── phase-1..5.js       les 5 phases Palmieri, exercices + document
├── lib/
│   ├── supabase.js         client
│   ├── auth.js             password gate, localStorage
│   ├── dates.js            helpers date-fns
│   ├── chartTheme.js       couleurs recharts centralisées
│   └── api/                queries groupées par domaine
├── hooks/                  un hook par domaine, fetch + mutation
├── components/
│   ├── shell/              Masthead (J+N, échéance), Stepper 5 phases, ViewTabs
│   ├── reading/            vue Lecture + MilestoneList (échéances)
│   ├── exercices/          programme + compteur + log (dont %LOP pour le BFR)
│   ├── journal/            vue Journal
│   ├── progression/        mesures post-op + charts recharts
│   ├── criteria/           vue Critères (progression criteriée)
│   ├── coach/              coach IA, presets + question libre + modèles
│   └── ui/                 primitives partagées
└── index.css               tokens Tailwind v4 @theme + helpers
```

## Faire évoluer une phase

1. Édite `src/content/phase-X.js` : `toc`, `intro`, `sections`, `exercises`.
2. Le statut est calculé automatiquement depuis `timeline.js` (fenêtres J+N).
   `PHASE_OVERRIDE` dans `timeline.js` force une phase si le feu vert médical
   est retardé.
3. Pour chaque exercice, renseigne le bloc `tracking` (sets, reps, timer
   optionnel, target/jour). Un bloc `bfr: { lopTarget }` ajoute le badge BFR
   et la saisie %LOP + jambe au log.
4. Les critères d'entrée vivent dans `phase_criteria` (migration SQL, jamais
   de suppression : `active = false` pour retirer).

Ne jamais renommer une `key` d'exercice déjà loggée : c'est la clé de
l'historique `exercise_sessions` (ex. `amplitude` = extension passive).

## Design

Dark athlétique (direction Strava/Nike) : fond proche du noir, surfaces de
carte un cran plus claires, accent unique orange, chiffres en mono. Typo
Barlow Condensed display + IBM Plex Sans corps + IBM Plex Mono labels.
Micro-interactions Emil, scale 0.97 au press, ease-out custom, transitions
sous 250 ms. `moss` = succès, `amber` = alerte.

Responsive mobile obligatoire, le tracking se fait depuis le téléphone.

## Build et déploiement

```bash
npm run build       # produit dist/
npm run preview     # sert dist/ en local
```

Vercel build avec les défauts Vite. Le `vercel.json` route tout sur
`index.html` pour le SPA.

## Avertissement

Document personnel de travail, ne remplace pas l'avis d'un médecin.

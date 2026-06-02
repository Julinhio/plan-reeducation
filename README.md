# Plan de rééducation, Genou droit

App de suivi de rééducation, 4 phases. Lecture du protocole, tracking quotidien
des exercices, journal, courbes de progression, critères d'entrée vers la phase
suivante. Mono-utilisateur, gate par mot de passe côté front.

Stack, Vite + React + Tailwind v4 + Supabase. Hébergement Vercel.

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

À déclarer en local dans `.env.local`, gitignored, et sur Vercel dans le projet.

## Schéma Supabase

Migrations dans `supabase/migrations/`. À lancer dans le SQL editor Supabase
dans l'ordre.

- `0001_init.sql`, crée les 4 tables et désactive RLS.
- `0002_seed_phase2_criteria.sql`, seed des critères phase 1 vers phase 2.

Les 4 tables sont accessibles par la clé `anon`, l'accès est protégé par le
password côté app, pas au niveau base. C'est assumé pour ce projet perso.

## Architecture

```
src/
├── App.jsx                 routing par state, phase active + vue active
├── content/                contenu structuré par phase, source de vérité métier
│   ├── phases.js
│   ├── phase-1.js          texte complet, exercices avec hints tracking
│   ├── phase-2.js          placeholder upcoming
│   ├── phase-3.js          placeholder upcoming
│   └── phase-4.js          placeholder upcoming
├── lib/
│   ├── supabase.js         client
│   ├── auth.js             password gate, localStorage
│   ├── dates.js            helpers date-fns
│   └── api/                queries groupées par domaine
│       ├── sessions.js
│       ├── journal.js
│       ├── measurements.js
│       └── criteria.js
├── hooks/                  un hook par domaine, fetch + mutation
├── components/
│   ├── shell/              Masthead, Stepper, ViewTabs, PasswordGate, Footer
│   ├── reading/            vue Lecture, fidèle au PDF
│   ├── tracking/           vue Tracking + TimerWidget
│   ├── journal/            vue Journal
│   ├── progression/        vue Progression, charts recharts
│   ├── criteria/           vue Critères
│   └── ui/                 primitives partagées
└── index.css               tokens Tailwind v4 @theme + helpers
```

## Ajouter une phase

1. Édite `src/content/phase-X.js`.
2. Passe `meta.status` de `"upcoming"` à `"active"` et `statusLabel` à `"En cours"`.
3. Remplis `toc`, `intro`, `sections` en suivant le pattern de `phase-1.js`.
4. Pour chaque exercice, renseigne le bloc `tracking` (sets, reps, timer optionnel, target par jour) pour qu'il apparaisse dans la vue Tracking.
5. Ajoute en SQL les critères d'entrée vers la phase suivante dans `phase_criteria`.

Tout le reste, stepper, vue Lecture, Tracking, Progression, Critères, se branche automatiquement.

## Design

Direction visuelle hérité du document éditorial d'origine, papier crème, encre
profonde, accents teal, amber, moss, plum. Typo Newsreader display + IBM Plex
Sans corps + IBM Plex Mono labels. Vues applicatives plus denses, mais sur la
même palette. Micro-interactions Emil, scale 0.97 au press, ease-out custom,
transitions sous 250 ms, stagger 50 ms à l'entrée.

Responsive mobile obligatoire, le tracking se fait souvent depuis le téléphone.

## Build et déploiement

```bash
npm run build       # produit dist/
npm run preview     # sert dist/ en local
```

Vercel build avec les défauts Vite. Le `vercel.json` route tout sur
`index.html` pour le SPA.

## Avertissement

Document personnel de travail, ne remplace pas l'avis d'un médecin.

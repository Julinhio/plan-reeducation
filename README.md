# Plan de rééducation — Genou droit

Site statique d'un plan personnel de rééducation, évolutif sur 4 phases.
Aujourd'hui seule la phase 1 est rédigée ; les phases 2 à 4 sont des panneaux
« à venir » prêts à être remplis au fil de la rééducation.

Pas de framework, pas de build. HTML/CSS/JS vanilla, modules ES.

## Structure

```
.
├── index.html              # coquille, masthead, stepper, footer
├── styles.css              # tout le design system
├── app.js                  # moteur : stepper, panneaux, sub-nav scroll
├── content/
│   ├── phases.js           # registre des 4 phases
│   ├── phase-1.js          # contenu complet de la phase active
│   ├── phase-2.js          # placeholder « à venir »
│   ├── phase-3.js          # placeholder « à venir »
│   └── phase-4.js          # placeholder « à venir »
├── vercel.json             # cleanUrls + cache + headers de base
└── .gitignore
```

## Ajouter une nouvelle phase

Tout est isolé : pas besoin de toucher au HTML ni au moteur.

1. Ouvre `content/phase-2.js` (ou 3, 4).
2. Passe `meta.status` de `"upcoming"` à `"active"` et `statusLabel` à
   `"En cours"`.
3. Remplis `toc` (les ancres de la sub-nav latérale) et remplace `render()`
   par le contenu de la phase, en réutilisant les patterns de `phase-1.js` :
   - `<section class="section" id="...">` avec `section__overline`,
     `section__title`, `section__body`.
   - Tests : helper `testCard({...})`.
   - Exercices : helper `exercise({...})`.
   - Encadrés : `<aside class="callout callout--conclusion|rule|compass">`.
   - Tableau alerte : `<div class="alert-table">…</div>`.

Le stepper du haut, la couleur active, la tagline du masthead, le sub-nav et
l'indicateur au scroll se mettent à jour tout seuls.

## Déploiement Vercel

1. Lie ce dossier au repo GitHub `Julinhio/plan-reeducation` :

   ```bash
   git init
   git remote add origin https://github.com/Julinhio/plan-reeducation.git
   git add .
   git commit -m "Phase 1 : réveil neuromusculaire"
   git branch -M main
   git push -u origin main
   ```

2. Sur [vercel.com/new](https://vercel.com/new), importe le repo.
   - Framework Preset : **Other**
   - Root Directory : `.`
   - Build Command : *(vide)*
   - Output Directory : *(vide)*

   Vercel sert directement les fichiers statiques. `vercel.json` ajoute juste
   du cache et quelques headers de base.

3. Chaque push sur `main` déclenche un déploiement de prod. Les PR génèrent
   des previews automatiques.

## Développement local

Comme on utilise des modules ES, ouvrir `index.html` au file:// ne fonctionne
pas (CORS). Sers le dossier en local :

```bash
# Python 3
python -m http.server 5500

# ou Node, si installé
npx serve .
```

Puis ouvre `http://localhost:5500`.

## Design

- Direction : document médical éditorial, sérieux et calme. Papier crème,
  encre profonde, accents teal et ambre. Respiration > densité.
- Typographie : Newsreader (display), IBM Plex Sans (corps), IBM Plex Mono
  (étiquettes techniques) — chargées depuis Google Fonts.
- Motion : transitions courtes (160-320 ms), easings custom, `scale(0.985)`
  sur `:active`, `prefers-reduced-motion` respecté.
- Responsive : sub-nav latérale sur desktop, repliée en chips sur mobile ;
  stepper en 4 colonnes desktop, 2x2 sur mobile.

## Avertissement

Document personnel de travail. Ne remplace pas l'avis d'un médecin.

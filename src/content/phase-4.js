// =====================================================================
// Phase 4 — Phase IV Palmieri (J90 → 4e mois) : la montée en charge.
// Continuité de la phase III avec augmentation de la charge et de la
// proprioception. BFR bascule en outil secondaire (finisseur).
// =====================================================================

export default {
  meta: {
    id: 4,
    number: "04",
    title: "La montée en charge",
    subtitle: "Phase IV Palmieri · J90 → M4 · charge lourde progressive, proprio avancée",
    goal:
      "Augmenter la charge de travail et la proprioception, surveiller la trophicité articulaire. La charge lourde redevient possible, le BFR passe en finisseur.",
    window: { fromDay: 91, toDay: 122 },
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "cadre", label: "Cadre Palmieri" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "echeances", label: "Échéances" },
  ],

  intro: {
    tagline: "Phase 04 · Phase IV Palmieri · J90 → M4",
    title: "La montée en charge",
    goal:
      "Continuité de la phase III, charge et proprioception en hausse. Le quadriceps doit combler son retard : l'écart de circonférence op/sain guide la dose.",
  },

  // ---- Cartes d'exercices, vue Exercices ------------------------------
  exercises: [
    {
      key: "force-lourde",
      num: "01",
      title: "Force lourde : presse · squats · fentes",
      tag: "FORCE",
      stats: [
        { label: "Séries", value: "4" },
        { label: "Reps", value: "6-10" },
        { label: "Fréq.", value: "3/sem" },
      ],
      frequency: "3 séances par semaine",
      consigne:
        "La charge redevient l'outil principal. Progression hebdomadaire tant que le genou reste froid, amplitude qui s'ouvre au-delà de 90° progressivement.",
      details: [
        "Presse et squats : sortir progressivement du secteur 30-90° si aucune douleur ni réaction.",
        "Fentes avant et latérales contrôlées, sans impulsion.",
        "Ischios : curls chargés et RDL en progression, le site de prélèvement doit être asymptomatique.",
        "Surveillance de la trophicité : tout épanchement après séance = dose à revoir (consigne Palmieri).",
      ],
      tracking: {
        defaultSets: 4,
        defaultReps: 8,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-finisher",
      num: "02",
      title: "BFR en finisseur métabolique",
      tag: "BFR · SECONDAIRE",
      bfr: { lopTarget: "60-80 % LOP", position: 1 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15-20" },
        { label: "Place", value: "Fin de séance" },
      ],
      frequency: "En fin de séance force, 2-3 fois par semaine",
      consigne:
        "Le BFR n'est plus le plat principal : un finisseur léger en fin de séance pour le volume métabolique sans coût articulaire.",
      details: [
        "1-2 exos max (long-arc quad, leg press légère), 3×15-20, cuff ≤ 15 min.",
        "60-80 % LOP, l'adaptation est installée depuis la phase III.",
        "Utile aussi les jours off comme séance légère de volume.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 70,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "proprio-avancee",
      num: "03",
      title: "Proprioception avancée",
      tag: "PROPRIO",
      stats: [
        { label: "Séries", value: "4-5" },
        { label: "Durée", value: "45 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Unipodal instable avec perturbations, double tâche, amorce de plans multiples sans pivot brusque.",
      details: [
        "Surfaces instables + perturbations externes (poussées légères, lancer-rattraper).",
        "Déplacements contrôlés multi-directionnels, sans changement d'appui brutal.",
        "La pliométrie et les vrais changements d'appui restent pour la phase V.",
      ],
      tracking: {
        defaultSets: 4,
        defaultReps: null,
        defaultDuration: 45,
        timer: { kind: "hold", durationSec: 45, label: "Proprio 45 s" },
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "cardio-porte",
      num: "04",
      title: "Cardio porté : vélo · natation dans l'axe",
      tag: "CARDIO",
      stats: [
        { label: "Durée", value: "30-45 min" },
        { label: "Fréq.", value: "2-3/sem" },
      ],
      frequency: "2 à 3 fois par semaine",
      consigne:
        "Vélo route et natation dans l'axe autorisés depuis M1,5-M2 : c'est le moment d'en faire un vrai moteur cardio.",
      details: [
        "Vélo : résistance et durée progressives, sortir dès que le contrôle est total.",
        "Natation : crawl battements, pas de brasse.",
        "La course à pied attend le repère M3-M4 et un genou parfaitement calme.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 2100,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
  ],

  // ---- Document, vue Lecture ------------------------------------------
  sections: [
    {
      id: "cible",
      type: "target",
      overlineNum: "§ 01",
      overlineLabel: "La cible de la phase IV",
      title: "Combler le retard",
      target: {
        label: "Cap unique",
        quote:
          "La charge devient l'outil, la trophicité reste le juge.",
        body:
          "À J+90 le greffon tolère la charge lourde progressive : c'est elle qui construit maintenant la force finale. Objectif chiffré en vue : le test isocinétique de fin novembre exige un <strong>déficit quadriceps &lt; 10 %</strong> et un <strong>ratio IJ/Q &gt; 0.6</strong>. Tout se joue sur la régularité des séances de force et la <strong>surveillance de la trophicité</strong> (consigne Palmieri phase IV) : un genou qui gonfle est un genou qui recule.",
      },
    },

    {
      id: "cadre",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "Le cadre officiel de la phase",
      title: "Consignes Palmieri phase IV",
      lede: "Ce que le protocole DT4 prescrit pour J90 → M4.",
      callout: {
        variant: "rule",
        label: "Protocole DT4 · Phase IV",
        intro:
          "<strong>Continuité de la phase III en augmentant la charge de travail et la proprioception.</strong>",
        prompt: "<strong>Au programme :</strong>",
        bullets: [
          "Travail des différents groupes musculaires, <strong>charge croissante</strong>.",
          "Proprioception en <strong>difficulté croissante</strong>.",
          "<strong>Surveillance de la trophicité</strong> de l'articulation, cryothérapie en fin de séance si nécessaire.",
          "Repère : la <strong>course sur terrain stable</strong> arrive au 3e-4e mois, en pratique en phase V sur tapis d'abord.",
        ],
        outro:
          "Le contenu fin de cette phase sera ajusté avec les retours du RDV J+45 et l'état réel du genou : une variable à la fois, comme depuis J+1.",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 03",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole de la phase IV",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>Progresser lourd, récupérer comme un pro.</strong> Le risque de cette phase n'est plus la fragilité du greffon, c'est l'enthousiasme : le genou va bien, la tentation est de sauter des étapes. La ménisectomie externe (risque arthrose ×7) impose une discipline de charge à vie, elle commence ici.",
      },
      alertTable: {
        goLabel: "Quand passer en phase 5",
        stopLabel: "Ce qui doit alerter",
        go: [
          "Montée en charge <strong>encaissée sans réaction</strong> articulaire.",
          "<strong>Aucun épanchement récurrent</strong> après les séances lourdes.",
          "Écart de circonférence op/sain <strong>en réduction nette</strong> (cible &lt; 2 cm avant la course).",
        ],
        stop: [
          "<strong>Épanchement</strong> ou chaleur articulaire récurrents après charge.",
          "Douleur d'<strong>interligne</strong> à la charge lourde (zones de ménisectomie).",
          "Écart de circonférence qui <strong>stagne</strong> malgré la charge : revoir volume, sommeil, protéines.",
        ],
      },
      note:
        "Anticiper maintenant le centre isocinétique de fin novembre (Vinmec HCMC ? Bangkok Hospital ? retour France ?) : sans réservation, le RDV Boissinot de J+5 mois saute.",
    },

    {
      id: "echeances",
      type: "milestones",
      overlineNum: "§ 04",
      overlineLabel: "Le calendrier devant",
      title: "Échéances",
      lede:
        "La transition vers Chiang Mai (nov-déc) tombe en fin de phase : bonne offre de kinés du sport sur place, le centre isocinétique reste le point critique.",
    },
  ],
};

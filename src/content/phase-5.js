// =====================================================================
// Phase 5 — Phase V Palmieri (M4 → M6) : la ré-athlétisation.
// Course sur tapis, pliométrie et changements d'appui en milieu de
// phase, préparation du test isocinétique qui conditionne le retour
// aux sports de pivot (padel, boxe).
// =====================================================================

export default {
  meta: {
    id: 5,
    number: "05",
    title: "La ré-athlétisation",
    subtitle: "Phase V Palmieri · M4 → M6 · course, pliométrie, cap sur l'isocinétique",
    goal:
      "Réintroduire l'impact et préparer le test isocinétique : déficit quad < 10 %, ratio IJ/Q > 0.6. Le pivot attend la validation.",
    window: { fromDay: 123, toDay: null },
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "cadre", label: "Cadre Palmieri" },
    { id: "isocinetique", label: "Le test" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "echeances", label: "Échéances" },
  ],

  intro: {
    tagline: "Phase 05 · Phase V Palmieri · M4 → M6",
    title: "La ré-athlétisation",
    goal:
      "Le membre inférieur repasse en mode athlète : charge importante, course sur tapis, pliométrie en milieu de phase. Tout converge vers un seul juge de paix, le test isocinétique.",
  },

  // ---- Cartes d'exercices, vue Exercices ------------------------------
  exercises: [
    {
      key: "force-complete",
      num: "01",
      title: "Force complète du membre inférieur",
      tag: "FORCE",
      stats: [
        { label: "Séries", value: "4-5" },
        { label: "Reps", value: "5-8" },
        { label: "Fréq.", value: "3/sem" },
      ],
      frequency: "3 séances par semaine",
      consigne:
        "Progression importante de la charge (consigne Palmieri V). Squats complets, presse lourde, fentes chargées, ischios lourds.",
      details: [
        "Le déficit isocinétique se comble ici : intensité réelle, 4-5×5-8 sur les mouvements de base.",
        "Ratio IJ/Q > 0.6 : ne pas négliger les ischios (nordic curls progressifs, RDL lourds).",
        "Récupération 48 h entre séances lourdes, trophicité toujours surveillée.",
      ],
      tracking: {
        defaultSets: 4,
        defaultReps: 6,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "course-tapis",
      num: "02",
      title: "Course sur tapis",
      tag: "IMPACT",
      stats: [
        { label: "Durée", value: "15-30 min" },
        { label: "Fréq.", value: "2-3/sem" },
      ],
      frequency: "2 à 3 fois par semaine, progression graduelle",
      consigne:
        "Reprise de la course sur tapis de marche (consigne Palmieri V). Alternance marche/course au début, terrain stable uniquement.",
      details: [
        "Protocole walk-run : 1 min course / 1 min marche, allonger progressivement.",
        "Tapis dispo à HCMC. Surface stable et régulière obligatoire, pas de trail avant validation.",
        "Critère de séance réussie : zéro gonflement le lendemain matin.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 1200,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "plyo-appuis",
      num: "03",
      title: "Pliométrie et changements d'appui",
      tag: "MI-PHASE",
      stats: [
        { label: "Séries", value: "3-4" },
        { label: "Contacts", value: "20-30" },
      ],
      frequency: "2 fois par semaine, à partir du milieu de phase (~M5)",
      consigne:
        "Sauts bipodaux puis unipodaux, changements d'appui progressifs. En milieu de phase seulement, jamais avant.",
      details: [
        "Progression : sauts bipodaux sur place → boîte basse → unipodaux → latéraux → changements de direction contrôlés.",
        "Qualité de réception avant tout : genou aligné, pas de valgus, réception amortie.",
        "Volume faible (20-30 contacts), l'impact se dose comme un médicament.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 25,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "proprio-instable",
      num: "04",
      title: "Proprioception sur plan instable",
      tag: "PROPRIO",
      stats: [
        { label: "Séries", value: "4" },
        { label: "Durée", value: "45 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Trampoline et plans instables (consigne Palmieri V) : réceptions, tenues unipodales perturbées, double tâche.",
      details: [
        "Trampoline : marche, mini-rebonds, tenues unipodales après rebond.",
        "Perturbations imprévisibles (partenaire, balle) pour automatiser les réflexes.",
        "C'est la dernière ligne de défense contre la rerupture : y investir autant que dans la force.",
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
      key: "cardio-volume",
      num: "05",
      title: "Vélo et balnéo, volume",
      tag: "CARDIO",
      stats: [
        { label: "Durée", value: "45-60 min" },
        { label: "Fréq.", value: "2/sem" },
      ],
      frequency: "2 fois par semaine",
      consigne:
        "Travail plus important sur vélo et en balnéo (consigne Palmieri V) : le moteur cardio se reconstruit sans impact.",
      details: [
        "Vélo route ou home-trainer, intensité par intervalles possible.",
        "Natation dans l'axe en complément.",
        "Prépare la caisse nécessaire au padel et à la boxe sans facturer d'impact au genou.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 3000,
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
      overlineLabel: "La cible de la phase V",
      title: "Redevenir un athlète, prouver que c'est vrai",
      target: {
        label: "Cap unique",
        quote:
          "Le retour au padel ne se décrète pas, il se mesure.",
        body:
          "Tout converge vers le <strong>test isocinétique</strong> de fin novembre : <strong>déficit quadriceps &lt; 10 %</strong> vs côté sain, <strong>ratio ischios/quadriceps &gt; 0.6</strong>. Ce test conditionne l'autorisation de reprise des sports de pivot, <strong>6 mois minimum</strong> post-op selon Palmieri. La phase construit dans l'ordre : force maximale, impact (course tapis), pliométrie et changements d'appui <strong>en milieu de phase</strong>, proprioception sur plan instable.",
      },
    },

    {
      id: "cadre",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "Le cadre officiel de la phase",
      title: "Consignes Palmieri phase V",
      lede: "Ce que le protocole DT4 prescrit du 4e au 6e mois.",
      callout: {
        variant: "rule",
        label: "Protocole DT4 · Phase V",
        intro:
          "<strong>Travail musculaire de tout le membre inférieur avec progression importante de la charge.</strong>",
        prompt: "<strong>Au programme :</strong>",
        bullets: [
          "Proprioception sur <strong>plan instable</strong> (trampoline, etc.).",
          "<strong>Reprise de la course à pied sur tapis</strong> de marche.",
          "Travail plus important sur <strong>vélo et en balnéo</strong>.",
          "<strong>Pliométrie et changements d'appui en milieu de phase</strong>.",
          "Cryothérapie en fin de séance si nécessaire.",
        ],
        outro:
          "Repères officiels de reprise : natation dans l'axe et vélo route M1,5-2 (acquis), course terrain stable M3-4, <strong>sports de pivot 6 mois après contrôle chirurgien, en fonction du test isocinétique</strong>.",
      },
    },

    {
      id: "isocinetique",
      type: "callout",
      overlineNum: "§ 03",
      overlineLabel: "Le juge de paix",
      title: "Le test isocinétique",
      lede:
        "Consultation Dr Boissinot à J+5 mois (fin novembre) avec les résultats. Attention : Boissinot lit le test, il ne le pratique pas.",
      callout: {
        variant: "conclusion",
        label: "Logistique du test",
        intro:
          "<strong>Le test doit être réalisé en amont dans un centre équipé</strong>, selon la localisation à J+5 mois (probablement Chiang Mai ou HCMC) :",
        prompt: "<strong>Trois hypothèses, à trancher pendant la phase IV :</strong>",
        bullets: [
          "<strong>Vietnam</strong> : Vinmec HCMC, équipement à vérifier.",
          "<strong>Thaïlande</strong> : Bangkok Hospital ou Bumrungrad, à vérifier.",
          "<strong>France</strong> : retour ponctuel dans un centre équipé.",
        ],
        outro:
          "Cibles : déficit quadriceps &lt; 10 %, ratio IJ/Q &gt; 0.6. En dessous, le pivot attend, point. Contrôle Boissinot final à J+7 mois (fin janvier 2027) après reprise progressive.",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 04",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole de la phase V",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>L'impact se dose comme un médicament.</strong> À ce stade, le greffon est solide mais le cerveau est en avance sur les tissus : l'appréhension a disparu avant que les qualités physiques soient revenues. C'est statistiquement la période la plus dangereuse. Les chiffres du test décident, pas les sensations.",
      },
      alertTable: {
        goLabel: "Quand reprendre le pivot",
        stopLabel: "Ce qui doit alerter",
        go: [
          "<strong>Isocinétique validé</strong> : déficit &lt; 10 %, ratio IJ/Q &gt; 0.6.",
          "<strong>6 mois révolus</strong> (fin décembre 2026 au plus tôt).",
          "<strong>Feu vert Palmieri / Boissinot</strong> après lecture du test.",
          "Course, pliométrie et changements d'appui <strong>sans réaction ni appréhension</strong>.",
        ],
        stop: [
          "Gonflement ou douleur d'interligne <strong>à l'impact</strong> : la ménisectomie parle, réduire et réévaluer.",
          "<strong>Dérobement ou instabilité</strong> ressentie, même isolée : avis immédiat.",
          "Échec aux cibles isocinétiques : <strong>on prolonge, on ne négocie pas.</strong>",
        ],
      },
      note:
        "Après validation : reprise du padel et de la boxe par le geste technique sans opposition, puis intensité progressive. La proprioception et la force péri-articulaire restent un entretien à vie (ménisectomie externe, arthrose ×7).",
    },

    {
      id: "echeances",
      type: "milestones",
      overlineNum: "§ 05",
      overlineLabel: "Le calendrier devant",
      title: "Échéances",
      lede:
        "Test isocinétique fin novembre, Boissinot J+5 mois, contrôle final J+7 mois fin janvier 2027.",
    },
  ],
};

// =====================================================================
// Phase 3 — Phase III Palmieri (J45-J90) : la force sous protection.
// BFR outil principal (exos Rothman phase 2), force en chaîne fermée
// secteur 30-90°, proprioception. Exécutée à HCMC, salle avec presse.
// =====================================================================

export default {
  meta: {
    id: 3,
    number: "03",
    title: "La force",
    subtitle: "Phase III Palmieri · J45 → J90 · force progressive 30-90°, BFR outil principal",
    goal:
      "Construire la force du membre inférieur en chaîne cinétique fermée, secteur 30-90°, avec le BFR comme multiplicateur de stimulus.",
    window: { fromDay: 46, toDay: 90 },
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "cadre", label: "Cadre Palmieri" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "echeances", label: "Échéances" },
  ],

  intro: {
    tagline: "Phase 03 · Phase III Palmieri · J45 → J90",
    title: "La force",
    goal:
      "Le genou apprend à encaisser. Presse, demi-squats et stepper dans le secteur 30-90°, BFR en progression vers 60-80 % de LOP, proprioception qui devient sérieuse.",
  },

  // ---- Cartes d'exercices, vue Exercices ------------------------------
  // Séance BFR (exos Rothman phase 2, cuff continue) + bloc force + proprio.
  exercises: [
    {
      key: "bfr-long-arc-quad",
      num: "01",
      title: "Long-arc quad sous BFR",
      tag: "BFR · SÉANCE",
      bfr: { lopTarget: "50-70 % LOP", position: 1 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Repos", value: "30 s" },
      ],
      frequency: "1 séance BFR par jour, 5 j/7",
      consigne:
        "Assis, extension complète du genou contre gravité ou charge légère. L'exo quadri direct de la phase.",
      details: [
        "Assis sur une chaise ou banc, étendre le genou de 90° à 0°, tenir 1 s en haut.",
        "Charge légère à la cheville possible quand 3×15 au poids du segment devient facile.",
        "LOP en progression : 50 % → 70 % au fil des semaines, selon tolérance.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 55,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-body-squat",
      num: "02",
      title: "Body squat sous BFR",
      tag: "BFR · SÉANCE",
      bfr: { lopTarget: "50-70 % LOP", position: 2 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Secteur", value: "30-90°" },
      ],
      frequency: "Dans la séance BFR quotidienne",
      consigne:
        "Squat au poids du corps, descente contrôlée dans le secteur 30-90°, appui symétrique.",
      details: [
        "Pieds largeur d'épaules, descente 2-3 s, remontée franche.",
        "Vérifier la symétrie d'appui (miroir ou vidéo) : l'esquive du côté opéré est le défaut n°1.",
        "Profondeur limitée au secteur Palmieri : pas de squat complet avant la phase IV.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 55,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-step-ups",
      num: "03",
      title: "Step-ups sous BFR",
      tag: "BFR · SÉANCE",
      bfr: { lopTarget: "50-70 % LOP", position: 3 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Marche", value: "15-20 cm" },
      ],
      frequency: "Dans la séance BFR quotidienne",
      consigne:
        "Montée sur marche basse, jambe opérée motrice, descente contrôlée. Le pont vers les escaliers normaux.",
      details: [
        "Marche basse (15-20 cm) au début, monter la hauteur progressivement.",
        "La jambe opérée monte en premier et contrôle la descente.",
        "Genou aligné sur le 2e orteil, pas de valgus dynamique.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 55,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-rdl",
      num: "04",
      title: "RDL sous BFR",
      tag: "BFR · SÉANCE",
      bfr: { lopTarget: "50-70 % LOP", position: 4 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Charge", value: "Légère" },
      ],
      frequency: "Dans la séance BFR quotidienne",
      consigne:
        "Romanian deadlift charge légère, hanches dominantes. Ischios et fessiers, vigilance site de prélèvement.",
      details: [
        "Charge légère (haltères ou bouteilles au début), dos neutre, genoux quasi tendus.",
        "Toute douleur face interne du genou ou de la cuisse (site DT4) → réduire amplitude ou charge.",
        "Progression douce imposée par Palmieri sur les ischios en chaîne fermée.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 55,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-heel-taps",
      num: "05",
      title: "Heel taps latéraux sous BFR",
      tag: "BFR · SÉANCE",
      bfr: { lopTarget: "50-70 % LOP", position: 5 },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Côté", value: "Opéré" },
      ],
      frequency: "Dans la séance BFR quotidienne",
      consigne:
        "Sur marche basse, appui unipodal côté opéré, l'autre talon tape le sol sur le côté. Contrôle excentrique + frontal.",
      details: [
        "Debout sur la marche côté opéré, descendre l'autre talon latéralement jusqu'au contact léger, remonter.",
        "Le genou d'appui reste aligné, le bassin horizontal.",
        "C'est l'exo qui prépare le contrôle du plan frontal, prérequis des phases IV-V.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 55,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "force-ckc",
      num: "06",
      title: "Bloc force : presse · demi-squats · stepper",
      tag: "FORCE 30-90°",
      stats: [
        { label: "Séries", value: "3-4" },
        { label: "Reps", value: "8-12" },
        { label: "Secteur", value: "30-90°" },
      ],
      frequency: "3 séances par semaine, jours sans BFR ou après la séance BFR",
      consigne:
        "Le travail de force officiel Palmieri phase III : presse entre 30° et 90°, demi-squats, stepper. Progression de charge hebdomadaire si zéro réaction.",
      details: [
        "Presse : secteur 30-90° strict, charge progressive, 3-4×8-12.",
        "Demi-squats et stepper en complément ou en substitution selon l'équipement du jour.",
        "Travail isométrique en augmentant le temps de contraction (consigne protocole).",
        "Un seul paramètre progresse par semaine : charge OU volume OU amplitude.",
      ],
      tracking: {
        defaultSets: 4,
        defaultReps: 10,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "proprio-neuro",
      num: "07",
      title: "Proprioception et contrôle neuromusculaire",
      tag: "PROPRIO",
      stats: [
        { label: "Séries", value: "4" },
        { label: "Durée", value: "30-45 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Appui unipodal côté opéré, surfaces progressivement instables, yeux ouverts puis fermés. Toujours dans l'axe.",
      details: [
        "Progression : sol dur → coussin → yeux fermés → double tâche (lancer de balle).",
        "Pas de rotation, pas de saut : le pivot reste interdit.",
        "L'augmentation (stump natif préservé) donne un avantage proprioceptif réel : ce travail rapporte double.",
      ],
      tracking: {
        defaultSets: 4,
        defaultReps: null,
        defaultDuration: 40,
        timer: { kind: "hold", durationSec: 40, label: "Proprio 40 s" },
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "balneo",
      num: "08",
      title: "Balnéothérapie / piscine",
      tag: "RÉCUP ACTIVE",
      stats: [{ label: "Durée", value: "20-30 min" }],
      frequency: "2 à 3 fois par semaine (piscine dispo à HCMC)",
      consigne:
        "Marche en eau profonde, battements dans l'axe, mobilité. La natation dans l'axe est autorisée à partir de M1,5-M2.",
      details: [
        "Marche en immersion poitrine : décharge articulaire, schéma de marche parfait.",
        "Battements jambes tendues autorisés, pas de brasse (contrainte rotatoire).",
        "Cicatrisation acquise obligatoire avant la piscine.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 1500,
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
      overlineLabel: "La cible de la phase III",
      title: "Le genou apprend à encaisser",
      target: {
        label: "Cap unique",
        quote:
          "De la force réelle, dans un secteur protégé, sans réveiller l'articulation.",
        body:
          "C'est le cœur de la fenêtre BFR (semaines 3 à 16) et le moment où la force se construit vraiment : <strong>presse, demi-squats, stepper entre 30° et 90°</strong>, isométrie longue, ischios en chaîne fermée avec <strong>prudence sur le site de prélèvement DT4</strong>. Le BFR passe sur les exos Rothman phase 2 et monte vers <strong>60-80 % de LOP</strong>. La proprioception devient un vrai chantier : unipodal, surfaces instables, toujours dans l'axe.",
      },
    },

    {
      id: "cadre",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "Le cadre officiel de la phase",
      title: "Consignes Palmieri phase III",
      lede: "Ce que le protocole DT4 prescrit pour J45 → J90.",
      callout: {
        variant: "rule",
        label: "Protocole DT4 · Phase III",
        intro:
          "<strong>Travail progressif de la force musculaire</strong>, lutte contre les troubles circulatoires et inflammatoires toujours en toile de fond.",
        prompt: "<strong>Au programme :</strong>",
        bullets: [
          "<strong>Stepper, demi-squats, presse entre 30° et 90°</strong> de flexion.",
          "Travail <strong>isométrique</strong> en augmentant le temps de contraction.",
          "Proprioception et <strong>contrôle neuromusculaire</strong> en développement.",
          "Ischio-jambiers en chaîne fermée, <strong>progression douce</strong> (site de prélèvement).",
          "<strong>Balnéothérapie</strong>, cryothérapie en fin de séance.",
          "Repère de reprise : <strong>natation dans l'axe et vélo route à M1,5-M2</strong>.",
        ],
        outro:
          "Logistique HCMC : salle avec presse et machines identifiée, kiné local pour une séance de contrôle mensuelle. Palmieri en congés fin août : le père (kiné) est le référent technique par défaut sur cette période.",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 03",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole de la phase III",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>La charge progresse, le secteur ne bouge pas.</strong> 30-90° n'est pas une suggestion : c'est la protection du greffon et des zones de ménisectomie. Le gonflement du lendemain reste l'arbitre unique. Un genou qui gonfle après une séance a reçu la mauvaise dose, pas la mauvaise volonté.",
      },
      alertTable: {
        goLabel: "Quand passer en phase 4",
        stopLabel: "Ce qui doit alerter",
        go: [
          "<strong>Amplitudes complètes et symétriques</strong>, sans douleur en butée.",
          "Charge phase III <strong>encaissée sans réaction</strong> (presse, squats, stepper).",
          "<strong>Appui unipodal stable</strong> côté opéré, yeux ouverts et fermés.",
          "Ischios <strong>sans douleur</strong> au site de prélèvement.",
        ],
        stop: [
          "<strong>Épanchement récurrent</strong> après les séances de force : dose à revoir.",
          "Douleur <strong>face interne</strong> persistante (site DT4) sur les exos ischios.",
          "Perte d'amplitude qui <strong>s'installe</strong> : signal de sur-sollicitation.",
          "Douleur en <strong>interligne</strong> (zones de ménisectomie) sur la charge : réduire secteur et charge, avis si persistant.",
        ],
      },
      note:
        "L'écart de circonférence de cuisse op/sain est LA mesure de cette phase : hebdomadaire, même repère (10 cm au-dessus de la rotule), même heure. C'est elle qui dira si le BFR fait son travail.",
    },

    {
      id: "echeances",
      type: "milestones",
      overlineNum: "§ 04",
      overlineLabel: "Le calendrier devant",
      title: "Échéances",
      lede:
        "Pendant cette phase, anticiper la logistique du test isocinétique de fin novembre : identifier le centre (Vinmec HCMC, Bangkok Hospital / Bumrungrad, ou retour France).",
    },
  ],
};

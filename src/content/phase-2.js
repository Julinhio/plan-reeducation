// =====================================================================
// Phase 2 — Phase II Palmieri (J22-J45) : mobilité active + BFR.
// Démarrage du protocole BFR Rothman phase 1 sous réserve du feu vert
// Palmieri du 15/07. Exécution en autonomie à HCMC (cuffs SAGA 2.0,
// LOP auto-calibrée), suivi à distance par le père (kiné).
// =====================================================================

export default {
  meta: {
    id: 2,
    number: "02",
    title: "Mobilité et BFR",
    subtitle: "Phase II Palmieri · J22 → J45 · mobilité active, co-contraction, démarrage BFR",
    goal:
      "Récupérer la mobilité en actif sans forcer, acquérir le contrôle musculaire, et lancer le BFR contre l'atrophie du quadriceps.",
    window: { fromDay: 22, toDay: 45 },
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "bfr", label: "Le BFR" },
    { id: "seance-bfr", label: "Séance BFR" },
    { id: "cadre", label: "Cadre Palmieri" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "echeances", label: "Échéances" },
  ],

  intro: {
    tagline: "Phase 02 · Phase II Palmieri · J22 → J45",
    title: "Mobilité et BFR",
    goal:
      "L'atrophie du quadriceps est le déterminant n°1 du risque de rerupture. Cette phase ouvre la fenêtre BFR : des gains de force à charge légère, pendant que le greffon interdit la charge lourde.",
  },

  // ---- Cartes d'exercices, vue Exercices ------------------------------
  // Renforcement (01-09), mobilité (10), contrôle et proprio (11-12). Le
  // BFR n'est plus imposé par l'exo : c'est une option cochable à chaque
  // session (case « Sous BFR » + % LOP). Les exos qui portent un bloc
  // `bfr` affichent un badge « BFR conseillé » et pré-remplissent la LOP ;
  // ils correspondent à la séance Rothman type (5 exos enchaînés, cuff
  // gonflée en continu, 3×15, 30 s de repos, plafond dur 30 min de cuff),
  // décrite dans l'onglet Lecture.
  exercises: [
    {
      key: "bfr-slr",
      num: "01",
      title: "SLR",
      tag: "RENFORCEMENT",
      bfr: { lopTarget: "40-50 % LOP" },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Repos", value: "30 s" },
      ],
      frequency: "1 fois par jour, 5-6 j/7 selon tolérance",
      consigne:
        "Jambe tendue, quad verrouillé, montée lente, descente encore plus lente. Le réveil quadricipital de base. Conseillé sous BFR (40-50 % de LOP) pour maximiser le stimulus à charge nulle.",
      details: [
        "Même geste que le SLR de phase I : quad verrouillé, montée lente, descente plus lente.",
        "Sous BFR : la LOP se recalibre à chaque séance (elle varie avec la tension, la position, l'heure).",
        "La sensation de congestion est normale ; une douleur inhabituelle ou des fourmillements ne le sont pas → dégonfler.",
        "Progression vers 60-80 % de LOP sur plusieurs semaines, une fois l'adaptation installée.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 45,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-slr-lateral",
      num: "02",
      title: "SLR latéral",
      tag: "RENFORCEMENT",
      bfr: { lopTarget: "40-50 % LOP" },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Repos", value: "30 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Sur le côté, jambe opérée au-dessus, montée latérale jambe tendue. Cible moyen fessier + stabilité de hanche.",
      details: [
        "Allongé sur le côté sain, corps aligné, jambe opérée tendue.",
        "Monter à ~45°, sans bascule du bassin vers l'arrière.",
        "La hanche stabilise le genou : c'est de la protection articulaire, pas de l'accessoire.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 45,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-tke",
      num: "03",
      title: "Terminal knee extension (TKE)",
      tag: "RENFORCEMENT",
      bfr: { lopTarget: "40-50 % LOP" },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Repos", value: "30 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Élastique derrière le genou, verrouille les derniers degrés d'extension debout. L'exo VMO par excellence.",
      details: [
        "Élastique ancré devant, passé derrière le creux du genou opéré.",
        "Départ genou légèrement fléchi (~20-30°), tendre à fond contre la résistance, tenir 1-2 s.",
        "Petite amplitude, exécution parfaite : c'est le verrouillage actif qu'on automatise.",
        "Reste dans le secteur 0-90° : ici on travaille 0-30°, aucun conflit avec la contrainte.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 45,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-ham-curl",
      num: "04",
      title: "Curl ischios léger",
      tag: "RENFORCEMENT",
      bfr: { lopTarget: "40-50 % LOP" },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Repos", value: "30 s" },
      ],
      frequency: "1 fois par jour",
      consigne:
        "Debout ou à plat ventre, flexion du genou sans charge ou charge très légère. Vigilance site de prélèvement DT4.",
      details: [
        "Le greffon vient des ischio-jambiers : toute douleur sur la face interne de la cuisse ou du genou → réduire l'amplitude ou passer l'exo.",
        "Flexion max 90° (secteur protégé).",
        "Charge très légère voire nulle : sous BFR, le stimulus vient de l'occlusion, pas de la charge.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 45,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "bfr-leg-press",
      num: "05",
      title: "Leg press légère",
      tag: "RENFORCEMENT",
      bfr: { lopTarget: "40-50 % LOP" },
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "15" },
        { label: "Charge", value: "20-30 %" },
      ],
      frequency: "1 fois par jour, si presse accessible",
      consigne:
        "20-30 % du 1RM estimé, secteur 0-90°. Sans presse : mini-squats bipodaux assistés en substitution.",
      details: [
        "Poussée bipodale, amplitude strictement 0-90°, contrôle total.",
        "À HCMC : presse à identifier en salle. En attendant, mini-squats bipodaux appuyé au mur.",
        "Sous BFR, à 20-30 % du 1RM le stimulus égale 70-80 % : ne pas charger plus.",
        "Dernier exo de la séance BFR type, cuff toujours gonflée si tu enchaînes les 5.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 15,
        defaultDuration: null,
        defaultLop: 45,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "spanish-squat",
      num: "06",
      title: "Spanish squat",
      tag: "RENFORCEMENT",
      stats: [
        { label: "Séries", value: "5" },
        { label: "Hold", value: "30 s" },
      ],
      frequency: "1 fois par jour, en isométrie",
      consigne:
        "Bande à hauteur de genou sur un point fixe, boucle derrière les deux genoux, recule pour la mettre en tension. Descends comme sur une chaise, tibias verticaux, entre 30 et 60° de flexion, et tiens. La bande tire les genoux vers l'arrière : le greffon est déchargé, tout part dans le quadriceps.",
      details: [
        "L'exo standard de la rééduc LCA : tension maximale sur le quad, contrainte minimale sur le greffon.",
        "Tibias strictement verticaux, le poids passe dans les talons, le genou ne dépasse pas la pointe du pied.",
        "Isométrique pur : 5 × 30 s de maintien pour démarrer, repos entre chaque série.",
        "Reste dans le secteur 30-60°, jamais de descente profonde à ce stade.",
      ],
      tracking: {
        defaultSets: 5,
        defaultReps: null,
        defaultDuration: 30,
        timer: { kind: "hold", durationSec: 30, label: "Spanish squat 30 s" },
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "wall-sit",
      num: "07",
      title: "Wall sit",
      tag: "RENFORCEMENT",
      stats: [
        { label: "Séries", value: "5" },
        { label: "Hold", value: "30 s" },
      ],
      frequency: "1 fois par jour, en isométrie",
      consigne:
        "Dos au mur, descends jusqu'à 45-60° de flexion maximum et tiens. Même logique que le Spanish squat, en plus simple. Bilatéral au début, avec report progressif du poids sur la jambe opérée.",
      details: [
        "Dos plaqué au mur, pieds avancés pour que les tibias restent verticaux.",
        "Ne pas descendre sous 60° de flexion : on reste dans un secteur confortable pour le greffon.",
        "Au début le poids est réparti sur les deux jambes ; transférer progressivement vers la jambe opérée à mesure que la confiance revient.",
        "Isométrique : 5 × 30 s pour commencer, allonger le maintien quand c'est facile.",
      ],
      tracking: {
        defaultSets: 5,
        defaultReps: null,
        defaultDuration: 30,
        timer: { kind: "hold", durationSec: 30, label: "Wall sit 30 s" },
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "step-up",
      num: "08",
      title: "Step-ups",
      tag: "RENFORCEMENT",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "10" },
      ],
      frequency: "1 fois par jour, en charge réelle",
      consigne:
        "Marche basse type 15 cm, montée sur la jambe opérée, descente lente et contrôlée. Le prolongement terre de ce que tu fais sur la marche de la piscine.",
      details: [
        "Unilatéral : c'est la jambe opérée qui fait tout le travail, pas d'élan de l'autre jambe.",
        "Descente lente (excentrique) : c'est là que se gagne le contrôle du quadriceps.",
        "Marche basse (~15 cm) au départ, monter la hauteur seulement quand le contrôle est parfait et sans douleur.",
        "Aucune bascule ni valgus : le genou reste aligné au-dessus du pied à la montée comme à la descente.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 10,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "pont-fessier",
      num: "09",
      title: "Ponts fessiers",
      tag: "RENFORCEMENT",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "12" },
      ],
      frequency: "1 fois par jour, sans charge au début",
      consigne:
        "Allongé sur le dos, pieds au sol, monte le bassin en serrant les fessiers. Ça bosse les fessiers et les ischios. À introduire doucement vu le site de prélèvement DT4, sans charge au début.",
      details: [
        "Le greffon vient des ischio-jambiers (DT4) : toute tension ou douleur sur la face interne de la cuisse ou l'arrière du genou → réduire l'amplitude ou passer l'exo.",
        "Montée par les fessiers, pas par les lombaires : le bassin monte, le dos reste neutre.",
        "Sans charge au début. Progression vers l'appui unilatéral plus tard, pas maintenant.",
        "Mouvement lent, courte pause en haut, descente maîtrisée.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 12,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "velo",
      num: "10",
      title: "Vélo",
      tag: "MOBILITÉ",
      stats: [
        { label: "Durée", value: "10-20 min" },
        { label: "Résistance", value: "Légère" },
      ],
      frequency: "1 fois par jour dès que l'amplitude le permet",
      consigne:
        "Dès que la flexion permet un tour de pédale complet, selle haute, résistance légère. Le meilleur lubrifiant articulaire de la phase.",
      details: [
        "Commencer par des demi-tours de pédale (avant-arrière) si le tour complet ne passe pas.",
        "Selle haute pour réduire la flexion requise, descendre progressivement.",
        "Cadence fluide, zéro résistance au début. C'est de la mobilité, pas du cardio.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 900,
        timer: { kind: "hold", durationSec: 900, label: "Vélo 15 min" },
        targetSessionsPerDay: 1,
        unit: "session",
      },
    },
    {
      key: "co-contraction",
      num: "11",
      title: "Co-contraction quad / ischios",
      tag: "CONTRÔLE",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "10" },
        { label: "Hold", value: "5 s" },
      ],
      frequency: "2 fois par jour",
      consigne:
        "Contracte quadriceps et ischios en même temps, genou en légère flexion. Le gainage actif du genou.",
      details: [
        "Assis, talon au sol, genou fléchi ~20-30°.",
        "Presser le talon dans le sol (ischios) tout en verrouillant le quad, tenir 5 s.",
        "C'est la base du contrôle articulaire demandé par Palmieri en phase II.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 10,
        defaultDuration: null,
        timer: { kind: "hold", durationSec: 5, label: "Co-contraction 5 s" },
        targetSessionsPerDay: 2,
        unit: "session",
      },
    },
    {
      key: "proprio-axe",
      num: "12",
      title: "Proprioception dans l'axe",
      tag: "PROPRIO · FIN DE PHASE",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Durée", value: "30 s" },
      ],
      frequency: "1 fois par jour, à partir de la fin du 1er mois",
      consigne:
        "Transferts d'appui puis appui bipodal instable, strictement dans l'axe. Aucune rotation, aucun pivot.",
      details: [
        "À introduire fin du 1er mois seulement, si l'état du genou le permet (consigne Palmieri).",
        "Départ : transferts d'appui debout, puis appui bipodal sur surface souple.",
        "L'augmentation a préservé des mécanorécepteurs du LCA natif : le travail proprioceptif rapporte plus que la moyenne, autant capitaliser.",
        "Progression uniquement dans le plan sagittal. Le pivot, c'est dans 5 mois.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: null,
        defaultDuration: 30,
        timer: { kind: "hold", durationSec: 30, label: "Proprio 30 s" },
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
      overlineLabel: "La cible de la phase II",
      title: "Gagner la guerre de l'atrophie",
      target: {
        label: "Cap unique",
        quote:
          "Chaque semaine sans stimulus musculaire est une semaine offerte à l'atrophie.",
        body:
          "L'atrophie du quadriceps est <strong>le déterminant principal du risque de rerupture</strong> et de la qualité du retour au sport. Or la charge lourde est interdite : greffon en ligamentisation, ménisectomie bilatérale. Le <strong>BFR</strong> résout exactement ce dilemme, des gains de force et d'hypertrophie comparables à 70-80 % du 1RM, avec une charge de 20-30 %. En parallèle : mobilité active <strong>sans passage en force</strong>, co-contraction, rééducation de la marche, vélo dès que possible, proprio dans l'axe en fin de phase.",
      },
    },

    {
      id: "bfr",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "L'outil principal de la rééducation musculaire",
      title: "Le BFR, comment ça marche",
      lede:
        "Blood Flow Restriction : une cuff pneumatique proximale limite le retour veineux en préservant partiellement le flux artériel. Combinée à une charge légère, elle recrée le stress métabolique d'une charge lourde. Littérature : protocole Rothman post-ACL, méta-analyses Hughes, Iversen, Ohta.",
      callout: {
        variant: "rule",
        label: "La LOP, le concept qui change tout",
        intro:
          "<strong>Le BFR se pratique en % de LOP</strong> (Limb Occlusion Pressure, la pression qui coupe complètement le flux artériel du membre), <strong>jamais en pression absolue</strong>. Une valeur en mmHg ne veut rien dire : la LOP varie selon l'individu, la circonférence de cuisse, la tension, la position, l'heure.",
        prompt: "<strong>Paramètres de travail :</strong>",
        bullets: [
          "<strong>40-50 % de LOP</strong> en début de reprise, progression vers <strong>60-80 %</strong> une fois l'adaptation installée.",
          "Cuffs <strong>SAGA BFR 2.0</strong> : auto-calibration de la LOP via l'app Bluetooth à chaque séance, indispensable en solo au Vietnam.",
          "Format Rothman : <strong>5 exos enchaînés, cuff gonflée en continu, 3×15, 30 s de repos</strong>.",
          "<strong>Plafond dur : 30 minutes de cuff</strong>, jamais plus.",
          "Plan B si Palmieri refuse le côté opéré : BFR <strong>jambe saine uniquement</strong>, pour prévenir l'asymétrie de force classique en rééduc unilatérale.",
        ],
        outro:
          "Arrêt immédiat et dégonflage si douleur inhabituelle ou paresthésies sous la cuff, vérification de la LOP à la séance suivante. Signes de phlébite (jambe douloureuse, gonflée, chaude) : arrêt et consultation, la période post-op reste à risque même si la littérature ne montre pas de sur-risque DVT lié au BFR lui-même.",
      },
    },

    {
      id: "seance-bfr",
      type: "callout",
      overlineNum: "§ 03",
      overlineLabel: "Le déroulé opérationnel",
      title: "La séance BFR type",
      lede:
        "Une séance par jour, 5-6 jours sur 7 selon tolérance. Les exos 01 à 05 de l'onglet Exercices, dans l'ordre, cuff gonflée du premier au dernier.",
      callout: {
        variant: "compass",
        label: "Checklist de séance",
        intro:
          "<strong>Chaque séance suit le même rituel.</strong> La régularité du protocole fait la qualité du stimulus :",
        prompt: "<strong>Dans l'ordre :</strong>",
        bullets: [
          "Calibrer la LOP du jour via l'app SAGA (jamais réutiliser celle d'hier).",
          "Gonfler à 40-50 % LOP, lancer le chrono de cuff (plafond 30 min).",
          "Enchaîner : SLR → SLR latéral → TKE → curl ischios → leg press. 3×15, 30 s de repos.",
          "Dégonfler, puis logger chaque exo avec le % LOP du jour.",
          "Cryothérapie en fin de séance, comme toujours.",
        ],
        outro:
          "Sensation attendue : congestion et brûlure musculaire montante, c'est le mécanisme. Douleur articulaire, fourmillements, engourdissement : ce n'est pas le mécanisme, on dégonfle.",
      },
    },

    {
      id: "cadre",
      type: "callout",
      overlineNum: "§ 04",
      overlineLabel: "Le cadre officiel de la phase",
      title: "Consignes Palmieri phase II",
      lede: "Ce que le protocole DT4 prescrit pour J22 → J45, en parallèle du BFR.",
      callout: {
        variant: "rule",
        label: "Protocole DT4 · Phase II",
        intro:
          "<strong>Récupération de la mobilité en travail actif, sans limitation mais sans passage en force.</strong>",
        prompt: "<strong>Au programme :</strong>",
        bullets: [
          "Massages circulatoires, physiothérapie, cryothérapie en début et fin de séance si nécessaire.",
          "Acquisition d'un bon contrôle musculaire, travail progressif en <strong>co-contraction</strong>.",
          "<strong>Rééducation de la marche</strong>, schéma propre avant volume.",
          "<strong>Vélo</strong> dès que les amplitudes le permettent.",
          "Fin du 1er mois : <strong>proprioception uniquement dans l'axe</strong>, progressive, si l'état du genou le permet.",
          "Fin de phase : <strong>balnéothérapie</strong> si la cicatrisation est acquise (piscine dispo à HCMC).",
        ],
        outro:
          "Suivi hebdo minimum en visio avec le père (kiné) : trajectoire, ajustement des exercices, validation des critères. Le volet BFR reste piloté par le protocole Rothman + validation Palmieri, le père ne connaît pas l'outil.",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 05",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole de la phase II",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>Actif sans forcer, criterié, une variable à la fois.</strong> La mobilité se gagne en fréquence, pas en intensité. Le BFR fait le travail de force à charge légère : toute tentation de charger « un peu plus » est un risque pris sur le greffon pour un gain que le BFR fournit déjà.",
      },
      alertTable: {
        goLabel: "Quand passer en phase 3",
        stopLabel: "Ce qui doit alerter",
        go: [
          "<strong>Feu vert Palmieri au RDV J+45</strong> (12/08, présentiel ou visio).",
          "<strong>Flexion ≥ 120°</strong>, extension complète conservée.",
          "Marche <strong>normalisée</strong>, y compris en fin de journée.",
          "<strong>Vélo sans douleur</strong> ni réaction le lendemain.",
          "Protocole <strong>BFR maîtrisé</strong> : LOP calibrée, séance complète tolérée.",
        ],
        stop: [
          "<strong>Signes de phlébite</strong>, vigilance maximale autour du vol long-courrier vers HCMC.",
          "Perte d'amplitude ou <strong>raideur qui s'installe</strong> plusieurs jours de suite.",
          "<strong>Gonflement récurrent</strong> après les séances : volume trop haut, on redescend.",
          "Douleur ou paresthésies <strong>sous la cuff</strong> : LOP à revérifier, séance écourtée.",
        ],
      },
      note:
        "Logistique de phase : acheter les cuffs SAGA avant le départ (Sport-Protech, ~349 €), emporter genouillère cryo + mètre-ruban, identifier un kiné du sport anglophone à HCMC (pistes : Family Medical Practice, Vinmec) et une salle avec presse pour la phase III.",
    },

    {
      id: "echeances",
      type: "milestones",
      overlineNum: "§ 06",
      overlineLabel: "Le calendrier devant",
      title: "Échéances",
      lede:
        "Le RDV J+45 du 12/08 clôt cette phase. Palmieri part en congés fin août : toute question technique passera ensuite par le père ou un professionnel sur place.",
    },
  ],
};

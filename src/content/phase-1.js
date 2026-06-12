// =====================================================================
// Phase 1, Le réveil.
// - phase.exercises : data structurée des cartes, consommée par la vue
//   Exercices (programme + compteur + log). Chaque exo garde sa `key`
//   et son bloc `tracking` (cible/jour, défauts de saisie, timer).
// - phase.sections : le document de la vue Lecture (cible, anti-assise,
//   cadrage, règle d'or). Les exercices ne polluent plus cette liste.
// =====================================================================

export default {
  meta: {
    id: 1,
    number: "01",
    title: "Le réveil",
    subtitle: "Réveil neuromusculaire et récupération de l'extension",
    statusLabel: "En cours",
    status: "active",
    goal:
      "Récupérer l'extension active complète et rallumer le VMO. Zéro charge, zéro risque.",
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "anti-assise", label: "Anti-assise" },
    { id: "cadrage", label: "Cadrage" },
    { id: "regle-or", label: "Règle d'or" },
  ],

  intro: {
    tagline: "Phase 01 · En cours",
    title: "Le réveil",
    goal:
      "Réveil neuromusculaire et récupération de l'extension. Zéro charge, zéro risque.",
  },

  // ---- Cartes d'exercices, vue Exercices ------------------------------
  exercises: [
    {
      key: "quad-set",
      num: "01",
      title: "Quad set",
      tag: "ACTIVATION",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "10" },
        { label: "Hold", value: "5 s" },
      ],
      frequency: "3 à 5 fois par jour",
      consigne:
        "Presse l'arrière du genou dans la serviette. Cherche à sentir le VMO durcir.",
      details: [
        "Assis ou allongé, jambe tendue, boudin de serviette sous le genou.",
        "Effort doux, 50 à 60 %. Jamais à fond.",
        "Reste dans ton amplitude confortable. Ne force pas sur la butée.",
        "Astuce, commence par la jambe saine, mémorise la sensation, reproduis côté blessé.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 10,
        defaultDuration: null,
        timer: { kind: "hold", durationSec: 5, label: "Hold quad set 5 s" },
        targetSessionsPerDay: 4,
        unit: "session",
      },
    },
    {
      key: "slr",
      num: "02",
      title: "Straight leg raise",
      tag: "VERROUILLAGE",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "10" },
        { label: "Hold", value: "2 s" },
      ],
      frequency: "2 fois par jour",
      consigne: "Verrouille le quad avant de lever. Le genou ne plie jamais.",
      details: [
        "Sur le dos, jambe saine pliée, jambe blessée tendue.",
        "Quad set d'abord, genou verrouillé, avant de décoller.",
        "Lève de 20 à 30 cm, lent. Tiens 2 s. Descends encore plus lentement.",
        "Si le genou plie ou si ça fait mal, retour au quad set seul quelques jours.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 10,
        defaultDuration: null,
        timer: { kind: "hold", durationSec: 2, label: "Hold haut SLR 2 s" },
        targetSessionsPerDay: 2,
        unit: "session",
      },
    },
    {
      // Clé "amplitude" conservée : préserve l'historique de tracking
      // déjà loggé sous cette clé (l'ancienne carte amplitude devient
      // l'extension passive).
      key: "amplitude",
      num: "03",
      title: "Extension passive",
      tag: "AMPLITUDE",
      stats: [{ label: "Durée", value: "2–3 min" }],
      frequency: "2 à 3 fois par jour",
      consigne:
        "Talon surélevé, genou dans le vide. Laisse la gravité étirer, ne pousse pas.",
      details: [
        "Talon posé sur un support, genou dans le vide.",
        "2 à 3 min, détendu, passif.",
        "Si ça tire fort, baisse la hauteur du support.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 150,
        timer: { kind: "hold", durationSec: 150, label: "Extension passive" },
        targetSessionsPerDay: 3,
        unit: "session",
      },
    },
    {
      key: "flexion-talon",
      num: "04",
      title: "Flexion glissé de talon",
      tag: "AMPLITUDE",
      stats: [
        { label: "Reps", value: "10" },
        { label: "Hold", value: "5 s" },
      ],
      frequency: "2 fois par jour",
      consigne:
        "Glisse le talon vers les fesses jusqu'à ce que ça tire juste, sans douleur.",
      details: [
        "Allongé, serviette sous le talon pour glisser.",
        "Va jusqu'au point où ça commence juste à tirer, jamais dans la douleur.",
        "Tiens 5 s, reviens. Lent et contrôlé.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: 10,
        defaultDuration: null,
        timer: { kind: "hold", durationSec: 5, label: "Hold flexion 5 s" },
        targetSessionsPerDay: 2,
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
      overlineLabel: "La cible n°1 de la phase 1",
      title: "Une seule chose à la fois",
      target: {
        label: "Cap unique",
        quote:
          "Tant que le quad ne se rallume pas, on ne charge rien par-dessus.",
        body:
          "Tant que le quad et surtout le <strong>VMO</strong> ne se rallume pas et que l'extension active complète n'est pas récupérée, charger reviendrait à construire sur du sable. Toute la phase 1 sert ça, et rien d'autre. Pas de force, pas de volume, pas de sueur, <strong>du travail neuromusculaire de précision, la qualité prime sur tout.</strong>",
      },
    },

    {
      id: "anti-assise",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "L'autre levier de la phase 1",
      title: "La règle anti-assise",
      lede:
        "Aussi importante que les exercices, et hors du programme du jour, parce qu'elle se joue toute la journée.",
      callout: {
        variant: "rule",
        label: "Règle anti-assise",
        intro:
          "<strong>Aussi importante que les exercices.</strong> La position assise prolongée, genou plié, entretient l'inhibition du quad et la raideur. C'est l'ennemi n°1 vu le mode de vie au bureau.",
        prompt:
          "<strong>Toutes les 30 à 45 min, casse la position assise,</strong>",
        bullets: [
          "10 quad sets debout, 30 secondes, jambe tendue, ou",
          "quelques pas dans l'appart et un verre d'eau, ou",
          "2-3 fois par jour, descendre au parc pour <strong>5 à 10 min de marche active</strong>, excellent rééducateur à ce stade.",
        ],
        outro:
          "Le plus dur, c'est de ne pas oublier, accrocher ce réflexe à un déclencheur existant, fin de tâche, café, ou une alarme.",
      },
    },

    {
      id: "cadrage",
      type: "tests",
      overlineNum: "§ 03",
      overlineLabel: "D'où on part",
      title: "Le raisonnement de cette session",
      lede:
        "Avant de poser le moindre exercice, j'ai posé une série de questions ciblées. Voici lesquelles, et surtout <strong>pourquoi</strong>, parce que c'est ce raisonnement qui justifie le plan.",
      tests: [
        {
          label: "Test 01",
          title: "Verrouillage en extension allongé",
          goal:
            "Distinguer un <strong>vrai blocage mécanique</strong>, fragment méniscal qui coince, d'une simple <strong>raideur ou inhibition</strong>.",
          result:
            "Extension quasi complète au repos, mais il manque <strong>2 à 3 degrés</strong> par rapport à la jambe saine, avec une petite douleur en fin de course et une appréhension.",
          reading:
            'Compatible avec une <em class="med">inhibition</em>, pas un blocage franc.',
        },
        {
          label: "Test 02",
          title: "Qualité de la contraction du quadriceps",
          goal: "Vérifier si le muscle <strong>répond</strong>.",
          result:
            "Contraction molle, faible, surtout sur la partie interne, le <strong>vaste médial oblique, le VMO</strong>, alors que c'était un point fort avant.",
          reading:
            'Signature d\'un <em class="med">quad inhibé</em>. Le muscle n\'a pas fondu seulement par manque d\'usage, il est neurologiquement freiné par l\'articulation, entretenu par le petit épanchement vu à l\'IRM. Le VMO est toujours le premier à s\'éteindre et le dernier à revenir.',
        },
        {
          label: "Test 03",
          title: "Gonflement réactionnel le lendemain",
          goal:
            "Mesurer le niveau d'irritation de l'articulation. Le gonflement est le vrai thermomètre, bien plus que la douleur sur le moment.",
          result:
            "Pas de gonflement le lendemain, et une nette amélioration chaque matin, à tempérer car peu d'activité.",
          reading:
            'Articulation qui se calme, pas en irritation chronique. <em class="med">Feu vert pour solliciter intelligemment.</em>',
        },
        {
          label: "Test 04",
          title: "Amplitudes et gestes du quotidien",
          goal: "Repérer un éventuel point de blocage localisé.",
          result:
            "Blocage <strong>symétrique</strong> aux deux extrémités, il manque 2-3 degrés en flexion ET en extension, et une appréhension à la descente de marche.",
          reading:
            'Un blocage symétrique aux deux bouts évoque une <em class="med">raideur capsulaire post-inflammatoire</em>, pas un fragment, qui bloquerait dans un seul sens. L\'appréhension à la descente, c\'est encore le quad inhibé qui ne tient pas le freinage excentrique.',
        },
      ],
      conclusion: {
        variant: "conclusion",
        label: "Conclusion du cadrage",
        body:
          "Les signaux convergent vers une hypothèse rassurante, <strong>inhibition et raideur post-traumatique, pas un blocage mécanique.</strong> Ce n'est pas une certitude. Le déficit d'extension reste l'élément à surveiller, s'il stagne ou s'aggrave, ou si un vrai blocage apparaît, ça change la donne et justifie un avis médical.",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 04",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole, pour tout",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>Doux, jamais de douleur, le muscle qui répond.</strong> On a vu en direct que dès qu'on arrête de forcer contre la butée, la douleur se dissipe, le quad commence à répondre et l'extension revient un peu. Le cercle vicieux, douleur puis inhibition, s'inverse en cercle vertueux. <strong>Chaque fois que tu t'éloignes de doux et sans douleur, tu te trompes.</strong>",
      },
      alertTable: {
        goLabel: "Quand passer à la suite, vers phase 2",
        stopLabel: "Ce qui doit alerter",
        go: [
          "Tu contractes le quad franchement et tu vois le VMO durcir <strong>nettement, comme la jambe saine</strong>.",
          "L'<strong>extension active complète</strong> revient, plus de déficit notable en charge.",
          "Plus d'appréhension à la descente de marche.",
          "Aucun gonflement réactionnel avec ce travail.",
        ],
        stop: [
          "Un <strong>vrai blocage</strong> apparaît, genou qui se verrouille et ne se débloque pas.",
          "Le déficit d'extension <strong>stagne ou s'aggrave</strong> sur plusieurs jours.",
          "Un <strong>gonflement</strong> qui réapparaît après l'effort, ou une douleur qui monte.",
          "Tout signe nouveau qui sort de la trajectoire d'amélioration.",
        ],
      },
      note:
        "Dès qu'un accès kiné ou médecine du sport est possible, notamment en France, faire valider ce travail et l'orientation conservatrice reste la bonne démarche.",
    },
  ],
};

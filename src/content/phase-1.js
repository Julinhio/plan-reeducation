// =====================================================================
// Phase 1, Le réveil.
// Contenu intégral fidèle au PDF d'origine, en data structurée.
// Consommé par la vue Lecture ET la vue Tracking (exercises[].key).
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
    { id: "exercices", label: "Exercices" },
    { id: "cadrage", label: "Cadrage" },
    { id: "regle-or", label: "Règle d'or" },
  ],

  intro: {
    tagline: "Phase 01 · En cours",
    title: "Le réveil",
    goal:
      "Réveil neuromusculaire et récupération de l'extension. Zéro charge, zéro risque.",
  },

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
      id: "exercices",
      type: "exercises",
      overlineNum: "§ 02",
      overlineLabel: "Les exercices de la phase 1",
      title: "Trois exercices, et la règle anti-assise",
      lede:
        "Petites doses, fréquentes, jamais douloureuses. La qualité prime sur la quantité, <strong>10 cm parfaitement verrouillés valent mieux que 40 cm mollassons.</strong>",
      exercises: [
        {
          key: "quad-set",
          num: "Exercice 01",
          title: "Quad set",
          italic: "contraction isométrique",
          tags: [{ label: "Pilier · Connexion", variant: "teal" }],
          goal:
            "<strong>But,</strong> retrouver le signal nerveux et rallumer le VMO.",
          steps: [
            "Assis ou allongé, jambe tendue, petit boudin de serviette sous le genou.",
            "Pousse doucement l'arrière du genou dans la serviette en contractant la cuisse, comme pour <strong>presser une éponge</strong>. Mouvement minuscule.",
            'Reste dans ton amplitude actuelle confortable. <em class="under">On ne va PAS chercher les degrés manquants</em> en forçant sur la butée. Les degrés reviendront seuls quand le muscle se rallumera.',
            "Tu dois voir la rotule remonter légèrement et chercher à sentir le VMO, la goutte interne, durcir.",
            "Effort <strong>doux, 50 à 60 %</strong> de ta force. Pas de contraction maximale.",
          ],
          note:
            "<strong>Astuce qui débloque,</strong> commence par 5 contractions sur la <strong>jambe saine</strong>, mémorise la sensation, puis reproduis-la côté blessé. On apprend par le côté sain.",
          dosage:
            "Tenir <strong>5 s</strong>, relâcher 3 à 5 s. Séries de <strong>10</strong>. <strong>3 séries</strong> par session, 1 min de repos entre séries. <strong>3 à 5 fois par jour</strong>, petites doses fréquentes valent mieux qu'une grosse séance. Faisable au bureau.",
          tracking: {
            defaultSets: 3,
            defaultReps: 10,
            timer: { kind: "hold", durationSec: 5, label: "Hold quad set 5s" },
            targetSessionsPerDay: 4,
            unit: "session",
          },
        },
        {
          key: "slr",
          num: "Exercice 02",
          title: "Straight leg raise",
          italic: "lever de jambe tendue",
          tags: [{ label: "Pilier · Verrouillage", variant: "teal" }],
          goal:
            "<strong>But,</strong> travailler le quad dynamiquement sans toucher à la zone qui coince, et renforcer le verrouillage en extension.",
          steps: [
            "Allongé sur le dos. Jambe saine pliée, pied à plat. Jambe blessée tendue.",
            '<strong>D\'abord</strong> un quad set, verrouille le quad, genou bien tendu, <em class="under">avant</em> de décoller la jambe.',
            "Lève la jambe tendue de 20 à 30 cm, lentement. Tiens 1 à 2 s en haut. Redescends <strong>encore plus lentement</strong>.",
            'Règle absolue, le genou <em class="under">ne plie jamais</em> pendant le mouvement. Mieux vaut 10 cm avec un genou parfaitement verrouillé que 40 cm avec un genou qui mollit.',
          ],
          dosage: "<strong>3 séries de 10</strong>, 2 fois par jour.",
          fallback:
            "Si le genou plie dès que tu lèves, ou si ça fait mal, tu n'es pas prêt. Reste au quad set seul quelques jours et réessaie.",
          tracking: {
            defaultSets: 3,
            defaultReps: 10,
            timer: { kind: "hold", durationSec: 2, label: "Hold haut SLR 2s" },
            targetSessionsPerDay: 2,
            unit: "session",
          },
        },
        {
          key: "amplitude",
          num: "Exercice 03",
          title: "Travail d'amplitude",
          italic: "passif, en douceur",
          tags: [{ label: "Amplitude", variant: "plum" }],
          goal:
            "<strong>But,</strong> regagner les 2-3 degrés qui manquent aux deux bouts, sans forcer. Mouvements passifs, c'est la gravité et la position qui travaillent, pas le muscle.",
          steps: [
            '<strong>Extension, talon surélevé.</strong> Allongé ou assis, talon posé sur un support, coussin ou accoudoir, genou <em class="under">dans le vide</em>. Laisse le poids de la cuisse étirer doucement l\'arrière du genou. Ne pousse pas. 2 à 3 min, détendu. Si ça tire fort, baisse la hauteur du support.',
            '<strong>Flexion, glissé de talon.</strong> Allongé, fais glisser le talon vers les fesses, serviette sous le talon pour glisser, jusqu\'au point où ça commence juste à tirer, <em class="under">sans douleur</em>. Tiens 5 s, reviens. Lent et contrôlé.',
          ],
          dosage:
            "Extension passive <strong>2 à 3 fois par jour</strong>. Glissé de talon environ 10 répétitions, <strong>2 fois par jour</strong>.",
          tracking: {
            defaultSets: 1,
            defaultReps: 10,
            timer: null,
            targetSessionsPerDay: 2,
            unit: "session",
          },
        },
      ],
      ruleCallout: {
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

// =====================================================================
// Phase 1 — Phase I Palmieri (J4-J21) : protéger et rallumer.
// Post-op ligamentoplastie d'augmentation LCA DT4 + ménisectomie
// bilatérale du 29/06/2026. Contenu aligné sur le protocole officiel
// Palmieri et l'addendum J+7.
// Clés d'exercices "quad-set", "slr", "amplitude", "flexion-talon"
// conservées : elles préservent l'historique exercise_sessions.
// =====================================================================

export default {
  meta: {
    id: 1,
    number: "01",
    title: "Protéger et rallumer",
    subtitle: "Phase I Palmieri · J4 → J21 · verrouillage en extension et réveil du quadriceps",
    goal:
      "Verrouiller l'extension, rallumer le quadriceps, contrôler l'inflammation. Secteur protégé 0-90°, zéro passage en force.",
    window: { fromDay: 0, toDay: 21 },
  },

  toc: [
    { id: "cible", label: "Cible" },
    { id: "contraintes", label: "Contraintes dures" },
    { id: "lecons", label: "Leçons J+1 → J+7" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "echeances", label: "Échéances" },
  ],

  intro: {
    tagline: "Phase 01 · Phase I Palmieri · J4 → J21",
    title: "Protéger et rallumer",
    goal:
      "Le greffon cicatrise, le quadriceps se rallume. Verrouillage en extension complète, mobilisation douce 0-90°, cryothérapie, et rien d'autre.",
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
        { label: "Hold", value: "10 s" },
      ],
      frequency: "3 à 5 fois par jour",
      consigne:
        "Presse l'arrière du genou dans la serviette, cherche le verrouillage complet. Hold 10 s acquis à J+7.",
      details: [
        "Allongé ou assis, jambe tendue, boudin de serviette sous le genou.",
        "Effort franc mais sans douleur. Le but est le verrouillage en extension, pas la fatigue.",
        "Si réaction inflammatoire le lendemain, retour à 5 s de hold quelques jours (leçon J+5).",
        "Une seule variable de progression à la fois : durée OU volume, jamais les deux.",
      ],
      tracking: {
        defaultSets: 3,
        defaultReps: 10,
        defaultDuration: null,
        timer: { kind: "hold", durationSec: 10, label: "Hold quad set 10 s" },
        targetSessionsPerDay: 4,
        unit: "session",
      },
    },
    {
      key: "slr",
      num: "02",
      title: "Straight leg raise",
      tag: "CRITÈRE D'APPUI",
      stats: [
        { label: "Séries", value: "3" },
        { label: "Reps", value: "10" },
        { label: "Hold", value: "2 s" },
      ],
      frequency: "2 à 3 fois par jour",
      consigne:
        "Verrouille le quad avant de lever, le genou ne plie jamais. 5 SLR consécutifs verrouillés = critère officiel de reprise d'appui.",
      details: [
        "Sur le dos, jambe saine pliée, jambe opérée tendue.",
        "Quad set d'abord, genou verrouillé, puis décoller de 20-30 cm, lent, tenir 2 s.",
        "Si le genou plie pendant le mouvement, la rep ne compte pas : c'est un critère qualité, pas un compteur.",
        "Protocole DT4 : pas d'appui complet tant que 5 élévations d'affilée genou tendu ne passent pas.",
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
      // loggé sous cette clé depuis juin.
      key: "amplitude",
      num: "03",
      title: "Extension passive",
      tag: "AMPLITUDE",
      stats: [{ label: "Durée", value: "2–3 min" }],
      frequency: "2 à 3 fois par jour",
      consigne:
        "Talon surélevé (mollet sur coussin), genou dans le vide. La gravité travaille, pas toi.",
      details: [
        "Talon posé sur un support, genou dans le vide, jambe détendue.",
        "2 à 3 min, passif. Extension fluide acquise à J+7, on entretient.",
        "Le déficit d'extension est l'ennemi n°1 d'une ligamentoplastie : ce geste est non négociable.",
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
      tag: "AMPLITUDE 0-90°",
      stats: [
        { label: "Reps", value: "10" },
        { label: "Max", value: "90°" },
      ],
      frequency: "2 fois par jour",
      consigne:
        "Glisse le talon vers les fesses, jamais au-delà de 90° de flexion. Secteur protégé les 3 premières semaines.",
      details: [
        "Allongé, serviette sous le talon pour glisser.",
        "S'arrêter à 90° même si ça pourrait aller plus loin : consigne Palmieri, protection du greffon et des sutures.",
        "Dans le secteur autorisé, aller jusqu'au tirage léger, jamais dans la douleur.",
        "Lent et contrôlé, tenir 5 s au point maximal.",
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
    {
      key: "patella-mob",
      num: "05",
      title: "Mobilisation patellaire",
      tag: "MOBILITÉ",
      stats: [{ label: "Durée", value: "2–3 min" }],
      frequency: "2 à 3 fois par jour",
      consigne:
        "Bouge la rotule doucement dans les deux axes, quad complètement relâché. Quasi indolore depuis J+7.",
      details: [
        "Assis, jambe tendue et relâchée, prends la rotule entre pouce et index.",
        "Glisser médial-latéral puis haut-bas, sans forcer, 2 à 3 minutes.",
        "Introduite à J+3, douloureuse au début, quasi indolore à J+7 : continuer, c'est la prévention n°1 de la raideur antérieure.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: null,
        defaultDuration: 150,
        timer: { kind: "hold", durationSec: 150, label: "Mobilisation patellaire" },
        targetSessionsPerDay: 2,
        unit: "session",
      },
    },
    {
      key: "ankle-pumps",
      num: "06",
      title: "Ankle pumps",
      tag: "ANTI-PHLÉBITE",
      stats: [
        { label: "Reps", value: "20" },
        { label: "Rythme", value: "1/h" },
      ],
      frequency: "Toutes les heures éveillées, minimum 4 logs/jour",
      consigne:
        "Pompe avec les chevilles, vite et ample. Le Lovenox s'arrête à J+7 : la pompe musculaire prend le relais.",
      details: [
        "Flexions-extensions de cheville amples, les deux pieds, 20 reps.",
        "Le risque de phlébite persiste plusieurs semaines après l'arrêt du Lovenox (dernière injection 06/07).",
        "Systématique avant/après toute période assise ou allongée prolongée.",
        "Sera critique pendant le vol long-courrier vers HCMC.",
      ],
      tracking: {
        defaultSets: null,
        defaultReps: 20,
        defaultDuration: null,
        timer: null,
        targetSessionsPerDay: 4,
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
      overlineLabel: "La cible de la phase I",
      title: "Verrouiller, rallumer, calmer",
      target: {
        label: "Cap unique",
        quote:
          "Extension verrouillée, quad qui répond, genou froid. Le reste attend.",
        body:
          "Le greffon DT4 entre en <strong>ligamentisation</strong> : il est au plus fragile pendant les premières semaines. La chirurgie a préservé le <strong>stump du LCA natif</strong> (augmentation, pas reconstruction pure), un avantage proprioceptif à ne pas gâcher. La phase I sert trois choses : <strong>le verrouillage en extension complète</strong>, le réveil du quadriceps avec comme jalon <strong>5 SLR consécutifs genou verrouillé</strong>, et le contrôle des troubles circulatoires et inflammatoires par la cryothérapie. Pas de force, pas de volume : <strong>de la précision.</strong>",
      },
    },

    {
      id: "contraintes",
      type: "callout",
      overlineNum: "§ 02",
      overlineLabel: "Le cadre non négociable",
      title: "Les contraintes dures Palmieri",
      lede:
        "Consignes post-opératoires officielles du protocole DT4. Elles priment sur toute envie d'accélérer.",
      callout: {
        variant: "rule",
        label: "Consignes post-op DT4",
        intro:
          "<strong>Le protocole est calendaire sur la protection, critérié sur la progression.</strong> Les trois premières semaines protègent le greffon et les gestes méniscaux :",
        prompt: "<strong>Jusqu'à nouvel ordre :</strong>",
        bullets: [
          "<strong>Secteur protégé 0-90°</strong> pour toute mobilisation du genou, les 3 premières semaines.",
          "<strong>Cannes anglaises 15 jours</strong> post-op, appui progressif seulement après 5 SLR verrouillés.",
          "<strong>Cryothérapie</strong> (genouillère à circulation d'eau glacée) plusieurs fois par jour, systématique après les exercices.",
          "Surveillance quotidienne : gonflement, propreté de la cicatrice, coloration et sensibilité des orteils.",
          "Rééducation kiné 2-3 séances la première quinzaine, puis tous les jours.",
        ],
        outro:
          "Aucun exercice de cette phase ne doit générer de douleur pendant, ni de gonflement le lendemain. Le gonflement du lendemain est le vrai thermomètre.",
      },
    },

    {
      id: "lecons",
      type: "tests",
      overlineNum: "§ 03",
      overlineLabel: "Ce que la première semaine a appris",
      title: "Leçons J+1 → J+7",
      lede:
        "Trois incidents instructifs en une semaine. Ils sont intégrés au plan, pas juste notés.",
      tests: [
        {
          label: "Leçon 01 · J+2",
          title: "Le bloc fémoral ment",
          goalLabel: "Contexte",
          goal:
            "Near-fall dans les escaliers, rattrapé de justesse par la rambarde. Zéro dommage.",
          resultLabel: "Mécanisme",
          result:
            "Le bloc fémoral <strong>masquait la faiblesse réelle du quadriceps</strong> et a créé une fausse confiance motrice.",
          readingLabel: "Leçon",
          reading:
            'Toute analgésie efficace crée un <em class="med">angle mort proprioceptif</em>. Ne jamais évaluer ses capacités sous antalgie forte, tester d\'abord (5 SLR avant appui).',
        },
        {
          label: "Leçon 02 · J+5",
          title: "La poussée inflammatoire évitable",
          goalLabel: "Contexte",
          goal:
            "Douleur et inflammation en fin de journée après ~2h30 d'escaliers, alcool, et progression trop rapide des exos quadri.",
          resultLabel: "Mécanisme",
          result:
            "Trois facteurs cumulés le même jour. Retour à 5 s de hold à J+6, inflammation en régression dès le lendemain.",
          readingLabel: "Leçon",
          reading:
            'La progression est <em class="med">criteriée, pas calendaire</em> : une seule variable à la fois, avec une rationale explicite. Alcool + fatigue musculaire + station debout prolongée = cocktail interdit en phase aiguë.',
        },
        {
          label: "Leçon 03 · J+7",
          title: "L'état des lieux du jour",
          goalLabel: "Contexte",
          goal:
            "Bilan à la rédaction de l'addendum : où en est le genou réellement.",
          resultLabel: "Constat",
          result:
            "Mobilisation patellaire quasi indolore, iso quad tenue <strong>10 s</strong>, extension passive fluide. Antalgie de palier simple.",
          readingLabel: "Leçon",
          reading:
            'Trajectoire saine. Prochain jalon : <em class="med">5 SLR consécutifs genou verrouillé</em> pour la reprise d\'appui, puis RDV Palmieri du 15/07 pour le feu vert phase II et la question BFR.',
        },
      ],
      conclusion: {
        variant: "conclusion",
        label: "Synthèse",
        body:
          "La semaine 1 s'est bien passée <strong>malgré deux erreurs évitables</strong>, toutes deux liées au même biais : surestimer ce que le genou peut encaisser. Le plan de cette app existe précisément pour ça, <strong>logger, mesurer, et laisser les critères décider.</strong>",
      },
    },

    {
      id: "regle-or",
      type: "rule-and-alerts",
      overlineNum: "§ 04",
      overlineLabel: "La règle d'or et les signaux d'alerte",
      title: "La boussole post-op",
      compass: {
        variant: "compass",
        label: "Boussole",
        body:
          "<strong>Une variable à la fois, criteriée, jamais dans la douleur.</strong> Le greffon ne donne aucun signal quand on le surcharge, c'est le gonflement du lendemain qui parle. Chaque fois que tu progresses sur deux paramètres en même temps, ou parce que « le calendrier le permet », tu répètes l'erreur de J+5.",
      },
      alertTable: {
        goLabel: "Quand passer en phase 2",
        stopLabel: "Consultation immédiate si",
        go: [
          "<strong>Feu vert Palmieri</strong> au RDV du 15/07 (levée pansement, contrôle amplitude).",
          "<strong>5 SLR consécutifs</strong> genou verrouillé, sans que le genou plie.",
          "Verrouillage en <strong>extension complète</strong> acquis.",
          "Sevrage des cannes, marche stable sans esquive d'appui.",
          "Genou froid et calme au réveil, aucun gonflement réactionnel.",
        ],
        stop: [
          "<strong>Signes de phlébite</strong> : mollet ou jambe douloureuse, gonflée, chaude. Le Lovenox est arrêté depuis J+7, le risque persiste des semaines.",
          "<strong>Fièvre, cicatrice rouge, chaude ou qui coule</strong> : suspicion d'infection, urgence.",
          "<strong>Perte brutale d'extension</strong> qui ne cède pas au repos (suspicion cyclope ou blocage).",
          "Douleur qui <strong>monte de jour en jour</strong> au lieu de descendre, ou gonflement qui s'installe.",
        ],
      },
      note:
        "Traitement en cours : antalgie modulable paracétamol → +néfopam → Izalgi (plafond 4 g paracétamol/jour), vitamine C 1 g/jour jusqu'à J+30, créatine + collagène repris. Oméga-3 différés jusqu'à fin du célécoxib. Izalgi = opioïde faible : à déclarer ou éviter à la douane vietnamienne.",
    },

    {
      id: "echeances",
      type: "milestones",
      overlineNum: "§ 05",
      overlineLabel: "Le calendrier devant",
      title: "Échéances",
      lede:
        "Les rendez-vous qui structurent les 6 prochains mois. Le RDV du 15/07 est le pivot : feu vert phase II, question BFR, et date de vol pour le Vietnam.",
    },
  ],
};

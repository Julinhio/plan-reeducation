// =====================================================================
// Phase 1 — Le réveil
// Contenu intégral, fidèle au PDF Plan_Reeducation_Genou_Phase1_Julien.
// Format : meta (carte du stepper) + toc (sub-nav) + render() -> HTML.
// =====================================================================

export default {
  meta: {
    id: 1,
    number: "01",
    title: "Le réveil",
    subtitle: "Réveil neuromusculaire & récupération de l'extension",
    statusLabel: "En cours",
    status: "active",
    goal:
      "Récupérer l'extension active complète et rallumer le VMO. Zéro charge, zéro risque.",
  },

  toc: [
    { id: "cadrage", label: "Cadrage" },
    { id: "cible", label: "Cible" },
    { id: "exercices", label: "Exercices" },
    { id: "regle-or", label: "Règle d'or" },
    { id: "materiel", label: "Matériel" },
  ],

  render() {
    return /* html */ `
      <header class="phase__intro">
        <p class="phase__tagline">Phase 01 · En cours</p>
        <h2 class="phase__title">Le réveil</h2>
        <p class="phase__goal">
          Réveil neuromusculaire et récupération de l'extension. Zéro charge,
          zéro risque.
        </p>
      </header>

      <section class="section" id="cadrage" aria-labelledby="cadrage-title">
        <p class="section__overline">
          <span class="section__overline-num">§ 01</span>
          <span>D'où on part</span>
        </p>
        <h3 class="section__title" id="cadrage-title">
          Le raisonnement de cette session
        </h3>
        <p class="section__lede">
          Avant de poser le moindre exercice, j'ai posé une série de questions
          ciblées. Voici lesquelles, et surtout <strong>pourquoi</strong>, parce
          que c'est ce raisonnement qui justifie le plan.
        </p>

        <div class="tests" role="list">
          ${testCard({
            label: "Test 01",
            title: "Verrouillage en extension allongé",
            goal:
              "Distinguer un <strong>vrai blocage mécanique</strong> (fragment méniscal qui coince) d'une simple <strong>raideur / inhibition</strong>.",
            result:
              "Extension quasi complète au repos, mais il manque <strong>2 à 3 degrés</strong> par rapport à la jambe saine, avec une petite douleur en fin de course et une appréhension.",
            reading: "Compatible avec une <em class=\"med\">inhibition</em>, pas un blocage franc.",
          })}
          ${testCard({
            label: "Test 02",
            title: "Qualité de la contraction du quadriceps",
            goal: "Vérifier si le muscle <strong>répond</strong>.",
            result:
              "Contraction molle, faible, surtout sur la partie interne (le <strong>vaste médial oblique, le VMO</strong>), alors que c'était un point fort avant.",
            reading:
              "Signature d'un <em class=\"med\">quad inhibé</em>. Le muscle n'a pas fondu seulement par manque d'usage&nbsp;: il est neurologiquement freiné par l'articulation, entretenu par le petit épanchement vu à l'IRM. Le VMO est toujours le premier à s'éteindre et le dernier à revenir.",
          })}
          ${testCard({
            label: "Test 03",
            title: "Gonflement réactionnel le lendemain",
            goal:
              "Mesurer le niveau d'irritation de l'articulation. Le gonflement est le vrai thermomètre, bien plus que la douleur sur le moment.",
            result:
              "Pas de gonflement le lendemain, et une nette amélioration chaque matin (à tempérer car peu d'activité).",
            reading:
              "Articulation qui se calme, pas en irritation chronique. <em class=\"med\">Feu vert pour solliciter intelligemment.</em>",
          })}
          ${testCard({
            label: "Test 04",
            title: "Amplitudes et gestes du quotidien",
            goal: "Repérer un éventuel point de blocage localisé.",
            result:
              "Blocage <strong>symétrique</strong> aux deux extrémités (il manque 2-3 degrés en flexion ET en extension), et une appréhension à la descente de marche.",
            reading:
              "Un blocage symétrique aux deux bouts évoque une <em class=\"med\">raideur capsulaire post-inflammatoire</em>, pas un fragment (qui bloquerait dans un seul sens). L'appréhension à la descente, c'est encore le quad inhibé qui ne tient pas le freinage excentrique.",
          })}
        </div>

        <div class="section__body" style="margin-top: var(--s-6);">
          <aside class="callout callout--conclusion" role="note">
            <span class="callout__label">Conclusion du cadrage</span>
            <p>
              Les signaux convergent vers une hypothèse rassurante&nbsp;:
              <strong>inhibition + raideur post-traumatique, pas un blocage
              mécanique.</strong> Ce n'est pas une certitude. Le déficit
              d'extension reste l'élément à surveiller&nbsp;: s'il stagne ou
              s'aggrave, ou si un vrai blocage apparaît, ça change la donne et
              justifie un avis médical.
            </p>
          </aside>
        </div>
      </section>

      <section class="section" id="cible" aria-labelledby="cible-title">
        <p class="section__overline">
          <span class="section__overline-num">§ 02</span>
          <span>La cible n°1 de la phase 1</span>
        </p>
        <h3 class="section__title" id="cible-title">
          Une seule chose à la fois
        </h3>

        <div class="section__body">
          <div class="target">
            <p class="target__label">Cap unique</p>
            <p class="target__quote">
              « Tant que le quad ne se rallume pas, on ne charge rien
              par-dessus. »
            </p>
            <p class="target__body">
              Tant que le quad — et surtout le <strong>VMO</strong> — ne se
              rallume pas et que l'extension active complète n'est pas
              récupérée, charger reviendrait à construire sur du sable. Toute
              la phase 1 sert ça, et rien d'autre. Pas de force, pas de volume,
              pas de sueur&nbsp;: <strong>du travail neuromusculaire de
              précision, la qualité prime sur tout.</strong>
            </p>
          </div>
        </div>
      </section>

      <section class="section" id="exercices" aria-labelledby="exercices-title">
        <p class="section__overline">
          <span class="section__overline-num">§ 03</span>
          <span>Les exercices de la phase 1</span>
        </p>
        <h3 class="section__title" id="exercices-title">
          Trois exercices, et la règle anti-assise
        </h3>
        <p class="section__lede">
          Petites doses, fréquentes, jamais douloureuses. La qualité prime sur
          la quantité&nbsp;: <strong>10 cm parfaitement verrouillés valent mieux
          que 40 cm mollassons.</strong>
        </p>

        <div class="exercises">
          ${exercise({
            num: "Exercice 01",
            title: "Quad set",
            italic: "contraction isométrique",
            tags: [
              { label: "Pilier · Connexion", variant: "" },
            ],
            goal: "<strong>But —</strong> retrouver le signal nerveux et rallumer le VMO.",
            steps: [
              "Assis ou allongé, jambe tendue, petit boudin de serviette sous le genou.",
              "Pousse doucement l'arrière du genou dans la serviette en contractant la cuisse, comme pour <strong>presser une éponge</strong>. Mouvement minuscule.",
              "Reste dans ton amplitude actuelle confortable. <em class=\"under\">On ne va PAS chercher les degrés manquants</em> en forçant sur la butée. Les degrés reviendront seuls quand le muscle se rallumera.",
              "Tu dois voir la rotule remonter légèrement et chercher à sentir le VMO (la goutte interne) durcir.",
              "Effort <strong>doux, 50 à 60&nbsp;%</strong> de ta force. Pas de contraction maximale.",
            ],
            note:
              "<strong>Astuce qui débloque —</strong> commence par 5 contractions sur la <strong>jambe saine</strong>, mémorise la sensation, puis reproduis-la côté blessé. On apprend par le côté sain.",
            dosage:
              "Tenir <strong>5 s</strong>, relâcher 3 à 5 s. Séries de <strong>10</strong>. <strong>3 séries</strong> par session, 1 min de repos entre séries. <strong>3 à 5 fois par jour</strong> — petites doses fréquentes > une grosse séance. Faisable au bureau.",
          })}

          ${exercise({
            num: "Exercice 02",
            title: "Straight leg raise",
            italic: "lever de jambe tendue",
            tags: [
              { label: "Pilier · Verrouillage", variant: "" },
            ],
            goal:
              "<strong>But —</strong> travailler le quad dynamiquement sans toucher à la zone qui coince, et renforcer le verrouillage en extension.",
            steps: [
              "Allongé sur le dos. Jambe saine pliée, pied à plat. Jambe blessée tendue.",
              "<strong>D'abord</strong> un quad set&nbsp;: verrouille le quad, genou bien tendu, <em class=\"under\">avant</em> de décoller la jambe.",
              "Lève la jambe tendue de 20 à 30 cm, lentement. Tiens 1 à 2 s en haut. Redescends <strong>encore plus lentement</strong>.",
              "Règle absolue&nbsp;: le genou <em class=\"under\">ne plie jamais</em> pendant le mouvement. Mieux vaut 10 cm avec un genou parfaitement verrouillé que 40 cm avec un genou qui mollit.",
            ],
            dosage: "<strong>3 séries de 10</strong>, 2 fois par jour.",
            fallback:
              "Si le genou plie dès que tu lèves, ou si ça fait mal&nbsp;: tu n'es pas prêt. Reste au quad set seul quelques jours et réessaie.",
          })}

          ${exercise({
            num: "Exercice 03",
            title: "Travail d'amplitude",
            italic: "passif, en douceur",
            tags: [
              { label: "Amplitude", variant: "amplitude" },
            ],
            goal:
              "<strong>But —</strong> regagner les 2-3 degrés qui manquent aux deux bouts, sans forcer. Mouvements passifs&nbsp;: c'est la gravité et la position qui travaillent, pas le muscle.",
            steps: [
              "<strong>Extension — talon surélevé.</strong> Allongé ou assis, talon posé sur un support (coussin, accoudoir), genou <em class=\"under\">dans le vide</em>. Laisse le poids de la cuisse étirer doucement l'arrière du genou. Ne pousse pas. 2 à 3 min, détendu. Si ça tire fort, baisse la hauteur du support.",
              "<strong>Flexion — glissé de talon.</strong> Allongé, fais glisser le talon vers les fesses (serviette sous le talon pour glisser) jusqu'au point où ça commence juste à tirer, <em class=\"under\">sans douleur</em>. Tiens 5 s, reviens. Lent et contrôlé.",
            ],
            dosage:
              "Extension passive <strong>2 à 3 fois/jour</strong>. Glissé de talon ~10 répétitions, <strong>2 fois/jour</strong>.",
          })}
        </div>

        <div class="section__body" style="margin-top: var(--s-6);">
          <aside class="callout callout--rule" role="note">
            <span class="callout__label">Règle anti-assise</span>
            <p>
              <strong>Aussi importante que les exercices.</strong> La position
              assise prolongée, genou plié, entretient l'inhibition du quad et
              la raideur. C'est l'ennemi n°1 vu le mode de vie au bureau.
            </p>
            <p>
              <strong>Toutes les 30 à 45 min, casse la position assise&nbsp;:</strong>
            </p>
            <ul class="callout__bullets">
              <li>10 quad sets debout (30 secondes, jambe tendue), ou</li>
              <li>quelques pas dans l'appart + un verre d'eau, ou</li>
              <li>
                2-3 fois/jour, descendre au parc pour <strong>5 à 10 min de
                marche active</strong> (excellent rééducateur à ce stade).
              </li>
            </ul>
            <p>
              Le plus dur, c'est de ne pas oublier&nbsp;: accrocher ce réflexe
              à un déclencheur existant (fin de tâche, café) ou une alarme.
            </p>
          </aside>
        </div>
      </section>

      <section class="section" id="regle-or" aria-labelledby="regle-or-title">
        <p class="section__overline">
          <span class="section__overline-num">§ 04</span>
          <span>La règle d'or et les signaux d'alerte</span>
        </p>
        <h3 class="section__title" id="regle-or-title">
          La boussole, pour tout
        </h3>

        <div class="section__body">
          <aside class="callout callout--compass" role="note">
            <span class="callout__label">Boussole</span>
            <p>
              <strong>Doux, jamais de douleur, le muscle qui répond.</strong>
              On a vu en direct que dès qu'on arrête de forcer contre la butée,
              la douleur se dissipe, le quad commence à répondre et l'extension
              revient un peu. Le cercle vicieux (douleur → inhibition) s'inverse
              en cercle vertueux. <strong>Chaque fois que tu t'éloignes de
              « doux et sans douleur », tu te trompes.</strong>
            </p>
          </aside>
        </div>

        <div class="alert-table" role="table" aria-label="Quand passer à la suite versus signaux d'alerte">
          <div class="alert-col alert-col--go" role="rowgroup">
            <div class="alert-col__head" role="columnheader">
              Quand passer à la suite (vers phase 2)
            </div>
            <ul class="alert-col__list" role="list">
              <li>
                Tu contractes le quad franchement et tu vois le VMO durcir
                <strong>nettement, comme la jambe saine</strong>.
              </li>
              <li>
                L'<strong>extension active complète</strong> revient (plus de
                déficit notable en charge).
              </li>
              <li>Plus d'appréhension à la descente de marche.</li>
              <li>Aucun gonflement réactionnel avec ce travail.</li>
            </ul>
          </div>
          <div class="alert-col alert-col--stop" role="rowgroup">
            <div class="alert-col__head" role="columnheader">
              Ce qui doit alerter
            </div>
            <ul class="alert-col__list" role="list">
              <li>
                Un <strong>vrai blocage</strong> apparaît (genou qui se verrouille
                et ne se débloque pas).
              </li>
              <li>
                Le déficit d'extension <strong>stagne ou s'aggrave</strong> sur
                plusieurs jours.
              </li>
              <li>
                Un <strong>gonflement</strong> qui réapparaît après l'effort,
                ou une douleur qui monte.
              </li>
              <li>Tout signe nouveau qui sort de la trajectoire d'amélioration.</li>
            </ul>
          </div>
        </div>

        <p class="alert-note">
          Dès qu'un accès kiné&nbsp;/ médecine du sport est possible (notamment
          en France), faire valider ce travail et l'orientation conservatrice
          reste la bonne démarche.
        </p>
      </section>

      <section class="section" id="materiel" aria-labelledby="materiel-title">
        <p class="section__overline">
          <span class="section__overline-num">§ 05</span>
          <span>Matériel disponible</span>
        </p>
        <h3 class="section__title" id="materiel-title">
          Tout est déjà là
        </h3>

        <div class="section__body">
          <p class="materiel">
            Serviettes, chaises, tabourets, un mur, le parc en bas pour la
            marche. Petite salle du condo (poids légers, espace) jusqu'au
            <strong>9 juin</strong>. À partir du <strong>10 juin en
            France</strong>&nbsp;: nature, mer, piscine en été, petite salle
            minimaliste, grands extérieurs. La phase 1 ne demande quasiment
            rien&nbsp;: <em>tout est déjà là.</em>
          </p>
        </div>
      </section>
    `;
  },
};

// ---------------------------------------------------------------------
// helpers — gardés locaux pour éviter une dépendance externe.
// ---------------------------------------------------------------------

function testCard({ label, title, goal, result, reading }) {
  return /* html */ `
    <article class="test" role="listitem">
      <p class="test__label">${label}</p>
      <h4 class="test__title">${title}</h4>
      <dl>
        <div>
          <dt>Objectif</dt>
          <dd>${goal}</dd>
        </div>
        <div>
          <dt>Résultat</dt>
          <dd>${result}</dd>
        </div>
        <div class="test--reading">
          <dt>Lecture</dt>
          <dd>${reading}</dd>
        </div>
      </dl>
    </article>
  `;
}

function exercise({ num, title, italic, tags, goal, steps, note, dosage, fallback }) {
  const tagHtml = tags
    .map(
      (t) =>
        `<span class="tag${t.variant ? " tag--" + t.variant : ""}">${t.label}</span>`
    )
    .join("");

  const stepsHtml = steps.map((s) => `<li>${s}</li>`).join("");

  return /* html */ `
    <article class="exercise">
      <header class="exercise__head">
        <p class="exercise__num">${num}</p>
        <div class="exercise__title-row">
          <h4 class="exercise__title">
            ${title}${italic ? ` <em>· ${italic}</em>` : ""}
          </h4>
          <span class="exercise__tags">${tagHtml}</span>
        </div>
      </header>

      <p class="exercise__goal">${goal}</p>

      <ul class="exercise__steps" role="list">
        ${stepsHtml}
      </ul>

      ${note ? `<p class="exercise__note">${note}</p>` : ""}

      <div class="exercise__dosage">
        <span class="exercise__dosage-label">Dosage</span>
        <span class="exercise__dosage-value">${dosage}</span>
      </div>

      ${fallback ? `<p class="exercise__fallback">${fallback}</p>` : ""}
    </article>
  `;
}

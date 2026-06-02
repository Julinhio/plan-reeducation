// Phase 4 — La ré-athlétisation
// État : à venir. La plus lointaine, à définir le moment venu.

export default {
  meta: {
    id: 4,
    number: "04",
    title: "La ré-athlétisation",
    subtitle:
      "Réintroduction progressive de l'impact : course, changements de direction, pivots, geste sportif.",
    statusLabel: "À venir",
    status: "upcoming",
    goal:
      "Réintroduction progressive de l'impact : course, puis changements de direction, pivots, geste sportif. La plus lointaine, à définir le moment venu.",
  },

  toc: [],

  render() {
    return upcomingPanel({
      number: "04",
      title: "La ré-athlétisation",
      goal:
        "Réintroduction progressive de l'impact : course, puis changements de direction, pivots, geste sportif.",
      message:
        "La plus lointaine. Sera détaillée <strong>le moment venu</strong>, en s'appuyant sur la logique du consensus ESSKA — retour au sport critérié <em>ET</em> temporel.",
    });
  },
};

function upcomingPanel({ number, title, goal, message }) {
  return /* html */ `
    <section class="upcoming" aria-label="Phase ${number} — à venir">
      <div class="upcoming__inner">
        <p class="upcoming__overline">Phase ${number} · À venir</p>
        <h2 class="upcoming__title">${title}</h2>
        <p class="upcoming__goal">${goal}</p>
        <p class="upcoming__message">${message}</p>
      </div>
    </section>
  `;
}

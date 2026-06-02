// Phase 3 — La charge & le contrôle
// État : à venir. Sera détaillée au passage du critère d'entrée.

export default {
  meta: {
    id: 3,
    number: "03",
    title: "La charge & le contrôle",
    subtitle:
      "Renforcement plus lourd, travail unipodal, contrôle neuromusculaire et équilibre.",
    statusLabel: "À venir",
    status: "upcoming",
    goal:
      "Renforcement plus lourd, travail unipodal, contrôle neuromusculaire et équilibre. Le genou apprend à encaisser.",
  },

  toc: [],

  render() {
    return upcomingPanel({
      number: "03",
      title: "La charge & le contrôle",
      goal:
        "Renforcement plus lourd, travail unipodal, contrôle neuromusculaire et équilibre. Le genou apprend à encaisser.",
      message:
        "Sera détaillée <strong>au passage du critère d'entrée</strong>. Les critères seront précisés au passage de la phase 2, en fonction de l'évolution réelle.",
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

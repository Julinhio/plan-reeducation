// Phase 2 — La base
// État : à venir. Sera détaillée au passage du critère d'entrée.

export default {
  meta: {
    id: 2,
    number: "02",
    title: "La base",
    subtitle:
      "Force de base du quad et des muscles autour, sans pivot ni impact.",
    statusLabel: "À venir",
    status: "upcoming",
    goal:
      "Force de base du quad et des muscles autour, dans des amplitudes sûres, sans pivot ni impact. Muscu contrôlée.",
  },

  toc: [],

  render() {
    return upcomingPanel({
      number: "02",
      title: "La base",
      goal:
        "Force de base du quad et des muscles autour, dans des amplitudes sûres, sans pivot ni impact. Muscu contrôlée.",
      message:
        "Sera détaillée <strong>au passage du critère d'entrée</strong> — pour l'instant on cherche à rallumer le VMO et à récupérer l'extension active complète. Tant que la phase 1 n'a pas coché ses cases, charger reviendrait à construire sur du sable.",
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

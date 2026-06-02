// =====================================================================
// Moteur de rendu et navigation.
// - Construit le stepper à partir des metadata de chaque phase.
// - Rend le panneau de chaque phase (HTML construit par phase-X.js).
// - Bascule entre phases avec un crossfade géré en CSS (panel-enter).
// - Phase 1 active : sub-nav latérale + indicateur de section au scroll.
// - Respecte prefers-reduced-motion via les transitions CSS.
// =====================================================================

import { phases, getDefaultPhaseId, getPhaseById } from "./content/phases.js";

const STEPPER = document.getElementById("stepper-list");
const PANELS = document.getElementById("panels");
const TAGLINE_PREFIX = document.querySelector("[data-tagline-prefix]");
const TAGLINE_TITLE = document.querySelector("[data-tagline-title]");
const MASTHEAD_STATUS = document.getElementById("masthead-status");

let activePhaseId = getDefaultPhaseId();
let tocObserver = null;

// ---------------------------------------------------------------------
// stepper
// ---------------------------------------------------------------------

function renderStepper() {
  STEPPER.innerHTML = phases
    .map((phase) => {
      const { id, number, title, statusLabel, status } = phase.meta;
      return `
        <li>
          <button
            type="button"
            class="step"
            data-phase="${id}"
            data-status="${status}"
            role="tab"
            aria-controls="panel-${id}"
            aria-selected="false"
          >
            <span class="step__num">${number}</span>
            <span class="step__body">
              <span class="step__title">${title}</span>
              <span class="step__status">${statusLabel}</span>
            </span>
          </button>
        </li>
      `;
    })
    .join("");

  STEPPER.addEventListener("click", (event) => {
    const button = event.target.closest("[data-phase]");
    if (!button) return;
    const id = Number(button.dataset.phase);
    setActivePhase(id);
  });

  STEPPER.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const buttons = Array.from(STEPPER.querySelectorAll("[data-phase]"));
    const currentIndex = buttons.findIndex(
      (b) => Number(b.dataset.phase) === activePhaseId
    );
    if (currentIndex === -1) return;
    const next =
      event.key === "ArrowRight"
        ? buttons[(currentIndex + 1) % buttons.length]
        : buttons[(currentIndex - 1 + buttons.length) % buttons.length];
    next.focus();
    setActivePhase(Number(next.dataset.phase));
    event.preventDefault();
  });
}

function updateStepperState() {
  STEPPER.querySelectorAll("[data-phase]").forEach((button) => {
    const isActive = Number(button.dataset.phase) === activePhaseId;
    button.setAttribute("aria-current", isActive ? "true" : "false");
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.tabIndex = isActive ? 0 : -1;
  });
}

// ---------------------------------------------------------------------
// panels
// ---------------------------------------------------------------------

function renderAllPanels() {
  PANELS.innerHTML = phases
    .map((phase) => {
      const { id, status } = phase.meta;
      const hasToc = phase.toc && phase.toc.length > 0;
      const inner = hasToc
        ? `
            <div class="phase">
              <aside class="toc" aria-label="Sommaire de la phase">
                <p class="toc__label">Sommaire</p>
                <ul class="toc__list" data-toc-list>
                  ${phase.toc
                    .map(
                      (item) => `
                        <li>
                          <a class="toc__link" href="#${item.id}" data-toc-link="${item.id}">${item.label}</a>
                        </li>
                      `
                    )
                    .join("")}
                </ul>
              </aside>
              <div class="phase__body" data-phase-body>${phase.render()}</div>
            </div>
          `
        : phase.render();

      return `
        <section
          class="panel"
          id="panel-${id}"
          role="tabpanel"
          aria-labelledby="step-${id}"
          data-active="false"
          data-status="${status}"
        >
          ${inner}
        </section>
      `;
    })
    .join("");
}

function updateActivePanel() {
  const activePhase = getPhaseById(activePhaseId);
  if (!activePhase) return;

  PANELS.querySelectorAll(".panel").forEach((panel) => {
    const isActive = panel.id === `panel-${activePhaseId}`;
    panel.setAttribute("data-active", isActive ? "true" : "false");
  });

  // Update tagline + masthead status
  TAGLINE_PREFIX.textContent = `Phase ${activePhase.meta.number.replace(
    /^0/,
    ""
  )}`;
  TAGLINE_TITLE.textContent = activePhase.meta.subtitle;
  MASTHEAD_STATUS.textContent =
    activePhase.meta.status === "active"
      ? `Phase ${activePhase.meta.number.replace(/^0/, "")} en cours`
      : `Phase ${activePhase.meta.number.replace(/^0/, "")} — à venir`;

  // (Re)wire TOC for this panel
  setupTocForActivePanel();
}

function setActivePhase(id) {
  if (id === activePhaseId) return;
  activePhaseId = id;
  updateStepperState();
  updateActivePanel();

  // Reset the scroll subtly when changing phase, but don't jolt the user
  // out of the page. Just scroll to the top of the panel host if we're
  // past it. Avoids the surprise of landing mid-content of another phase.
  const main = document.getElementById("main");
  const rect = main.getBoundingClientRect();
  if (rect.top < 0) {
    main.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// ---------------------------------------------------------------------
// TOC : highlight au scroll + indicateur latéral
// ---------------------------------------------------------------------

function setupTocForActivePanel() {
  // Tear down previous observer
  if (tocObserver) {
    tocObserver.disconnect();
    tocObserver = null;
  }

  const activePanel = document.getElementById(`panel-${activePhaseId}`);
  if (!activePanel) return;

  const tocList = activePanel.querySelector("[data-toc-list]");
  if (!tocList) return;

  const links = Array.from(activePanel.querySelectorAll("[data-toc-link]"));
  const sectionIds = links.map((l) => l.dataset.tocLink);
  const sections = sectionIds
    .map((id) => activePanel.querySelector(`#${id}`))
    .filter(Boolean);

  if (!sections.length) return;

  const setActiveLink = (sectionId) => {
    links.forEach((link) => {
      const isActive = link.dataset.tocLink === sectionId;
      link.setAttribute("aria-current", isActive ? "true" : "false");
    });
    moveTocIndicator(tocList, sectionId);
  };

  // Initialize on the first section
  setActiveLink(sectionIds[0]);

  tocObserver = new IntersectionObserver(
    (entries) => {
      // Pick the entry whose top is closest to the upper viewport band.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveLink(visible[0].target.id);
      }
    },
    {
      // Top band: anything entering between ~120px from top and ~50% of viewport.
      rootMargin: "-130px 0px -55% 0px",
      threshold: 0,
    }
  );

  sections.forEach((sec) => tocObserver.observe(sec));

  // Click handling : smooth scroll + immediate highlight
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.dataset.tocLink;
      const target = activePanel.querySelector(`#${targetId}`);
      if (!target) return;
      const top =
        target.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({
        top,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
      setActiveLink(targetId);
    });
  });
}

function moveTocIndicator(tocList, sectionId) {
  const activeLink = tocList.querySelector(`[data-toc-link="${sectionId}"]`);
  if (!activeLink) return;

  // Use the link's offset within the list parent. Works because the
  // tocList is its offsetParent (positioned via the ::before pseudo).
  const listRect = tocList.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const top = linkRect.top - listRect.top;
  const height = linkRect.height;

  tocList.style.setProperty("--toc-indicator-top", `${top}px`);
  tocList.style.setProperty("--toc-indicator-height", `${height}px`);
  tocList.style.setProperty("--toc-indicator-opacity", "1");
}

// Recompute indicator on resize (font load can change line heights).
let resizeRaf = null;
window.addEventListener("resize", () => {
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    const activePanel = document.getElementById(`panel-${activePhaseId}`);
    if (!activePanel) return;
    const tocList = activePanel.querySelector("[data-toc-list]");
    if (!tocList) return;
    const current = activePanel.querySelector("[data-toc-link][aria-current='true']");
    if (current) moveTocIndicator(tocList, current.dataset.tocLink);
  });
});

// Recompute once fonts have loaded (heights shift, indicator follows).
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    const activePanel = document.getElementById(`panel-${activePhaseId}`);
    if (!activePanel) return;
    const tocList = activePanel.querySelector("[data-toc-list]");
    if (!tocList) return;
    const current = activePanel.querySelector("[data-toc-link][aria-current='true']");
    if (current) moveTocIndicator(tocList, current.dataset.tocLink);
  });
}

// ---------------------------------------------------------------------
// boot
// ---------------------------------------------------------------------

renderStepper();
renderAllPanels();
updateStepperState();
updateActivePanel();

import { useEffect, useState } from "react";
import { isUnlocked } from "./lib/auth.js";
import { getDefaultPhaseId, getPhaseById } from "./content/phases.js";
import PasswordGate from "./components/shell/PasswordGate.jsx";
import Masthead from "./components/shell/Masthead.jsx";
import Stepper from "./components/shell/Stepper.jsx";
import ViewTabs from "./components/shell/ViewTabs.jsx";
import Footer from "./components/shell/Footer.jsx";
import PhaseReader from "./components/reading/PhaseReader.jsx";
import ExercicesView from "./components/exercices/ExercicesView.jsx";
import JournalView from "./components/journal/JournalView.jsx";
import ProgressionView from "./components/progression/ProgressionView.jsx";
import CriteriaView from "./components/criteria/CriteriaView.jsx";
import CoachView from "./components/coach/CoachView.jsx";

export default function App() {
  const [unlocked, setUnlocked] = useState(() => isUnlocked());
  const [activePhaseId, setActivePhaseId] = useState(getDefaultPhaseId());
  const [activeView, setActiveView] = useState("reading");

  const activePhase = getPhaseById(activePhaseId);
  const isUpcoming = activePhase.meta.status === "upcoming";
  const disabledViews = isUpcoming
    ? ["exercices", "journal", "progression", "criteria", "coach"]
    : [];

  useEffect(() => {
    if (isUpcoming) setActiveView("reading");
  }, [isUpcoming, activePhaseId]);

  function handlePhaseChange(id) {
    if (id === activePhaseId) return;
    setActivePhaseId(id);
    const main = document.getElementById("main");
    if (main) {
      const rect = main.getBoundingClientRect();
      if (rect.top < 0) {
        main.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>

      <Masthead activePhase={activePhase} />
      <Stepper activePhaseId={activePhaseId} onSelect={handlePhaseChange} />
      <ViewTabs
        activeView={activeView}
        onSelect={setActiveView}
        disabledViews={disabledViews}
      />

      <main
        id="main"
        className="py-8 sm:py-12 pb-24 min-h-[calc(100dvh-220px)]"
      >
        <div className="shell">
          <div key={`${activePhaseId}-${activeView}`} className="rise">
            {activeView === "reading" && (
              <PhaseReader phase={activePhase} />
            )}
            {activeView === "exercices" && !isUpcoming && (
              <ExercicesView phase={activePhase} />
            )}
            {activeView === "journal" && !isUpcoming && <JournalView />}
            {activeView === "progression" && !isUpcoming && (
              <ProgressionView phase={activePhase} />
            )}
            {activeView === "criteria" && !isUpcoming && (
              <CriteriaView targetPhase={activePhaseId + 1} />
            )}
            {activeView === "coach" && !isUpcoming && <CoachView />}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

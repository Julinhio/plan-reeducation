import { useState } from "react";
import { tryUnlock } from "../../lib/auth.js";

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const ok = tryUnlock(value);
    if (ok) {
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 320);
    }
    setSubmitting(false);
  }

  return (
    <div className="min-h-[100dvh] grid place-items-center px-5 py-12">
      <div className="w-full max-w-sm rise">
        <div className="text-center mb-8">
          <p className="overline text-ink-mute mb-3">
            <span className="pulse-dot align-middle mr-2" />
            Document de travail
          </p>
          <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
            Plan de rééducation
          </h1>
          <p className="font-display italic text-ink-soft mt-2">
            Genou droit
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`bg-paper-card border border-rule-soft rounded-2xl p-6 shadow-sm transition-transform ${
            shake ? "animate-[shake_320ms_ease-out]" : ""
          }`}
        >
          <label
            htmlFor="password"
            className="block text-xs font-mono uppercase tracking-[0.14em] text-ink-mute mb-2"
          >
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            autoComplete="current-password"
            className="w-full px-3 py-2.5 rounded-lg border border-rule bg-paper-soft text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full px-4 py-2.5 rounded-lg bg-accent text-paper font-medium tracking-wide btn-press hover:bg-accent-bright disabled:opacity-60"
          >
            Entrer
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-ink-mute">
          Personnel, ne remplace pas l'avis d'un médecin.
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  );
}

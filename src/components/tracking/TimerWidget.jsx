import { useEffect, useRef, useState } from "react";

export default function TimerWidget({ label, durationSec }) {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(durationSec);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (!running) return undefined;

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 0.1) {
          beep();
          setRunning(false);
          return durationSec;
        }
        return r - 0.1;
      });
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [running, durationSec]);

  useEffect(() => {
    if (!running) setRemaining(durationSec);
  }, [durationSec, running]);

  function beep() {
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.32);
      osc.start();
      osc.stop(ctx.currentTime + 0.34);
    } catch (e) {
      console.warn("Beep impossible", e);
    }
  }

  function toggle() {
    if (running) {
      setRunning(false);
      setRemaining(durationSec);
    } else {
      // unlock audio on user gesture
      if (!audioCtxRef.current) {
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) audioCtxRef.current = new Ctx();
        } catch {
          /* noop */
        }
      }
      setRemaining(durationSec);
      setRunning(true);
    }
  }

  const pct = ((durationSec - remaining) / durationSec) * 100;

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={toggle}
        className={[
          "relative overflow-hidden rounded-full px-4 py-2 text-sm font-medium btn-press border min-w-[120px] text-left",
          running
            ? "bg-accent text-paper border-accent"
            : "bg-paper-soft text-ink border-rule hover:border-rule-strong",
        ].join(" ")}
        aria-label={running ? "Arrêter le timer" : `Démarrer ${label}`}
      >
        {running && (
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 bg-accent-bright/30"
            style={{
              width: `${pct}%`,
              transition: "width 100ms linear",
            }}
          />
        )}
        <span className="relative tabular-nums">
          {running ? `${remaining.toFixed(1)} s` : label}
        </span>
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import Slider from "../ui/Slider.jsx";
import { Label, Textarea, ChoiceChips, Toggle } from "../ui/Field.jsx";

const KNEE_OPTIONS = [
  { value: "raide", label: "Raide" },
  { value: "moyen", label: "Moyen" },
  { value: "ok", label: "OK" },
  { value: "bon", label: "Bon" },
];

const MOOD_OPTIONS = [
  { value: "frustre", label: "Frustré" },
  { value: "neutre", label: "Neutre" },
  { value: "motive", label: "Motivé" },
  { value: "leger", label: "Léger" },
];

export default function JournalEntryForm({ dateKey, entry, onSave }) {
  const [kneeMorning, setKneeMorning] = useState(null);
  const [swelling, setSwelling] = useState(false);
  const [mobility, setMobility] = useState(6);
  const [pain, setPain] = useState(3);
  const [mood, setMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setKneeMorning(entry?.knee_morning ?? null);
    setSwelling(entry?.swelling ?? false);
    setMobility(entry?.mobility ?? 6);
    setPain(entry?.pain ?? 3);
    setMood(entry?.mood ?? null);
    setNotes(entry?.notes ?? "");
    setSaved(false);
  }, [entry, dateKey]);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    try {
      await onSave({
        entry_date: dateKey,
        knee_morning: kneeMorning,
        swelling,
        mobility,
        pain,
        mood,
        notes: notes || null,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2400);
    } catch (err) {
      console.error(err);
      alert("Erreur d'enregistrement, voir console.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-paper-card border border-rule-soft rounded-xl p-5 sm:p-7 flex flex-col gap-5"
    >
      <div>
        <Label>État du genou au réveil</Label>
        <div className="mt-2">
          <ChoiceChips
            value={kneeMorning}
            onChange={setKneeMorning}
            options={KNEE_OPTIONS}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Toggle
          label="Gonflement"
          checked={swelling}
          onChange={setSwelling}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Slider
          id="mobility"
          label="Mobilité ressentie"
          value={mobility}
          onChange={setMobility}
        />
        <Slider
          id="pain"
          label="Douleur"
          value={pain}
          onChange={setPain}
        />
      </div>

      <div>
        <Label>Humeur</Label>
        <div className="mt-2">
          <ChoiceChips value={mood} onChange={setMood} options={MOOD_OPTIONS} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          rows={4}
          placeholder="Ce qui te marque aujourd'hui"
          value={notes}
          onChange={setNotes}
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={busy}
          className="px-5 py-2.5 rounded-lg bg-ink text-paper-soft text-sm font-medium btn-press hover:bg-teal-deep disabled:opacity-60"
        >
          {busy ? "Enregistrement..." : entry ? "Mettre à jour" : "Enregistrer"}
        </button>
        {saved && (
          <span className="text-sm text-moss-deep font-medium animate-[fadeIn_200ms_ease-out]">
            Enregistré
          </span>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </form>
  );
}

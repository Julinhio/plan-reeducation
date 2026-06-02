import { useState } from "react";
import { toDateKey } from "../../lib/dates.js";
import Slider from "../ui/Slider.jsx";
import { Label, NumberInput, TextInput, Textarea } from "../ui/Field.jsx";

export default function MeasurementForm({ onSubmit }) {
  const [date, setDate] = useState(toDateKey(new Date()));
  const [deficit, setDeficit] = useState(null);
  const [vmo, setVmo] = useState(5);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await onSubmit({
        measured_on: date,
        extension_deficit_degrees: deficit,
        vmo_quality: vmo,
        notes: notes || null,
      });
      setDeficit(null);
      setNotes("");
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
      className="bg-paper-card border border-rule-soft rounded-xl p-5 flex flex-col gap-4"
    >
      <header>
        <p className="overline text-ink-mute">Nouvelle mesure</p>
        <h3 className="font-display text-lg text-ink mt-1">Saisir aujourd'hui</h3>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="m-date">Date</Label>
          <TextInput
            id="m-date"
            type="date"
            value={date}
            onChange={setDate}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="m-deficit">Déficit d'extension (degrés)</Label>
          <NumberInput
            id="m-deficit"
            value={deficit}
            onChange={setDeficit}
            min={0}
            max={45}
            placeholder="3"
          />
        </div>
      </div>

      <Slider
        id="m-vmo"
        label="Qualité contraction VMO"
        value={vmo}
        onChange={setVmo}
      />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="m-notes">Notes</Label>
        <Textarea
          id="m-notes"
          rows={2}
          value={notes}
          onChange={setNotes}
          placeholder="Contexte, sensation, observation"
        />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="self-start px-4 py-2 rounded-lg bg-ink text-paper-soft text-sm font-medium btn-press hover:bg-teal-deep disabled:opacity-60"
      >
        {busy ? "Enregistrement..." : "Ajouter la mesure"}
      </button>
    </form>
  );
}

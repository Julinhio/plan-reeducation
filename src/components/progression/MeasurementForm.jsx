import { useState } from "react";
import { toDateKey } from "../../lib/dates.js";
import Slider from "../ui/Slider.jsx";
import { Label, NumberInput, TextInput, Textarea } from "../ui/Field.jsx";

// Formulaire de mesure post-op. Tout est optionnel sauf la date :
// on log ce qu'on a mesuré, les courbes relient les points existants.
export default function MeasurementForm({ onSubmit }) {
  const [date, setDate] = useState(toDateKey(new Date()));
  const [deficit, setDeficit] = useState(null);
  const [vmo, setVmo] = useState(5);
  const [flexActive, setFlexActive] = useState(null);
  const [flexPassive, setFlexPassive] = useState(null);
  const [thighOp, setThighOp] = useState(null);
  const [thighSain, setThighSain] = useState(null);
  const [weight, setWeight] = useState(null);
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
        flexion_active_degrees: flexActive,
        flexion_passive_degrees: flexPassive,
        thigh_circ_op_cm: thighOp,
        thigh_circ_sain_cm: thighSain,
        weight_kg: weight,
        notes: notes || null,
      });
      setDeficit(null);
      setFlexActive(null);
      setFlexPassive(null);
      setThighOp(null);
      setThighSain(null);
      setWeight(null);
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
      className="bg-paper-card border border-rule-soft rounded-2xl p-5 flex flex-col gap-4"
    >
      <header>
        <p className="overline text-ink-mute">Nouvelle mesure</p>
        <h3 className="font-display text-lg text-ink mt-1">Saisir aujourd'hui</h3>
        <p className="text-xs text-ink-mute mt-1 leading-relaxed">
          Circonférence : 10 cm au-dessus de la rotule, même repère, même heure.
        </p>
      </header>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="m-date">Date</Label>
        <TextInput id="m-date" type="date" value={date} onChange={setDate} />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="overline text-ink-mute mb-1">Cuisse (cm)</legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="m-thigh-op">Opérée</Label>
            <NumberInput
              id="m-thigh-op"
              value={thighOp}
              onChange={setThighOp}
              min={30}
              max={90}
              step={0.1}
              placeholder="52.5"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="m-thigh-sain">Saine</Label>
            <NumberInput
              id="m-thigh-sain"
              value={thighSain}
              onChange={setThighSain}
              min={30}
              max={90}
              step={0.1}
              placeholder="55"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="overline text-ink-mute mb-1">Amplitudes (degrés)</legend>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="m-flex-a">Flexion active</Label>
            <NumberInput
              id="m-flex-a"
              value={flexActive}
              onChange={setFlexActive}
              min={0}
              max={160}
              placeholder="85"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="m-flex-p">Flexion passive</Label>
            <NumberInput
              id="m-flex-p"
              value={flexPassive}
              onChange={setFlexPassive}
              min={0}
              max={160}
              placeholder="90"
            />
          </div>
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
      </fieldset>

      <Slider
        id="m-vmo"
        label="Qualité contraction VMO"
        value={vmo}
        onChange={setVmo}
      />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="m-weight">Poids (kg)</Label>
        <NumberInput
          id="m-weight"
          value={weight}
          onChange={setWeight}
          min={60}
          max={130}
          step={0.1}
          placeholder="94.5"
        />
      </div>

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
        className="self-start px-4 py-2 rounded-lg bg-accent text-paper text-sm font-medium btn-press hover:bg-accent-bright disabled:opacity-60"
      >
        {busy ? "Enregistrement..." : "Ajouter la mesure"}
      </button>
    </form>
  );
}

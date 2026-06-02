import { useCallback, useState } from "react";
import { toDateKey } from "../../lib/dates.js";
import { useJournalEntry, useJournalHistory } from "../../hooks/useJournal.js";
import DayPicker from "../tracking/DayPicker.jsx";
import JournalEntryForm from "./JournalEntryForm.jsx";
import JournalHistory from "./JournalHistory.jsx";

export default function JournalView() {
  const [dateKey, setDateKey] = useState(toDateKey(new Date()));
  const { entry, loading, save } = useJournalEntry(dateKey);
  const { entries, reload: reloadHistory } = useJournalHistory(60);

  const handleSave = useCallback(
    async (payload) => {
      await save(payload);
      reloadHistory();
    },
    [save, reloadHistory]
  );

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-10 items-start">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="overline text-ink-mute">Journal</p>
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight">
              Entrée du jour
            </h2>
            <p className="text-sm text-ink-soft mt-1 max-w-prose">
              Capture rapide, une entrée par jour. Le format reste court pour ne pas décourager.
            </p>
          </div>
          <DayPicker dateKey={dateKey} onChange={setDateKey} />
        </header>

        {loading ? (
          <p className="text-sm text-ink-mute">Chargement...</p>
        ) : (
          <JournalEntryForm
            dateKey={dateKey}
            entry={entry}
            onSave={handleSave}
          />
        )}
      </div>

      <aside className="lg:sticky lg:top-32">
        <p className="overline text-ink-mute mb-3">Historique</p>
        <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
          <JournalHistory
            entries={entries}
            currentDateKey={dateKey}
            onSelect={setDateKey}
          />
        </div>
      </aside>
    </section>
  );
}

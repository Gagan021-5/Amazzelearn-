import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const events = [
  {
    id: "revolt-1857",
    title: "Revolt of 1857 Begins",
    detail: "A major uprising challenged East India Company rule in 1857.",
    year: 1857,
    tone: "from-rose-300 to-orange-400",
  },
  {
    id: "inc-1885",
    title: "Indian National Congress Formed",
    detail: "A national political platform was founded in Bombay in 1885.",
    year: 1885,
    tone: "from-sky-300 to-cyan-400",
  },
  {
    id: "jallianwala-1919",
    title: "Jallianwala Bagh Massacre",
    detail: "British troops fired on an unarmed gathering in Amritsar on April 13, 1919.",
    year: 1919,
    tone: "from-violet-300 to-fuchsia-400",
  },
  {
    id: "salt-march-1930",
    title: "Salt March",
    detail: "Mahatma Gandhi began the Salt March in 1930 to protest the salt tax.",
    year: 1930,
    tone: "from-amber-300 to-yellow-400",
  },
  {
    id: "independence-1947",
    title: "India Becomes Independent",
    detail: "British rule ended on August 15, 1947.",
    year: 1947,
    tone: "from-emerald-300 to-teal-400",
  },
  {
    id: "constitution-1950",
    title: "Constitution Comes Into Force",
    detail: "India became a republic on January 26, 1950.",
    year: 1950,
    tone: "from-indigo-300 to-sky-400",
  },
];

const orderedEventIds = events
  .slice()
  .sort((first, second) => first.year - second.year)
  .map((event) => event.id);

const slots = [
  { id: "slot-1", label: "1st", note: "Earliest event" },
  { id: "slot-2", label: "2nd", note: "Next turning point" },
  { id: "slot-3", label: "3rd", note: "Continuing movement" },
  { id: "slot-4", label: "4th", note: "Rising national action" },
  { id: "slot-5", label: "5th", note: "Political change" },
  { id: "slot-6", label: "6th", note: "Latest event" },
];

export default function HistoryTimeline({ controller }) {
  const {
    placements,
    selectedItemId,
    setSelectedItemId,
    setDraggedItemId,
    placeItem,
    clearZone,
    isPlaced,
  } = useSinglePlacementGame(
    slots.map((slot) => slot.id),
    controller.sessionId,
  );

  const eventMap = useMemo(
    () => Object.fromEntries(events.map((event) => [event.id, event])),
    [],
  );

  const solved = slots.every(
    (slot, index) => placements[slot.id] === orderedEventIds[index],
  );

  const sequencePreview = slots
    .map((slot) => placements[slot.id])
    .filter(Boolean)
    .map((eventId) => eventMap[eventId]);

  const handleSelect = (itemId) => {
    controller.clearFeedback();
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  };

  const handlePlace = (slotId, itemId) => {
    if (controller.isLocked || !itemId) {
      return;
    }

    controller.clearFeedback();
    placeItem(slotId, itemId);
  };

  const handleCheck = () => {
    if (slots.some((slot) => !placements[slot.id])) {
      controller.submitAttempt(false, {
        failure:
          "Fill every timeline position before checking the chronology so the full story can be evaluated.",
        locked:
          "All attempts are used. Restart the timeline and arrange the events again.",
      });
      return;
    }

    controller.submitAttempt(solved, {
      success:
        "Excellent chronology. The events now run from the 1857 revolt to the Constitution coming into force on January 26, 1950.",
      failure:
        "The sequence is still out of order. Re-check the years and move each event into the correct place.",
      locked:
        "All attempts are used. Restart the timeline and rebuild the sequence.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Event Deck
            </p>
            <h2 className="mt-2 text-2xl font-bold">Freedom to republic timeline</h2>
          </div>
          <div className="rounded-2xl bg-lime-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
              Goal
            </p>
            <p className="mt-1 text-sm font-bold text-lime-900">
              Order the milestones correctly
            </p>
          </div>
        </div>

        <div className="inventory-rail hide-scrollbar mt-5">
          {events.map((event) => (
            <button
              key={event.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(event.id);
                setSelectedItemId(event.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(event.id)}
              disabled={controller.isLocked}
              className={[
                "token-card h-full",
                selectedItemId === event.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(event.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-11 w-11 rounded-2xl bg-gradient-to-br ${event.tone}`}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900">
                    {event.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{event.detail}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {event.year}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Chronology Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Build the historical sequence</h2>
          </div>
          <div
            className={`status-pill ${
              solved ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            {solved ? "Sequence complete" : "Arrange earliest to latest"}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#f7fee7_0%,#ffffff_54%,#fff7ed_100%)] p-4 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-4 sm:p-6">
                <div className="hidden items-center gap-3 xl:flex">
                  <div className="relative h-2 flex-1 rounded-full bg-slate-200">
                    <motion.div
                      className="h-2 rounded-full bg-emerald-400"
                      animate={{ width: solved ? "100%" : `${sequencePreview.length * 16}%` }}
                      transition={{ duration: 0.4 }}
                    />
                    {/* Dot markers for each slot */}
                    {slots.map((slot, index) => (
                      <motion.div
                        key={slot.id}
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{ left: `${(index / (slots.length - 1)) * 100}%` }}
                        initial={false}
                        animate={{
                          scale: placements[slot.id] ? [1.4, 1] : 1,
                          backgroundColor: placements[slot.id] ? "#10b981" : "#e2e8f0",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        <div className="h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: "inherit" }} />
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {slots.map((slot) => {
                    const event = placements[slot.id]
                      ? eventMap[placements[slot.id]]
                      : null;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={controller.isLocked}
                        onClick={() => handlePlace(slot.id, selectedItemId)}
                        onDragOver={(eventArg) => eventArg.preventDefault()}
                        onDrop={(eventArg) => {
                          eventArg.preventDefault();
                          handlePlace(slot.id, selectedItemId);
                        }}
                        className="flex min-h-[200px] flex-col rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-left"
                      >
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {slot.label}
                        </span>
                        <span className="mt-2 text-sm text-slate-500">{slot.note}</span>
                        <div className="mt-4 flex-1 rounded-[20px] bg-white/90 p-4 shadow-sm">
                          <AnimatePresence mode="wait">
                            {event ? (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                              >
                                <div
                                  className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${event.tone}`}
                                />
                                <p className="mt-3 text-sm font-semibold text-slate-900">
                                  {event.title}
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                  {event.detail}
                                </p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                                  {event.year}
                                </p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key={`${slot.id}-empty`}
                                initial={{ opacity: 0.6 }}
                                animate={{ opacity: 1 }}
                                className="flex h-full items-center justify-center text-center text-sm font-semibold text-slate-400"
                              >
                                Drop event card here
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="panel-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Current order
                </p>
                <div className="mt-3 space-y-3">
                  {sequencePreview.length > 0 ? (
                    sequencePreview.map((event, index) => (
                      <div key={event.id} className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Position {index + 1}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {event.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">{event.year}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                      Add events to the timeline to preview the current sequence.
                    </div>
                  )}
                </div>
              </div>

              <div className="panel-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Historical lens
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  This sequence tracks how resistance, political organization,
                  protest, independence, and constitutional democracy built on
                  one another over time.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={controller.isLocked}
                  className="soft-button-primary"
                >
                  Check Timeline
                </button>
                {slots.map((slot) =>
                  placements[slot.id] ? (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => clearZone(slot.id)}
                      className="soft-button-secondary"
                    >
                      Clear {slot.label}
                    </button>
                  ) : null,
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

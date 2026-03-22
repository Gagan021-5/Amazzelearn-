import { useMemo } from "react";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const events = [
  {
    id: "moon-landing",
    title: "Moon Landing",
    detail: "Humans first stepped on the Moon.",
    year: 1969,
    tone: "from-sky-300 to-indigo-400",
  },
  {
    id: "magna-carta",
    title: "Magna Carta Signed",
    detail: "A charter limited royal power in England.",
    year: 1215,
    tone: "from-amber-300 to-orange-400",
  },
  {
    id: "declaration",
    title: "Declaration of Independence",
    detail: "The United States declared independence.",
    year: 1776,
    tone: "from-rose-300 to-orange-400",
  },
  {
    id: "printing-press",
    title: "Printing Press Spreads",
    detail: "Books became easier to copy and share.",
    year: 1440,
    tone: "from-emerald-300 to-teal-400",
  },
];

const orderedEventIds = [
  "magna-carta",
  "printing-press",
  "declaration",
  "moon-landing",
];

const slots = [
  { id: "slot-1", label: "1st", note: "Earliest" },
  { id: "slot-2", label: "2nd", note: "Next event" },
  { id: "slot-3", label: "3rd", note: "Then" },
  { id: "slot-4", label: "4th", note: "Latest" },
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
    controller.submitAttempt(solved, {
      success:
        "Timeline complete. The events are placed from earliest to latest in the correct order.",
      failure:
        "The sequence is still out of order. Rearrange the cards and test the timeline again.",
      locked:
        "All attempts are used. Restart the timeline and rebuild the chronology.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Event Cards
        </p>
        <h2 className="mt-2 text-2xl font-bold">Arrange these milestones</h2>
        <div className="mt-5 grid gap-3">
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
                "token-card text-left",
                selectedItemId === event.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(event.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br ${event.tone}`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {event.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{event.detail}</p>
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
              Timeline Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Place the events in order</h2>
          </div>
          <div className="rounded-full bg-lime-50 px-4 py-2 text-sm font-semibold text-lime-700">
            Earliest event on the left, latest on the right
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#f7fee7_0%,#ffffff_54%,#fff7ed_100%)] p-4 sm:p-6">
          <div className="overflow-hidden rounded-[26px] border border-white/70 bg-white/90 p-4 sm:p-6">
            <div className="hidden items-center gap-3 md:flex">
              <div className="h-2 flex-1 rounded-full bg-slate-200" />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-4">
              {slots.map((slot) => {
                const event = placements[slot.id] ? eventMap[placements[slot.id]] : null;

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
                    className="flex min-h-[180px] flex-col rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50/70 p-4 text-left"
                  >
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {slot.label}
                    </span>
                    <span className="mt-2 text-sm text-slate-500">{slot.note}</span>
                    <div className="mt-4 flex-1 rounded-[20px] bg-white/85 p-4 shadow-sm">
                      {event ? (
                        <>
                          <div
                            className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${event.tone}`}
                          />
                          <p className="mt-3 text-sm font-semibold text-slate-900">
                            {event.title}
                          </p>
                          <p className="mt-2 text-sm text-slate-600">{event.detail}</p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {event.year}
                          </p>
                        </>
                      ) : (
                        <div className="flex h-full items-center justify-center text-center text-sm font-semibold text-slate-400">
                          Drop event card here
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
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
  );
}

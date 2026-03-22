import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const slots = [
  { id: "source", label: "Power Source", hint: "Battery goes here", top: "top-[66%]", left: "left-[10%]" },
  { id: "connector", label: "Circuit Path", hint: "Wire goes here", top: "top-[18%]", left: "left-[41%]" },
  { id: "bulb", label: "Light Output", hint: "Bulb goes here", top: "top-[66%]", left: "left-[72%]" },
];

const parts = [
  { id: "battery", label: "Battery", note: "Provides the electrical energy.", tone: "from-rose-400 to-orange-400" },
  { id: "wire", label: "Wire", note: "Carries the current around the loop.", tone: "from-slate-400 to-slate-600" },
  { id: "bulb", label: "Bulb", note: "Lights up when the circuit closes.", tone: "from-amber-300 to-yellow-400" },
];

export default function CircuitBuilder({ controller }) {
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

  const slotMap = useMemo(
    () => Object.fromEntries(parts.map((part) => [part.id, part])),
    [],
  );

  const previewPowered =
    placements.source === "battery" &&
    placements.connector === "wire" &&
    placements.bulb === "bulb";

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
    controller.submitAttempt(previewPowered, {
      success:
        "Circuit complete. The battery, wire, and bulb form a closed loop and the lamp lights up.",
      failure:
        "The loop is not complete yet. Match each component to its correct snap zone and test again.",
      locked:
        "The board is locked after 10 tries. Restart the challenge and rebuild the circuit.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Inventory Tray
        </p>
        <h2 className="mt-2 text-2xl font-bold">Circuit parts</h2>
        <div className="mt-5 grid gap-3">
          {parts.map((part) => (
            <button
              key={part.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(part.id);
                setSelectedItemId(part.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(part.id)}
              className={[
                "token-card text-left",
                selectedItemId === part.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(part.id) ? "opacity-55" : "",
              ].join(" ")}
              disabled={controller.isLocked}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br ${part.tone}`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {part.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{part.note}</p>
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
              Physics Workbench
            </p>
            <h2 className="mt-2 text-2xl font-bold">Snap-grid circuit board</h2>
          </div>
          <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
            {previewPowered || controller.status === "success"
              ? "Bulb ready to glow"
              : "Place every part in the correct zone"}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_52%,#fff8eb_100%)] p-4 sm:p-6">
          <div className="relative min-h-[420px] overflow-hidden rounded-[26px] border border-white/70 bg-white/85 p-4">
            <div className="grid-fade absolute inset-0 opacity-55" />
            <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
              <motion.path
                d="M132 240H218V116H438V240H522"
                fill="none"
                stroke={previewPowered || controller.status === "success" ? "#f59e0b" : "#94a3b8"}
                strokeWidth="12"
                strokeLinecap="round"
                animate={{
                  pathLength: previewPowered || controller.status === "success" ? 1 : 0.65,
                  opacity: previewPowered || controller.status === "success" ? 1 : 0.75,
                }}
                transition={{ duration: 0.6 }}
              />
            </svg>

            {slots.map((slot) => {
              const placedPart = placements[slot.id] ? slotMap[placements[slot.id]] : null;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={controller.isLocked}
                  onClick={() => handlePlace(slot.id, selectedItemId)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handlePlace(slot.id, selectedItemId);
                  }}
                  className={`absolute ${slot.top} ${slot.left} flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-white/90 p-3 text-center shadow-sm transition hover:border-sky-300`}
                >
                  {placedPart ? (
                    <div>
                      <div
                        className={`mx-auto h-10 w-10 rounded-2xl bg-gradient-to-br ${placedPart.tone}`}
                      />
                      <p className="mt-2 text-xs font-semibold text-slate-700">
                        {placedPart.label}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {slot.label}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">{slot.hint}</p>
                    </div>
                  )}
                </button>
              );
            })}

            <div className="absolute bottom-10 left-8 rounded-[24px] border border-slate-200 bg-white/95 p-4 shadow-md">
              <div className="flex h-16 w-20 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#fb7185,#fb923c)] text-sm font-bold text-white">
                BAT
              </div>
            </div>

            <motion.div
              animate={{
                scale: previewPowered || controller.status === "success" ? [1, 1.08, 1] : 1,
                boxShadow:
                  previewPowered || controller.status === "success"
                    ? "0 0 0 18px rgba(250,204,21,0.18)"
                    : "0 0 0 0 rgba(250,204,21,0)",
              }}
              transition={{ duration: 1.4, repeat: previewPowered || controller.status === "success" ? Infinity : 0 }}
              className="absolute bottom-8 right-8 flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-300 bg-white"
            >
              <div
                className={`h-12 w-12 rounded-full ${
                  previewPowered || controller.status === "success"
                    ? "bg-yellow-300"
                    : "bg-slate-200"
                }`}
              />
            </motion.div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={controller.isLocked}
              className="soft-button-primary"
            >
              Check Circuit
            </button>
            {slots.map((slot) => (
              placements[slot.id] ? (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => clearZone(slot.id)}
                  className="soft-button-secondary"
                >
                  Clear {slot.label}
                </button>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

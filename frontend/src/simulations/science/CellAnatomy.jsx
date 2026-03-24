import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const organelles = [
  {
    id: "nucleus",
    label: "Nucleus",
    note: "Controls the cell and stores genetic material.",
    tone: "from-fuchsia-400 to-pink-400",
  },
  {
    id: "mitochondria",
    label: "Mitochondria",
    note: "Produces energy for the cell.",
    tone: "from-amber-300 to-orange-400",
  },
];

const zones = [
  {
    id: "nucleus-zone",
    label: "Nucleus Zone",
    hint: "Large central organelle",
    top: "top-[38%]",
    left: "left-[42%]",
  },
  {
    id: "mitochondria-zone",
    label: "Mitochondria Zone",
    hint: "Bean-shaped power center",
    top: "top-[66%]",
    left: "left-[64%]",
  },
];

export default function CellAnatomy({ controller }) {
  const {
    placements,
    selectedItemId,
    setSelectedItemId,
    setDraggedItemId,
    placeItem,
    clearZone,
    isPlaced,
  } = useSinglePlacementGame(
    zones.map((zone) => zone.id),
    controller.sessionId,
  );

  const organelleMap = useMemo(
    () => Object.fromEntries(organelles.map((item) => [item.id, item])),
    [],
  );

  const completed =
    placements["nucleus-zone"] === "nucleus" &&
    placements["mitochondria-zone"] === "mitochondria";

  const handleSelect = (itemId) => {
    controller.clearFeedback();
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  };

  const handlePlace = (zoneId, itemId) => {
    if (controller.isLocked || !itemId) {
      return;
    }

    controller.clearFeedback();
    placeItem(zoneId, itemId);
  };

  const handleCheck = () => {
    controller.submitAttempt(completed, {
      success:
        "Cell map complete. The nucleus and mitochondria are both in their correct locations.",
      failure:
        "One or more organelles are misplaced. Review each zone and try again.",
      locked:
        "You have used all attempts. Restart the cell map and place the organelles again.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Organelle Tray
        </p>
        <h2 className="mt-2 text-2xl font-bold">Drag into the cell</h2>
        <div className="inventory-rail hide-scrollbar mt-5">
          {organelles.map((organelle) => (
            <button
              key={organelle.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(organelle.id);
                setSelectedItemId(organelle.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(organelle.id)}
              disabled={controller.isLocked}
              className={[
                "token-card text-left",
                selectedItemId === organelle.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(organelle.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br ${organelle.tone}`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {organelle.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{organelle.note}</p>
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
              Biology Viewer
            </p>
            <h2 className="mt-2 text-2xl font-bold">Animal cell anatomy</h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Place each organelle in the highlighted zone
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#f0fdf4_0%,#ffffff_54%,#eff6ff_100%)] p-4 sm:p-6">
          <div className="overflow-x-auto pb-2">
            <div className="relative min-h-[420px] min-w-[640px] overflow-hidden rounded-[26px] border border-white/70 bg-white/85 p-4">
            <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
              <motion.ellipse
                cx="320"
                cy="180"
                rx="245"
                ry="130"
                fill="rgba(187,247,208,0.35)"
                stroke={controller.status === "success" ? "#10b981" : "#86efac"}
                strokeWidth="10"
                animate={{
                  scale: controller.status === "success" ? [1, 1.02, 1] : 1,
                }}
                transition={{ duration: 1.5, repeat: controller.status === "success" ? Infinity : 0 }}
              />
              <ellipse
                cx="220"
                cy="150"
                rx="54"
                ry="42"
                fill="rgba(244,114,182,0.16)"
                stroke="#f472b6"
                strokeDasharray="10 10"
                strokeWidth="6"
              />
              <ellipse
                cx="410"
                cy="230"
                rx="70"
                ry="34"
                fill="rgba(251,191,36,0.16)"
                stroke="#f59e0b"
                strokeDasharray="10 10"
                strokeWidth="6"
              />
              <circle cx="128" cy="178" r="18" fill="rgba(59,130,246,0.15)" />
              <circle cx="492" cy="138" r="14" fill="rgba(14,165,233,0.15)" />
              <circle cx="516" cy="232" r="12" fill="rgba(59,130,246,0.15)" />
            </svg>

            {zones.map((zone) => {
              const organelle = placements[zone.id]
                ? organelleMap[placements[zone.id]]
                : null;

              return (
                <button
                  key={zone.id}
                  type="button"
                  disabled={controller.isLocked}
                  onClick={() => handlePlace(zone.id, selectedItemId)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handlePlace(zone.id, selectedItemId);
                  }}
                  className={`absolute ${zone.top} ${zone.left} flex min-h-[88px] min-w-[140px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-white/80 px-4 py-3 text-center shadow-sm transition hover:border-sky-300`}
                >
                  {organelle ? (
                    <div>
                      <div
                        className={`mx-auto h-10 w-10 rounded-2xl bg-gradient-to-br ${organelle.tone}`}
                      />
                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        {organelle.label}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {zone.label}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{zone.hint}</p>
                    </div>
                  )}
                </button>
              );
            })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={controller.isLocked}
              className="soft-button-primary"
            >
              Check Anatomy
            </button>
            {zones.map((zone) =>
              placements[zone.id] ? (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => clearZone(zone.id)}
                  className="soft-button-secondary"
                >
                  Clear {zone.label}
                </button>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

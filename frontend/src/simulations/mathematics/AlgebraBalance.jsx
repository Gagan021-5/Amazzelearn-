import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

/**
 * Algebra Balance — interactive balancing scale for solving x + 2 = 5.
 * Enhanced with richer SVG scale, spring overshoot tilt, and sparkle on solve.
 */

const weights = ["1", "2", "3", "4", "5"];
const zones = [
  { id: "x-slot", label: "x Value Slot" },
  { id: "right-slot", label: "Right Pan Slot" },
];

export default function AlgebraBalance({ controller }) {
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

  const leftValue = Number(placements["x-slot"] || 0) + 2;
  const rightValue = Number(placements["right-slot"] || 0);
  const beamRotation = Math.max(-12, Math.min(12, (rightValue - leftValue) * 3));
  const solved =
    placements["x-slot"] === "3" && placements["right-slot"] === "5";

  const weightStyles = useMemo(
    () =>
      Object.fromEntries(
        weights.map((weight, index) => [
          weight,
          [
            "from-orange-300 to-amber-400",
            "from-sky-300 to-cyan-300",
            "from-emerald-300 to-teal-400",
            "from-violet-300 to-fuchsia-400",
            "from-rose-300 to-orange-400",
          ][index],
        ]),
      ),
    [],
  );

  const handleSelect = (weight) => {
    controller.clearFeedback();
    setSelectedItemId((current) => (current === weight ? null : weight));
  };

  const handlePlace = (zoneId, weight) => {
    if (controller.isLocked || !weight) {
      return;
    }

    controller.clearFeedback();
    placeItem(zoneId, weight);
  };

  const handleCheck = () => {
    controller.submitAttempt(solved, {
      success:
        "Balanced perfectly. x equals 3 because 3 + 2 matches the 5 on the right pan.",
      failure:
        "The scale is not balanced yet. Choose a value for x and a matching right-side weight.",
      locked:
        "Attempts are finished. Restart the balancing scale and solve the equation again.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Weight Bank
        </p>
        <h2 className="mt-2 text-2xl font-bold">Choose numbered weights</h2>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {weights.map((weight) => (
            <button
              key={weight}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(weight);
                setSelectedItemId(weight);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(weight)}
              disabled={controller.isLocked}
              className={[
                "token-card flex h-24 items-center justify-center text-center",
                selectedItemId === weight
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(weight) ? "opacity-55" : "",
              ].join(" ")}
            >
              <div>
                <div
                  className={`mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br ${weightStyles[weight]}`}
                />
                <p className="mt-2 text-lg font-bold text-slate-900">{weight}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Equation target</p>
          <p className="mt-2 text-sm text-slate-600">
            Solve <span className="font-bold text-slate-900">x + 2 = 5</span> by
            placing the correct x-value on the left pan and the matching total
            on the right pan.
          </p>
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Algebra Stage
            </p>
            <h2 className="mt-2 text-2xl font-bold">Interactive balancing scale</h2>
          </div>
          <motion.div
            animate={{
              backgroundColor: solved ? "rgb(240 253 244)" : "rgb(255 247 237)",
              color: solved ? "rgb(21 128 61)" : "rgb(194 65 12)",
            }}
            className="rounded-full px-4 py-2 text-sm font-semibold"
          >
            Left: {leftValue} | Right: {rightValue}
          </motion.div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_56%,#eef6ff_100%)] p-4 sm:p-6">
          <div className="overflow-x-auto pb-2">
            <div className="relative min-h-[400px] min-w-[560px] overflow-hidden rounded-[26px] border border-white/70 bg-white/85 p-4">
              {/* ── Sparkle effect on solve ── */}
              <AnimatePresence>
                {(solved || controller.status === "success") && (
                  <>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.2, 0],
                          x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 12)],
                          y: [0, -20 - i * 8],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: "35%",
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: ["#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#06b6d4"][i],
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* ── Scale base — wood-textured platform ── */}
              <div className="absolute bottom-0 left-1/2 h-28 w-24 -translate-x-1/2 rounded-t-[36px] bg-gradient-to-b from-amber-200 to-amber-400 shadow-inner" />
              <div className="absolute bottom-24 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[70px] border-r-[70px] border-b-[110px] border-l-transparent border-r-transparent border-b-amber-600/80" />

              {/* ── Fulcrum dot ── */}
              <div className="absolute bottom-[175px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full bg-amber-800 shadow-lg" />

              {/* ── Beam ── */}
              <motion.div
                animate={{ rotate: beamRotation }}
                transition={{ type: "spring", stiffness: 100, damping: 10, mass: 0.8 }}
                style={{ transformOrigin: "50% 18%" }}
                className="absolute bottom-[176px] left-1/2 flex w-[520px] -translate-x-1/2 justify-between"
              >
                <div className="absolute left-[86px] right-[86px] top-7 h-4 rounded-full bg-gradient-to-b from-slate-600 to-slate-800 shadow-md" />

                {/* Left pan */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-10 w-1 rounded-full bg-slate-500" />
                  <motion.button
                    type="button"
                    disabled={controller.isLocked}
                    onClick={() => handlePlace("x-slot", selectedItemId)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      handlePlace("x-slot", selectedItemId);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex h-32 w-44 flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-slate-300 bg-white/95 px-4 py-3 shadow-lg"
                  >
                    <div className="mb-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      x + 2
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">
                        {placements["x-slot"] || "x"}
                      </div>
                      <div className="rounded-2xl bg-amber-100 px-4 py-3 text-sm font-bold text-amber-800">
                        +2
                      </div>
                    </div>
                  </motion.button>
                </div>

                {/* Right pan */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-10 w-1 rounded-full bg-slate-500" />
                  <motion.button
                    type="button"
                    disabled={controller.isLocked}
                    onClick={() => handlePlace("right-slot", selectedItemId)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault();
                      handlePlace("right-slot", selectedItemId);
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex h-32 w-44 flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-slate-300 bg-white/95 px-4 py-3 shadow-lg"
                  >
                    <div className="mb-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Right pan
                    </div>
                    <div className="rounded-2xl bg-sky-100 px-5 py-3 text-sm font-bold text-sky-800">
                      {placements["right-slot"] || "?"}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={controller.isLocked}
              className="soft-button-primary"
            >
              Check Balance
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

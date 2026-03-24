import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const numberTiles = ["3", "4", "5", "6", "8", "10", "12", "13"];

const slots = [
  {
    id: "leg-a",
    label: "Leg a",
    hint: "Place the horizontal leg length.",
  },
  {
    id: "leg-b",
    label: "Leg b",
    hint: "Place the vertical leg length.",
  },
  {
    id: "hypotenuse",
    label: "Hypotenuse c",
    hint: "Place the longest side here.",
  },
];

function buildHypotenuseSquare(ax, ay, cx, cy) {
  const dx = cx - ax;
  const dy = cy - ay;

  return `${ax},${ay} ${cx},${cy} ${cx + dy},${cy - dx} ${ax + dy},${ay - dx}`;
}

export default function PythagoreanVisualizer({ controller }) {
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

  const a = Number(placements["leg-a"] || 0);
  const b = Number(placements["leg-b"] || 0);
  const c = Number(placements.hypotenuse || 0);
  const hasAllSides = Boolean(a && b && c);
  const lhs = a ** 2 + b ** 2;
  const rhs = c ** 2;
  const isRightTriangle = hasAllSides && lhs === rhs;
  const meetsTarget = isRightTriangle && c === 10;

  const scale = 10;
  const originX = 150;
  const originY = 170;
  const basePixels = a * scale;
  const heightPixels = b * scale;
  const topX = originX;
  const topY = originY - heightPixels;
  const rightX = originX + basePixels;
  const rightY = originY;

  const theoremMessage = useMemo(() => {
    if (!hasAllSides) {
      return "Place lengths for a, b, and c to test the theorem.";
    }

    if (meetsTarget) {
      return "Perfect. 6^2 + 8^2 = 10^2, so this is the target Pythagorean triple.";
    }

    if (isRightTriangle) {
      return "These lengths do satisfy a^2 + b^2 = c^2, but the target hypotenuse is 10.";
    }

    return "These three lengths do not satisfy a^2 + b^2 = c^2.";
  }, [hasAllSides, isRightTriangle, meetsTarget]);

  const handleSelect = (value) => {
    controller.clearFeedback();
    setSelectedItemId((current) => (current === value ? null : value));
  };

  const handlePlace = (slotId, value) => {
    if (controller.isLocked || !value) {
      return;
    }

    controller.clearFeedback();
    placeItem(slotId, value);
  };

  const handleCheck = () => {
    if (!hasAllSides) {
      controller.submitAttempt(false, {
        failure:
          "Place one length on each side label before checking whether the triangle satisfies the theorem.",
        locked:
          "All attempts are used. Restart the triangle builder and choose a new set of side lengths.",
      });
      return;
    }

    controller.submitAttempt(meetsTarget, {
      success:
        "Correct. The triangle uses the 6-8-10 Pythagorean triple, so the hypotenuse is exactly 10.",
      failure: isRightTriangle
        ? "These lengths form a valid right triangle, but the challenge asks for a hypotenuse of 10."
        : "This set of side lengths does not satisfy a^2 + b^2 = c^2.",
      locked:
        "All attempts are used. Restart the builder and assemble a new triangle.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Number Bank
            </p>
            <h2 className="mt-2 text-2xl font-bold">Right triangle builder</h2>
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Goal
            </p>
            <p className="mt-1 text-sm font-bold text-amber-900">
              Make c = 10
            </p>
          </div>
        </div>

        <div className="inventory-rail hide-scrollbar mt-5">
          {numberTiles.map((value, index) => {
            const tone = [
              "from-orange-300 to-amber-400",
              "from-sky-300 to-cyan-300",
              "from-emerald-300 to-teal-400",
              "from-rose-300 to-orange-400",
              "from-indigo-300 to-violet-400",
              "from-amber-300 to-yellow-400",
              "from-cyan-300 to-sky-500",
              "from-fuchsia-300 to-violet-400",
            ][index];

            return (
              <button
                key={value}
                type="button"
                draggable={!controller.isLocked}
                onDragStart={() => {
                  controller.clearFeedback();
                  setDraggedItemId(value);
                  setSelectedItemId(value);
                }}
                onDragEnd={() => setDraggedItemId(null)}
                onClick={() => handleSelect(value)}
                disabled={controller.isLocked}
                className={[
                  "token-card flex h-full items-center justify-center text-center",
                  selectedItemId === value ? "border-sky-300 ring-4 ring-sky-100" : "",
                  isPlaced(value) ? "opacity-55" : "",
                ].join(" ")}
              >
                <div>
                  <div
                    className={`mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br ${tone}`}
                  />
                  <p className="mt-3 text-lg font-bold text-slate-900">{value}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Math check</p>
          <p className="mt-2 text-sm text-slate-600">
            Pick side lengths that satisfy the theorem and keep the hypotenuse at
            exactly 10 units.
          </p>
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Geometry Stage
            </p>
            <h2 className="mt-2 text-2xl font-bold">Drop the side lengths onto the triangle</h2>
          </div>
          <div
            className={`status-pill ${
              isRightTriangle ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
            }`}
          >
            {isRightTriangle ? "Theorem satisfied" : "Theorem not satisfied yet"}
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_56%,#eff6ff_100%)] p-4 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {slots.map((slot) => {
                  const value = placements[slot.id];

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
                      className={[
                        "drop-slot text-left",
                        value ? "border-amber-200 bg-amber-50/60" : "",
                      ].join(" ")}
                    >
                      {value ? (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {slot.label}
                          </p>
                          <p className="mt-3 text-2xl font-bold text-slate-900">
                            {value}
                          </p>
                          <p className="text-sm text-slate-600">units</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {slot.label}
                          </p>
                          <p className="mt-2 text-sm text-slate-500">{slot.hint}</p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-4 sm:p-6">
                <div className="overflow-x-auto pb-2">
                  <div className="min-w-[420px]">
                    <svg viewBox="0 0 420 320" className="w-full">
                      <rect x="0" y="0" width="420" height="320" fill="transparent" />

                      {a ? (
                        <rect
                          x={originX}
                          y={originY}
                          width={basePixels}
                          height={basePixels}
                          fill="rgba(251,191,36,0.18)"
                          stroke="#f59e0b"
                          strokeWidth="4"
                        />
                      ) : null}

                      {b ? (
                        <rect
                          x={originX - heightPixels}
                          y={topY}
                          width={heightPixels}
                          height={heightPixels}
                          fill="rgba(56,189,248,0.18)"
                          stroke="#0ea5e9"
                          strokeWidth="4"
                        />
                      ) : null}

                      {a && b ? (
                        <polygon
                          points={buildHypotenuseSquare(topX, topY, rightX, rightY)}
                          fill="rgba(16,185,129,0.16)"
                          stroke="#10b981"
                          strokeWidth="4"
                        />
                      ) : null}

                      {hasAllSides ? (
                        <motion.polygon
                          points={`${originX},${originY} ${rightX},${rightY} ${topX},${topY}`}
                          fill="rgba(255,255,255,0.94)"
                          stroke={
                            isRightTriangle || controller.status === "success"
                              ? "#10b981"
                              : "#334155"
                          }
                          strokeWidth="6"
                          animate={{
                            scale:
                              meetsTarget || controller.status === "success"
                                ? [1, 1.02, 1]
                                : 1,
                          }}
                          transition={{
                            duration: 1.4,
                            repeat:
                              meetsTarget || controller.status === "success" ? Infinity : 0,
                          }}
                        />
                      ) : (
                        <path
                          d="M150 170L250 170L150 90Z"
                          fill="rgba(255,255,255,0.7)"
                          stroke="#cbd5e1"
                          strokeWidth="4"
                          strokeDasharray="10 10"
                        />
                      )}

                      <rect
                        x={originX}
                        y={originY - 18}
                        width="18"
                        height="18"
                        fill="rgba(15,23,42,0.12)"
                      />

                      {a ? (
                        <text
                          x={originX + basePixels / 2}
                          y={originY - 14}
                          textAnchor="middle"
                          className="fill-amber-700 text-[15px] font-bold"
                        >
                          a = {a}
                        </text>
                      ) : null}

                      {b ? (
                        <text
                          x={originX - 26}
                          y={originY - heightPixels / 2}
                          textAnchor="middle"
                          className="fill-sky-700 text-[15px] font-bold"
                        >
                          b = {b}
                        </text>
                      ) : null}

                      {c ? (
                        <text
                          x={(topX + rightX) / 2 + 34}
                          y={(topY + rightY) / 2 - 10}
                          textAnchor="middle"
                          className="fill-emerald-700 text-[15px] font-bold"
                        >
                          c = {c}
                        </text>
                      ) : null}
                    </svg>
                  </div>
                </div>

                <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {hasAllSides
                      ? `a^2 + b^2 = c^2 -> ${a}^2 + ${b}^2 = ${c}^2 -> ${lhs} ${
                          lhs === rhs ? "=" : "!="
                        } ${rhs}`
                      : "a^2 + b^2 = c^2"}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{theoremMessage}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="panel-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Area comparison
                </p>
                <div className="mt-3 grid gap-3">
                  {[
                    {
                      label: "a^2",
                      value: a ? a ** 2 : "-",
                      tone: "bg-amber-50 text-amber-700",
                    },
                    {
                      label: "b^2",
                      value: b ? b ** 2 : "-",
                      tone: "bg-sky-50 text-sky-700",
                    },
                    {
                      label: "c^2",
                      value: c ? c ** 2 : "-",
                      tone: "bg-emerald-50 text-emerald-700",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-slate-700">
                        {item.label}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${item.tone}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={controller.isLocked}
                  className="soft-button-primary"
                >
                  Check Triangle
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

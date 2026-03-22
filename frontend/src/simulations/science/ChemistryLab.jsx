import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const flaskZoneId = "main-flask";

const reagents = [
  {
    id: "hcl",
    label: "Hydrochloric Acid",
    formula: "HCl",
    note: "A strong acid that neutralizes NaOH.",
    tone: "from-sky-400 to-cyan-400",
  },
  {
    id: "water",
    label: "Distilled Water",
    formula: "H2O",
    note: "Safe, but it will not neutralize the base.",
    tone: "from-blue-200 to-sky-300",
  },
  {
    id: "sugar",
    label: "Sugar Solution",
    formula: "C12H22O11",
    note: "A sweet solution with no acid-base reaction here.",
    tone: "from-amber-300 to-orange-300",
  },
  {
    id: "oil",
    label: "Vegetable Oil",
    formula: "Oil",
    note: "It will sit separately instead of reacting.",
    tone: "from-lime-300 to-yellow-300",
  },
];

export default function ChemistryLab({ controller }) {
  const {
    placements,
    selectedItemId,
    setSelectedItemId,
    setDraggedItemId,
    placeItem,
    clearZone,
    isPlaced,
  } = useSinglePlacementGame([flaskZoneId], controller.sessionId);

  const [reactionState, setReactionState] = useState("idle");
  const placedId = placements[flaskZoneId];

  const placedReagent = useMemo(
    () => reagents.find((reagent) => reagent.id === placedId),
    [placedId],
  );

  useEffect(() => {
    setReactionState("idle");
  }, [controller.sessionId]);

  const handleSelect = (itemId) => {
    controller.clearFeedback();
    setReactionState("idle");
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  };

  const handleDropToFlask = (itemId) => {
    if (controller.isLocked || !itemId) {
      return;
    }

    controller.clearFeedback();
    setReactionState("idle");
    placeItem(flaskZoneId, itemId);
  };

  const handleCheck = () => {
    const success = placedId === "hcl";
    setReactionState(success ? "success" : "error");
    controller.submitAttempt(success, {
      success:
        "Excellent mix. HCl neutralized the NaOH and the indicator shifted to a fresh mint color.",
      failure:
        "That reagent does not neutralize sodium hydroxide. Choose the acid and test again.",
      locked:
        "All attempts are used. Restart the lab and try pairing the acid with the base.",
    });
  };

  const handleClear = () => {
    controller.clearFeedback();
    setReactionState("idle");
    clearZone(flaskZoneId);
  };

  const liquidColor =
    reactionState === "success"
      ? "#6ee7b7"
      : reactionState === "error"
        ? "#fda4af"
        : "#93c5fd";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Reagent Bench
            </p>
            <h2 className="mt-2 text-2xl font-bold">Choose a chemical</h2>
          </div>
          <div className="rounded-2xl bg-sky-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Base in flask
            </p>
            <p className="text-lg font-bold text-sky-900">NaOH</p>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {reagents.map((reagent) => (
            <button
              key={reagent.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(reagent.id);
                setSelectedItemId(reagent.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(reagent.id)}
              disabled={controller.isLocked}
              className={[
                "token-card text-left",
                selectedItemId === reagent.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(reagent.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 h-10 w-10 rounded-2xl bg-gradient-to-br ${reagent.tone}`}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {reagent.label}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {reagent.formula}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{reagent.note}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card overflow-hidden p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Mixing Stage
            </p>
            <h2 className="mt-2 text-2xl font-bold">Neutralization lab</h2>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            Drop the correct reagent into the flask
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#eff8ff_0%,#ffffff_52%,#fef9ec_100%)] p-4 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
            <div className="relative min-h-[380px] overflow-hidden rounded-[26px] border border-white/70 bg-white/80 p-4">
              <div className="grid-fade absolute inset-0 opacity-50" />
              <div className="relative flex h-full flex-col items-center justify-center">
                <div className="mb-4 flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                  <span className="inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                  Indicator strip ready
                </div>

                <button
                  type="button"
                  disabled={controller.isLocked}
                  onClick={() => handleDropToFlask(selectedItemId)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDropToFlask(selectedItemId);
                  }}
                  className="group relative"
                >
                  <svg viewBox="0 0 280 320" className="h-[320px] w-[280px]">
                    <defs>
                      <clipPath id="chemistry-flask">
                        <path d="M94 28h92v36l34 60c12 20 24 46 24 82 0 42-32 78-84 78h-40c-52 0-84-36-84-78 0-36 12-62 24-82l34-60V28Z" />
                      </clipPath>
                    </defs>
                    <path
                      d="M94 28h92v36l34 60c12 20 24 46 24 82 0 42-32 78-84 78h-40c-52 0-84-36-84-78 0-36 12-62 24-82l34-60V28Z"
                      fill="rgba(255,255,255,0.7)"
                      stroke="#475569"
                      strokeWidth="8"
                      strokeLinejoin="round"
                    />
                    <g clipPath="url(#chemistry-flask)">
                      <motion.rect
                        x="20"
                        y={reactionState === "success" ? 132 : 152}
                        width="240"
                        height="160"
                        animate={{
                          y: reactionState === "success" ? 132 : 152,
                          fill: liquidColor,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.ellipse
                        cx="140"
                        cy={reactionState === "success" ? 132 : 152}
                        rx="104"
                        ry="16"
                        animate={{
                          cy: reactionState === "success" ? 132 : 152,
                          fill: liquidColor,
                        }}
                        transition={{ duration: 0.6 }}
                      />
                    </g>
                    <text
                      x="140"
                      y="188"
                      textAnchor="middle"
                      className="fill-slate-800 text-[18px] font-bold"
                    >
                      {placedReagent ? placedReagent.formula : "Drop Here"}
                    </text>
                    <text
                      x="140"
                      y="212"
                      textAnchor="middle"
                      className="fill-slate-500 text-[12px] font-semibold uppercase tracking-[0.3em]"
                    >
                      NaOH Flask
                    </text>
                  </svg>
                  <span className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {placedReagent
                      ? `${placedReagent.label} added`
                      : "Tap selected reagent or drag it into the flask"}
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="panel-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Current flask contents
                </p>
                <div className="mt-3 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">NaOH</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {placedReagent
                      ? `Added reagent: ${placedReagent.label}`
                      : "Waiting for a reagent selection."}
                  </p>
                </div>
              </div>

              <div className="panel-card p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Reaction target
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Pair the base with the correct acid so the indicator settles
                  into a successful neutralization color.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleCheck}
                  disabled={controller.isLocked}
                  className="soft-button-primary"
                >
                  Check Mixture
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="soft-button-secondary"
                >
                  Clear Flask
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

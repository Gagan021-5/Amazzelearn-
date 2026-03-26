import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useBucketSortGame } from "../../hooks/useBucketSortGame";

const sectorBuckets = [
  {
    id: "primary",
    title: "Primary",
    description: "Uses natural resources directly.",
    tone: "from-sky-300 to-cyan-400",
    accent: "border-l-sky-400",
    bgTint: "bg-sky-50/40",
  },
  {
    id: "secondary",
    title: "Secondary",
    description: "Turns raw materials into finished goods.",
    tone: "from-amber-300 to-orange-400",
    accent: "border-l-amber-400",
    bgTint: "bg-amber-50/40",
  },
  {
    id: "tertiary",
    title: "Tertiary",
    description: "Provides services to people and businesses.",
    tone: "from-emerald-300 to-teal-400",
    accent: "border-l-emerald-400",
    bgTint: "bg-emerald-50/40",
  },
];

const sectorActivities = [
  { id: "farming", label: "Farming", bucket: "primary" },
  { id: "fishing", label: "Fishing", bucket: "primary" },
  { id: "mining", label: "Mining", bucket: "primary" },
  { id: "manufacturing", label: "Manufacturing", bucket: "secondary" },
  {
    id: "weaving-garments",
    label: "Weaving and garments",
    bucket: "secondary",
  },
  { id: "construction", label: "Construction", bucket: "secondary" },
  { id: "banking", label: "Banking", bucket: "tertiary" },
  { id: "transport", label: "Transport", bucket: "tertiary" },
  { id: "teaching", label: "Teaching", bucket: "tertiary" },
];

export default function EconomicsSectorSort({ controller }) {
  const {
    buckets,
    selectedItemId,
    setSelectedItemId,
    setDraggedItemId,
    moveItemToBucket,
    handleBucketDrop,
    removeItem,
    isPlaced,
  } = useBucketSortGame(
    sectorBuckets.map((bucket) => bucket.id),
    controller.sessionId,
  );

  const activityMap = useMemo(
    () => Object.fromEntries(sectorActivities.map((item) => [item.id, item])),
    [],
  );

  const solved = sectorActivities.every((item) =>
    buckets[item.bucket].includes(item.id),
  );

  const isBucketCorrect = (bucketId) => {
    const expected = sectorActivities.filter((item) => item.bucket === bucketId);
    return expected.length > 0 && expected.every((item) => buckets[bucketId].includes(item.id));
  };

  const placedCount = sectorActivities.filter((item) => isPlaced(item.id)).length;

  const handleSelect = (itemId) => {
    controller.clearFeedback();
    setSelectedItemId((current) => (current === itemId ? null : itemId));
  };

  const dropToBucket = (bucketId) => {
    if (controller.isLocked || !selectedItemId) {
      return;
    }

    controller.clearFeedback();
    moveItemToBucket(bucketId, selectedItemId);
  };

  const handleCheck = () => {
    controller.submitAttempt(solved, {
      success:
        "Excellent sorting. Every activity is matched to the correct economic sector.",
      failure:
        "Some activities are still in the wrong sector. Review how primary, secondary, and tertiary sectors differ, then try again.",
      locked:
        "The challenge is locked after 10 tries. Restart and sort the sectors again.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Activity Cards
        </p>
        <h2 className="mt-2 text-2xl font-bold">Economic sectors</h2>
        <p className="mt-2 text-sm text-slate-500">
          {placedCount}/{sectorActivities.length} sorted
        </p>

        <div className="inventory-rail hide-scrollbar mt-5">
          {sectorActivities.map((activity) => (
            <motion.button
              key={activity.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(activity.id);
                setSelectedItemId(activity.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(activity.id)}
              disabled={controller.isLocked}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={[
                "token-card text-left",
                selectedItemId === activity.id ? "border-sky-300 ring-4 ring-sky-100" : "",
                isPlaced(activity.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <p className="text-sm font-semibold text-slate-900">
                {activity.label}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Sorting Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Group each activity by sector</h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Sort activities into Primary, Secondary, and Tertiary
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_52%,#fefce8_100%)] p-4 sm:p-6">
          <div className="grid gap-4 xl:grid-cols-3">
            {sectorBuckets.map((bucket) => {
              const bucketCorrect = isBucketCorrect(bucket.id);

              return (
                <motion.button
                  key={bucket.id}
                  type="button"
                  disabled={controller.isLocked}
                  onClick={() => dropToBucket(bucket.id)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleBucketDrop(bucket.id);
                  }}
                  whileHover={{ scale: 1.01 }}
                  className={`flex min-h-[280px] flex-col rounded-[26px] border-2 border-l-[6px] border-dashed border-slate-300 ${bucket.accent} ${bucket.bgTint} p-4 text-left shadow-sm transition`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${bucket.tone}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-bold text-slate-900">{bucket.title}</p>
                        <AnimatePresence>
                          {bucketCorrect && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500"
                            >
                              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                                <path
                                  d="M3 8l3 3 7-7"
                                  stroke="white"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <p className="text-sm text-slate-500">{bucket.description}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                      {buckets[bucket.id].length > 0 ? (
                        buckets[bucket.id].map((activityId) => (
                          <motion.div
                            key={activityId}
                            layout
                            initial={{ scale: 0.85, opacity: 0, y: -8 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span>{activityMap[activityId].label}</span>
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeItem(activityId);
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    removeItem(activityId);
                                  }
                                }}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200 transition hover:bg-slate-200"
                              >
                                Remove
                              </span>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <motion.div
                          layout
                          className="flex flex-1 items-center justify-center rounded-[22px] bg-white/60 text-center text-sm font-semibold text-slate-400"
                        >
                          Drop cards here
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
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
              Check Sorting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

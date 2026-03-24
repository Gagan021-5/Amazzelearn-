import { useMemo } from "react";
import { useBucketSortGame } from "../../hooks/useBucketSortGame";

const branchBuckets = [
  {
    id: "legislature",
    title: "Legislature",
    description: "Writes laws and approves budgets.",
    tone: "from-sky-300 to-cyan-400",
  },
  {
    id: "executive",
    title: "Executive",
    description: "Implements laws and runs departments.",
    tone: "from-amber-300 to-orange-400",
  },
  {
    id: "judiciary",
    title: "Judiciary",
    description: "Interprets laws and resolves disputes.",
    tone: "from-emerald-300 to-teal-400",
  },
];

const responsibilities = [
  { id: "makes-laws", label: "Makes laws", bucket: "legislature" },
  { id: "passes-budget", label: "Passes budgets", bucket: "legislature" },
  { id: "runs-ministries", label: "Runs ministries", bucket: "executive" },
  { id: "implements-policy", label: "Implements policy", bucket: "executive" },
  { id: "interprets-constitution", label: "Interprets the Constitution", bucket: "judiciary" },
  { id: "settles-disputes", label: "Settles legal disputes", bucket: "judiciary" },
];

export default function CivicsSort({ controller }) {
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
    branchBuckets.map((bucket) => bucket.id),
    controller.sessionId,
  );

  const responsibilityMap = useMemo(
    () =>
      Object.fromEntries(
        responsibilities.map((responsibility) => [responsibility.id, responsibility]),
      ),
    [],
  );

  const solved = responsibilities.every((responsibility) =>
    buckets[responsibility.bucket].includes(responsibility.id),
  );

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
        "Great sorting. Every responsibility is matched to the correct branch of government.",
      failure:
        "Some cards are still in the wrong branch. Review each responsibility and sort again.",
      locked:
        "The challenge is locked after 10 tries. Restart and sort the branches again.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Unsorted Cards
        </p>
        <h2 className="mt-2 text-2xl font-bold">Government responsibilities</h2>

        <div className="inventory-rail hide-scrollbar mt-5">
          {responsibilities.map((responsibility) => (
            <button
              key={responsibility.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(responsibility.id);
                setSelectedItemId(responsibility.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(responsibility.id)}
              disabled={controller.isLocked}
              className={[
                "token-card text-left",
                selectedItemId === responsibility.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(responsibility.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <p className="text-sm font-semibold text-slate-900">
                {responsibility.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Sorting Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Three branches of government</h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Sort each card into the correct branch
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_52%,#fff7ed_100%)] p-4 sm:p-6">
          <div className="grid gap-4 xl:grid-cols-3">
            {branchBuckets.map((bucket) => (
              <button
                key={bucket.id}
                type="button"
                disabled={controller.isLocked}
                onClick={() => dropToBucket(bucket.id)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handleBucketDrop(bucket.id);
                }}
                className="flex min-h-[280px] flex-col rounded-[26px] border-2 border-dashed border-slate-300 bg-white/90 p-4 text-left shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${bucket.tone}`}
                  />
                  <div>
                    <p className="text-lg font-bold text-slate-900">{bucket.title}</p>
                    <p className="text-sm text-slate-500">{bucket.description}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-1 flex-col gap-3">
                  {buckets[bucket.id].length > 0 ? (
                    buckets[bucket.id].map((responsibilityId) => (
                      <div
                        key={responsibilityId}
                        className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{responsibilityMap[responsibilityId].label}</span>
                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(event) => {
                              event.stopPropagation();
                              removeItem(responsibilityId);
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                removeItem(responsibilityId);
                              }
                            }}
                            className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-slate-200"
                          >
                            Remove
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-1 items-center justify-center rounded-[22px] bg-slate-50/70 text-center text-sm font-semibold text-slate-400">
                      Drop responsibility cards here
                    </div>
                  )}
                </div>
              </button>
            ))}
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

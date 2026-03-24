import { useMemo } from "react";
import { useSinglePlacementGame } from "../../hooks/useSinglePlacementGame";

const countries = [
  {
    id: "india",
    label: "India",
    description: "South Asian country",
    shape:
      "M156 92l20 8 10 24-10 18 6 20-18 22-10 26-24-24 8-22-18-28 18-22 6-22 12-16Z",
    dropTop: "top-[39%]",
    dropLeft: "left-[24%]",
  },
  {
    id: "brazil",
    label: "Brazil",
    description: "Largest country in South America",
    shape:
      "M296 108l40-18 38 22-6 44 14 34-26 34-38 8-38-26-6-42 22-30Z",
    dropTop: "top-[48%]",
    dropLeft: "left-[52%]",
  },
  {
    id: "egypt",
    label: "Egypt",
    description: "North African country",
    shape:
      "M476 104l40 2 16 26-12 34-34 12-30-20 20-34Z",
    dropTop: "top-[37%]",
    dropLeft: "left-[79%]",
  },
];

export default function GeographyMatch({ controller }) {
  const {
    placements,
    selectedItemId,
    setSelectedItemId,
    setDraggedItemId,
    placeItem,
    clearZone,
    isPlaced,
  } = useSinglePlacementGame(
    countries.map((country) => country.id),
    controller.sessionId,
  );

  const countryMap = useMemo(
    () => Object.fromEntries(countries.map((country) => [country.id, country])),
    [],
  );

  const solved = countries.every(
    (country) => placements[country.id] === country.id,
  );

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
    controller.submitAttempt(solved, {
      success:
        "Atlas complete. Every country label is matched to the correct map silhouette.",
      failure:
        "Some labels are still mismatched. Review the map shapes and try again.",
      locked:
        "The map challenge is locked after 10 tries. Restart and label the countries again.",
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Label Tray
        </p>
        <h2 className="mt-2 text-2xl font-bold">Country labels</h2>
        <div className="inventory-rail hide-scrollbar mt-5">
          {countries.map((country) => (
            <button
              key={country.id}
              type="button"
              draggable={!controller.isLocked}
              onDragStart={() => {
                controller.clearFeedback();
                setDraggedItemId(country.id);
                setSelectedItemId(country.id);
              }}
              onDragEnd={() => setDraggedItemId(null)}
              onClick={() => handleSelect(country.id)}
              disabled={controller.isLocked}
              className={[
                "token-card text-left",
                selectedItemId === country.id
                  ? "border-sky-300 ring-4 ring-sky-100"
                  : "",
                isPlaced(country.id) ? "opacity-55" : "",
              ].join(" ")}
            >
              <p className="text-sm font-semibold text-slate-900">{country.label}</p>
              <p className="mt-2 text-sm text-slate-600">{country.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Atlas Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Match the map silhouettes</h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Drag labels onto the matching country shapes
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#ecfdf5_0%,#ffffff_52%,#eff6ff_100%)] p-4 sm:p-6">
          <div className="overflow-x-auto pb-2">
            <div className="relative min-h-[420px] min-w-[640px] overflow-hidden rounded-[26px] border border-white/70 bg-white/90 p-4">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_22%),radial-gradient(circle_at_82%_26%,rgba(16,185,129,0.14),transparent_18%),linear-gradient(180deg,rgba(186,230,253,0.2)_0%,rgba(255,255,255,0)_35%)]" />
            <svg viewBox="0 0 640 360" className="absolute inset-0 h-full w-full">
              <path d="M0 228h640" stroke="rgba(148,163,184,0.2)" strokeWidth="2" strokeDasharray="12 12" />
              <path d="M0 144h640" stroke="rgba(148,163,184,0.2)" strokeWidth="2" strokeDasharray="12 12" />
              {countries.map((country) => (
                <path
                  key={country.id}
                  d={country.shape}
                  fill="rgba(15,23,42,0.07)"
                  stroke="#334155"
                  strokeWidth="5"
                  strokeLinejoin="round"
                />
              ))}
            </svg>

            {countries.map((country) => (
              <button
                key={country.id}
                type="button"
                disabled={controller.isLocked}
                onClick={() => handlePlace(country.id, selectedItemId)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  handlePlace(country.id, selectedItemId);
                }}
                className={`absolute ${country.dropTop} ${country.dropLeft} flex min-h-[72px] min-w-[130px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border-2 border-dashed border-slate-300 bg-white/90 px-4 py-3 text-center shadow-sm`}
              >
                {placements[country.id] ? (
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {countryMap[placements[country.id]].label}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      placed
                    </p>
                  </div>
                ) : (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Drop label
                  </p>
                )}
              </button>
            ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheck}
              disabled={controller.isLocked}
              className="soft-button-primary"
            >
              Check Map
            </button>
            {countries.map((country) =>
              placements[country.id] ? (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => clearZone(country.id)}
                  className="soft-button-secondary"
                >
                  Clear {country.label}
                </button>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

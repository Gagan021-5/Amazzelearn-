import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

function buildHypotenuseSquare(ax, ay, cx, cy) {
  const dx = cx - ax;
  const dy = cy - ay;
  return `${ax},${ay} ${cx},${cy} ${cx + dy},${cy - dx} ${ax + dy},${ay - dx}`;
}

export default function PythagoreanVisualizer({ controller }) {
  const [base, setBase] = useState(5);
  const [height, setHeight] = useState(7);

  useEffect(() => {
    setBase(5);
    setHeight(7);
  }, [controller.sessionId]);

  const hypotenuse = useMemo(
    () => Math.sqrt(base ** 2 + height ** 2),
    [base, height],
  );

  const formattedHypotenuse = hypotenuse.toFixed(2);
  const success = Number(hypotenuse.toFixed(2)) === 10.0;

  const scale = 22;
  const originX = 86;
  const originY = 246;
  const basePixels = base * scale;
  const heightPixels = height * scale;
  const topX = originX;
  const topY = originY - heightPixels;
  const rightX = originX + basePixels;
  const rightY = originY;
  const hypSquare = buildHypotenuseSquare(topX, topY, rightX, rightY);

  const handleSliderChange = (setter) => (event) => {
    controller.clearFeedback();
    setter(Number(event.target.value));
  };

  const handleCheck = () => {
    controller.submitAttempt(success, {
      success:
        "Perfect triangle. You created a 6-8-10 right triangle and the theorem checks out.",
      failure:
        "The hypotenuse is not 10 yet. Adjust the sliders and compare the updated formula.",
      locked:
        "All attempts are used. Restart the visualizer and build a new triangle for c = 10.",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
      <div className="panel-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Triangle Controls
        </p>
        <h2 className="mt-2 text-2xl font-bold">Adjust the side lengths</h2>

        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Base (a)</label>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                {base} units
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="8"
              step="1"
              value={base}
              onChange={handleSliderChange(setBase)}
              disabled={controller.isLocked}
            />
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">
                Perpendicular (b)
              </label>
              <span className="rounded-full bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700">
                {height} units
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="9"
              step="1"
              value={height}
              onChange={handleSliderChange(setHeight)}
              disabled={controller.isLocked}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {[
            { label: "a²", value: base ** 2, tone: "bg-amber-50 text-amber-700" },
            { label: "b²", value: height ** 2, tone: "bg-sky-50 text-sky-700" },
            { label: "c", value: formattedHypotenuse, tone: "bg-emerald-50 text-emerald-700" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.tone}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCheck}
            disabled={controller.isLocked}
            className="soft-button-primary"
          >
            Check c = 10
          </button>
          <button
            type="button"
            onClick={controller.restartSession}
            className="soft-button-secondary"
          >
            Reset Sliders
          </button>
        </div>
      </div>

      <div className="panel-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Geometry Canvas
            </p>
            <h2 className="mt-2 text-2xl font-bold">Real-time theorem view</h2>
          </div>
          <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Goal: build a right triangle where c equals 10
          </div>
        </div>

        <div className="mt-6 rounded-[28px] bg-[linear-gradient(180deg,#fff8eb_0%,#ffffff_56%,#eff6ff_100%)] p-4 sm:p-6">
          <div className="overflow-hidden rounded-[26px] border border-white/70 bg-white/85 p-4 sm:p-6">
            <svg viewBox="0 0 520 320" className="w-full">
              <rect x="0" y="0" width="520" height="320" fill="transparent" />
              <rect
                x={originX}
                y={originY}
                width={basePixels}
                height={basePixels}
                fill="rgba(251,191,36,0.18)"
                stroke="#f59e0b"
                strokeWidth="4"
              />
              <rect
                x={originX - heightPixels}
                y={topY}
                width={heightPixels}
                height={heightPixels}
                fill="rgba(56,189,248,0.18)"
                stroke="#0ea5e9"
                strokeWidth="4"
              />
              <polygon
                points={hypSquare}
                fill="rgba(16,185,129,0.16)"
                stroke="#10b981"
                strokeWidth="4"
              />
              <motion.polygon
                points={`${originX},${originY} ${rightX},${rightY} ${topX},${topY}`}
                fill="rgba(255,255,255,0.94)"
                stroke={success || controller.status === "success" ? "#10b981" : "#334155"}
                strokeWidth="6"
                animate={{
                  scale: controller.status === "success" ? [1, 1.02, 1] : 1,
                }}
                transition={{ duration: 1.4, repeat: controller.status === "success" ? Infinity : 0 }}
              />
              <rect
                x={originX}
                y={originY - 20}
                width="20"
                height="20"
                fill="rgba(15,23,42,0.12)"
              />
              <text x={originX + basePixels / 2} y={originY - 12} textAnchor="middle" className="fill-amber-700 text-[16px] font-bold">
                a = {base}
              </text>
              <text x={originX - 24} y={originY - heightPixels / 2} textAnchor="middle" className="fill-sky-700 text-[16px] font-bold">
                b = {height}
              </text>
              <text x={(topX + rightX) / 2 + 34} y={(topY + rightY) / 2 - 10} textAnchor="middle" className="fill-emerald-700 text-[16px] font-bold">
                c = {formattedHypotenuse}
              </text>
            </svg>

            <div className="mt-5 rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                c = √(a² + b²) = √({base}² + {height}²) = √({base ** 2} + {height ** 2}) = {formattedHypotenuse}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

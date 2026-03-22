import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { subjectMap } from "../data/subjects";

const overlayStyles = {
  success: {
    badge: "You Win!",
    card: "border-emerald-200 bg-emerald-50",
    icon: "bg-emerald-500",
    text: "text-emerald-900",
  },
  error: {
    badge: "Try Again",
    card: "border-amber-200 bg-amber-50",
    icon: "bg-amber-500",
    text: "text-amber-900",
  },
  locked: {
    badge: "Attempts Used",
    card: "border-rose-200 bg-rose-50",
    icon: "bg-rose-500",
    text: "text-rose-900",
  },
};

export function useSimulationController(maxAttempts = 10) {
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("idle");
  const [overlay, setOverlay] = useState(null);
  const [sessionId, setSessionId] = useState(0);

  const submitAttempt = (isSuccess, messages = {}) => {
    if (status === "success" || attempts >= maxAttempts) {
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (isSuccess) {
      setStatus("success");
      setOverlay({
        variant: "success",
        message:
          messages.success ??
          "Brilliant work. You matched the concept correctly.",
      });
      return;
    }

    if (nextAttempts >= maxAttempts) {
      setStatus("locked");
      setOverlay({
        variant: "locked",
        message:
          messages.locked ??
          "You have used all 10 attempts. Restart the challenge to practice again.",
      });
      return;
    }

    setStatus("error");
    setOverlay({
      variant: "error",
      message:
        messages.failure ??
        `Not quite yet. You still have ${maxAttempts - nextAttempts} attempts left.`,
    });
  };

  const clearFeedback = () => {
    if (status === "error") {
      setStatus("idle");
    }

    setOverlay((current) => (current?.variant === "error" ? null : current));
  };

  const dismissOverlay = () => {
    setOverlay(null);

    if (status === "error") {
      setStatus("idle");
    }
  };

  const restartSession = () => {
    setAttempts(0);
    setStatus("idle");
    setOverlay(null);
    setSessionId((current) => current + 1);
  };

  return {
    attempts,
    maxAttempts,
    attemptsRemaining: Math.max(0, maxAttempts - attempts),
    status,
    overlay,
    sessionId,
    isLocked: status === "success" || status === "locked",
    submitAttempt,
    clearFeedback,
    dismissOverlay,
    restartSession,
  };
}

export default function SimulationWrapper({ simulation, controller, children }) {
  const subject = subjectMap[simulation.subjectId];
  const overlayStyle = controller.overlay
    ? overlayStyles[controller.overlay.variant]
    : null;

  return (
    <section className="space-y-6">
      <div className="glass-card px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={subject.path} className="subject-badge">
                {subject.title}
              </Link>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {simulation.topic}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              {simulation.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              {simulation.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {simulation.challenge}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {simulation.estimatedTime}
              </span>
            </div>
          </div>

          <div className="panel-card w-full max-w-sm p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Attempt Tracker
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {controller.attempts}/{controller.maxAttempts}
                </p>
              </div>
              <div className="rounded-2xl bg-sky-50 px-4 py-3 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Remaining
                </p>
                <p className="text-2xl font-bold text-sky-900">
                  {controller.attemptsRemaining}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-10 gap-2">
              {Array.from({ length: controller.maxAttempts }).map((_, index) => (
                <div
                  key={index}
                  className={[
                    "h-3 rounded-full transition",
                    index < controller.attempts
                      ? "bg-sky-500"
                      : "bg-slate-200",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4 sm:p-6">
        <div className="sim-canvas p-4 sm:p-6">
          <AnimatePresence>
            {controller.overlay && overlayStyle ? (
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="absolute inset-x-4 top-4 z-20 sm:inset-x-auto sm:right-6 sm:top-6 sm:w-[22rem]"
              >
                <div
                  className={`rounded-[24px] border p-4 shadow-xl ${overlayStyle.card}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white ${overlayStyle.icon}`}
                    >
                      {overlayStyle.badge.slice(0, 1)}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {overlayStyle.badge}
                      </p>
                      <p className={`mt-1 text-sm font-semibold ${overlayStyle.text}`}>
                        {controller.overlay.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={controller.dismissOverlay}
                      className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-black/5"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {children}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <Link to={subject.path} className="soft-button-secondary">
            Back to {subject.title}
          </Link>
          <button
            type="button"
            onClick={controller.restartSession}
            className="soft-button-primary"
          >
            Restart Challenge
          </button>
        </div>
      </div>

      <div className="glass-card px-6 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <div className="lg:w-1/3">
            <p className="subject-badge">Guided Learning</p>
            <h2 className="mt-4 text-2xl font-bold">Step-by-step instructions</h2>
            <p className="mt-3 text-sm text-slate-600">
              Every simulation uses the same practice loop: explore the model,
              test your idea, and use the feedback overlay to adjust your next
              move.
            </p>
          </div>

          <ol className="grid flex-1 gap-4">
            {simulation.instructions.map((instruction, index) => (
              <li
                key={instruction}
                className="panel-card flex gap-4 p-5 text-sm text-slate-600"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sm font-bold text-sky-700">
                  {index + 1}
                </div>
                <p>{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

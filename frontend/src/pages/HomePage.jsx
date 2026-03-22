import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SubjectCard from "../components/SubjectCard";
import { subjectCatalog } from "../data/subjects";
import {
  getSimulationsBySubject,
  simulationCatalog,
} from "../simulations/registry";

export default function HomePage() {
  return (
    <div className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="glass-card overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <p className="subject-badge">Project-Based Interactive Learning</p>
                <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Amazze Learn PBL brings premium simulations to every student,
                  not just every lab.
                </h1>
                <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
                  Explore hands-on science, mathematics, and social science
                  experiences designed to feel clear, playful, and deeply
                  educational on both desktop and mobile.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <Link to="/subject/science" className="soft-button-primary">
                  Start with Science
                </Link>
                <Link to="/subject/mathematics" className="soft-button-secondary">
                  Explore Mathematics
                </Link>
              </motion.div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Subject hubs", value: subjectCatalog.length },
                  { label: "Interactive simulations", value: simulationCatalog.length },
                  { label: "Attempts per challenge", value: 10 },
                ].map((stat) => (
                  <div key={stat.label} className="panel-card p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(160deg,#e0f2fe_0%,#ffffff_38%,#fef3c7_100%)] p-6 shadow-[0_24px_70px_-38px_rgba(15,23,42,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(14,165,233,0.18),transparent_24%),radial-gradient(circle_at_80%_28%,rgba(250,204,21,0.22),transparent_18%),radial-gradient(circle_at_60%_78%,rgba(16,185,129,0.18),transparent_24%)]" />
                <div className="relative h-full rounded-[28px] border border-white/70 bg-white/80 p-5 backdrop-blur">
                  <div className="grid-fade absolute inset-0 opacity-55" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                          Live Simulation Engine
                        </span>
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Light Theme
                        </span>
                      </div>

                      <div className="panel-card p-4">
                        <p className="text-sm font-semibold text-slate-900">
                          Challenge loop
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          Drag, test, reflect, and retry with instant feedback
                          overlays and guided steps.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="panel-card p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Active modules
                        </p>
                        <div className="mt-3 grid gap-3">
                          {simulationCatalog.slice(0, 4).map((simulation) => (
                            <div
                              key={simulation.id}
                              className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3"
                            >
                              <span className="text-sm font-semibold text-slate-700">
                                {simulation.title}
                              </span>
                              <span
                                className={`h-3 w-3 rounded-full bg-gradient-to-r ${simulation.accent}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <svg viewBox="0 0 320 120" className="w-full">
                        <path
                          d="M24 82c28-28 56-42 84-42 40 0 56 36 96 36 26 0 56-12 92-36"
                          fill="none"
                          stroke="#0ea5e9"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        <circle cx="60" cy="56" r="14" fill="#22c55e" />
                        <circle cx="160" cy="74" r="14" fill="#f59e0b" />
                        <circle cx="264" cy="42" r="14" fill="#f97316" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="subject-hubs" className="mx-auto mt-10 max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="subject-badge">Subject Hubs</p>
            <h2 className="mt-3 text-3xl font-bold">
              Choose a learning pathway
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            Every category includes multiple premium simulations with consistent
            game mechanics, teacher-friendly instructions, and smooth animated
            feedback.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {subjectCatalog.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              simulationCount={getSimulationsBySubject(subject.id).length}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

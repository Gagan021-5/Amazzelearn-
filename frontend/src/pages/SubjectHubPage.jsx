import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import SimulationCard from "../components/SimulationCard";
import { subjectMap } from "../data/subjects";
import { getSimulationsBySubject } from "../simulations/registry";
import NotFoundPage from "./NotFoundPage";

export default function SubjectHubPage() {
  const { subjectId } = useParams();
  const subject = subjectMap[subjectId];

  if (!subject) {
    return <NotFoundPage />;
  }

  const simulations = getSimulationsBySubject(subject.id);

  return (
    <div className="px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="glass-card overflow-hidden px-6 py-10 sm:px-8 sm:py-12 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="subject-badge">{subject.eyebrow}</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                {subject.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">
                {subject.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/simulation/${simulations[0].id}`}
                  className="soft-button-primary"
                >
                  Launch Featured Simulation
                </Link>
                <Link to="/" className="soft-button-secondary">
                  Back Home
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className={`rounded-[32px] bg-gradient-to-br ${subject.accent} p-[1px] shadow-[0_24px_60px_-34px_rgba(15,23,42,0.45)]`}
            >
              <div className="rounded-[31px] bg-white/92 p-6">
                <div className="grid gap-4">
                  {subject.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="panel-card flex items-center gap-4 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {highlight}
                        </p>
                        <p className="text-sm text-slate-500">
                          Interactive, responsive, and built for guided
                          discovery.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="subject-badge">{subject.title} Modules</p>
            <h2 className="mt-3 text-3xl font-bold">
              Explore the full simulation set
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            Each module ships with a reusable challenge wrapper, a 10-attempt
            gamification loop, dynamic feedback overlays, and guided
            instructions under the canvas.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {simulations.map((simulation, index) => (
            <SimulationCard
              key={simulation.id}
              simulation={simulation}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

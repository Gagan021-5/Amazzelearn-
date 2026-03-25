import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Search, X, Sparkles, ArrowRight, Filter } from "lucide-react";
import SimulationCard from "../components/SimulationCard";
import { subjectMap } from "../data/subjects";
import { getSimulationsBySubject } from "../simulations/registry";
import NotFoundPage from "./NotFoundPage";

export default function SubjectHubPage() {
  const { subjectId } = useParams();
  const subject = subjectMap[subjectId];
  const [searchQuery, setSearchQuery] = useState("");

  if (!subject) {
    return <NotFoundPage />;
  }

  const allSimulations = getSimulationsBySubject(subject.id);

  const filteredSimulations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return allSimulations;

    return allSimulations.filter(
      (sim) =>
        sim.title.toLowerCase().includes(query) ||
        sim.topic.toLowerCase().includes(query) ||
        sim.summary.toLowerCase().includes(query) ||
        sim.challenge.toLowerCase().includes(query),
    );
  }, [allSimulations, searchQuery]);

  return (
    <div className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
      {/* ═════════ HERO HEADER ═════════ */}
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="absolute inset-0 bg-mesh-amazze" />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${subject.accent} opacity-[0.06]`}
          />

          {/* Decorative shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [-6, 8, -6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[10%] top-[15%] h-10 w-10 rounded-full border-2 border-amazze-purple-200/30 bg-amazze-purple-100/20"
            />
            <motion.div
              animate={{ y: [4, -8, 4], x: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[20%] left-[8%] h-8 w-8 rounded-lg border-2 border-amazze-mint-200/30 bg-amazze-mint-100/20"
            />
          </div>

          <div className="relative px-6 py-12 sm:px-10 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="max-w-2xl"
            >
              <span className="badge-amazze">
                <Sparkles className="h-3 w-3" />
                {subject.eyebrow}
              </span>
              <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                {subject.heroTitle}
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-500">
                {subject.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={`/simulation/${allSimulations[0].id}`}
                    className="btn-primary"
                  >
                    <Sparkles className="h-4 w-4" />
                    Launch Featured Lab
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/" className="btn-secondary">
                    Back Home
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════ CONTENT GRID WITH SIDEBAR ═════════ */}
      <section className="mx-auto mt-10 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* ── Glassmorphic Sticky Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-soft backdrop-blur-xl">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amazze-purple-50">
                  <Filter className="h-4 w-4 text-amazze-purple-500" />
                </div>
                Filter Labs
              </div>

              {/* Premium pill search bar */}
              <div className="relative mt-5">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search labs…"
                  className="w-full rounded-full border border-slate-200/60 bg-white py-3 pl-10 pr-10 text-sm font-semibold text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:border-amazze-purple-300 focus:outline-none focus:ring-4 focus:ring-amazze-purple-100"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {searchQuery && (
                <p className="mt-3 text-xs font-bold text-slate-400">
                  <span className="text-amazze-purple-500">{filteredSimulations.length}</span>{" "}
                  of {allSimulations.length} labs
                </p>
              )}

              {/* Subject highlights */}
              <div className="mt-5 border-t border-slate-200/40 pt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                  Available Topics
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {subject.highlights.map((h) => (
                    <motion.button
                      key={h}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchQuery(h.split(" ")[0])}
                      className="rounded-full bg-amazze-purple-50 px-3 py-1.5 text-xs font-bold text-amazze-purple-600 ring-1 ring-amazze-purple-100 transition hover:bg-amazze-purple-100"
                    >
                      {h}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick nav */}
              <div className="mt-5 border-t border-slate-200/40 pt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
                  Quick Launch
                </p>
                <div className="mt-3 space-y-1">
                  {allSimulations.map((sim) => (
                    <Link
                      key={sim.id}
                      to={`/simulation/${sim.id}`}
                      className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-amazze-purple-50 hover:text-amazze-purple-600"
                    >
                      <span>{sim.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* ── Simulation Cards Grid ── */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                All {subject.title} Labs
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {allSimulations.length} interactive simulations with guided feedback
              </p>
            </div>

            {filteredSimulations.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredSimulations.map((simulation, index) => (
                    <motion.div
                      key={simulation.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                    >
                      <SimulationCard simulation={simulation} index={0} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[200px] items-center justify-center rounded-3xl border-2 border-dashed border-slate-200/60 bg-white/40"
              >
                <div className="text-center">
                  <Search className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm font-bold text-slate-400">
                    No labs match &ldquo;{searchQuery}&rdquo;
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSearchQuery("")}
                    className="btn-secondary mt-3"
                  >
                    Clear search
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

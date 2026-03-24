import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function SimulationCard({ simulation, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        to={`/simulation/${simulation.id}`}
        className="group flex h-full flex-col rounded-[26px] border border-white/80 bg-white/90 p-6 shadow-[0_16px_45px_-28px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-34px_rgba(15,23,42,0.45)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              {simulation.topic}
            </p>
            <h3 className="mt-2 text-2xl font-bold">{simulation.title}</h3>
          </div>
          <div
            className={`h-14 w-14 rounded-[18px] bg-gradient-to-br ${simulation.accent} shadow-lg`}
          />
        </div>

        <p className="mt-4 text-sm text-slate-600">{simulation.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {simulation.estimatedTime}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            {simulation.challenge}
          </span>
        </div>

        <div className="mt-auto pt-8 text-sm font-semibold text-slate-900">
          Launch Simulation
          <span className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
        </div>
      </Link>
    </motion.article>
  );
}

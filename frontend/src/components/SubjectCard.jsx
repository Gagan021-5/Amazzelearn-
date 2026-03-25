import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const iconMap = {
  science: (
    <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
      <path
        d="M24 10v14L12 44a8 8 0 0 0 7 12h26a8 8 0 0 0 7-12L40 24V10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 35h22M20 44h24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
  mathematics: (
    <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
      <path d="M12 48h40L28 16 12 48Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M28 48V36h12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
  "social-science": (
    <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none">
      <path
        d="M32 10 14 18v12c0 12 7.6 22.4 18 26 10.4-3.6 18-14 18-26V18L32 10Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="M24 30h16M24 38h12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
};

const gradients = {
  science: "from-cyan-400 via-sky-500 to-violet-500",
  mathematics: "from-amber-400 via-orange-500 to-rose-500",
  "social-science": "from-emerald-400 via-teal-500 to-cyan-500",
};

const glows = {
  science: "shadow-cyan-500/25",
  mathematics: "shadow-amber-500/25",
  "social-science": "shadow-emerald-500/25",
};

export default function SubjectCard({ subject, simulationCount, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link
        to={subject.path}
        className={`group flex h-full flex-col rounded-3xl border border-white/50 bg-white/70 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${glows[subject.id]} hover:bg-white/90`}
      >
        {/* Icon with gradient bg */}
        <motion.div
          whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradients[subject.id]} text-white shadow-xl ${glows[subject.id]}`}
        >
          {iconMap[subject.id]}
        </motion.div>

        {/* Content */}
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          {subject.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-bold text-slate-900">{subject.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {subject.description}
        </p>

        {/* Tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
            {simulationCount} simulations
          </span>
          {subject.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* CTA footer */}
        <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-violet-600">
          Open Lab
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}

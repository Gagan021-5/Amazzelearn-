import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const iconMap = {
  science: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
      <path
        d="M24 10v14L12 44a8 8 0 0 0 7 12h26a8 8 0 0 0 7-12L40 24V10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 35h22M20 44h24"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  mathematics: (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
      <path
        d="M12 48h40L28 16 12 48Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M28 48V36h12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
  "social-science": (
    <svg viewBox="0 0 64 64" className="h-12 w-12" fill="none">
      <path
        d="M32 10 14 18v12c0 12 7.6 22.4 18 26 10.4-3.6 18-14 18-26V18L32 10Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M24 30h16M24 38h12"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export default function SubjectCard({ subject, simulationCount, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link
        to={subject.path}
        className="group flex h-full flex-col rounded-[28px] border border-white/80 bg-white/90 p-6 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-34px_rgba(15,23,42,0.45)]"
      >
        <div
          className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br ${subject.accent} text-white shadow-lg`}
        >
          {iconMap[subject.id]}
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          {subject.eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-bold">{subject.title}</h3>
        <p className="mt-3 text-sm text-slate-600">{subject.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            {simulationCount} simulations
          </span>
          {subject.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700"
            >
              {highlight}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-8 text-sm font-semibold text-slate-900">
          Open Subject Hub
          <span className="ml-2 transition group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </motion.div>
  );
}

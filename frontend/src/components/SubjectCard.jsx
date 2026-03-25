import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Beaker, Calculator, Globe2 } from "lucide-react";

const iconMap = {
  science: Beaker,
  mathematics: Calculator,
  "social-science": Globe2,
};

const colorThemes = {
  science: {
    gradient: "from-amazze-sky-400 via-amazze-sky-500 to-amazze-purple-500",
    glow: "shadow-sky-glow",
    bgLight: "bg-amazze-sky-50",
    text: "text-amazze-sky-500",
    tagBg: "bg-amazze-sky-50",
    tagText: "text-amazze-sky-600",
    borderHover: "hover:border-amazze-sky-200",
    ring: "ring-amazze-sky-100",
  },
  mathematics: {
    gradient: "from-amazze-orange-400 via-amazze-orange-500 to-amazze-pink-500",
    glow: "shadow-orange-glow",
    bgLight: "bg-amazze-orange-50",
    text: "text-amazze-orange-500",
    tagBg: "bg-amazze-orange-50",
    tagText: "text-amazze-orange-600",
    borderHover: "hover:border-amazze-orange-200",
    ring: "ring-amazze-orange-100",
  },
  "social-science": {
    gradient: "from-amazze-mint-400 via-amazze-mint-500 to-amazze-sky-500",
    glow: "shadow-mint-glow",
    bgLight: "bg-amazze-mint-50",
    text: "text-amazze-mint-500",
    tagBg: "bg-amazze-mint-50",
    tagText: "text-amazze-mint-600",
    borderHover: "hover:border-amazze-mint-200",
    ring: "ring-amazze-mint-100",
  },
};

export default function SubjectCard({ subject, simulationCount, index }) {
  const theme = colorThemes[subject.id] || colorThemes.science;
  const IconComp = iconMap[subject.id] || Beaker;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="h-full"
    >
      <Link
        to={subject.path}
        className="group block h-full"
      >
        <motion.div
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          className={`flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-7 backdrop-blur-sm transition-shadow duration-500 ${theme.glow} hover:shadow-lg`}
        >
          {/* Icon with gradient bg */}
          <motion.div
            whileHover={{ rotate: [0, -12, 12, -6, 0] }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg ${theme.glow}`}
          >
            <IconComp className="h-7 w-7" strokeWidth={2} />
          </motion.div>

          {/* Content */}
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
            {subject.eyebrow}
          </p>
          <h3 className="mt-2 text-xl font-extrabold text-slate-900">{subject.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {subject.description}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`rounded-full ${theme.tagBg} px-3.5 py-1 text-xs font-bold ${theme.tagText} ring-1 ${theme.ring}`}>
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
          <div className={`mt-auto flex items-center gap-2 pt-8 text-sm font-bold ${theme.text}`}>
            Open Lab
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

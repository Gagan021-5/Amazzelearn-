import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Target } from "lucide-react";

export default function SimulationCard({ simulation, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        to={`/simulation/${simulation.id}`}
        className="group block h-full"
      >
        <motion.div
          whileHover={{
            y: -6,
            transition: { type: "spring", stiffness: 400, damping: 15 },
          }}
          className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-soft-lg"
        >
          {/* Gradient thumbnail swatch */}
          <div
            className={`mb-5 h-36 w-full rounded-2xl bg-gradient-to-br ${simulation.accent} opacity-85 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]`}
          >
            <div className="flex h-full items-center justify-center">
              <div className="rounded-2xl bg-white/25 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-sm shadow-lg">
                {simulation.topic}
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-extrabold text-slate-900 transition-colors group-hover:text-amazze-purple-600">
            {simulation.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {simulation.summary}
          </p>

          {/* Metadata pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-500 ring-1 ring-slate-100">
              <Clock className="h-3 w-3" />
              {simulation.estimatedTime}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amazze-orange-50 px-3.5 py-1.5 text-xs font-bold text-amazze-orange-600 ring-1 ring-amazze-orange-100">
              <Target className="h-3 w-3" />
              {simulation.challenge}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold text-amazze-purple-500">
            Launch Lab
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

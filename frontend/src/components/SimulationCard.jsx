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
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/50 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10"
      >
        {/* Gradient thumbnail placeholder */}
        <div
          className={`mb-5 h-32 w-full rounded-xl bg-gradient-to-br ${simulation.accent} opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]`}
        >
          <div className="flex h-full items-center justify-center">
            <div className="rounded-2xl bg-white/20 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm">
              {simulation.topic}
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
          {simulation.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {simulation.summary}
        </p>

        {/* Metadata pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
            <Clock className="h-3 w-3" />
            {simulation.estimatedTime}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
            <Target className="h-3 w-3" />
            {simulation.challenge}
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-violet-600">
          Launch Lab
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.article>
  );
}

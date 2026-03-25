import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { subjectCatalog } from "../data/subjects";

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-3xl border border-white/50 bg-white/60 p-8 shadow-soft backdrop-blur-xl sm:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/20">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <p className="text-lg font-bold text-slate-900">Amazze Learn PBL</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Premium interactive learning for classrooms without limits.
              Built with React, Vite, Tailwind CSS, and motion-rich SVG interfaces.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-slate-400">
              Made with <Heart className="h-3.5 w-3.5 text-rose-400" /> for learners everywhere
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {subjectCatalog.map((subject) => (
              <Link
                key={subject.id}
                to={subject.path}
                className="rounded-xl bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-600 ring-1 ring-slate-200/60 transition-all hover:-translate-y-0.5 hover:shadow-md hover:text-violet-700"
              >
                {subject.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/40 pt-6">
          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Amazze Learn PBL. All simulations are open-source and designed for education.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, GraduationCap } from "lucide-react";
import { subjectCatalog } from "../data/subjects";

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-3xl border border-white/50 bg-white/70 p-8 shadow-soft backdrop-blur-xl sm:p-10"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amazze-purple-500 to-amazze-pink-500 shadow-purple-glow">
                <GraduationCap className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-lg font-extrabold text-slate-900">Amazze Learn</p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Premium interactive learning for classrooms without limits.
              Built with React, Vite, Tailwind CSS, and motion-rich interfaces.
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-400">
              Made with <Heart className="h-3.5 w-3.5 text-amazze-pink-400" /> for learners everywhere
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {subjectCatalog.map((subject) => (
              <motion.div key={subject.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={subject.path}
                  className="block rounded-xl bg-white/90 px-5 py-2.5 text-sm font-bold text-slate-600 ring-1 ring-slate-200/60 transition-all hover:shadow-soft hover:text-amazze-purple-600"
                >
                  {subject.title}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200/40 pt-6">
          <p className="text-center text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Amazze Learn. All simulations are open-source and designed for education.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { GraduationCap, Rocket, Menu, X } from "lucide-react";
import { subjectCatalog } from "../data/subjects";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/50 bg-white/75 px-5 py-3 shadow-soft backdrop-blur-xl sm:px-6"
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amazze-purple-500 to-amazze-pink-500 shadow-purple-glow"
          >
            <GraduationCap className="h-5.5 w-5.5 text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="hidden sm:block">
            <p className="text-base font-extrabold text-slate-900 tracking-tight">
              Amazze Learn
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amazze-purple-400">
              Interactive Labs
            </p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden items-center gap-1 lg:flex">
          {subjectCatalog.map((subject) => (
            <NavLink
              key={subject.id}
              to={subject.path}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200",
                  isActive
                    ? "bg-amazze-purple-50 text-amazze-purple-600 shadow-sm ring-1 ring-amazze-purple-100"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                ].join(" ")
              }
            >
              {subject.title}
            </NavLink>
          ))}
        </div>

        {/* ── Desktop CTA ── */}
        <div className="hidden items-center gap-3 lg:flex">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/subject/science"
              className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amazze-purple-500 to-amazze-purple-600 px-6 py-3 text-sm font-bold text-white shadow-purple-glow transition-all hover:shadow-purple-glow-lg"
            >
              <Rocket className="h-4 w-4 transition-transform group-hover:-rotate-12 group-hover:scale-110" />
              Start Exploring
            </Link>
          </motion.div>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/50 bg-white/90 shadow-soft-lg backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {subjectCatalog.map((subject) => (
                <NavLink
                  key={subject.id}
                  to={subject.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3 text-sm font-bold transition",
                      isActive
                        ? "bg-amazze-purple-50 text-amazze-purple-600"
                        : "text-slate-600 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {subject.title}
                </NavLink>
              ))}
              <Link
                to="/subject/science"
                onClick={() => setMobileOpen(false)}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amazze-purple-500 to-amazze-purple-600 px-4 py-3 text-sm font-bold text-white shadow-purple-glow"
              >
                <Rocket className="h-4 w-4" />
                Start Exploring
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

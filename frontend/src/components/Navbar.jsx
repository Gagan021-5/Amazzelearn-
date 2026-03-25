import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";
import { subjectCatalog } from "../data/subjects";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/50 bg-white/70 px-4 py-3 shadow-soft backdrop-blur-xl sm:px-6"
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Amazze Learn</p>
            <p className="text-[11px] font-medium text-slate-400">PBL Platform</p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {subjectCatalog.map((subject) => (
            <NavLink
              key={subject.id}
              to={subject.path}
              className={({ isActive }) =>
                [
                  "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "bg-violet-100 text-violet-700 shadow-sm"
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
          <Link
            to="/"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
          >
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-12" />
            Explore Labs
          </Link>
        </div>

        {/* ── Mobile toggle ── */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
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
                      "rounded-xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-violet-50 text-violet-700"
                        : "text-slate-600 hover:bg-slate-50",
                    ].join(" ")
                  }
                >
                  {subject.title}
                </NavLink>
              ))}
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-violet-500/20"
              >
                Explore Labs
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { subjectCatalog } from "../data/subjects";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[30px] border border-white/80 bg-white/90 px-4 py-4 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)] backdrop-blur sm:px-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#38bdf8,#22c55e)] text-lg font-extrabold text-white">
            A
          </div>
          <div>
            <p className="font-display text-lg font-bold text-slate-900">
              Amazze Learn PBL
            </p>
            <p className="text-sm text-slate-500">
              Interactive STEM and Humanities Labs
            </p>
          </div>
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="hide-scrollbar -mx-1 overflow-x-auto px-1 pb-1">
            <div className="flex w-max items-center gap-2">
              {subjectCatalog.map((subject) => (
                <NavLink
                  key={subject.id}
                  to={subject.path}
                  className={({ isActive }) =>
                    [
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100",
                    ].join(" ")
                  }
                >
                  {subject.title}
                </NavLink>
              ))}
            </div>
          </nav>
          <Link to="/" className="soft-button-primary w-full justify-center lg:w-auto">
            Explore Simulations
          </Link>
        </div>
      </motion.div>
    </header>
  );
}

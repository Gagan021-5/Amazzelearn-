import { Link } from "react-router-dom";
import { subjectCatalog } from "../data/subjects";

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[28px] border border-white/80 bg-white/80 px-6 py-8 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="subject-badge">Amazze Learn PBL</p>
          <h2 className="mt-3 text-2xl font-bold">
            Premium interactive learning for classrooms without limits.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Built with React, Vite, Tailwind CSS, and motion-rich SVG interfaces
            designed for middle school and high school learners.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {subjectCatalog.map((subject) => (
            <Link
              key={subject.id}
              to={subject.path}
              className="soft-button-secondary"
            >
              {subject.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

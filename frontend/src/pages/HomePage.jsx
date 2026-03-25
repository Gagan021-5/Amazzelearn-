import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Beaker, Brain, Globe, Sparkles, Zap } from "lucide-react";
import SubjectCard from "../components/SubjectCard";
import { subjectCatalog } from "../data/subjects";
import {
  getSimulationsBySubject,
  simulationCatalog,
} from "../simulations/registry";

/* ── Animated counter that counts up on scroll ── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1200;
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Stagger container animation ── */
const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <div className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
      {/* ═════════ HERO SECTION ═════════ */}
      <section className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Mesh gradient background */}
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.15),transparent_50%),radial-gradient(ellipse_at_70%_80%,rgba(6,182,212,0.12),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(244,63,94,0.08),transparent_40%)]" />

          {/* Floating geometric shapes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ y: [-8, 8, -8], rotate: [0, 90, 180, 270, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute left-[8%] top-[15%] h-16 w-16 rounded-xl border-2 border-violet-300/30 bg-violet-200/20"
            />
            <motion.div
              animate={{ y: [6, -10, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[12%] top-[20%] h-12 w-12 rounded-full border-2 border-cyan-300/30 bg-cyan-200/20"
            />
            <motion.div
              animate={{ y: [-6, 12, -6], x: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[18%] left-[18%] h-10 w-10 rounded-lg border-2 border-rose-300/30 bg-rose-200/20"
            />
            <motion.div
              animate={{ y: [4, -8, 4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[25%] right-[20%] h-8 w-8 rounded-full border-2 border-amber-300/30 bg-amber-200/20"
            />
          </div>

          {/* Hero content */}
          <div className="relative px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="mx-auto max-w-3xl text-center"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-violet-700 ring-1 ring-violet-200/80 backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" />
                  Project-Based Interactive Learning
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl"
              >
                Learn by doing with{" "}
                <span className="text-gradient-violet">premium simulations</span>{" "}
                for every student.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-relaxed text-slate-500 sm:text-lg"
              >
                Interactive STEM and humanities labs designed to be clear, playful,
                and deeply educational — from chemistry benches to civics boards.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Link
                    to="/subject/science"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/30 transition-all hover:shadow-2xl hover:shadow-violet-500/40"
                  >
                    <Zap className="h-4 w-4" />
                    Start Exploring
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
                <Link
                  to="/subject/mathematics"
                  className="soft-button-secondary"
                >
                  Browse Mathematics
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3"
            >
              {[
                { icon: Beaker, label: "Subject Labs", value: subjectCatalog.length, color: "text-violet-600 bg-violet-50" },
                { icon: Brain, label: "Simulations", value: simulationCatalog.length, color: "text-cyan-600 bg-cyan-50" },
                { icon: Globe, label: "Max Attempts", value: 10, color: "text-rose-600 bg-rose-50" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-sm"
                >
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      <AnimatedCounter target={stat.value} />
                    </p>
                    <p className="text-xs font-medium text-slate-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════ BENTO GRID — SUBJECT HUBS ═════════ */}
      <section id="subject-hubs" className="mx-auto mt-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="subject-badge">
            <Sparkles className="h-3 w-3" />
            Subject Hubs
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Choose your{" "}
            <span className="text-gradient-violet">learning pathway</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
            Each lab features consistent game mechanics, animated feedback, and
            guided step-by-step instructions.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {subjectCatalog.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              simulationCount={getSimulationsBySubject(subject.id).length}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* ═════════ FEATURE TILES ═════════ */}
      <section className="mx-auto mt-16 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { icon: "🧪", title: "SVG Simulations", desc: "Rich 2D visuals with real-time feedback." },
            { icon: "🎯", title: "10-Attempt Loop", desc: "Gamified tries with progress tracking." },
            { icon: "📱", title: "Mobile First", desc: "Responsive design for any device." },
            { icon: "✨", title: "Guided Steps", desc: "Step-by-step learning instructions." },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-slate-100 bg-white/80 p-5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-violet-500/5"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h4 className="mt-3 text-sm font-bold text-slate-900">{feature.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

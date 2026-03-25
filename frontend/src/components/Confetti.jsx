import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Confetti celebration component — bursts colorful particles on mount.
 * Renders 40 animated circles/squares that scatter outward and fade.
 *
 * Usage: <Confetti active={true} />
 */

const PARTICLE_COUNT = 40;
const COLORS = [
  "#38bdf8", // sky-400
  "#22c55e", // green-500
  "#f59e0b", // amber-500
  "#f97316", // orange-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
  "#eab308", // yellow-500
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: randomBetween(-220, 220),
    y: randomBetween(-260, -40),
    rotate: randomBetween(0, 720),
    scale: randomBetween(0.4, 1.2),
    color: COLORS[i % COLORS.length],
    size: randomBetween(6, 14),
    isSquare: Math.random() > 0.5,
    delay: randomBetween(0, 0.3),
    duration: randomBetween(1.2, 2.4),
  }));
}

export default function Confetti({ active = false }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      setParticles(createParticles());
    } else {
      setParticles([]);
    }
  }, [active]);

  return (
    <AnimatePresence>
      {active && particles.length > 0 && (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
          <div className="relative h-full w-full">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{
                  opacity: 1,
                  x: "50%",
                  y: "30%",
                  scale: 0,
                  rotate: 0,
                }}
                animate={{
                  opacity: [1, 1, 0],
                  x: `calc(50% + ${p.x}px)`,
                  y: `calc(30% + ${p.y}px)`,
                  scale: p.scale,
                  rotate: p.rotate,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                }}
                style={{
                  position: "absolute",
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  borderRadius: p.isSquare ? "3px" : "50%",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SimulationPage from "./pages/SimulationPage";
import SubjectHubPage from "./pages/SubjectHubPage";

function RouteScrollManager() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell relative min-h-screen overflow-hidden">
      {/* ── Ambient mesh gradient blobs ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-violet-200/30 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 15, -25, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 top-20 h-[400px] w-[400px] rounded-full bg-cyan-200/25 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -15, 20, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 left-1/3 h-[500px] w-[500px] rounded-full bg-rose-200/20 blur-[100px]"
        />
        <div className="absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-amber-100/15 blur-[80px]" />
      </div>

      <RouteScrollManager />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subject/:subjectId" element={<SubjectHubPage />} />
          <Route path="/simulation/:simulationId" element={<SimulationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

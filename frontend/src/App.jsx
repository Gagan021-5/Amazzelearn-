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
            x: [0, 40, -20, 0],
            y: [0, -30, 15, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-amazze-purple-200/25 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 20, -30, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 top-20 h-[450px] w-[450px] rounded-full bg-amazze-mint-200/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 25, -18, 0],
            y: [0, -18, 25, 0],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-amazze-orange-200/15 blur-[120px]"
        />
        <div className="absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-amazze-pink-100/12 blur-[100px]" />
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

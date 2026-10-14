import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import WhyChooseSkillNex from "./components/WhyChooseSkillNex";
import WhatWeDo from "./components/How we train";
import Founder from "./components/About Skillnex";
import TrainingProcess from "./components/TrainingProcess";
import WhatWeProvide from "./components/WhatWeProvide";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

import ProgramPage from "./pages/SocialMediaDetails";
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToHash() {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 80);
      }
    };
    tryScroll();
  }, [hash, pathname]);
  return null;
}

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Hero />
        <Programs />
        <WhyChooseSkillNex />
        <Founder />
        <WhatWeDo />
        <TrainingProcess />
        <WhatWeProvide />
        <Portfolio />
        <Reviews />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* All program detail pages — shared redesigned template */}
        <Route path="/programs/:slug" element={<ProgramPage />} />

        {/* Admin Control Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

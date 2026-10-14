import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  Sparkles,
  BookOpen,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react";

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

/* ─────────────────────────────────────────
   STICKY NAV ITEMS
───────────────────────────────────────── */

const NAV_ITEMS = [
  { label: "Overview",        id: "overview"    },
  { label: "Curriculum",      id: "curriculum"  },
  { label: "Career Outcomes", id: "career"      },
  { label: "Apply",           id: "apply"       },
];

/* ─────────────────────────────────────────
   DATA HELPERS (local — no shared dep)
───────────────────────────────────────── */

function extractStrings(value) {
  const arr = Array.isArray(value)
    ? value
    : Array.isArray(value?.points)
    ? value.points
    : Array.isArray(value?.items)
    ? value.items
    : [];
  return arr
    .map((item) =>
      typeof item === "string"
        ? item
        : item?.title || item?.description || ""
    )
    .filter(Boolean);
}

/* ─────────────────────────────────────────
   ACCORDION MODULE
───────────────────────────────────────── */

function Module({ module, index, isOpen, onToggle, shouldReduceMotion }) {
  const title =
    typeof module === "string"
      ? module
      : module?.title || module?.category || `Module ${index + 1}`;
  const category =
    typeof module === "object" ? module?.category || "" : "";
  const description =
    typeof module === "object"
      ? module?.description || module?.summary || ""
      : "";
  const topics = Array.isArray(module?.topics) ? module.topics : [];

  return (
    <motion.div
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-5 px-0 py-6 text-left group"
      >
        <span
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
            isOpen
              ? "bg-cyan-600 text-white"
              : "bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-cyan-600"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          {category && (
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-500 block mb-0.5">
              {category}
            </span>
          )}
          <span className="font-semibold text-ink text-base md:text-lg leading-snug block">
            {title}
          </span>
        </div>

        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 transition-transform duration-300 mr-1 ${
            isOpen ? "rotate-180 text-cyan-600" : "text-gray-400"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8" style={{ paddingLeft: "3.75rem" }}>
              {description && (
                <p className="text-ink-secondary leading-relaxed text-[0.95rem] mb-5">
                  {description}
                </p>
              )}
              {topics.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {topics.map((topic, i) => {
                    const text =
                      typeof topic === "string"
                        ? topic
                        : topic?.title || topic?.name || "";
                    return (
                      <li key={i} className="flex items-start gap-3 text-sm text-ink">
                        <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-cyan-500 mt-0.5" />
                        <span>{text}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   EYEBROW LABEL
───────────────────────────────────────── */

function Eyebrow({ text, light = false, center = false }) {
  return (
    <div
      className={`flex items-center gap-2 mb-4 ${center ? "justify-center" : ""}`}
    >
      <span
        className={`w-4 h-[2px] ${light ? "bg-amber" : "bg-cyan-600"}`}
      />
      <span
        className={`text-[11px] uppercase tracking-[0.25em] font-semibold ${
          light ? "text-white/50" : "text-ink-secondary"
        }`}
      >
        {text}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   STRUCTURE ICONS
───────────────────────────────────────── */

const STRUCTURE_ICONS = [BookOpen, Zap, TrendingUp, Star];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */

export default function SocialMediaDetail({ program }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [navSticky, setNavSticky] = useState(false);
  const [openModule, setOpenModule] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  /* ── Smooth scroll on mount ── */
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  /* ── Sticky nav: show after hero clears viewport ── */
  useEffect(() => {
    const handleScroll = () => {
      const heroBottom =
        heroRef.current?.getBoundingClientRect().bottom ?? 300;
      setNavSticky(heroBottom < 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Derived data ── */
  const whyPoints      = extractStrings(program.whyBecome);
  const careerPoints   = extractStrings(program.careerBenefits);
  const outcomes       = extractStrings(program.outcomes);
  const structureItems = Array.isArray(program.structure?.items)
    ? program.structure.items
    : [];
  const processSteps   = Array.isArray(program.process?.steps)
    ? program.process.steps
    : [];
  const syllabus       = Array.isArray(program.syllabus)
    ? program.syllabus
    : [];

  /* ═══════════════════════════════════════
     RENDER
  ═══════════════════════════════════════ */

  return (
    <div className="min-h-screen bg-white">

      {/* ──────────────────────────────────
          1. HERO
      ────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-[#07111f] text-white"
      >
        {/* Decorative background */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-20 -right-20 w-[520px] h-[520px] rounded-full bg-cyan-600 opacity-[0.13] blur-[110px]" />
          <div className="absolute bottom-0 -left-16 w-[380px] h-[380px] rounded-full bg-amber-500 opacity-[0.10] blur-[90px]" />
          {/* Dot grid */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative container-page pt-8 pb-18 md:pt-10 md:pb-22 lg:pb-24">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All programs
          </Link>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            {/* Category badge */}
            {program.category && (
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] uppercase tracking-[0.25em] font-semibold text-cyan-300">
                  {program.category}
                </span>
              </motion.div>
            )}

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.05] mb-5"
            >
              {program.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl"
            >
              {program.description}
            </motion.p>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-5 mb-10"
            >
              {program.duration && (
                <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium">
                  <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {program.duration}
                </span>
              )}
              {syllabus.length > 0 && (
                <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium">
                  <BookOpen className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {syllabus.length} Modules
                </span>
              )}
              {processSteps.length > 0 && (
                <span className="inline-flex items-center gap-2 text-white/60 text-sm font-medium">
                  <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {processSteps.length}-Stage Journey
                </span>
              )}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#curriculum"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all duration-300 hover:scale-[1.02] shadow-glow text-sm"
              >
                Explore Curriculum
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#overview"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300 text-sm"
              >
                Program Overview
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────
          2. STICKY SUB-NAV
      ────────────────────────────────── */}
      <AnimatePresence>
        {navSticky && (
          <motion.nav
            initial={shouldReduceMotion ? false : { y: -56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={shouldReduceMotion ? false : { y: -56, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Page sections"
            className="fixed top-0 left-0 right-0 z-50 bg-white/96 backdrop-blur-sm border-b border-gray-200 shadow-sm"
          >
            <div className="container-page">
              <div className="flex items-center gap-6 h-14">
                {/* Program name */}
                <span className="font-display font-bold text-ink text-sm truncate max-w-[180px] hidden sm:block flex-shrink-0">
                  {program.title}
                </span>

                {/* Divider */}
                <span className="hidden sm:block w-px h-5 bg-gray-200 flex-shrink-0" />

                {/* Section links */}
                <div className="flex items-center gap-1 flex-1 overflow-x-auto">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        activeSection === item.id
                          ? "bg-cyan-600 text-white"
                          : "text-ink-secondary hover:text-ink hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                {/* Get Started */}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeozOvJLaLNhY2pYnIFjtsE9U3SCs3pX1im2suiDp1AFw1FPw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-700 transition-colors"
                >
                  Get Started
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────
          3. OVERVIEW
      ────────────────────────────────── */}
      <section id="overview" className="section-pad bg-white scroll-mt-16">
        <div className="container-page max-w-4xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Eyebrow text="Program Overview" />
          </motion.div>

          {/* Positioning line as pull quote — the defining reference pattern */}
          {program.positioningLine && (
            <motion.blockquote
              initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-4 border-cyan-500 pl-7 mb-14"
            >
              <p className="text-2xl md:text-3xl font-semibold leading-snug text-ink italic">
                &ldquo;{program.positioningLine}&rdquo;
              </p>
            </motion.blockquote>
          )}

          {/* Overview heading + description */}
          {program.overview?.heading && (
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-display font-bold text-ink mb-5 leading-tight"
            >
              {program.overview.heading}
            </motion.h2>
          )}

          {program.overview?.description && (
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.06 }}
              className="text-lg text-ink-secondary leading-8 mb-8"
            >
              {program.overview.description}
            </motion.p>
          )}

          {/* Note callout */}
          {program.overview?.note && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-start gap-3 rounded-2xl bg-cyan-50 border border-cyan-100 p-5 mb-14"
            >
              <Sparkles className="flex-shrink-0 w-5 h-5 text-cyan-600 mt-0.5" />
              <p className="text-ink-secondary leading-7 text-[0.95rem]">
                {program.overview.note}
              </p>
            </motion.div>
          )}

          {/* Program format chips */}
          {structureItems.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {structureItems.map((item, i) => {
                const Icon = STRUCTURE_ICONS[i] || Zap;
                const text =
                  typeof item === "string" ? item : item?.title || String(item);
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex flex-col gap-3 rounded-2xl border border-cyan-100 bg-surface-subtle p-5 hover:border-cyan-200 hover:shadow-soft transition-all duration-300"
                  >
                    <span className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-ink text-sm leading-snug">
                      {text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────
          4. WHY THIS PROGRAM
          Two-column: sticky heading left,
          scrolling numbered list right
      ────────────────────────────────── */}
      {whyPoints.length > 0 && (
        <section className="section-pad bg-surface-subtle">
          <div className="container-page">
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start max-w-5xl mx-auto">
              {/* Left: sticky heading */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-24"
              >
                <Eyebrow text="Why This Program" />
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
                  {program.whyBecome?.heading ||
                    "Why Become a Social Media Manager?"}
                </h2>
              </motion.div>

              {/* Right: numbered point list */}
              <motion.ul
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
                className="space-y-4"
              >
                {whyPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-soft hover:shadow-card hover:border-cyan-100 transition-all duration-300"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-ink-secondary leading-7 text-[0.95rem]">
                      {point}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────
          5. LEARNING JOURNEY — timeline
      ────────────────────────────────── */}
      {processSteps.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Eyebrow text="Learning Experience" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
                {program.process?.heading || "Your Learning Journey"}
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-cyan-500 via-cyan-300 to-amber-300 hidden sm:block"
                aria-hidden="true"
              />

              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={stagger}
                className="space-y-5"
              >
                {processSteps.map((step, i) => {
                  const title =
                    typeof step === "string"
                      ? step
                      : step?.title || step?.step || `Step ${i + 1}`;
                  const desc =
                    typeof step === "object"
                      ? step?.description || step?.text || ""
                      : "";
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="relative flex gap-5 items-start"
                    >
                      <span className="flex-shrink-0 z-10 w-10 h-10 rounded-full bg-white border-2 border-cyan-500 text-cyan-600 flex items-center justify-center font-bold text-sm shadow-soft">
                        {i + 1}
                      </span>
                      <div className="flex-1 rounded-2xl border border-cyan-100 bg-surface-subtle p-5 md:p-6 shadow-soft hover:shadow-card hover:border-cyan-200 transition-all duration-300">
                        <h3 className="font-display font-bold text-ink text-lg mb-1.5 leading-snug">
                          {title}
                        </h3>
                        {desc && (
                          <p className="text-ink-secondary leading-7 text-[0.95rem]">
                            {desc}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────
          6. CURRICULUM — accordion
      ────────────────────────────────── */}
      {syllabus.length > 0 && (
        <section
          id="curriculum"
          className="section-pad bg-surface-subtle scroll-mt-16"
        >
          <div className="container-page max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <Eyebrow text="Curriculum" center />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
                {syllabus.length} Modules&nbsp;&middot;&nbsp;Full Program Syllabus
              </h2>
              <p className="text-ink-secondary mt-4 text-base leading-relaxed max-w-xl mx-auto">
                Expand each module to see the topics covered.
              </p>
            </motion.div>

            {/* Modules in a card */}
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-soft divide-y divide-gray-100">
              {syllabus.map((module, i) => (
                <div key={i} className="px-6 md:px-8">
                  <Module
                    module={module}
                    index={i}
                    isOpen={openModule === i}
                    onToggle={() =>
                      setOpenModule(openModule === i ? null : i)
                    }
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────
          7. LEARNING OUTCOMES — checklist
      ────────────────────────────────── */}
      {outcomes.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Eyebrow text="What You'll Achieve" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
                {typeof program.outcomes?.heading === "string"
                  ? program.outcomes.heading
                  : "Learning Outcomes"}
              </h2>
            </motion.div>

            <motion.ul
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid sm:grid-cols-2 gap-4"
            >
              {outcomes.map((point, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3.5 rounded-2xl border border-cyan-100 bg-surface-subtle p-5 hover:border-cyan-200 hover:shadow-soft transition-all duration-300"
                >
                  <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-cyan-500 mt-0.5" />
                  <p className="text-ink-secondary leading-7 text-[0.95rem]">
                    {point}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────
          8. CAREER BENEFITS — dark section
      ────────────────────────────────── */}
      {careerPoints.length > 0 && (
        <section
          id="career"
          className="relative overflow-hidden section-pad bg-[#07111f] text-white scroll-mt-16"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full bg-cyan-700 opacity-[0.15] blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-amber-700 opacity-[0.10] blur-[80px]" />
          </div>

          <div className="relative container-page max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Eyebrow text="Career Outcomes" light />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                {program.careerBenefits?.heading || "Long-Term Career Benefits"}
              </h2>
            </motion.div>

            <motion.ul
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="space-y-4"
            >
              {careerPoints.map((point, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/20 p-5 transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-white/80 leading-7 text-[0.95rem]">
                    {point}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────
          9. FINAL CTA
      ────────────────────────────────── */}
      <section
        id="apply"
        className="relative overflow-hidden section-pad bg-gradient-to-br from-[#07111f] via-[#0a1828] to-[#0e2236] text-white scroll-mt-16"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-600 opacity-[0.12] blur-[120px]" />
        </div>

        <div className="relative container-page text-center max-w-2xl mx-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-4 h-[2px] bg-amber" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-cyan-300">
                Start Your Journey
              </span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
              {program.positioningLine ||
                `Build real skills in ${program.title}.`}
            </h2>

            <p className="text-white/70 text-lg leading-7 mb-10 max-w-xl mx-auto">
              Join SkillNex and learn by doing through real projects, mentor
              feedback, and a portfolio that proves your skills.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeozOvJLaLNhY2pYnIFjtsE9U3SCs3pX1im2suiDp1AFw1FPw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all duration-300 hover:scale-[1.02] shadow-glow"
              >
                Get Started
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Other Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

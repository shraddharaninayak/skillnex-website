import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  BookOpen,
  Route,
  Target,
  CheckCircle2,
  Sparkles,
  Building2,
  AlertCircle,
  Loader2,
  TrendingUp,
} from "lucide-react";
import fallbackPrograms from "../data/program.js";

/* =============================================================
   API
============================================================= */

async function fetchProgram(slug) {
  try {
    const res = await fetch(`/api/programs/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const result = await res.json();
      const d = result?.data || result?.program || result;
      if (d && (d.title || d.slug)) return { data: d, error: null };
    }
  } catch (e) {
    console.warn("API unavailable, using local data:", e);
  }
  const local = fallbackPrograms.find(
    (p) => p.slug?.toLowerCase() === slug?.toLowerCase()
  );
  return local
    ? { data: local, error: null }
    : { data: null, error: "Program not found." };
}

/* =============================================================
   HELPERS
============================================================= */

function getArray(v) {
  return Array.isArray(v) ? v : [];
}

function getPoints(v) {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  if (Array.isArray(v.points)) return v.points;
  if (Array.isArray(v.items)) return v.items;
  return [];
}

function getStructureItems(s) {
  if (!s) return [];
  if (Array.isArray(s)) return s;
  if (Array.isArray(s.items)) return s.items;
  return [];
}

function getProcessSteps(p) {
  if (!p) return [];
  if (Array.isArray(p)) return p;
  if (Array.isArray(p.steps)) return p.steps;
  if (Array.isArray(p.items)) return p.items;
  return [];
}

function getSyllabus(p) {
  return Array.isArray(p?.syllabus) ? p.syllabus : [];
}

function getCompanies(p) {
  if (!Array.isArray(p?.companies)) return [];
  return p.companies
    .map((c) => (typeof c === "string" ? c : c?.name || c?.title || ""))
    .filter(Boolean);
}

function ptTitle(pt) {
  if (!pt || typeof pt === "string") return "";
  return pt.title || pt.heading || pt.name || "";
}

function ptDesc(pt) {
  if (!pt) return "";
  if (typeof pt === "string") return pt;
  return pt.description || pt.text || pt.detail || pt.content || "";
}

function stepTitle(s) {
  if (!s) return "";
  if (typeof s === "string") return s;
  return s.title || s.step || s.heading || s.name || "";
}

function stepDesc(s) {
  if (!s || typeof s === "string") return "";
  return s.description || s.text || s.detail || s.content || "";
}

function structTitle(i) {
  if (!i) return "";
  if (typeof i === "string") return i;
  return i.title || i.name || i.heading || "";
}

function structDesc(i) {
  if (!i || typeof i === "string") return "";
  return i.description || i.text || i.detail || i.content || "";
}

/* =============================================================
   ANIMATION VARIANTS
============================================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeozOvJLaLNhY2pYnIFjtsE9U3SCs3pX1im2suiDp1AFw1FPw/viewform";

/* =============================================================
   STICKY IN-PAGE NAVIGATION
============================================================= */

const NAV_SECTIONS = [
  { id: "overview",  label: "Overview"   },
  { id: "syllabus",  label: "Curriculum" },
  { id: "journey",   label: "Journey"    },
  { id: "outcomes",  label: "Outcomes"   },
  { id: "enroll",    label: "Enroll"     },
];

function StickyNav({ visible, active }) {
  return (
    <motion.div
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: visible ? 0 : -64, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
      className="
        fixed top-0 left-0 right-0 z-50
        bg-white/96 backdrop-blur-md
        border-b border-cyan-100 shadow-sm
      "
    >
      <div className="container-page h-14 flex items-center gap-4 overflow-x-auto">
        <Link
          to="/#programs"
          tabIndex={visible ? 0 : -1}
          className="
            flex-shrink-0 inline-flex items-center gap-1.5
            text-sm text-ink-secondary hover:text-ink
            transition-colors whitespace-nowrap
          "
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Programs
        </Link>

        <span className="w-px h-5 bg-line flex-shrink-0" />

        <nav className="flex items-center gap-1">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              tabIndex={visible ? 0 : -1}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full
                text-sm font-medium transition-all duration-200
                ${active === s.id
                  ? "bg-cyan-600 text-white"
                  : "text-ink-secondary hover:text-ink hover:bg-surface-subtle"}
              `}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className="
            ml-auto flex-shrink-0
            inline-flex items-center gap-1.5
            px-5 py-2 rounded-full
            bg-cyan-600 text-white text-sm font-semibold
            hover:bg-cyan-500 transition-colors whitespace-nowrap
          "
        >
          Apply Now
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

/* =============================================================
   STICKY PROGRAM SIDEBAR
============================================================= */

function ProgramSidebar({ stats, positioningLine }) {
  return (
    <div className="sticky top-24 rounded-2xl border border-cyan-200 bg-white shadow-card p-7">
      {stats.length > 0 && (
        <div className="space-y-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-3.5">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
                    {stat.label}
                  </div>
                  <div className="font-semibold text-ink text-[0.95rem]">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {positioningLine && (
        <p className="text-sm text-ink-secondary leading-relaxed border-t border-line pt-5 mb-6">
          {positioningLine}
        </p>
      )}

      <div className="space-y-3">
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center justify-center gap-2 w-full
            px-6 py-3.5 rounded-full
            bg-cyan-600 text-white font-semibold text-sm
            hover:bg-cyan-500 transition-all duration-300
            hover:scale-[1.02] shadow-glow
          "
        >
          Apply Now
          <ArrowUpRight className="w-4 h-4" />
        </a>
        <a
          href="#syllabus"
          className="
            flex items-center justify-center gap-2 w-full
            px-6 py-3 rounded-full
            border border-cyan-200 text-ink font-semibold text-sm
            hover:border-cyan-400 hover:bg-cyan-50
            transition-colors duration-200
          "
        >
          <BookOpen className="w-4 h-4 text-cyan-600" />
          View Curriculum
        </a>
      </div>
    </div>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mb-14" : "mb-10"}>
      <div
        className={`flex items-center gap-2 mb-4 ${align === "center" ? "justify-center" : ""}`}
      >
        <span className="w-4 h-[2px] bg-cyan-600" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p
          className={`text-ink-secondary mt-3 text-lg leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* =============================================================
   SYLLABUS ACCORDION
============================================================= */

function SyllabusAccordion({ module, index, isOpen, onToggle }) {
  const shouldReduceMotion = useReducedMotion();
  const topics = getArray(module?.topics);
  const title =
    typeof module === "string"
      ? module
      : module?.title || module?.name || `Module ${index + 1}`;
  const category =
    typeof module === "object" ? module?.category || module?.unit : "";
  const description =
    typeof module === "string" ? "" : module?.description || module?.summary || "";

  return (
    <motion.div
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`
        rounded-2xl border bg-white overflow-hidden
        transition-all duration-300
        ${isOpen ? "border-cyan-300 shadow-card" : "border-cyan-100 shadow-soft hover:border-cyan-200"}
      `}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
      >
        <span
          className="
            flex-shrink-0 w-11 h-11 rounded-xl
            bg-gradient-to-br from-cyan-500 to-cyan-600
            text-white flex items-center justify-center
            font-display font-bold
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          {category && (
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-amber mb-1 block">
              {category}
            </span>
          )}
          <h3 className="font-display font-bold text-ink text-base md:text-lg leading-snug">
            {title}
          </h3>
          {description && !isOpen && (
            <p className="text-ink-secondary text-sm mt-1 line-clamp-1">{description}</p>
          )}
        </div>

        <ChevronDown
          className={`
            flex-shrink-0 w-5 h-5 text-ink-secondary
            transition-transform duration-300
            ${isOpen ? "rotate-180 text-cyan-600" : ""}
          `}
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
            <div className="px-5 md:px-6 pb-6 pl-[4.25rem] md:pl-[5.5rem]">
              {description && (
                <p className="text-ink-secondary leading-7 text-[0.95rem] mb-4">
                  {description}
                </p>
              )}
              {topics.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {topics.map((topic, i) => {
                    const text =
                      typeof topic === "string"
                        ? topic
                        : topic?.title || topic?.name || topic?.description || "";
                    return (
                      <li
                        key={`${index}-${i}`}
                        className="flex items-start gap-2.5 text-[0.9rem] text-ink"
                      >
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

/* =============================================================
   MAIN PAGE COMPONENT
============================================================= */

export default function ProgramPage() {
  const { slug } = useParams();

  const [program, setProgram]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [openModule, setOpenModule] = useState(null);
  const [navVisible, setNavVisible] = useState(false);
  const [activeSection, setActive]  = useState("overview");

  const heroRef            = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  /* — fetch — */
  useEffect(() => {
    if (!slug) {
      setError("Invalid program link.");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setProgram(null);
    setOpenModule(null);
    setNavVisible(false);
    setActive("overview");

    fetchProgram(slug).then(({ data, error: err }) => {
      if (cancelled) return;
      if (err) setError(err);
      else if (data) setProgram(data);
      else setError("Program not found.");
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [slug]);

  /* — sticky nav: appear when hero scrolls out — */
  useEffect(() => {
    if (loading || !heroRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, [loading]);

  /* — scroll-spy for active section — */
  useEffect(() => {
    if (loading || !program) return;
    const ids = ["overview", "syllabus", "journey", "outcomes", "enroll"];
    const observers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const io = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActive(id); },
          { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
        );
        io.observe(el);
        return io;
      })
      .filter(Boolean);
    return () => observers.forEach((io) => io.disconnect());
  }, [loading, program]);

  /* — loading state — */
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
          <p className="text-ink-secondary font-medium">Loading program…</p>
        </div>
      </div>
    );
  }

  /* — error state — */
  if (error || !program) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-ink text-2xl mb-3">
            {error || "Something went wrong"}
          </h1>
          <p className="text-ink-secondary mb-8">
            We couldn't load this program. It may have been moved or the link is incorrect.
          </p>
          <Link
            to="/#programs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to programs
          </Link>
        </div>
      </div>
    );
  }

  /* — extract data — */
  const syllabus       = getSyllabus(program);
  const companies      = getCompanies(program);
  const structureItems = getStructureItems(program.structure);
  const processSteps   = getProcessSteps(program.process);
  const outcomes       = getPoints(program.outcomes);
  const whyPoints      = getPoints(program.whyBecome);
  const careerPoints   = getPoints(program.careerBenefits);
  const overview       = program.overview && typeof program.overview === "object"
    ? program.overview
    : null;
  const positioningLine = program.positioningLine || program.positioning || program.tagline || "";

  const sidebarStats = [
    program.duration        ? { icon: Clock,     label: "Duration",         value: program.duration                  } : null,
    syllabus.length         ? { icon: BookOpen,   label: "Curriculum",       value: `${syllabus.length} Modules`      } : null,
    processSteps.length     ? { icon: Route,      label: "Learning Journey", value: `${processSteps.length} Stages`   } : null,
    outcomes.length         ? { icon: Target,     label: "Outcomes",         value: `${outcomes.length} Outcomes`     } : null,
  ].filter(Boolean);

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="min-h-screen bg-white">

      {/* ── STICKY IN-PAGE NAV ─────────────────────────────── */}
      <StickyNav visible={navVisible} active={activeSection} />

      {/* ════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="
          relative overflow-hidden text-white
          bg-gradient-to-br from-[#07111f] via-[#0a1828] to-[#0e2236]
        "
      >
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient blobs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cyan-500 blur-[140px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500 blur-[100px]" />
        </div>

        <div className="relative container-page pt-10 pb-24 md:pb-28 lg:pb-32">
          {/* Back link */}
          <Link
            to="/#programs"
            className="
              inline-flex items-center gap-2
              text-white/60 hover:text-white/90
              transition-colors mb-10 text-sm font-medium
            "
          >
            <ArrowLeft className="w-4 h-4" />
            All programs
          </Link>

          {/* Two-column layout: copy left, stats card right */}
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">

            {/* ── Hero copy ── */}
            <motion.div
              className="lg:col-span-3"
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={stagger}
            >
              {program.category && (
                <motion.div variants={fadeUp} className="mb-5">
                  <span
                    className="
                      inline-flex items-center gap-2
                      px-3.5 py-1.5 rounded-full
                      bg-white/10 border border-white/15
                      text-[11px] uppercase tracking-[0.25em]
                      font-semibold text-cyan-300
                    "
                  >
                    {program.category}
                  </span>
                </motion.div>
              )}

              {program.title && (
                <motion.h1
                  variants={fadeUp}
                  className="
                    font-display font-extrabold
                    text-4xl md:text-5xl lg:text-[3.5rem]
                    leading-[1.05] mb-5
                  "
                >
                  {program.title}
                </motion.h1>
              )}

              {program.description && (
                <motion.p
                  variants={fadeUp}
                  className="text-lg md:text-xl text-white/75 leading-7 mb-8 max-w-xl"
                >
                  {program.description}
                </motion.p>
              )}

              {program.duration && (
                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-2 text-white/60 mb-8"
                >
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium">{program.duration}</span>
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3.5 rounded-full
                    bg-cyan-500 text-white font-semibold
                    hover:bg-cyan-400 transition-all duration-300
                    hover:scale-[1.02] shadow-glow
                  "
                >
                  Apply Now
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#syllabus"
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3.5 rounded-full
                    bg-white/10 border border-white/20
                    text-white font-semibold
                    hover:bg-white/15 transition-all duration-300
                  "
                >
                  View Curriculum
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* ── At-a-glance card (desktop) ── */}
            {sidebarStats.length > 0 && (
              <motion.div
                className="lg:col-span-2 hidden lg:block"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-6">
                    Program at a glance
                  </p>
                  <div className="space-y-5">
                    {sidebarStats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="flex items-center gap-4">
                          <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/10 text-cyan-300 flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                              {stat.label}
                            </div>
                            <div className="font-semibold text-white text-sm">{stat.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          2. OVERVIEW  (two-column: content + sticky sidebar)
      ════════════════════════════════════════════════════ */}
      <section id="overview" className="section-pad bg-white">
        <div className="container-page">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

            {/* ── Main content column ── */}
            <div className="lg:col-span-2 space-y-16">

              {/* Program overview */}
              {overview && (overview.heading || overview.description) && (
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stagger}
                >
                  <SectionHeading eyebrow="Program Overview" title={overview.heading || "Overview"} />

                  {overview.description && (
                    <motion.p
                      variants={fadeUp}
                      className="text-lg text-ink-secondary leading-8 mb-6"
                    >
                      {overview.description}
                    </motion.p>
                  )}

                  {overview.note && (
                    <motion.div
                      variants={fadeUp}
                      className="
                        flex items-start gap-3
                        rounded-2xl bg-cyan-50 border border-cyan-100 p-5
                      "
                    >
                      <Sparkles className="flex-shrink-0 w-5 h-5 text-cyan-600 mt-0.5" />
                      <p className="text-ink-secondary leading-7 text-[0.95rem]">
                        {overview.note}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Why this program */}
              {whyPoints.length > 0 && (
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stagger}
                >
                  <SectionHeading
                    eyebrow="Why This Program"
                    title={program.whyBecome?.heading || "Why Social Media Management?"}
                  />

                  <motion.ul variants={stagger} className="space-y-4">
                    {whyPoints.map((point, i) => {
                      const text =
                        typeof point === "string"
                          ? point
                          : ptDesc(point) || ptTitle(point);
                      return (
                        <motion.li
                          key={i}
                          variants={fadeUp}
                          className="flex items-start gap-3.5"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mt-0.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-ink-secondary leading-7">{text}</span>
                        </motion.li>
                      );
                    })}
                  </motion.ul>
                </motion.div>
              )}

              {/* Program structure */}
              {structureItems.length > 0 && (
                <motion.div
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={stagger}
                >
                  <SectionHeading eyebrow="How You'll Learn" title="Program Structure" />

                  <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
                    {structureItems.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={fadeUp}
                        className="
                          flex items-start gap-3.5
                          rounded-xl border border-cyan-100 bg-surface-subtle p-5
                        "
                      >
                        <span
                          className="
                            flex-shrink-0 w-8 h-8 rounded-lg
                            bg-amber-50 text-amber-600
                            flex items-center justify-center
                            font-display font-bold text-sm
                          "
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{structTitle(item)}</p>
                          {structDesc(item) && (
                            <p className="text-sm text-ink-secondary mt-0.5">{structDesc(item)}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* ── Sticky sidebar ── */}
            <div className="lg:col-span-1">
              <ProgramSidebar stats={sidebarStats} positioningLine={positioningLine} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          3. CURRICULUM
      ════════════════════════════════════════════════════ */}
      {syllabus.length > 0 && (
        <section id="syllabus" className="section-pad bg-surface-subtle">
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="Curriculum"
              title={`Syllabus · ${syllabus.length} Modules`}
              subtitle="Explore the full curriculum and topics covered across each module."
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {syllabus.map((module, index) => (
                <SyllabusAccordion
                  key={`module-${index}`}
                  module={module}
                  index={index}
                  isOpen={openModule === index}
                  onToggle={() =>
                    setOpenModule(openModule === index ? null : index)
                  }
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          4. LEARNING JOURNEY
      ════════════════════════════════════════════════════ */}
      {processSteps.length > 0 && (
        <section id="journey" className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="Learning Journey"
              title={program.process?.heading || "Your Learning Journey"}
            />

            <div className="relative">
              {/* Timeline connector line */}
              <div
                className="
                  absolute left-[19px] top-3 bottom-3 w-[2px]
                  bg-gradient-to-b from-cyan-500 via-cyan-300 to-amber-300
                  hidden sm:block
                "
                aria-hidden="true"
              />

              <motion.div
                variants={stagger}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-6"
              >
                {processSteps.map((step, index) => (
                  <motion.div
                    key={`step-${index}`}
                    variants={fadeUp}
                    className="relative flex gap-5 items-start"
                  >
                    <span
                      className="
                        flex-shrink-0 z-10
                        w-10 h-10 rounded-full
                        bg-white border-2 border-cyan-500
                        text-cyan-600
                        flex items-center justify-center
                        font-display font-bold text-sm
                        shadow-soft
                      "
                    >
                      {index + 1}
                    </span>

                    <div
                      className="
                        flex-1 rounded-2xl border border-cyan-100
                        bg-surface-subtle p-5 md:p-6 shadow-soft
                      "
                    >
                      <h3 className="font-display font-bold text-ink text-lg mb-1.5 leading-snug">
                        {stepTitle(step)}
                      </h3>
                      <p className="text-ink-secondary leading-7 text-[0.95rem]">
                        {stepDesc(step)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════
          5. OUTCOMES  (outcomes + career benefits)
      ════════════════════════════════════════════════════ */}
      <section id="outcomes" className="section-pad bg-surface-subtle">
        <div className="container-page max-w-4xl space-y-16">

          {/* Learning outcomes */}
          {outcomes.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <SectionHeading
                eyebrow="What You'll Achieve"
                title={program.outcomes?.heading || "Learning Outcomes"}
                align="center"
              />

              <motion.div
                variants={stagger}
                className="grid sm:grid-cols-2 gap-4"
              >
                {outcomes.map((point, index) => (
                  <motion.div
                    key={`outcome-${index}`}
                    variants={fadeUp}
                    className="
                      flex items-start gap-3.5
                      rounded-2xl border border-cyan-100 bg-white
                      p-5 md:p-6
                    "
                  >
                    <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-cyan-500 mt-0.5" />
                    <div>
                      {ptTitle(point) && (
                        <h3 className="font-display font-bold text-ink mb-1 leading-snug">
                          {ptTitle(point)}
                        </h3>
                      )}
                      <p className="text-ink-secondary text-sm leading-6">
                        {typeof point === "string" ? point : ptDesc(point)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Career benefits */}
          {careerPoints.length > 0 && (
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <SectionHeading
                eyebrow="Career Benefits"
                title={program.careerBenefits?.heading || "Long-Term Career Path"}
              />

              <motion.ul variants={stagger} className="space-y-4">
                {careerPoints.map((point, i) => {
                  const text =
                    typeof point === "string"
                      ? point
                      : ptDesc(point) || ptTitle(point);
                  return (
                    <motion.li
                      key={i}
                      variants={fadeUp}
                      className="flex items-start gap-3.5"
                    >
                      <span
                        className="
                          flex-shrink-0 w-6 h-6 rounded-full
                          bg-amber-100 text-amber-600
                          flex items-center justify-center mt-0.5
                        "
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-ink-secondary leading-7">{text}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          6. FINAL CTA  (id=enroll)
      ════════════════════════════════════════════════════ */}
      <section
        id="enroll"
        className="
          relative overflow-hidden text-white
          bg-gradient-to-br from-[#07111f] via-[#0a1828] to-[#0e2236]
        "
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <div
            className="
              absolute top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[600px] h-[400px] rounded-full
              bg-cyan-500 blur-[120px]
            "
          />
        </div>

        <div className="relative container-page section-pad text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-4 h-[2px] bg-amber" />
              <span className="eyebrow text-cyan-300">Start Your Journey</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
              {positioningLine ||
                `Build real skills in ${program.title || "your chosen field"}.`}
            </h2>

            <p className="text-white/70 text-lg leading-7 mb-10 max-w-xl mx-auto">
              Join SkillNex and learn by doing through real projects, mentor
              feedback, and a portfolio that proves your skills.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-7 py-3.5 rounded-full
                  bg-cyan-500 text-white font-semibold
                  hover:bg-cyan-400 transition-all duration-300
                  hover:scale-[1.02] shadow-glow
                "
              >
                Apply Now
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                to="/#programs"
                className="
                  inline-flex items-center gap-2
                  px-7 py-3.5 rounded-full
                  bg-white/10 border border-white/20
                  text-white font-semibold
                  hover:bg-white/15 transition-all duration-300
                "
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

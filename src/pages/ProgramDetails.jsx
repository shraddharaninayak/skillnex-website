import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
} from "lucide-react";

/* =========================================================
   API
========================================================= */

const API_BASE_URL = "/api";

async function fetchProgram(slug) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/programs/${encodeURIComponent(slug)}`,
    );

    if (!response.ok) {
      return {
        data: null,
        error: `Program not found. (${response.status})`,
      };
    }

    const result = await response.json();

    console.log("PROGRAM API RESPONSE:", result);

    /*
      Supports different backend response formats:

      1. { data: {...} }
      2. { program: {...} }
      3. {...program data directly}
    */
    const programData = result?.data || result?.program || result;

    return {
      data: programData,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch program:", error);

    return {
      data: null,
      error: "Unable to connect to the SkillNex backend.",
    };
  }
}

/* =========================================================
   HELPERS
========================================================= */

function getArray(value) {
  return Array.isArray(value) ? value : [];
}

function getPoints(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value;
  }

  if (Array.isArray(value.items)) {
    return value.items;
  }

  return [];
}

function getStructureItems(structure) {
  if (!structure) return [];

  if (Array.isArray(structure)) {
    return structure;
  }

  if (Array.isArray(structure.items)) {
    return structure.items;
  }

  return [];
}

function getProcessSteps(process) {
  if (!process) return [];

  if (Array.isArray(process)) {
    return process;
  }

  if (Array.isArray(process.steps)) {
    return process.steps;
  }

  if (Array.isArray(process.items)) {
    return process.items;
  }

  return [];
}

function getSyllabus(program) {
  if (!program) return [];

  return Array.isArray(program.syllabus) ? program.syllabus : [];
}

function getCompanies(program) {
  if (!program || !Array.isArray(program.companies)) {
    return [];
  }

  return program.companies
    .map((company) => {
      if (typeof company === "string") {
        return company;
      }

      return company?.name || company?.title || "";
    })
    .filter(Boolean);
}

function getPointTitle(point) {
  if (!point || typeof point === "string") {
    return "";
  }

  return point.title || point.heading || point.name || "";
}

function getPointDescription(point) {
  if (!point) return "";

  if (typeof point === "string") {
    return point;
  }

  return point.description || point.text || point.detail || point.content || "";
}

function getStructureTitle(item) {
  if (!item) return "";

  if (typeof item === "string") {
    return item;
  }

  return item.title || item.name || item.heading || "";
}

function getStructureDescription(item) {
  if (!item || typeof item === "string") {
    return "";
  }

  return item.description || item.text || item.detail || item.content || "";
}

function getStepTitle(step) {
  if (!step) return "";

  if (typeof step === "string") {
    return step;
  }

  return step.title || step.step || step.heading || step.name || "";
}

function getStepDescription(step) {
  if (!step || typeof step === "string") {
    return "";
  }

  return step.description || step.text || step.detail || step.content || "";
}

function getPositioningLine(program) {
  if (!program) return "";

  return (
    program.positioningLine || program.positioning || program.tagline || ""
  );
}

function getWhyBecome(program) {
  if (!program) return null;

  return program.whyBecome || program.whyThisProgram || null;
}

function getCareerBenefits(program) {
  if (!program) return null;

  return program.careerBenefits || program.career || null;
}

/* =========================================================
   ANIMATION
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ eyebrow, title, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mb-14" : "mb-12"}>
      <div
        className={`flex items-center gap-2 mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="w-4 h-[2px] bg-cyan-600" />

        <span className="eyebrow">{eyebrow}</span>
      </div>

      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* =========================================================
   POINT CARD
========================================================= */

function PointCard({ title, description, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="
        rounded-2xl
        border
        border-cyan-100
        bg-white
        p-6
        md:p-7
        shadow-soft
        hover:shadow-card
        hover:border-cyan-200
        transition-all
        duration-300
      "
    >
      <div className="flex items-start gap-4">
        <span
          className="
            flex-shrink-0
            w-9
            h-9
            rounded-lg
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
            font-display
            font-bold
            text-sm
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          {title && (
            <h3 className="font-display font-bold text-ink text-lg mb-1.5 leading-snug">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-ink-secondary leading-7 text-[0.95rem]">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   SYLLABUS ACCORDION
========================================================= */

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
    typeof module === "string"
      ? ""
      : module?.description || module?.summary || "";

  return (
    <motion.div
      variants={fadeUp}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
      }}
      className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-cyan-300 shadow-card"
          : "border-cyan-100 shadow-soft hover:border-cyan-200"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="
          w-full
          flex
          items-center
          gap-4
          p-5
          md:p-6
          text-left
        "
      >
        <span
          className="
            flex-shrink-0
            w-11
            h-11
            rounded-xl
            bg-gradient-to-br
            from-cyan-500
            to-cyan-600
            text-white
            flex
            items-center
            justify-center
            font-display
            font-bold
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          {category && (
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                font-semibold
                text-amber
                mb-1
                block
              "
            >
              {category}
            </span>
          )}

          <h3 className="font-display font-bold text-ink text-base md:text-lg leading-snug">
            {title}
          </h3>

          {description && !isOpen && (
            <p className="text-ink-secondary text-sm mt-1 line-clamp-1">
              {description}
            </p>
          )}
        </div>

        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-ink-secondary transition-transform duration-300 ${
            isOpen ? "rotate-180 text-cyan-600" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden"
          >
            <div
              className="
                px-5
                md:px-6
                pb-6
                pl-[4.25rem]
                md:pl-[5.5rem]
              "
            >
              {description && (
                <p className="text-ink-secondary leading-7 text-[0.95rem] mb-4">
                  {description}
                </p>
              )}

              {topics.length > 0 && (
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {topics.map((topic, topicIndex) => {
                    const topicText =
                      typeof topic === "string"
                        ? topic
                        : topic?.title ||
                          topic?.name ||
                          topic?.description ||
                          "";

                    return (
                      <li
                        key={`${index}-${topicIndex}`}
                        className="
                          flex
                          items-start
                          gap-2.5
                          text-[0.9rem]
                          text-ink
                        "
                      >
                        <CheckCircle2
                          className="
                            flex-shrink-0
                            w-4
                            h-4
                            text-cyan-500
                            mt-0.5
                          "
                        />

                        <span>{topicText}</span>
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

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProgramDetails() {
  const { slug } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModule, setOpenModule] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  /* =======================================================
     FETCH PROGRAM
  ======================================================= */

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

    fetchProgram(slug).then(({ data, error: err }) => {
      if (cancelled) return;

      if (err) {
        setError(err);
      } else if (data) {
        setProgram(data);
      } else {
        setError("Program not found.");
      }

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />

          <p className="text-ink-secondary font-medium">Loading program...</p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !program) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-amber-50
              text-amber
              flex
              items-center
              justify-center
              mx-auto
              mb-6
            "
          >
            <AlertCircle className="w-8 h-8" />
          </div>

          <h1 className="font-display font-bold text-ink text-2xl mb-3">
            {error || "Something went wrong"}
          </h1>

          <p className="text-ink-secondary mb-8">
            We couldn't load this program. It may have been moved or the link is
            incorrect.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-cyan-600
              text-white
              font-semibold
              hover:bg-cyan-700
              transition-colors
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to programs
          </Link>
        </div>
      </div>
    );
  }

  /* =======================================================
     DATA
  ======================================================= */

  const syllabus = getSyllabus(program);

  const companies = getCompanies(program);

  const structureItems = getStructureItems(program.structure);

  const processSteps = getProcessSteps(program.process);

  const outcomes = getPoints(program.outcomes);

  const whyPoints = getPoints(getWhyBecome(program));

  const careerPoints = getPoints(getCareerBenefits(program));

  const overview =
    program.overview && typeof program.overview === "object"
      ? program.overview
      : null;

  const positioningLine = getPositioningLine(program);

  /* =======================================================
     SNAPSHOT
  ======================================================= */

  const snapshotStats = [
    program.duration
      ? {
          icon: Clock,
          label: "Duration",
          value: program.duration,
        }
      : null,

    syllabus.length
      ? {
          icon: BookOpen,
          label: "Curriculum",
          value: `${syllabus.length} Modules`,
        }
      : null,

    processSteps.length
      ? {
          icon: Route,
          label: "Learning Journey",
          value: `${processSteps.length} Stages`,
        }
      : null,

    outcomes.length
      ? {
          icon: Target,
          label: "Outcomes",
          value: `${outcomes.length} Outcomes`,
        }
      : null,
  ].filter(Boolean);

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="min-h-screen bg-white">
      {/* =================================================
          1. HERO
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#07111f]
          via-[#0a1828]
          to-[#0e2236]
          text-white
        "
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cyan-500 blur-[120px]" />

          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-500 blur-[100px]" />
        </div>

        <div className="relative container-page section-pad">
          <Link
            to="/"
            className="
              inline-flex
              items-center
              gap-2
              text-white/70
              hover:text-white
              transition-colors
              mb-10
              text-sm
              font-medium
            "
          >
            <ArrowLeft className="w-4 h-4" />
            All programs
          </Link>

          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            {program.category && (
              <motion.div variants={fadeUp} className="mb-6">
                <span
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-3.5
                    py-1.5
                    rounded-full
                    bg-white/10
                    border
                    border-white/15
                    text-[11px]
                    uppercase
                    tracking-[0.25em]
                    font-semibold
                    text-cyan-300
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
                  font-display
                  font-extrabold
                  text-4xl
                  md:text-5xl
                  lg:text-6xl
                  leading-[1.05]
                  mb-6
                "
              >
                {program.title}
              </motion.h1>
            )}

            {program.description && (
              <motion.p
                variants={fadeUp}
                className="
                  text-lg
                  md:text-xl
                  text-white/75
                  leading-7
                  mb-8
                  max-w-2xl
                "
              >
                {program.description}
              </motion.p>
            )}

            {program.duration && (
              <motion.div
                variants={fadeUp}
                className="
                  flex
                  items-center
                  gap-2
                  text-white/60
                  mb-8
                "
              >
                <Clock className="w-4 h-4 text-cyan-400" />

                <span className="text-sm font-medium">{program.duration}</span>
              </motion.div>
            )}

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#syllabus"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3.5
                  rounded-full
                  bg-cyan-500
                  text-white
                  font-semibold
                  hover:bg-cyan-400
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  shadow-glow
                "
              >
                View Curriculum
                <ArrowRight className="w-4 h-4" />
              </a>

              {processSteps.length > 0 && (
                <a
                  href="#journey"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3.5
                    rounded-full
                    bg-white/10
                    border
                    border-white/20
                    text-white
                    font-semibold
                    hover:bg-white/15
                    transition-all
                    duration-300
                  "
                >
                  Learning Journey
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =================================================
          2. PROGRAM SNAPSHOT
      ================================================= */}

      {snapshotStats.length > 0 && (
        <section className="border-b border-cyan-100 bg-white">
          <div className="container-page py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {snapshotStats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 16,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                    }}
                    className="
                      flex
                      items-center
                      gap-3.5
                      rounded-2xl
                      border
                      border-cyan-100
                      bg-surface-subtle
                      px-5
                      py-4
                    "
                  >
                    <span
                      className="
                        flex-shrink-0
                        w-10
                        h-10
                        rounded-xl
                        bg-cyan-50
                        text-cyan-600
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon className="w-5 h-5" />
                    </span>

                    <div>
                      <div className="font-display font-bold text-ink text-base leading-tight">
                        {stat.value}
                      </div>

                      <div className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          3. OVERVIEW
      ================================================= */}

      {overview && (overview.heading || overview.description) && (
        <section className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
              variants={stagger}
            >
              <SectionHeading
                eyebrow="Program Overview"
                title={overview.heading || "Overview"}
              />

              {overview.description && (
                <motion.p
                  variants={fadeUp}
                  className="
                      text-lg
                      text-ink-secondary
                      leading-8
                      mb-6
                    "
                >
                  {overview.description}
                </motion.p>
              )}

              {overview.note && (
                <motion.div
                  variants={fadeUp}
                  className="
                      flex
                      items-start
                      gap-3
                      rounded-2xl
                      bg-cyan-50
                      border
                      border-cyan-100
                      p-5
                    "
                >
                  <Sparkles
                    className="
                        flex-shrink-0
                        w-5
                        h-5
                        text-cyan-600
                        mt-0.5
                      "
                  />

                  <p className="text-ink-secondary leading-7 text-[0.95rem]">
                    {overview.note}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          4. WHY THIS PROGRAM
      ================================================= */}

      {whyPoints.length > 0 && (
        <section className="section-pad bg-surface-subtle">
          <div className="container-page">
            <SectionHeading
              eyebrow="Why This Program"
              title={getWhyBecome(program)?.heading || "Why This Skill"}
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
              className="
                grid
                sm:grid-cols-2
                gap-5
                md:gap-6
                max-w-4xl
                mx-auto
              "
            >
              {whyPoints.map((point, index) => (
                <PointCard
                  key={`why-${index}`}
                  index={index}
                  title={getPointTitle(point)}
                  description={getPointDescription(point)}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          5. CAREER BENEFITS
      ================================================= */}

      {careerPoints.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page">
            <SectionHeading
              eyebrow="Career Benefits"
              title={
                getCareerBenefits(program)?.heading || "Where It Takes You"
              }
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
              className="
                grid
                sm:grid-cols-2
                gap-5
                md:gap-6
                max-w-4xl
                mx-auto
              "
            >
              {careerPoints.map((point, index) => (
                <PointCard
                  key={`career-${index}`}
                  index={index}
                  title={getPointTitle(point)}
                  description={getPointDescription(point)}
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          6. PROGRAM STRUCTURE
      ================================================= */}

      {structureItems.length > 0 && (
        <section className="section-pad bg-surface-subtle">
          <div className="container-page">
            <SectionHeading
              eyebrow="How You'll Learn"
              title="Program Structure"
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-4
                gap-5
                max-w-5xl
                mx-auto
              "
            >
              {structureItems.map((item, index) => (
                <motion.div
                  key={`structure-${index}`}
                  variants={fadeUp}
                  className="
                      rounded-2xl
                      border
                      border-cyan-100
                      bg-white
                      p-6
                      shadow-soft
                      hover:shadow-card
                      transition-shadow
                      duration-300
                    "
                >
                  <span
                    className="
                        flex
                        w-10
                        h-10
                        rounded-xl
                        bg-amber-50
                        text-amber-600
                        items-center
                        justify-center
                        font-display
                        font-bold
                        mb-4
                      "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display font-bold text-ink mb-2 leading-snug">
                    {getStructureTitle(item)}
                  </h3>

                  <p className="text-ink-secondary text-sm leading-6">
                    {getStructureDescription(item)}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          7. LEARNING JOURNEY
      ================================================= */}

      {processSteps.length > 0 && (
        <section id="journey" className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="Learning Journey"
              title={program.process?.heading || "Your Learning Journey"}
            />

            <div className="relative">
              <div
                className="
                  absolute
                  left-[19px]
                  top-2
                  bottom-2
                  w-[2px]
                  bg-gradient-to-b
                  from-cyan-500
                  via-cyan-300
                  to-amber-300
                  hidden
                  sm:block
                "
              />

              <motion.div
                variants={stagger}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: "-60px",
                }}
                className="space-y-6"
              >
                {processSteps.map((step, index) => (
                  <motion.div
                    key={`step-${index}`}
                    variants={fadeUp}
                    className="
                        relative
                        flex
                        gap-5
                        items-start
                      "
                  >
                    <span
                      className="
                          flex-shrink-0
                          z-10
                          w-10
                          h-10
                          rounded-full
                          bg-white
                          border-2
                          border-cyan-500
                          text-cyan-600
                          flex
                          items-center
                          justify-center
                          font-display
                          font-bold
                          text-sm
                          shadow-soft
                        "
                    >
                      {index + 1}
                    </span>

                    <div
                      className="
                          flex-1
                          rounded-2xl
                          border
                          border-cyan-100
                          bg-surface-subtle
                          p-5
                          md:p-6
                          shadow-soft
                        "
                    >
                      <h3 className="font-display font-bold text-ink text-lg mb-1.5 leading-snug">
                        {getStepTitle(step)}
                      </h3>

                      <p className="text-ink-secondary leading-7 text-[0.95rem]">
                        {getStepDescription(step)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* =================================================
          8. SYLLABUS
      ================================================= */}

      {syllabus.length > 0 && (
        <section id="syllabus" className="section-pad bg-surface-subtle">
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="Curriculum"
              title={`Syllabus · ${syllabus.length} Modules`}
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
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

      {/* =================================================
          9. LEARNING OUTCOMES
      ================================================= */}

      {outcomes.length > 0 && (
        <section className="section-pad bg-white">
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="What You'll Achieve"
              title={program.outcomes?.heading || "Learning Outcomes"}
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-60px",
              }}
              className="grid sm:grid-cols-2 gap-5"
            >
              {outcomes.map((point, index) => (
                <motion.div
                  key={`outcome-${index}`}
                  variants={fadeUp}
                  className="
                      flex
                      items-start
                      gap-3.5
                      rounded-2xl
                      border
                      border-cyan-100
                      bg-surface-subtle
                      p-5
                      md:p-6
                    "
                >
                  <CheckCircle2
                    className="
                        flex-shrink-0
                        w-6
                        h-6
                        text-cyan-500
                        mt-0.5
                      "
                  />

                  <div>
                    {getPointTitle(point) && (
                      <h3 className="font-display font-bold text-ink mb-1 leading-snug">
                        {getPointTitle(point)}
                      </h3>
                    )}

                    {getPointDescription(point) && (
                      <p className="text-ink-secondary text-sm leading-6">
                        {getPointDescription(point)}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          10. COMPANIES / TOOLS
      ================================================= */}

      {companies.length > 0 && (
        <section
          className="
            section-pad
            bg-surface-subtle
            border-t
            border-cyan-100
          "
        >
          <div className="container-page max-w-4xl">
            <SectionHeading
              eyebrow="Career Ecosystem"
              title="Tools and Platforms You'll Work With"
              align="center"
            />

            <motion.div
              variants={stagger}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-40px",
              }}
              className="
                flex
                flex-wrap
                justify-center
                gap-3
              "
            >
              {companies.map((company, index) => (
                <motion.span
                  key={`company-${index}`}
                  variants={fadeUp}
                  className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-cyan-200
                      bg-white
                      px-5
                      py-2.5
                      text-ink
                      font-semibold
                      text-sm
                      shadow-soft
                      hover:border-cyan-400
                      hover:shadow-card
                      transition-all
                      duration-300
                    "
                >
                  <Building2 className="w-4 h-4 text-cyan-600" />

                  {company}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* =================================================
          11. FINAL CTA
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#07111f]
          via-[#0a1828]
          to-[#0e2236]
          text-white
        "
      >
        <div className="absolute inset-0 opacity-20">
          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-[600px]
              h-[400px]
              rounded-full
              bg-cyan-500
              blur-[120px]
            "
          />
        </div>

        <div className="relative container-page section-pad text-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-60px",
            }}
            transition={{
              duration: 0.6,
            }}
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
                href="#syllabus"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  bg-cyan-500
                  text-white
                  font-semibold
                  hover:bg-cyan-400
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  shadow-glow
                "
              >
                Explore Curriculum
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <Link
                to="/"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-7
                  py-3.5
                  rounded-full
                  bg-white/10
                  border
                  border-white/20
                  text-white
                  font-semibold
                  hover:bg-white/15
                  transition-all
                  duration-300
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

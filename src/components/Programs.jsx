import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const API_URL = "/api";

const FRONTEND_PROGRAMS = [
  {
    id: "social-media-management",
    slug: "social-media-management",
    category: "MARKETING",
    title: "Social Media Management",
    description:
      "Build a portfolio that proves your ability to grow brands online.",
  },
  {
    id: "video-editing",
    slug: "video-editing",
    category: "CREATIVE",
    title: "Video Editing",
    description:
      "Learn how to create high-quality, engaging videos through practical editing, real projects, and modern tools.",
  },
  {
    id: "graphic-designing",
    slug: "graphic-designing",
    category: "DESIGN",
    title: "Graphic Designing",
    description:
      "Master the fundamentals of design and create visually compelling graphics for brands.",
  },
  {
    id: "performance-marketing",
    slug: "performance-marketing",
    category: "GROWTH",
    title: "Performance Marketing",
    description:
      "Learn how to run, analyze, and scale ad campaigns that generate real leads, sales, and measurable results.",
  },
  {
    id: "full-stack-development",
    slug: "full-stack-development",
    category: "ENGINEERING",
    title: "Full Stack Development",
    description:
      "Learn how to build complete web applications from frontend to backend through real projects, practical coding, and hands-on experience.",
  },
  {
    id: "ecommerce-brand-management",
    slug: "ecommerce-brand-management",
    category: "ECOMMERCE",
    title: "Ecommerce Brand Management",
    description:
      "Learn how to build, manage, and scale ecommerce brands through real strategies, hands-on execution, and growth-focused systems.",
  },
  {
    id: "full-digital-marketing",
    slug: "full-digital-marketing",
    category: "MARKETING",
    title: "Full Digital Marketing",
    description:
      "Learn how to plan, execute, and scale complete digital marketing strategies through real campaigns, practical tools, and hands-on experience.",
  },
  {
    id: "cyber-security",
    slug: "cyber-security",
    category: "SECURITY",
    title: "Cyber Security",
    description:
      "Learn how to protect systems, identify threats, and secure digital assets through practical training, real scenarios, and hands-on tools.",
  },
];

export default function Programs() {
  const [programs, setPrograms] = useState(FRONTEND_PROGRAMS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch programs from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/programs`);

        if (!response.ok) {
          throw new Error("Failed to fetch programs");
        }

        const data = await response.json();

        const backendPrograms = data.programs || [];

        setPrograms(
          FRONTEND_PROGRAMS.map((frontendProgram) => {
            const backendProgram = backendPrograms.find(
              (item) =>
                item.slug === frontendProgram.slug ||
                item.title === frontendProgram.title,
            );

            return backendProgram
              ? {
                  ...frontendProgram,
                  ...backendProgram,
                }
              : frontendProgram;
          }),
        );
      } catch (error) {
        console.error("Error loading programs:", error);
        setError("Unable to load programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Next program
  const nextProgram = () => {
    if (programs.length === 0) return;

    setDirection(1);

    setActiveIndex((current) => (current + 1) % programs.length);
  };

  // Previous program
  const previousProgram = () => {
    if (programs.length === 0) return;

    setActiveIndex(
      (current) => (current - 1 + programs.length) % programs.length,
    );
  };

  // Auto slide
  useEffect(() => {
    if (programs.length === 0) return;

    const timer = setInterval(() => {
      setDirection(1);

      setActiveIndex((current) => (current + 1) % programs.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [programs.length]);

  return (
    <section id="programs" className="section-pad bg-surface-subtle">
      <div className="container-page">
        {/* =========================
            SECTION HEADING
        ========================== */}

        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="w-4 h-[2px] bg-cyan-600" />

            <span className="eyebrow">· Learn by doing</span>
          </div>

          <h2 className="section-title">
            Build Skills Through
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Execution.</span>

              <span
                className="
                  absolute
                  left-0
                  right-0
                  top-[68%]
                  h-[0.22em]
                  bg-[#F59E0B]
                  rounded-full
                  z-0
                "
              />
            </span>
          </h2>
        </div>

        {/* =========================
            LOADING STATE
        ========================== */}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div
              className="
                w-6
                h-6
                rounded-full
                border-2
                border-cyan-200
                border-t-cyan-600
                animate-spin
              "
            />
          </div>
        )}

        {/* =========================
            ERROR STATE
        ========================== */}

        {error && !loading && (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* =========================
            PROGRAM CAROUSEL
        ========================== */}

        {!loading && !error && programs.length > 0 && (
          <div className="relative mt-16">
            {/* LEFT ARROW */}

            <button
              type="button"
              onClick={previousProgram}
              aria-label="Previous program"
              className="
                absolute
                left-2 md:left-4
                top-1/2
                -translate-y-1/2
                z-30
                w-11 h-11
                md:w-12 md:h-12
                rounded-full
                bg-white
                border border-cyan-100
                shadow-md
                flex items-center justify-center
                text-ink
                hover:text-cyan-600
                hover:shadow-lg
                transition-all duration-300
              "
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* CARDS VIEWPORT */}

            <div className="overflow-hidden px-12 md:px-16">
              <div className="flex items-center justify-center gap-5 md:gap-6">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  {[-1, 0, 1].map((offset) => {
                    const index =
                      (activeIndex + offset + programs.length) %
                      programs.length;

                    const program = programs[index];

                    const isActive = offset === 0;

                    return (
                      <motion.div
                        key={program.title}
                        layout
                        custom={direction}
                        /* ORIGINAL CARD ENTRY */
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          x: direction === 1 ? 80 : -80,
                        }}
                        /* ORIGINAL CARD POSITION */
                        animate={{
                          opacity: isActive ? 1 : 0.45,

                          scale: isActive ? 1 : 0.9,

                          x: 0,

                          y: isActive ? 0 : 10,
                        }}
                        /* ORIGINAL CARD EXIT */
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          x: direction === 1 ? -80 : 80,
                        }}
                        /* ORIGINAL ANIMATION */
                        transition={{
                          layout: {
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          },

                          opacity: {
                            duration: 0.7,
                          },

                          scale: {
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          },

                          x: {
                            duration: 0.2,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }}
                        className={`
                          shrink-0
                          w-[78vw]
                          sm:w-[55vw]
                          md:w-[31vw]
                          lg:w-[390px]
                          ${isActive ? "z-20" : "z-10"}
                        `}
                      >
                        <a
                          href={`/programs/${program.slug}`}
                          className={`
                            group
                            min-h-[390px]
                            rounded-[28px]
                            border
                            border-cyan-100
                            bg-gradient-to-br
                            from-white
                            via-white
                            to-cyan-50
                            p-8
                            md:p-9
                            flex
                            flex-col
                            transition-shadow
                            duration-500
                            ${
                              isActive
                                ? "shadow-xl shadow-cyan-100/60"
                                : "shadow-sm"
                            }
                          `}
                        >
                          {/* CATEGORY */}

                          <div className="flex items-start justify-between mb-8">
                            <span
                              className="
                                text-[11px]
                                uppercase
                                tracking-[0.3em]
                                font-semibold
                                text-amber
                              "
                            >
                              {program.category}
                            </span>

                            <ArrowUpRight
                              className={`
                                w-5 h-5
                                transition-colors
                                duration-300
                                ${
                                  isActive
                                    ? "text-cyan-600"
                                    : "text-ink-secondary"
                                }
                              `}
                            />
                          </div>

                          {/* TITLE */}

                          <h3
                            className="
                              text-2xl
                              md:text-[1.65rem]
                              font-bold
                              font-display
                              text-ink
                              leading-tight
                              mb-4
                            "
                          >
                            {program.title}
                          </h3>

                          {/* DESCRIPTION */}

                          <p
                            className="
                              text-base
                              text-ink-secondary
                              leading-7
                            "
                          >
                            {program.description}
                          </p>

                          {/* EXPLORE */}

                          <div className="mt-8 pt-6 border-t border-cyan-100">
                            <span
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                text-sm
                                font-semibold
                                border-b
                                pb-1
                                transition-all
                                duration-300
                                ${
                                  isActive
                                    ? "text-amber border-amber"
                                    : "text-ink border-ink"
                                }
                                group-hover:text-amber
                                group-hover:border-amber
                              `}
                            >
                              Explore
                              <ArrowUpRight
                                className="
                                  w-4 h-4
                                  transition-transform
                                  duration-300
                                  group-hover:translate-x-1
                                  group-hover:-translate-y-1
                                "
                              />
                            </span>
                          </div>
                        </a>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT ARROW */}

            <button
              type="button"
              onClick={nextProgram}
              aria-label="Next program"
              className="
                absolute
                right-2 md:right-4
                top-1/2
                -translate-y-1/2
                z-30
                w-11 h-11
                md:w-12 md:h-12
                rounded-full
                bg-white
                border border-cyan-100
                shadow-md
                flex items-center justify-center
                text-ink
                hover:text-cyan-600
                hover:shadow-lg
                transition-all duration-300
              "
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

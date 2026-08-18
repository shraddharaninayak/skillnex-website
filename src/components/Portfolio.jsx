import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const INSTITUTION_JOURNEYS = {
  school: {
    label: "Higher Secondary",
    description:
      "Help students discover the right direction early and build practical skills before they enter higher education.",
    steps: [
      {
        number: "01",
        title: "Discover",
        text: "Explore interests and career possibilities",
      },
      {
        number: "02",
        title: "Understand",
        text: "Build awareness of skills and opportunities",
      },
      {
        number: "03",
        title: "Learn",
        text: "Develop practical, future-ready skills",
      },
      {
        number: "04",
        title: "Apply",
        text: "Work on guided projects and activities",
      },
      {
        number: "05",
        title: "Prepare",
        text: "Build confidence for the next career step",
      },
    ],
  },

  college: {
    label: "Colleges & Universities",
    description:
      "Help students move from academic learning to practical skills, portfolios, industry exposure, and career readiness.",
    steps: [
      {
        number: "01",
        title: "Assess",
        text: "Identify skill gaps and career direction",
      },
      {
        number: "02",
        title: "Develop",
        text: "Build relevant technical and professional skills",
      },
      {
        number: "03",
        title: "Apply",
        text: "Work through practical projects and challenges",
      },
      {
        number: "04",
        title: "Build",
        text: "Create portfolio-ready proof of ability",
      },
      {
        number: "05",
        title: "Launch",
        text: "Prepare for internships, interviews, and careers",
      },
    ],
  },
};

export default function Portfolio() {
  const [audience, setAudience] = useState("school");

  const currentJourney = INSTITUTION_JOURNEYS[audience];

  return (
    <section className="section-pad bg-surface-subtle">
      <div className="container-page">
        {/* Section Introduction */}
        <div className="mb-12 max-w-3xl">
          <div className="eyebrow mb-5">
            <span className="w-4 h-[2px] bg-cyan-600" />
            Built for institutions
          </div>

          <h2 className="section-title">
  Turn your campus into a{" "}
  <span className="relative inline-block px-1">
    career-ready
    <svg
      className="absolute left-0 -bottom-1 w-full"
      height="10"
      viewBox="0 0 160 10"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M1 7.5C40 2.5 120 2.5 159 7.5"
        stroke="#F59E0B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </span>{" "}
  ecosystem.
</h2>

          <p className="section-subtitle mt-6 max-w-2xl">
            SkillNex works alongside your academic environment to bring
            practical skills, career exploration, and industry exposure into the
            student journey.
          </p>

          {/* Audience Switch */}
          <div className="mt-8 inline-flex items-center rounded-full border border-line bg-white p-1 shadow-card">
            <button
              type="button"
              onClick={() => setAudience("school")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                audience === "school"
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Higher Secondary
            </button>

            <button
              type="button"
              onClick={() => setAudience("college")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                audience === "college"
                  ? "bg-ink text-white shadow-sm"
                  : "text-ink-secondary hover:text-ink"
              }`}
            >
              Colleges & Universities
            </button>
          </div>
        </div>

        {/* Education Platform Panel */}
        <div className="border border-line bg-white rounded-[2rem] overflow-hidden shadow-card">
          {/* Panel Header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${audience}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="px-6 py-6 md:px-8 md:py-8 border-b border-line flex flex-col md:flex-row md:items-center md:justify-between gap-5"
            >
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-cyan-600 mb-2">
                  {currentJourney.label}
                </p>

                <p className="text-sm md:text-base text-ink-secondary max-w-2xl leading-7">
                  {currentJourney.description}
                </p>
              </div>

              <div className="shrink-0 text-sm font-semibold text-ink">
                SkillNex learning layer
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Student Journey */}
          <div className="px-6 md:px-10 pt-7">
            <div className="flex items-center justify-between">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-ink-secondary">
                Student journey
              </p>

              <span className="text-xs text-ink-secondary">5 stages</span>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`journey-${audience}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-8 md:px-10 md:py-12"
            >
              <div className="flex flex-col lg:flex-row">
                {currentJourney.steps.map((step, index) => (
                  <motion.div
                    key={`${audience}-${step.number}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex-1 group"
                  >
                    <div className="flex items-start gap-4 lg:block">
                      {/* Step Number */}
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.07,
                        }}
                        className="w-10 h-10 shrink-0 rounded-full bg-ink text-white flex items-center justify-center font-mono text-xs font-medium transition-transform duration-300 group-hover:scale-110"
                      >
                        {step.number}
                      </motion.div>

                      {/* Step Content */}
                      <div className="mt-0 lg:mt-5">
                        <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                          {step.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-ink-secondary max-w-[190px]">
                          {step.text}
                        </p>
                        <div className="mt-4 h-[2px] w-8 bg-cyan-500 transition-all duration-300 group-hover:w-14" />
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {index < currentJourney.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-5 left-10 right-0 h-px bg-line" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Institution / Student / Outcome */}
          <div className="border-t border-line grid md:grid-cols-3">
            <div className="px-6 py-5 md:px-8 border-b md:border-b-0 md:border-r border-line">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-ink-secondary">
                Institution
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                Structured skill programs
              </p>
            </div>

            <div className="px-6 py-5 md:px-8 border-b md:border-b-0 md:border-r border-line">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-ink-secondary">
                Student
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                Practical learning & projects
              </p>
            </div>

            <div className="px-6 py-5 md:px-8">
              <p className="text-xs font-mono uppercase tracking-[0.16em] text-ink-secondary">
                Outcome
              </p>

              <p className="mt-2 text-sm font-semibold text-ink">
                Greater career readiness
              </p>
            </div>
          </div>

          {/* Institutional CTA */}
          <div className="border-t border-line px-6 py-7 md:px-8 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-ink">
                Bring practical learning to your institution.
              </p>

              <p className="mt-1 text-sm text-ink-secondary">
                Explore how SkillNex can work with your students and academic
                team.
              </p>
            </div>

            <a href="#cta" className="btn-primary shrink-0">
              Partner with SkillNex
              <span className="text-base">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

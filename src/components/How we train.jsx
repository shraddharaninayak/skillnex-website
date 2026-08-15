import { useState } from "react";

const PILLARS = [
  {
    number: "01",
    tab: "Skill Gap Assessment",
    title: "Know exactly where you stand",
    description:
      "We evaluate your current skills, strengths, and gaps to understand where you are today and what you need to become career-ready.",
    link: "Explore Skill Assessment",
    image: "/images/training-assessment.jpg",
  },
  {
    number: "02",
    tab: "Mentor-led Learning",
    title: "Learn directly from industry mentors",
    description:
      "Train in small cohorts with experienced professionals who guide you through practical learning, real-world skills, and career-focused development.",
    link: "Explore Mentor-led Learning",
    image: "/images/training-mentors.jpg",
  },
  {
    number: "03",
    tab: "Hands-on Projects",
    title: "Build experience through real projects",
    description:
      "Work on practical, portfolio-ready projects and case studies that help you apply your skills and build confidence for real opportunities.",
    link: "Explore Hands-on Projects",
    image: "/images/training-projects.jpg",
  },
  {
    number: "04",
    tab: "Career & Placement Support",
    title: "Get ready for your next opportunity",
    description:
      "Get resume reviews, mock interviews, career guidance, and placement support to help you move confidently toward your career goals.",
    link: "Explore Career Support",
    image: "/images/training-career.jpg",
  },
];

export default function WhatWeDo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activePillar = PILLARS[activeIndex];

  return (
    <section
      id="what-we-do"
      className="bg-white pt-10 pb-20 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28"
    >
      <div className="container-page">
        {/* =========================
            HEADING
        ========================== */}
        <div className="text-center max-w-4xl mx-auto mb-12 md:mb-14">
          {/* Eyebrow */}
          <div className="eyebrow justify-center mb-5">
            <span className="w-5 h-[2px] bg-cyan-600" />
            <span>•</span>
            <span>HOW WE TRAIN</span>
          </div>

          {/* Heading */}
          <h2 className="section-title">
            Learn the Skills Companies
            <br />
            Actually{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Hire For.</span>

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
            TABS
        ========================== */}
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {PILLARS.map((pillar, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={pillar.number}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`
    group
    relative
    min-h-[76px]
    px-4
    py-5
    text-center
    text-base
    md:text-lg
    font-medium
    transition-all
    duration-300
    ease-out
    ${
      isActive
        ? "bg-gray-50 text-ink rounded-t-3xl"
        : "bg-white text-gray-600 hover:bg-gray-50 hover:text-ink"
    }
  `}
                >
                  {pillar.tab}

                  {/* Active line */}
                  <span
                    className={`
      absolute
      bottom-[-1px]
      left-0
      right-0
      h-[3px]
      bg-cyan-600
      transition-all
      duration-300
      ${
        isActive
          ? "opacity-100 scale-x-100"
          : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
      }
    `}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div
          key={activePillar.number}
          className="
            grid
            lg:grid-cols-2
            gap-12
            lg:gap-20
            items-center
            pt-16
            md:pt-20
            lg:pt-20
            animate-[fadeIn_0.4s_ease-out]
          "
        >
          {/* IMAGE */}
          <div className="w-full">
            <div
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-[2rem]
                bg-gray-100
              "
            >
              <img
                src={activePillar.image}
                alt={activePillar.tab}
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                "
              />
            </div>
          </div>

          {/* TEXT */}
          <div className="max-w-xl">
            <h3
              className="
                text-3xl
                md:text-4xl
                lg:text-[2.7rem]
                font-semibold
                tracking-tight
                leading-[1.15]
                text-ink
                mb-6
              "
            >
              {activePillar.title}
            </h3>

            <p
              className="
                text-base
                md:text-lg
                leading-relaxed
                text-ink-secondary
                mb-8
              "
            >
              {activePillar.description}
            </p>

            <button
              type="button"
              className="
                inline-flex
                items-center
                gap-2
                text-cyan-600
                font-semibold
                text-base
                transition-all
                duration-300
                hover:gap-3
              "
            >
              {activePillar.link}

              <span
                className="
                  text-xl
                  leading-none
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

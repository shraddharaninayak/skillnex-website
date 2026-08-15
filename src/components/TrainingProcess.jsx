import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const STEPS = [
  {
    number: "01",
    title: "Skill Assessment",
    meta: "Week 0",
    description:
      "We evaluate your current skills, goals and target role to build a personalized learning path.",
  },
  {
    number: "02",
    title: "Practical Training",
    meta: "Weeks 1–8",
    description:
      "Learn through live sessions, assignments, mentor support and practical exercises instead of passive lectures.",
  },
  {
    number: "03",
    title: "Live Projects",
    meta: "Weeks 6–14",
    description:
      "Work on industry-style projects with deadlines, reviews, teamwork and real workflows.",
  },
  {
    number: "04",
    title: "Portfolio Building",
    meta: "Weeks 12–16",
    description:
      "Transform your projects into a professional portfolio that demonstrates your practical abilities.",
  },
  {
    number: "05",
    title: "Internship",
    meta: "Post Training",
    description:
      "Gain real workplace experience through internships and mentor-guided project execution.",
  },
  {
    number: "06",
    title: "Placement Support",
    meta: "Until Placed",
    description:
      "Receive resume reviews, mock interviews, hiring partner referrals and career guidance until placement.",
  },
];

export default function TrainingProcess() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="process" className="section-pad bg-white">
      <div className="container-page">
        {/* ============================= */}
        {/* MAIN HEADING */}
        {/* ============================= */}

        <div className="max-w-2xl mx-auto text-center">
          <div className="eyebrow mb-5 justify-center">
            <span className="w-4 h-[2px] bg-cyan-600" />• Skill Training Process
          </div>

          <h2 className="section-title">
            A six-step path from
            <br />
            begi
            <span className="relative inline-block isolate">
              <span className="relative z-10">nner to hired.</span>

              <span
                className="
        absolute
        left-0
        right-0
        bottom-[0.02em]
        h-[0.22em]
        bg-[#F59E0B]
        rounded-full
        z-0
        pointer-events-none
      "
              />
            </span>
          </h2>

          <p className="mt-6 max-w-xl mx-auto text-[18px] leading-[1.7] text-ink-secondary">
            Structured learning that transforms beginners into industry-ready
            professionals through practical experience.
          </p>
        </div>

        {/* ============================= */}
        {/* PROCESS */}
        {/* ============================= */}

        <div className="relative mt-16">
          {/* Horizontal connecting line */}

          <div className="absolute left-0 right-0 top-[18px] h-px bg-zinc-200" />

          {/* Six steps */}

          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{
                  opacity: 0,
                  x: 100,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                {/* ============================= */}
                {/* NUMBER */}
                {/* ============================= */}

                <div className="relative z-10 flex">
                  <motion.div
                    animate={{
                      backgroundColor:
                        activeStep === index ? "#F59E0B" : "#FFFFFF",

                      borderColor: activeStep === index ? "#F59E0B" : "#D4D4D8",

                      color: activeStep === index ? "#FFFFFF" : "#3F3F46",

                      boxShadow:
                        activeStep === index
                          ? "0 0 0 8px rgba(245,158,11,0.10), 0 0 28px rgba(245,158,11,0.20)"
                          : "0 0 0 5px white",
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border text-[12px] font-medium"
                  >
                    {step.number}
                  </motion.div>
                </div>

                {/* ============================= */}
                {/* STEP CONTENT */}
                {/* ============================= */}

                <div className="mt-7">
                  {/* Title */}

                  <motion.h3
                    animate={{
                      color: activeStep === index ? "#F59E0B" : "#111111",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="text-lg font-bold tracking-tight leading-tight"
                  >
                    {step.title}
                  </motion.h3>

                  {/* Week */}

                  <motion.span
                    animate={{
                      color: activeStep === index ? "#F59E0B" : "#71717A",
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="mt-4 block text-[10px] font-medium uppercase tracking-[0.28em]"
                  >
                    {step.meta}
                  </motion.span>

                  {/* ============================= */}
                  {/* DESCRIPTION ON HOVER */}
                  {/* ============================= */}

                  <div className="overflow-hidden">
                    <p
                      className="
                        max-h-0
                        translate-y-2
                        opacity-0
                        text-sm
                        leading-6
                        text-zinc-500
                        transition-all
                        duration-500
                        ease-out
                        group-hover:mt-4
                        group-hover:max-h-40
                        group-hover:translate-y-0
                        group-hover:opacity-100
                      "
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

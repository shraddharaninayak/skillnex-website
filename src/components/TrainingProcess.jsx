import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Skill Assessment",
    meta: "Week 0",
    description:
      "We evaluate your current skills, goals, and target role to build a personalized learning path.",
  },
  {
    number: "02",
    title: "Practical Training",
    meta: "Weeks 1–8",
    description:
      "Learn through live sessions, assignments, mentor support, and practical exercises instead of passive lectures.",
  },
  {
    number: "03",
    title: "Live Projects",
    meta: "Weeks 6–14",
    description:
      "Work on industry-style projects with deadlines, reviews, teamwork, and real workflows.",
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
      "Receive resume reviews, mock interviews, hiring partner referrals, and career guidance until placement.",
  },
];

export default function TrainingProcess() {
  return (
    <section id="process" className="section-pad bg-surface-subtle">
      <div className="container-page">

  <div className="grid lg:grid-cols-[420px_minmax(0,1fr)] gap-24 xl:gap-32">

    {/* Left Side */}
    <div className="sticky top-28 self-start h-fit">

      <div className="flex items-center gap-4 mb-5">

  <div className="eyebrow">
    <span className="w-4 h-[2px] bg-cyan-600" />
   · Skill Training Process
  </div>

</div>

      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5 text-ink">
  A six-step path from beginner to hired.
</h2>

      <p className="mt-8 max-w-sm text-[18px] leading-[1.7] text-ink-secondary">
        Structured learning that transforms beginners into industry-ready professionals through practical experience.
      </p>

    </div>

  <div className="relative pl-10 lg:pl-14">

  {/* Vertical Line */}
<div className="absolute left-[18px] top-5 bottom-5 w-px bg-zinc-200" />
<div className="space-y-2">

    {STEPS.map((step) => (

     <motion.div
  key={step.number}
  initial={{ opacity: 0, x: 80 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    delay: Number(step.number) * 0.08,
  }}
  className="group relative grid grid-cols-[46px_minmax(0,1fr)_90px] gap-6 border-b border-zinc-200 py-7 transition-all duration-300"
>

        {/* Number */}

      <div className="relative z-10 flex justify-center">

  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-[12px] font-medium text-zinc-700 shadow-[0_0_0_6px_white] transition-all duration-300 group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-white">

    {step.number}
  

  </div>

</div>

        {/* Content */}

        <div>

<h3 className="text-[26px] lg:text-[28px] font-bold tracking-[-0.02em] leading-tight text-ink transition-colors duration-300 group-hover:text-cyan-600">            {step.title}
          </h3>

<p className="mt-3 max-w-[480px] text-[16px] leading-7 text-zinc-500">  {step.description}
</p>

        </div>

        {/* Meta */}

        <div className="pt-2">

<span className="text-[11px] font-medium uppercase tracking-[0.28em] text-zinc-500 whitespace-nowrap transition-colors duration-300 group-hover:text-cyan-600">            {step.meta}

          </span>

        </div>

      </motion.div>

    ))}

  </div>

</div>

  </div>

</div>
    </section>
  );
}

import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Learn from Industry Experts",
    description:
      "Every concept is applied through assignments and real work instead of only classroom learning.",
  },
  {
    title: "Build a Real Portfolio",
    description:
      "Learn directly from professionals who work in the industry and understand current trends.",
  },
  {
    title: "Work on Live Projects",
    description:
      "Build projects that demonstrate your skills and help you stand out during interviews.",
  },
  {
    title: "Internship Opportunities",
    description:
      "Gain practical experience through structured internships and real client work.",
  },
  {
    title: "Mock Interviews",
    description:
      "Resume building, LinkedIn optimization, mock interviews and career guidance included.",
  },
  {
    title: "Placement Support",
    description:
      "Dedicated placement assistance to help you confidently begin your professional career.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

export default function WhyChooseSkillNex() {
  return (
   <section
  id="why-skillnex"
  className="relative bg-white py-24 overflow-hidden"
>
  <div className="container-page">

    <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16">

      {/* LEFT */}

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="lg:sticky lg:top-28 self-start"
      >

        <div className="eyebrow mb-6">
          <span className="w-4 h-[2px] bg-cyan-600"></span>
         · Why SkillNex
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-extrabold text-ink">
          Why Students
          <br />
          Choose SkillNex for Career Growth?
          <span className="block text-cyan-600">
            We Teach the Job.
          </span>
        </h2>

        <p className="mt-8 max-w-lg text-lg leading-8 text-slate-600">
          We bridge the gap between classroom learning and industry
          expectations through live projects, mentorship, internships and
          career support.
        </p>

        <div className="mt-12 border-t border-slate-200 pt-8">
  <blockquote className="max-w-md text-2xl font-semibold leading-relaxed text-ink">
    "Learn with confidence. Build with purpose. Get career ready."
  </blockquote>
</div>

      </motion.div>

      {/* RIGHT */}

        <div className="grid gap-px bg-slate-200 sm:grid-cols-2 rounded-[32px] overflow-hidden">
        {FEATURES.map((item, index) => (

          <motion.div
  key={item.title}
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
  transition={{
    delay: index * 0.08,
  }}
  className="group relative overflow-hidden border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-50 hover:shadow-xl"
>
  {/* Orange Accent Bar */}
  <div className="absolute left-0 top-0 h-full w-1 bg-[#F59E0B] origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></div>

  <span className="text-sm font-semibold tracking-widest text-[#F59E0B]">
    {String(index + 1).padStart(2, "0")}
  </span>

  <h3 className="mt-6 text-xl font-bold text-ink transition-colors group-hover:text-cyan-600">
    {item.title}
  </h3>

  <p className="mt-4 leading-7 text-slate-600">
    {item.description}
  </p>
</motion.div>
        ))}

      </div>

    </div>

  </div>
</section>
  );
}
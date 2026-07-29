import { motion } from "framer-motion";
import {
  GraduationCap,
  FolderKanban,
  BriefcaseBusiness,
  Handshake,
  Mic2,
  Rocket,
} from "lucide-react";

const FEATURES = [
  {
    icon: GraduationCap,
    title: "Industry Experts",
    description: "Learn directly from professionals.",
  },
  {
    icon: FolderKanban,
    title: "Portfolio",
    description: "Build projects employers love.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Live Projects",
    description: "Real-world client experience.",
  },
  {
    icon: Rocket,
    title: "Placement Support",
    description: "Career guidance & placement support.",
  },
  {
    icon: Mic2,
    title: "Mock Interviews",
    description: "Practice before the real interview.",
  },
  {
    icon: Handshake,
    title: "Internships",
    description: "Gain valuable industry exposure.",
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
    className="relative overflow-hidden bg-white py-24"
  >
   <div className="container-page">
  <div className="grid lg:grid-cols-2 gap-20 items-center">

    <motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  <div className="eyebrow mb-5">
    <span className="w-4 h-[2px] bg-cyan-600" />
    Chapter 02 · The Architecture
  </div>

  <h2 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-extrabold tracking-tight text-ink">
  Why Students
  <br />
  Choose SkillNex.
</h2>


<div className="mt-6 flex justify-end">
  <div className="flex items-center">
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]/70" />
    </div>

  <div className="ml-3 h-[2px] w-48 rounded-full bg-gradient-to-r from-[#F59E0B] to-transparent" />
</div>
</div>

  <p className="mt-8 text-lg leading-8 text-slate-600">
    We don't just teach.
    We prepare you for your career with mentors,
    projects, internships and placement support.
  </p>

  <button className="mt-10 rounded-full bg-cyan-600 px-8 py-4 text-white font-semibold hover:bg-cyan-700 transition">
    Explore Programs
  </button>
</motion.div>

<div className="relative flex items-center justify-center h-[700px]">

  {/* Orbit Ring */}
  <div className="absolute h-[500px] w-[500px] rounded-full border border-dashed border-cyan-200"></div>

  {/* Center Circle */}
  <motion.div
    animate={{ scale: [1, 1.05, 1] }}
    transition={{
      duration: 4,
      repeat: Infinity,
    }}
    className="absolute z-20 flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-700 shadow-2xl"
  >
    <div className="text-center">
      <h3 className="text-4xl font-bold text-white">
        SkillNex
      </h3>

      <p className="mt-2 text-cyan-100">
       Core
      </p>

      
    </div>
  </motion.div>

  {FEATURES.map((item, index) => {
  const Icon = item.icon;

  const angle =
    (index / FEATURES.length) * Math.PI * 2 - Math.PI / 2;

  const radius = 250;

  const x = Math.cos(angle) * radius;

  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      key={item.title}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 group"
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 3,
        delay: index * 0.1,
        repeat: Infinity,
      }}
      whileHover={{
        scale: 1.12,
      }}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border-2 border-cyan-200 shadow-xl">
        <Icon className="h-8 w-8 text-cyan-600" />
      </div>

      <div className="absolute left-1/2 top-20 hidden -translate-x-1/2 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-sm text-white group-hover:block">
        {item.title}
      </div>
    </motion.div>
  );
})}















</div>

      </div> {/* grid */}
    </div> {/* container-page */}
  </section>
  );
}
import { Target, Users2, BriefcaseBusiness, TrendingUp } from 'lucide-react';

const PILLARS = [
  {
    number: "01",
    icon: Target,
    title: "Skill Gap Assessment",
    subtitle: "Know where you stand.",
    description:
      "We evaluate your current skills and identify exactly what you need to become job-ready.",
  },
  {
    number: "02",
    icon: Users2,
    title: "Mentor-Led Learning",
    subtitle: "Learn from industry experts.",
    description:
      "Train in small cohorts guided by professionals working in the field every day.",
  },
  {
    number: "03",
    icon: BriefcaseBusiness,
    title: "Hands-on Projects",
    subtitle: "Build real experience.",
    description:
      "Complete portfolio-ready projects and case studies that prepare you for real interviews.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Career & Placement Support",
    subtitle: "Get interview ready.",
    description:
      "Receive resume reviews, mock interviews, career guidance, and placement support throughout your journey.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-pad bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              CHAPTER 03 • How we Train
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Learn the Skills Companies Actually Hire For.
            </h2>
            <p className="text-ink-secondary leading-relaxed">
             We don't start with a syllabus.
             We start with your career goal. Every step of your learning journey is built around real industry skills, hands-on projects, mentorship, and placement support.            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
  {PILLARS.map((pillar) => {
    const Icon = pillar.icon;

    return (
      <div
        key={pillar.title}
        className="group p-8 rounded-3xl border border-line bg-surface-subtle transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
      >
        <div className="flex items-start justify-between mb-8">
          <span className="text-4xl font-black text-cyan-600">
            {pillar.number}
          </span>

          <div className="w-12 h-12 rounded-xl border border-line bg-white flex items-center justify-center group-hover:bg-cyan-600 transition-colors">
            <Icon
              className="w-5 h-5 text-cyan-600 group-hover:text-white transition-colors"
              strokeWidth={2}
            />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-1">
          {pillar.title}
        </h3>

        <p className="text-cyan-600 italic font-medium mb-4">
          {pillar.subtitle}
        </p>

        <p className="text-ink-secondary leading-relaxed">
          {pillar.description}
        </p>
      </div>
    );
  })}
</div>
        </div>
      </div>
    </section>
  );
}

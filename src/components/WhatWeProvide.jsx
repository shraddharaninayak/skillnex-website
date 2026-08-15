import {
  Video,
  FileCheck2,
  Users,
  Award,
  LifeBuoy,
  Network,
} from "lucide-react";

const QUICK_PROVISIONS = [
  {
    icon: Video,
    title: "Live cohort classes",
    description:
      "Instructor-led sessions run on a fixed weekly schedule, recorded for later review.",
  },
  {
    icon: FileCheck2,
    title: "Project-based learning",
    description:
      "Build practical projects that demonstrate what you can actually do.",
  },
  {
    icon: Users,
    title: "1:1 mentorship",
    description:
      "Get personal guidance, feedback, and support throughout your learning journey.",
  },
  {
    icon: Award,
    title: "Verified certification",
    description:
      "Earn a shareable certificate backed by your project portfolio and skills.",
  },
];

const FEATURE_PROVISIONS = [
  {
    label: "CAREER SUPPORT",
    title: "Build skills that move you forward.",
    description:
      "SkillNex goes beyond training. Get the guidance, feedback, and practical support you need to turn your skills into real career opportunities.",
    points: [
      "Resume and portfolio reviews",
      "Mock interview preparation",
      "Career and placement guidance",
    ],
    icon: LifeBuoy,
  },
  {
    label: "HIRING ACCESS",
    title: "Get closer to real opportunities.",
    description:
      "Put your skills to work through practical experience and access to opportunities across our growing hiring network.",
    points: [
      "Industry-relevant projects",
      "Portfolio-ready work",
      "Access to hiring opportunities",
    ],
    icon: Network,
  },
];

export default function WhatWeProvide() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* SECTION HEADER */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="eyebrow mb-6">
              <span className="w-4 h-[2px] bg-cyan-600"></span>· What We Provide
            </div>
          </div>

          <h2 className="section-title">
            {" "}
            Everything training needs
            <br />
            to actually{" "}
            <span className="relative inline-block">
              <span className="relative z-10">convert to a job.</span>

              <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#F59E0B] rounded-full" />
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-ink-secondary leading-relaxed max-w-2xl mx-auto">
            Learn through practical training, build real projects, get personal
            mentorship and prepare for the opportunities ahead.
          </p>
        </div>

        {/* SMALL FEATURE CARDS */}
        <div className="grid md:grid-cols-2 gap-3 mb-9">
          {QUICK_PROVISIONS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 md:px-5 md:py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-amber-600" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base md:text-lg font-bold font-display text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-ink-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* LARGE FEATURE CARDS */}
        <div className="grid lg:grid-cols-2 gap-5">
          {FEATURE_PROVISIONS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[28px] border border-slate-200 bg-white p-7 md:p-9 lg:p-10 min-h-[430px] transition-all duration-300 hover:shadow-md"
              >
                {/* LABEL */}
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />

                  <span className="text-xs font-bold tracking-wide text-ink-secondary">
                    {item.label}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-7 text-3xl md:text-4xl font-display font-bold text-ink leading-[1.05] max-w-md">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-5 text-base text-ink-secondary leading-relaxed max-w-lg">
                  {item.description}
                </p>

                {/* POINTS */}
                <div className="mt-7 space-y-3">
                  {item.points.map((point, index) => (
                    <div key={point} className="flex items-center gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-xs font-semibold text-ink-secondary">
                        {index + 1}
                      </span>

                      <span className="text-sm md:text-base text-ink-secondary">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ICON */}
                <div className="mt-8 flex justify-end">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <Icon className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import {
  BookOpen,
  Laptop,
  Users,
  BriefcaseBusiness,
} from "lucide-react";
import aboutImage from "../assets/about-skillnex.png";

const FEATURES = [
  {
    icon: BookOpen,
    label: "Practical Learning",
  },
  {
    icon: Laptop,
    label: "Live Classes",
  },
  {
    icon: Users,
    label: "Industry Mentors",
  },
  {
    icon: BriefcaseBusiness,
    label: "Career Support",
  },
];

export default function Founder() {
  return (
    <section className="section-pad bg-[#EEF6F7]">
      <div className="container-page">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: IMAGE */}
          <div className="w-full">
            <div className="overflow-hidden rounded-[1.75rem]">
              <img
                src={aboutImage}
                alt="Student attending a SkillNex online live class"
                className="w-full h-[520px] object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div>

            {/* EYEBROW */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-px bg-cyan-600" />

              <span className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-700">
                About SkillNex
              </span>
            </div>

            {/* MAIN HEADING */}
            <h2 className="font-display text-4xl md:text-5xl lg:text-[42px] font-bold leading-[1.12] tracking-tight text-[#102A43] max-w-xl">
              Building Skills.
              <br />
              Building Careers.
            </h2>

            {/* FIRST PARAGRAPH */}
            <p className="mt-7 text-lg leading-8 text-[#657A91] max-w-2xl">
              SkillNex is a practical learning platform built to help students
              develop real-world digital skills through hands-on training,
              live projects, industry mentorship, portfolio building,
              internships and career guidance.
            </p>

            {/* SECOND PARAGRAPH */}
            <p className="mt-5 text-lg leading-8 text-[#657A91] max-w-2xl">
              We believe learning should prepare students for real careers,
              not just certifications. Every program is designed around
              practical experience that builds confidence and makes learners
              industry ready.
            </p>

           {/* FOUNDER */}
<div className="mt-9 flex items-center gap-4">

  <span className="w-12 h-px bg-cyan-500" />

  <div>
    <p className="font-display font-bold text-lg text-[#102A43]">
      Anchal Joshi
    </p>

    <p className="text-xs uppercase tracking-[0.2em] text-[#657A91]">
      Founder • Nashik
    </p>
  </div>

</div>

            {/* FEATURE PILLS */}
            <div className="mt-8 flex flex-wrap gap-3">

              {FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-[#24577A] shadow-sm"
                  >
                    <Icon className="w-4 h-4" />

                    <span>{feature.label}</span>
                  </div>
                );
              })}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
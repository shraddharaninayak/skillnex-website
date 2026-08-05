import { Linkedin, Instagram } from 'lucide-react';
import aboutImage from "../assets/about-skillnex.png";

const highlights = [
  {
    value: "100%",
    label: "Practical Learning",
  },
  {
    value: "Live",
    label: "Interactive Classes",
  },
  {
    value: "Career",
    label: "Mentorship",
  },
];
export default function Founder() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">

  {/* Top Grid */}
  <div className="grid lg:grid-cols-[220px_1fr] gap-16">

    {/* Left Label */}

    
      <div className="flex lg:flex-col gap-4">

        <div className="eyebrow">
          <span className="w-4 h-[2px] bg-cyan-600" />
         · About SkillNex
        </div>

      </div>

    {/* Heading */}
 <div>

        <blockquote
          className="
          font-display
          font-extrabold
          text-3xl
          md:text-5xl
          leading-[1.05]
          tracking-[-0.04em]
          text-ink
          max-w-4xl
          "
        >
          “I interviewed hundreds of graduates with excellent marks and no
          idea how work actually happens. SkillNex exists to fix that{" "} - 
          <span className="text-cyan-500">
           students here finish with proof of skills
          </span>
          , not a printout.”
        </blockquote>

      </div>

    </div>

    {/* Bottom Grid */}

    <div className="mt-20 grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-start">

        {/* Image */}

        <div className="overflow-hidden rounded-2xl border border-line shadow-sm">
        <img
          src={aboutImage}
          alt="Students attending an online SkillNex live class"
          className="w-full h-[420px] object-cover"
          loading="lazy"
        />
      </div>

        {/* Right Content */}

      
      <div className="flex flex-col justify-between h-full">

        <div>

          <h3 className="font-display text-3xl font-bold text-ink">
            SkillNex
          </h3>

          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-ink-secondary">
            Future Skills Start Here
          </p>

          <p className="mt-8 text-lg leading-8 text-ink-secondary">
            SkillNex is a practical learning platform built to help students
            develop real-world digital skills through hands-on training,
            live projects, industry mentorship, portfolio building,
            internships and career guidance.
          </p>

          <p className="mt-6 text-lg leading-8 text-ink-secondary">
            We believe learning should prepare students for real careers,
            not just certifications. Every program is designed around
            practical experience that builds confidence and makes learners
            industry ready.
          </p>

        </div>

          {/* Stats */}

                <div className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3">

          {highlights.map((item, index) => (

            <div
              key={item.label}
              className={`py-7 ${
                index > 0
                  ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-6"
                  : ""
              }`}
            >

              <p className="font-display text-3xl font-bold text-ink">
                {item.value}
              </p>

              <p className="mt-2 text-sm text-ink-secondary">
                {item.label}
              </p>

            </div>

          ))}

        </div>


          {/* Social icons */}
 <div className="mt-10 flex items-center gap-3">

          <a
            href="https://www.linkedin.com/company/skillnex-30/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SkillNex on LinkedIn"
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://www.instagram.com/skillnex.30/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SkillNex on Instagram"
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </a>

        </div>

      </div>

    </div>

  </div>
</section>
  );
}


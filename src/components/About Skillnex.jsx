import { Linkedin, Instagram } from 'lucide-react';
import aboutImage from "../assets/about-skillnex.png";
export default function Founder() {
  return (
    <section className="section-pad bg-surface-subtle">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
           <div className="relative max-w-sm">
  <div
    className="overflow-hidden border border-line aspect-[4/5]"
    style={{
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 12% 100%)",
      borderRadius: "1.5rem",
    }}
  >
    <img
      src={aboutImage}
      alt="Students attending an online SkillNex live class"
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
</div>
          </div>

          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              About SkillNex
            </div>
            <blockquote className="text-2xl md:text-3xl font-display font-bold leading-snug text-ink mb-6">
              Future Skills Start Here.
            </blockquote>
            <p className="text-ink-secondary leading-relaxed mb-8 max-w-2xl">
  SkillNex is a practical learning platform built to help students
  develop real-world digital skills through hands-on training,
  live projects, industry mentorship, portfolio building,
  internships, and career guidance.

  <br /><br />

  We believe learning should prepare students for real careers,
  not just certifications. Every program is designed to give
  practical experience that builds confidence and makes learners
  industry ready.
</p>

<div className="flex items-center gap-4">
  <div>
    <p className="font-display font-bold text-ink text-lg">
  SkillNex
</p>
<p className="text-sm text-ink-secondary">
  The Skills Institute
</p>
  </div>

  <div className="w-px h-10 bg-line" />

  <div className="flex items-center gap-2">
    <a
      href="https://www.linkedin.com/company/skillnex-30/posts/?feedView=all"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SkillNex on LinkedIn"
      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-colors duration-200"
    >
      <Linkedin className="w-4 h-4" />
    </a>

    <a
      href="https://www.instagram.com/skillnex.30/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SkillNex on Instagram"
      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-colors duration-200"
    >
      <Instagram className="w-4 h-4" />
    </a>
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
}

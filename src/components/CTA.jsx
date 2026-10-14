import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-24">
      <div className="container-page">
        <div className="relative bg-ink rounded-2xl overflow-hidden px-8 py-16 sm:px-14 sm:py-20 text-center">
          <div
            className="absolute -top-10 -right-10 w-40 h-40 bg-cyan opacity-90"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-14 -left-10 w-36 h-36 bg-amber opacity-90"
            style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)' }}
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight mb-5">
              Your career journey starts with SkillNex.
            </h2>
            <p className="text-white/70 leading-relaxed mb-10 max-w-lg mx-auto">
              Build in‑demand skills, work on real‑world projects, and learn from industry mentors.
              Take the first step towards becoming career‑ready with SkillNex.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeozOvJLaLNhY2pYnIFjtsE9U3SCs3pX1im2suiDp1AFw1FPw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary bg-cyan hover:bg-white hover:text-ink"
              >
                Get Started with SkillNex
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white/50 transition-colors duration-200"
              >
                Explore Our Programs
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

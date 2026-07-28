import { Linkedin, Twitter } from 'lucide-react';

export default function Founder() {
  return (
    <section className="section-pad bg-surface-subtle">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="relative max-w-sm">
              <div
                className="overflow-hidden border border-line aspect-[4/5]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 12% 100%)', borderRadius: '1.5rem' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  alt="Portrait of Ananya Rao, Founder and CEO of Skillnex"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 card px-5 py-4 hidden sm:block">
                <p className="text-2xl font-display font-extrabold text-ink">9 yrs</p>
                <p className="text-xs text-ink-secondary mt-0.5">In edtech &amp; hiring</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              From the founder
            </div>
            <blockquote className="text-2xl md:text-3xl font-display font-bold leading-snug text-ink mb-6">
              "We built Skillnex because too many capable people were being filtered out by
              resumes, not skill."
            </blockquote>
            <p className="text-ink-secondary leading-relaxed mb-8 max-w-2xl">
              Before Skillnex, I spent seven years running hiring pipelines for fast-growing tech
              companies and watched the same pattern repeat: strong candidates rejected for gaps
              that had nothing to do with their actual ability. Skillnex exists to close that gap —
              training people the way hiring managers actually evaluate them.
            </p>

            <div className="flex items-center gap-4">
              <div>
                <p className="font-display font-bold text-ink">Ananya Rao</p>
                <p className="text-sm text-ink-secondary">Founder &amp; CEO, Skillnex</p>
              </div>
              <div className="w-px h-10 bg-line" />
              <div className="flex items-center gap-2">
                <a
                  href="#"
                  aria-label="Ananya Rao on LinkedIn"
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-colors duration-200"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  aria-label="Ananya Rao on Twitter"
                  className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-colors duration-200"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

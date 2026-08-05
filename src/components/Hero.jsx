import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section
  id="top"
  className="relative bg-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
>
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-6">
              <span className="w-4 h-[2px] bg-cyan-600" />
              Skillnex · The skills institute
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-extrabold tracking-tight text-ink">
              Skills that get you
              <span className="relative inline-block px-1">
                {" "}
                hired
                <svg
                  className="absolute left-0 -bottom-1 w-full"
                  height="10"
                  viewBox="0 0 160 10"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 7.5C40 2.5 120 2.5 159 7.5"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , not just certified.
            </h1>

            <p className="mt-6 text-lg text-ink-secondary leading-relaxed max-w-lg">
             Skillnex starts with skill-focused career counselling, helping you choose the right path early so you don't waste time or stay confused. Then you move into real execution through projects and mentorship, building practical skills that actually move your career forward.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#programs" className="btn-primary">
                Explore programs
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
              <a href="#process" className="btn-secondary group">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-subtle group-hover:bg-cyan-50 transition-colors duration-200">
                  <Play
                    className="w-3 h-3 fill-ink group-hover:fill-cyan-600"
                    strokeWidth={0}
                  />
                </span>
                See how it works
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div
                className="absolute inset-0 bg-surface-subtle border border-line overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 92%, 88% 100%, 0 100%)",
                  borderRadius: "1.5rem",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop"
                  alt="Skillnex learner working through a live project during a training cohort"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="absolute -left-6 bottom-10 card p-4 w-48 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <span className="text-amber font-display font-bold text-sm">
                      A+
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink leading-tight">
                      Cohort rating
                    </p>
                    <p className="text-xs text-ink-secondary mt-0.5">
                      4.9 avg / 2,300 reviews
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 -top-4 w-24 h-24 bg-cyan items-center justify-center text-white hidden sm:flex"
                style={{
                  clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
                  borderRadius: "1rem",
                }}
              >
                <span className="font-display font-bold text-xs text-center leading-tight pl-3">
                  Live
                  <br />
                  cohorts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

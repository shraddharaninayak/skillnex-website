import { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const REVIEW_SETS = {
  students: {
    label: 'Student reviews',
    reviews: [
      {
        quote: 'The mentor reviews were more honest than anything I got in four years of college. I knew exactly what to fix, every single week.',
        name: 'Priya Sharma',
        role: 'Full-Stack Development, hired at a Series B startup',
        rating: 5,
      },
      {
        quote: 'I came in with zero coding background and left with a portfolio I was actually proud to show in interviews.',
        name: 'Arjun Nair',
        role: 'Data Analytics & AI, hired at a fintech company',
        rating: 5,
      },
      {
        quote: 'The pace was intense but the structure meant I always knew what came next. Worth every week.',
        name: 'Meera Joseph',
        role: 'Product & UX Design, freelance designer',
        rating: 4,
      },
    ],
  },
  colleges: {
    label: 'College reviews',
    reviews: [
      {
        quote: 'Our placement numbers moved for the first time in three years. Skillnex ran the bootcamp inside our existing calendar with zero disruption.',
        name: 'Dr. S. Ramamurthy',
        role: 'Placement Cell Head, Coastal Institute of Technology',
        rating: 5,
      },
      {
        quote: 'The employability audit told us exactly where our curriculum was falling short. That data alone was worth the partnership.',
        name: 'Prof. Anita Deshmukh',
        role: 'Dean of Engineering, Ridgeview University',
        rating: 5,
      },
      {
        quote: 'Students who went through the bootcamp were noticeably more confident in interviews than the rest of the batch.',
        name: 'Rakesh Iyer',
        role: 'Training & Placement Officer, Meridian College',
        rating: 4,
      },
    ],
  },
  founders: {
    label: 'Founder reviews',
    reviews: [
      {
        quote: 'We hired three Skillnex graduates in one quarter and all three were productive within two weeks. That almost never happens with junior hires.',
        name: 'Vikram Sethi',
        role: 'CTO, Northline Logistics',
        rating: 5,
      },
      {
        quote: 'What stood out was how well-scoped their project work was. It genuinely looked like production code, not a tutorial clone.',
        name: 'Farah Qureshi',
        role: 'Head of Engineering, Bloomtech',
        rating: 5,
      },
      {
        quote: 'Skillnex is now our default first stop when we have open roles on the data team.',
        name: 'Nikhil Bansal',
        role: 'Founder, Ledgerly',
        rating: 5,
      },
    ],
  },
};

const TABS = Object.keys(REVIEW_SETS);

export default function Reviews() {
  const [activeTab, setActiveTab] = useState('students');
  const current = REVIEW_SETS[activeTab];

  return (
    <section id="reviews" className="section-pad bg-surface-subtle">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              Trusted by All
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Real Stories, Real Outcomes.
            </h2>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-white border border-line rounded-full mb-10">
          {TABS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeTab === key ? 'bg-ink text-white' : 'text-ink-secondary hover:text-ink'
              }`}
              aria-pressed={activeTab === key}
            >
              {REVIEW_SETS[key].label}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden">
  {/* Left Fade */}
  <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-surface-subtle to-transparent pointer-events-none" />

  {/* Right Fade */}
  <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-surface-subtle to-transparent pointer-events-none" />

  <div className="group overflow-hidden">
    <div className="flex w-max gap-6 animate-review-scroll group-hover:[animation-play-state:paused]">

      {[...current.reviews, ...current.reviews].map((review, index) => (
        <figure
          key={`${review.name}-${index}`}
          className="card w-[360px] shrink-0 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
        >
          {/* Quote */}
          <Quote
            className="w-8 h-8 text-cyan-500 mb-4 opacity-90"
            strokeWidth={2}
          />

          {/* Stars */}
          <div
            className="flex items-center gap-1 mb-5"
            aria-label={`${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-amber text-amber"
                    : "fill-line text-line"
                }`}
              />
            ))}
          </div>

          <blockquote className="text-sm leading-7 text-ink mb-6 flex-1">
            "{review.quote}"
          </blockquote>

          <figcaption className="border-t border-line pt-5">
            <p className="font-display font-bold text-ink">
              {review.name}
            </p>

            <p className="text-sm text-ink-secondary mt-1">
              {review.role}
            </p>
          </figcaption>
        </figure>
      ))}

    </div>
  </div>
</div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Star } from 'lucide-react';

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
              Reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              What students, colleges, and founders say.
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

        <div className="grid md:grid-cols-3 gap-5">
          {current.reviews.map((review) => (
            <figure key={review.name} className="card p-7 flex flex-col">
              <div className="flex items-center gap-1 mb-5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-amber text-amber' : 'fill-line text-line'}`}
                  />
                ))}
              </div>
              <blockquote className="text-sm text-ink leading-relaxed flex-1 mb-6">
                "{review.quote}"
              </blockquote>
              <figcaption className="pt-5 border-t border-line">
                <p className="font-display font-bold text-sm text-ink">{review.name}</p>
                <p className="text-xs text-ink-secondary mt-1">{review.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

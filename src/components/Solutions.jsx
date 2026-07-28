import { useState } from 'react';
import { GraduationCap, Building2, School, Check, ArrowRight } from 'lucide-react';

const TABS = [
  {
    key: 'students',
    label: 'Students',
    icon: GraduationCap,
    heading: 'Go from classroom theory to a hiring-ready portfolio.',
    description:
      'Structured cohorts, mentor reviews, and mock interviews built around one goal — your first or next role.',
    points: [
      'Personalized learning path based on your target role',
      'Weekly 1:1 mentor sessions with industry practitioners',
      'Interview prep, resume reviews, and referral access',
    ],
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop',
    cta: 'Browse student programs',
  },
  {
    key: 'corporates',
    label: 'Corporates',
    icon: Building2,
    heading: 'Upskill your teams without pulling them off delivery.',
    description:
      'Cohort-based corporate training built around your tech stack, delivered on your timeline, measured against real KPIs.',
    points: [
      'Custom curriculum mapped to your internal tools',
      'Progress dashboards for L&D and engineering leads',
      'Flexible formats — cohort, self-paced, or blended',
    ],
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&auto=format&fit=crop',
    cta: 'Talk to our corporate team',
  },
  {
    key: 'colleges',
    label: 'Colleges',
    icon: School,
    heading: 'Turn your placement cell into a real employability engine.',
    description:
      'We embed inside your campus calendar to run skill bootcamps, assessments, and placement drives end-to-end.',
    points: [
      'Employability audits mapped to placement outcomes',
      'On-campus bootcamps co-taught with your faculty',
      'Direct access to our hiring partner network',
    ],
    image:
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=900&auto=format&fit=crop',
    cta: 'Partner with Skillnex',
  },
];

export default function Solutions() {
  const [activeKey, setActiveKey] = useState('students');
  const active = TABS.find((tab) => tab.key === activeKey);

  return (
    <section id="solutions" className="section-pad bg-surface-subtle">
      <div className="container-page">
        <div className="max-w-xl mb-12">
          <div className="eyebrow mb-4">
            <span className="w-4 h-[2px] bg-cyan-600" />
            Solutions
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Built differently for who you are.
          </h2>
        </div>

        <div className="inline-flex items-center gap-1 p-1 bg-white border border-line rounded-full mb-10">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveKey(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'bg-ink text-white' : 'text-ink-secondary hover:text-ink'
                }`}
                aria-pressed={isActive}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center bg-white border border-line rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-6">
            <h3 className="text-2xl md:text-[1.75rem] font-display font-bold leading-snug mb-4">
              {active.heading}
            </h3>
            <p className="text-ink-secondary leading-relaxed mb-7">{active.description}</p>

            <ul className="space-y-3 mb-8">
              {active.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-cyan-600" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-ink leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <a href="#cta" className="btn-primary">
              {active.cta}
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </a>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl2 overflow-hidden border border-line aspect-[16/11]">
              <img
                src={active.image}
                alt={active.heading}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

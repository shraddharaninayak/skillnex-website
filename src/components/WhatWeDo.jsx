import { Target, Users2, BriefcaseBusiness, TrendingUp } from 'lucide-react';

const PILLARS = [
  {
    icon: Target,
    title: 'Skill diagnostics',
    description: 'We start by mapping exactly where you stand against the role you want, not a generic syllabus.',
  },
  {
    icon: Users2,
    title: 'Mentor-led cohorts',
    description: 'Small cohorts led by practitioners currently working in the field you are training for.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Real project work',
    description: 'Every track ends in a shipped project or case study you can defend in an interview.',
  },
  {
    icon: TrendingUp,
    title: 'Placement support',
    description: 'Resume, interview, and referral support run in parallel with training, not after it.',
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section-pad bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              What we do
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Training that's built backward from hiring, not forward from a curriculum.
            </h2>
            <p className="text-ink-secondary leading-relaxed">
              Most programs teach a syllabus and hope it's useful later. We reverse the order —
              starting with what companies are hiring for, then building the training path to get
              you there.
            </p>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-5">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="p-7 rounded-2xl bg-surface-subtle border border-line">
                  <div className="w-11 h-11 rounded-xl bg-white border border-line flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-cyan-600" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold font-display text-ink mb-2">{pillar.title}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

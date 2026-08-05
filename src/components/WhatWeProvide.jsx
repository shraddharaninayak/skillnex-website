import { Video, FileCheck2, Users, Award, LifeBuoy, Network } from 'lucide-react';

const PROVISIONS = [
  {
    icon: Video,
    title: 'Live cohort classes',
    description: 'Instructor-led sessions run on a fixed weekly schedule, recorded for later review.',
  },
  {
    icon: FileCheck2,
    title: 'Project-based assessments',
    description: 'Every module ends in a graded project reviewed by a mentor, not a multiple-choice quiz.',
  },
  {
    icon: Users,
    title: '1:1 mentorship',
    description: 'A dedicated mentor tracks your progress and unblocks you weekly, not on request.',
  },
  {
    icon: Award,
    title: 'Verified certification',
    description: 'A shareable certificate backed by your project portfolio, not just attendance.',
  },
  {
    icon: LifeBuoy,
    title: 'Career support desk',
    description: 'Resume reviews, mock interviews, and negotiation guidance included through placement.',
  },
  {
    icon: Network,
    title: 'Hiring partner access',
    description: 'Direct referral pathways into our network of 140+ active hiring partners.',
  },
];

export default function WhatWeProvide() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="max-w-xl mb-14">
          <div className="eyebrow mb-4">
            <span className="w-4 h-[2px] bg-cyan-600" />
           · What we provide
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Everything training needs to actually convert to a job.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROVISIONS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card p-7">
                <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-amber-600" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold font-display text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

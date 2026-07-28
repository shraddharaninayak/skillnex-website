const STEPS = [
  {
    number: '01',
    title: 'Diagnose',
    description: 'A skills assessment maps your current level against your target role, so training starts at the right point, not zero.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'You get a personalized learning path — modules, project briefs, and a mentor matched to your track.',
  },
  {
    number: '03',
    title: 'Train',
    description: 'Live cohort sessions, weekly mentor reviews, and hands-on project work replace passive video lectures.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'You ship a portfolio-grade project or case study, reviewed by practitioners before it goes on your resume.',
  },
  {
    number: '05',
    title: 'Place',
    description: 'Interview prep, resume support, and direct referrals into our hiring partner network follow immediately.',
  },
];

export default function TrainingProcess() {
  return (
    <section id="process" className="section-pad bg-white">
      <div className="container-page">
        <div className="max-w-xl mb-16">
          <div className="eyebrow mb-4">
            <span className="w-4 h-[2px] bg-cyan-600" />
            Skill training process
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Five steps. Same order, every cohort.
          </h2>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-px bg-line" />
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-6">
            {STEPS.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center gap-3 lg:block">
                  <span className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-ink font-display font-bold text-sm text-ink shrink-0">
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold font-display text-ink lg:mt-5">{step.title}</h3>
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed mt-3 lg:mt-3">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

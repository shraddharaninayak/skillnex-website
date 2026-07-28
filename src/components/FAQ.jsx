import { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQS = [
  {
    question: 'Do I need prior experience to join a program?',
    answer:
      'No. Most tracks are designed to take you from a beginner level to job-ready, and your learning path is personalized after an initial skills diagnostic.',
  },
  {
    question: 'How are classes delivered?',
    answer:
      'Programs run as live, instructor-led cohort sessions on a fixed weekly schedule. Every session is recorded so you can review it later.',
  },
  {
    question: 'Is placement support included in every program?',
    answer:
      'Yes. Resume reviews, mock interviews, and referrals into our hiring partner network are included as part of every program, not sold separately.',
  },
  {
    question: 'Can colleges or companies run a private cohort?',
    answer:
      'Yes. We build custom cohorts for colleges and corporates, mapped to your calendar, tools, and outcomes. Reach out through the Solutions section to start that conversation.',
  },
  {
    question: 'What happens if I fall behind during a cohort?',
    answer:
      'Your mentor tracks progress weekly and flags gaps early. You also keep access to recorded sessions and materials, so catching up does not mean falling out of the cohort.',
  },
  {
    question: 'Do you offer refunds or trial access?',
    answer:
      'Yes, each program includes a short trial window and a clear refund policy, detailed at checkout before you commit to the full cohort.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-5">
              Questions, answered plainly.
            </h2>
            <p className="text-ink-secondary leading-relaxed">
              Can't find what you're looking for?{' '}
              <a href="#cta" className="text-cyan-600 font-semibold hover:underline">
                Reach out to our team
              </a>{' '}
              directly.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-line border-t border-b border-line">
              {FAQS.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.question}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display font-semibold text-ink text-base">
                        {faq.question}
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center transition-transform duration-200 ${
                          isOpen ? 'rotate-45 bg-cyan-50 border-cyan-600' : ''
                        }`}
                      >
                        <Plus className={`w-4 h-4 ${isOpen ? 'text-cyan-600' : 'text-ink-secondary'}`} />
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-200 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      style={{ display: 'grid' }}
                    >
                      <div className="overflow-hidden">
                        <p className="text-sm text-ink-secondary leading-relaxed max-w-xl">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

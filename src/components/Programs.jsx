import { Code2, LineChart, Palette, Database, Megaphone, ShieldCheck, ArrowUpRight } from 'lucide-react';
const PROGRAMS = [
  {
    category: "OPERATOR",
    icon: Megaphone,
    title: "Social Media Management",
    description:
      "Strategy, content creation, branding, and campaign execution through real client projects and industry mentorship.",
  },
  {
    category: "STUDIO",
    icon: Palette,
    title: "Video Editing (Basic to Advance)",
    description:
      "Master professional editing, storytelling, motion graphics, and cinematic workflows using real-world projects.",
  },
  {
    category: "DESIGN",
    icon: Palette,
    title: "Graphic Design & UI/UX",
    description:
      "Create impactful brand identities, social creatives, websites, and user experiences with practical design projects.",
  },
  {
    category: "GROWTH",
    icon: LineChart,
    title: "Performance Marketing",
    description:
      "Learn Meta Ads, Google Ads, analytics, and campaign optimization by managing real marketing campaigns.",
  },
  {
    category: "ENGINEERING",
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Build responsive websites and full-stack web applications using modern technologies and real development projects.",
  },
  {
    category: "FOUNDATION",
    icon: ShieldCheck,
    title: "Soft Skills Learning",
    description:
      "Develop communication, confidence, interview skills, leadership, and workplace professionalism for career success.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="section-pad bg-surface-subtle">
      <div className="container-page">
        <div className="mb-14">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
               · Learn by doing
            </div>
           <div>
<h2 className="text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.08] font-extrabold tracking-tight text-ink">
  Build Skills Through
  <br />
  Execution.
</h2>

  <div className="mt-8 flex items-center gap-3">
<span className="h-1.5 w-24 rounded-full bg-amber"></span>

<span className="h-2.5 w-2.5 rounded-full bg-amber"></span>
<span className="h-2.5 w-2.5 rounded-full bg-amber"></span>
<span className="h-2.5 w-2.5 rounded-full bg-amber"></span>
  </div>
</div>
          </div>
          
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {PROGRAMS.map((program) => {
            const Icon = program.icon;
            return (
              <a
                key={program.title}
                href="#solutions"
                className="
                    group
                    flex
                    flex-col
                    p-9
                    rounded-[28px]
                    border
                  border-cyan-100
                    bg-gradient-to-br
                  from-white
                 via-white
                 to-cyan-50
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-xl
                hover:shadow-cyan-100/60 "
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-orange-500">
                    {program.category}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-ink-secondary group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>

                <h3 className="text-2xl font-bold font-display text-ink mb-3 leading-tight">{program.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed mb-6 flex-1">
                  {program.description}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-200">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 border-b border-gray-900 pb-1 transition-all duration-300 group-hover:text-amber group-hover:border-amber">
                   Explore
                  <ArrowUpRight className="w-4 h-4 transition-all duration-300 group-hover:text-amber group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
               </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    student: 'Rhea Malhotra',
    track: 'Full-Stack Development',
    title: 'A logistics dashboard for a mid-size fleet operator',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    student: 'Karan Bhatt',
    track: 'Data Analytics & AI',
    title: 'Churn prediction model for a subscription commerce brand',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    student: 'Sneha Iyer',
    track: 'Product & UX Design',
    title: 'End-to-end redesign of a campus fee payment app',
    image: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=800&auto=format&fit=crop',
  },
  {
    student: 'Devansh Kapoor',
    track: 'Cloud & DevOps',
    title: 'Zero-downtime deployment pipeline for a healthtech startup',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Portfolio() {
  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="eyebrow mb-4">
              <span className="w-4 h-[2px] bg-cyan-600" />
              Student portfolio
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
              Real projects, shipped by real students.
            </h2>
          </div>
          <a href="#cta" className="btn-secondary shrink-0">
            View all projects
            <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <a key={project.title} href="#cta" className="group block">
              <div className="rounded-xl2 overflow-hidden border border-line aspect-[16/10] mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wide text-cyan-600 mb-2">
                    {project.track}
                  </p>
                  <h3 className="font-display font-bold text-ink leading-snug group-hover:text-cyan-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-secondary mt-2">{project.student}</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-ink-secondary group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

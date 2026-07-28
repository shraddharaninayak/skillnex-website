import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import logo from '../assets/skillnex-logo.jpeg';

const FOOTER_LINKS = [
  {
    heading: 'Programs',
    links: ['Full-Stack Development', 'Data Analytics & AI', 'Product & UX Design', 'Cloud & DevOps'],
  },
  {
    heading: 'Solutions',
    links: ['For students', 'For corporates', 'For colleges'],
  },
  {
    heading: 'Company',
    links: ['About us', 'Careers', 'Press', 'Contact'],
  },
  {
    heading: 'Resources',
    links: ['Student portfolio', 'Reviews', 'FAQ', 'Blog'],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Instagram, label: 'Instagram' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-line">
      <div className="container-page pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-14">
          <div className="lg:col-span-4">
            <img src={logo} alt="Skillnex — Future Skills Start Here" className="h-8 w-auto object-contain mb-5" />
            <p className="text-sm text-ink-secondary leading-relaxed max-w-xs">
              Skillnex is an education and career acceleration platform helping students,
              corporates, and colleges build in-demand skills for the future of work.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink-secondary hover:text-cyan-600 hover:border-cyan-600 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <h3 className="text-xs font-mono uppercase tracking-wide text-ink-secondary mb-4">
                  {group.heading}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-ink hover:text-cyan-600 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-secondary">
            © {new Date().getFullYear()} Skillnex. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-ink-secondary hover:text-ink transition-colors duration-200">
              Privacy policy
            </a>
            <a href="#" className="text-xs text-ink-secondary hover:text-ink transition-colors duration-200">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

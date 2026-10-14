import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/skillnex-logo.jpeg';

const FOOTER_LINKS = [
  {
    heading: 'Programs',
    links: [
      { label: 'Social Media Management', href: '/programs/social-media-management' },
      { label: 'Video Editing', href: '/programs/video-editing' },
      { label: 'Graphic Designing', href: '/programs/graphic-designing' },
      { label: 'Performance Marketing', href: '/programs/performance-marketing' },
      { label: 'Full Stack Development', href: '/programs/full-stack-development' },
      { label: 'Ecommerce Brand Management', href: '/programs/ecommerce-brand-management' },
      { label: 'Full Digital Marketing', href: '/programs/full-digital-marketing' },
      { label: 'Cyber Security', href: '/programs/cyber-security' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'For Students', href: '/' },
      { label: 'For Colleges', href: '/' },
      { label: 'For Corporates', href: '/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About SkillNex', href: '/' },
      { label: 'Contact Us', href: '/#cta' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Student Portfolio', href: '/' },
      { label: 'Reviews', href: '/#reviews' },
      { label: 'FAQs', href: '/#faq' },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/skillnex-30/posts/' },
  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com/Skillnex30' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/skillnex.30/' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579494351033' },
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
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-ink hover:text-cyan-600 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
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

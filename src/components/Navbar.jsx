import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/skillnex-logo.jpeg';

const NAV_LINKS = [
  { label: 'Programs', href: '#programs' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'What We Do', href: '#what-we-do' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setActive(href);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-line' : 'bg-white border-b border-transparent'
      }`}
    >
      <nav className="container-page flex items-center justify-between h-22 lg:h-24">
       <a
  href="#top"
  className="flex items-center shrink-0 mr-2 md:mr-4"
  aria-label="Skillnex home"
>
  <img
    src={logo}
    alt="Skillnex — Future Skills Start Here"
    className="h-20 w-auto object-contain"
  />
</a>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  active === link.href
                    ? 'text-cyan-600 bg-cyan-50'
                    : 'text-ink-secondary hover:text-ink hover:bg-surface-subtle'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href="#faq" className="text-sm font-semibold text-ink-secondary hover:text-ink transition-colors duration-200 px-3">
            Sign in
          </a>
          <a href="#cta" className="btn-primary">
            Talk to us
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -mr-2 text-ink"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-line">
          <ul className="container-page py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-ink hover:bg-surface-subtle transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3 mt-2 border-t border-line flex flex-col gap-3">
              <a href="#faq" className="btn-secondary w-full" onClick={() => setMobileOpen(false)}>
                Sign in
              </a>
              <a href="#cta" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                Talk to us
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

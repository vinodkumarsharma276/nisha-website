import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Menu, X, Youtube, ArrowUpRight } from 'lucide-react';

const scrollNavLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

const socials = [
  { href: 'https://www.linkedin.com/in/-nisha-sharma/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/nishashrm75', label: 'X', icon: Twitter },
  { href: 'https://youtube.com/@finsightswithnisha', label: 'YouTube', icon: Youtube },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isBlogActive = location.pathname.startsWith('/blog');

  // Solid background after leaving the top; hide while scrolling down, reveal on scroll up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y <= 400) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy on the home route
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }
    const ids = scrollNavLinks.map((l) => l.id);
    const handler = () => {
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) current = 'contact';
      setActiveSection(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [isHome]);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const solid = scrolled || !isHome || isMobileMenuOpen;

  return (
    <header
      className={`site-header fixed top-0 inset-x-0 z-50 border-b ${
        solid ? 'bg-paper/85 backdrop-blur-xl border-line shadow-[0_8px_30px_-20px_rgba(11,31,51,0.25)]' : 'bg-transparent border-transparent'
      } ${hidden && !isMobileMenuOpen ? '-translate-y-full !shadow-none' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex justify-between items-center h-[72px]">
        {/* Wordmark */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group" aria-label="Nisha Sharma — home">
          <span className="relative w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center font-display text-lg font-bold transition-transform duration-500 group-hover:rotate-[-8deg]">
            N
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[19px] text-ink">Nisha Sharma</span>
            <span className="block text-[10.5px] tracking-[0.2em] uppercase text-ink-soft">Tax · GST · Compliance</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {scrollNavLinks.map((link) => {
            const active = isHome && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-tab text-[14.5px] font-medium ${active ? 'nav-tab-active text-ink' : 'text-ink-soft hover:text-ink'}`}
              >
                {link.label}
              </button>
            );
          })}
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={isBlogActive ? 'page' : undefined}
            className={`nav-tab text-[14.5px] font-medium ${isBlogActive ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}
          >
            Blog
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3.5">
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-ink-soft/70 hover:text-ink transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <button onClick={() => scrollToSection('contact')} className="btn-primary py-2.5 px-5 text-sm">
            Book a consultation
            <ArrowUpRight className="arrow w-4 h-4" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileMenuOpen((o) => !o)}
          className="lg:hidden w-11 h-11 -mr-2 flex items-center justify-center text-ink"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden h-[calc(100dvh-72px)] overflow-y-auto bg-paper px-6 pt-6 pb-10 flex flex-col">
          <nav className="flex flex-col" aria-label="Mobile">
            {scrollNavLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hero-in text-left font-display text-[34px] leading-none py-4 border-b border-line text-ink flex justify-between items-center"
                style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
              >
                {link.label}
                <ArrowUpRight className="w-5 h-5 text-ink-soft" />
              </button>
            ))}
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hero-in text-left font-display text-[34px] leading-none py-4 border-b border-line text-ink flex justify-between items-center"
              style={{ '--d': `${scrollNavLinks.length * 60}ms` } as React.CSSProperties}
            >
              Blog
              <ArrowUpRight className="w-5 h-5 text-ink-soft" />
            </Link>
          </nav>

          <button onClick={() => scrollToSection('contact')} className="btn-primary mt-8 w-full">
            Book a consultation
            <ArrowUpRight className="arrow w-4 h-4" />
          </button>

          <div className="mt-auto pt-10 flex items-center gap-5 text-ink-soft">
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-ink">
                <Icon size={20} />
              </a>
            ))}
            <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="hover:text-ink font-bold" aria-label="Medium">
              M
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

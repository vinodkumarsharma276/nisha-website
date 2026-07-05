import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Menu, X, Youtube } from 'lucide-react';

const scrollNavLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Background', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const blogLink = { label: 'Blog', to: '/blog' };

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isBlogActive = location.pathname === '/blog';

  // Scroll-spy: highlight the nav tab for the section currently in view (home route only)
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }
    const ids = scrollNavLinks.map((l) => l.id);
    const handler = () => {
      const offset = 90;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActiveSection(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      // Navigate to home then scroll after render
      navigate('/');
      // Small delay to allow route change
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToBlog = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#0f172a] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-lg font-semibold text-[#0f172a]">Nisha</span>
        </Link>

        {/* Desktop Nav - Animated tabs */}
        <nav className="hidden lg:flex items-center space-x-8">
          {scrollNavLinks.map((link) => {
            const active = location.pathname === '/' && activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-tab text-sm font-medium transition-all duration-200 hover:-translate-y-px active:scale-[0.985] ${
                  active ? 'nav-tab-active text-[#0f172a] font-semibold' : 'text-gray-600 hover:text-[#0f172a]'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Blog tab - React Router + active state (pure client navigation) */}
          <button
            onClick={() => {
              navigate(blogLink.to);
              goToBlog();
            }}
            className={`nav-tab text-sm font-medium transition-all duration-200 hover:-translate-y-px active:scale-[0.985] ${
              isBlogActive
                ? 'nav-tab-active text-[#0f172a] font-semibold'
                : 'text-gray-600 hover:text-[#0f172a]'
            }`}
          >
            {blogLink.label}
          </button>
        </nav>

        {/* Right Section - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/#contact"
            onClick={() => scrollToSection('contact')}
            className="px-5 py-2 bg-[#0f172a] text-white text-sm font-semibold rounded-lg hover:bg-[#0f172a] transition-all shadow-sm hover:shadow-md"
          >
            Book Consultation
          </Link>

          <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
            <a href="https://www.linkedin.com/in/-nisha-sharma/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a] transition-colors" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="https://x.com/nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a] transition-colors" aria-label="X">
              <Twitter size={17} />
            </a>
            <a href="https://youtube.com/@finsightswithnisha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a] transition-colors" aria-label="YouTube">
              <Youtube size={17} />
            </a>
            <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a] transition-colors font-bold text-[13px] leading-none" title="Medium" aria-label="Medium">
              M
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-600"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6">
          <nav className="flex flex-col space-y-1">
            {scrollNavLinks.map((link) => {
              const active = location.pathname === '/' && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-medium py-2.5 ${active ? 'text-[#0e7490] font-semibold' : 'text-gray-600 hover:text-[#0f172a]'}`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Blog in mobile */}
            <button
              onClick={() => {
                navigate(blogLink.to);
                goToBlog();
              }}
              className={`text-left font-medium py-2.5 ${isBlogActive ? 'text-[#0f172a] font-semibold' : 'text-gray-600 hover:text-[#0f172a]'}`}
            >
              {blogLink.label}
            </button>
          </nav>

          <Link
            to="/#contact"
            onClick={() => scrollToSection('contact')}
            className="mt-3 block w-full text-center bg-[#0f172a] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#0f172a] transition"
          >
            Book a Consultation
          </Link>

          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100 text-sm">
            <a href="https://www.linkedin.com/in/-nisha-sharma/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a]">
              <Linkedin size={17} />
            </a>
            <a href="https://x.com/nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a]">
              <Twitter size={17} />
            </a>
            <a href="https://youtube.com/@finsightswithnisha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a]">
              <Youtube size={17} />
            </a>
            <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0f172a] font-bold text-[13px]" title="Medium">M</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

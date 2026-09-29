import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Linkedin, Twitter, Youtube, ArrowUp } from 'lucide-react';

const socials = [
  { href: 'https://www.linkedin.com/in/-nisha-sharma/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/nishashrm75', label: 'X', icon: Twitter },
  { href: 'https://youtube.com/@finsightswithnisha', label: 'YouTube', icon: Youtube },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ink text-paper/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-8 pb-14 border-b border-white/10">
          <div className="md:col-span-6">
            <p className="font-display text-[32px] sm:text-[40px] leading-tight text-paper">
              Nisha Sharma
              <span className="block text-paper/50">Tax · GST · Compliance</span>
            </p>
            <div className="flex gap-3 mt-7">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="https://medium.com/@nishashrm75"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors text-sm font-bold"
              >
                M
              </a>
            </div>
          </div>

          <div className="md:col-span-3 text-sm">
            <p className="text-[11px] tracking-[0.18em] uppercase text-paper/50 mb-5">Navigate</p>
            <ul className="space-y-3">
              {[
                ['About', 'about'],
                ['Services', 'services'],
                ['Process', 'process'],
                ['FAQ', 'faq'],
                ['Contact', 'contact'],
              ].map(([label, id]) => (
                <li key={id}>
                  <button onClick={() => scrollTo(id)} className="hover:text-paper transition-colors">
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" className="hover:text-paper transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 text-sm">
            <p className="text-[11px] tracking-[0.18em] uppercase text-paper/50 mb-5">Contact</p>
            <a href="mailto:nishashrm75@gmail.com" className="block hover:text-paper transition-colors">
              nishashrm75@gmail.com
            </a>
            <p className="mt-2 text-paper/60">Mayur Vihar Phase-3, Delhi</p>
            <p className="mt-2 text-paper/60">Mon–Fri 9am–6pm · Sat 9am–2pm</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-paper/45">
          <p>© {currentYear} Nisha Sharma. All rights reserved.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group inline-flex items-center gap-2 hover:text-paper transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

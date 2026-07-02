import { Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-white/90 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-6 pb-10 border-b border-white/15">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/90 rounded flex items-center justify-center">
                <span className="text-[#0f172a] font-bold text-sm">N</span>
              </div>
              <span className="font-semibold text-xl text-white">Nisha</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              CA aspirant helping individuals and businesses with accurate tax filing, GST compliance, and financial clarity.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="https://www.linkedin.com/in/-nisha-sharma/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
              <a href="https://x.com/nishashrm75" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="https://youtube.com/@finsightswithnisha" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Youtube size={18} /></a>
              <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-sm font-bold tracking-tight">M</a>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 text-sm">
            <div className="font-semibold text-white mb-4 text-xs tracking-[1px] uppercase">Navigate</div>
            <div className="space-y-[9px]">
              <button onClick={() => scrollTo('services')} className="block hover:text-white transition-colors">Services</button>
              <button onClick={() => scrollTo('blogs')} className="block hover:text-white transition-colors">Insights &amp; Blog</button>
              <button onClick={() => scrollTo('experience')} className="block hover:text-white transition-colors">Experience</button>
              <button onClick={() => scrollTo('contact')} className="block hover:text-white transition-colors">Contact</button>
            </div>
          </div>

          <div className="md:col-span-4 text-sm">
            <div className="font-semibold text-white mb-4 text-xs tracking-[1px] uppercase">Get In Touch</div>
            <a href="mailto:nishashrm75@gmail.com" className="block hover:text-white transition-colors mb-1">nishashrm75@gmail.com</a>
            <div className="text-white/70">Mayur Vihar Phase-3, Delhi</div>
            <div className="mt-3 text-xs text-white/60">Mon–Fri 9am–6pm • Sat 9am–2pm</div>

            <button 
              onClick={() => scrollTo('contact')} 
              className="mt-6 inline-block text-sm font-semibold border border-white/50 hover:border-white hover:text-white transition-colors px-5 py-2 rounded-lg"
            >
              Send a Message
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-y-2">
          <div>© {currentYear} Nisha Sharma. All rights reserved.</div>
          <div className="flex gap-4">
            <span className="hover:text-white/70 cursor-default">Privacy</span>
            <span className="hover:text-white/70 cursor-default">Terms</span>
          </div>
          <div className="text-white/40">Crafted with clarity &amp; care</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
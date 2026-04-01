import { useState } from 'react';
import { Linkedin, Twitter, Menu, X, Youtube } from 'lucide-react';

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Blog', id: 'blogs' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <button onClick={() => scrollToSection('home')} className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-[#1e3a5f] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-lg font-semibold text-[#1e3a5f]">Nisha</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm text-gray-600 hover:text-[#1e3a5f] font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="https://www.linkedin.com/in/-nisha-sharma/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f] transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://x.com/nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f] transition-colors">
            <Twitter size={18} />
          </a>
          <a href="https://youtube.com/@finsightswithnisha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f] transition-colors">
            <Youtube size={18} />
          </a>
          <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f] transition-colors font-bold text-sm leading-none" title="Medium">
            M
          </a>
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
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-gray-600 hover:text-[#1e3a5f] font-medium py-2"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center space-x-4 pt-4 mt-4 border-t border-gray-100">
            <a href="https://www.linkedin.com/in/-nisha-sharma/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f]">
              <Linkedin size={18} />
            </a>
            <a href="https://x.com/nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f]">
              <Twitter size={18} />
            </a>
            <a href="https://youtube.com/@finsightswithnisha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f]">
              <Youtube size={18} />
            </a>
            <a href="https://medium.com/@nishashrm75" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1e3a5f] font-bold text-sm leading-none" title="Medium">
              M
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

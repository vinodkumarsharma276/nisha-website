import React, { useState } from 'react';
import { Linkedin, Twitter, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-lg text-white p-4 fixed w-full z-50 border-b border-purple-500/20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <h1 className="text-xl font-bold">Nisha, CA</h1>
        </div>
        
        {/* <nav className="hidden md:flex space-x-8">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-purple-300 transition-colors">Home</a>
          <a href="#blogs" onClick={(e) => { e.preventDefault(); scrollToSection('blogs'); }} className="hover:text-purple-300 transition-colors">Blogs</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-purple-300 transition-colors">Projects</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-purple-300 transition-colors">Experience</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-purple-300 transition-colors">Contact</a>
        </nav> */}

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition-colors">
              <Twitter size={20} />
            </a>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            {/* <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-purple-300 transition-colors py-2">Home</a>
            <a href="#blogs" onClick={(e) => { e.preventDefault(); scrollToSection('blogs'); }} className="hover:text-purple-300 transition-colors py-2">Blogs</a> */}
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-purple-300 transition-colors py-2">Projects</a>
            <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-purple-300 transition-colors py-2">Experience</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-purple-300 transition-colors py-2">Contact</a>
            <div className="flex items-center space-x-6 pt-4 border-t border-slate-700 w-full justify-center">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                <Linkedin size={22} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300">
                <Twitter size={22} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

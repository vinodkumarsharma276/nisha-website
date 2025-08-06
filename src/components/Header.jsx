import React, { useState, useEffect } from 'react';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'blogs', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo with professional styling */}
        <h1 className="text-2xl font-bold text-slate-800 hover:text-slate-900 transition-colors duration-300 cursor-pointer">
          CA Nisha
        </h1>
        
        {/* Navigation with clean professional design */}
        <nav className="flex space-x-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { 
                e.preventDefault(); 
                scrollToSection(item.id);
                setActiveSection(item.id);
              }}
              className={`
                relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out
                ${activeSection === item.id 
                  ? 'text-slate-800 bg-slate-100 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }
                after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-slate-800
                after:transition-all after:duration-300 after:transform after:-translate-x-1/2
                ${activeSection === item.id ? 'after:w-full' : 'hover:after:w-3/4'}
              `}
            >
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

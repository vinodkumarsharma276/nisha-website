import React from 'react';

const Header = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-gray-900 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nisha, CA</h1>
        
        <nav>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Home</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Services</a>
          <a href="#blogs" onClick={(e) => { e.preventDefault(); scrollToSection('blogs'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Blogs</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Projects</a>
          <a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Experience</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="mx-4 hover:text-gray-300 underline-offset-4 hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

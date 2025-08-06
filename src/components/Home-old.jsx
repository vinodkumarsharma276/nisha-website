import React, { useState, useEffect } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional businesswoman
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Female financial analyst
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80', // Financial charts (neutral)
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace (neutral)
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional woman working
];

const Home = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Rotate background images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Function to scroll to specific sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(3px)'
            }}
          />
        ))}
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/75 to-slate-900/80"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center text-white">
        <h2 className="text-5xl lg:text-7xl font-bold mb-6">
          <span className="block">Hello, I'm</span>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Nisha
          </span>
        </h2>
        <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
          Your trusted partner in <span className="text-purple-300 font-semibold">financial excellence</span>. 
          I help businesses navigate complex financial landscapes with precision and expertise.
        </p>
        <div className="space-x-4">
          <button 
            onClick={() => scrollToSection('projects')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/30"
          >
            Contact Me
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;

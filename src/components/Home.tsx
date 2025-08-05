import { ArrowRight, Download, Star, Users, Award, Calculator, TrendingUp, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Technology finance
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80', // Financial charts
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional meeting
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // City business
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace
];

const Home = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Rotate background images every 4 seconds with faster transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(88, 28, 135, 0.7)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>
      
      {/* Animated Financial Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Calculator className="absolute top-20 left-20 w-8 h-8 text-purple-300/30 animate-bounce" />
        <TrendingUp className="absolute top-40 right-32 w-6 h-6 text-blue-300/30 animate-pulse" />
        <Shield className="absolute bottom-40 left-32 w-10 h-10 text-green-300/30 animate-bounce delay-1000" />
        <Award className="absolute bottom-20 right-20 w-7 h-7 text-yellow-300/30 animate-pulse delay-500" />
      </div>
      
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 rounded-full text-purple-200 text-sm font-medium mb-4 backdrop-blur-lg animate-pulse">
                ✨ Chartered Accountant & Financial Expert
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="text-white animate-fade-in-left">Hello, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-right">
                Nisha
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl animate-fade-in-up delay-300">
              Your trusted partner in <span className="text-purple-300 font-semibold">financial excellence</span>. 
              I help businesses navigate complex financial landscapes with precision, expertise, and innovative solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up delay-500">
              <button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-2xl transform hover:-translate-y-1">
                Explore My Work
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="bg-white/20 backdrop-blur-lg text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3 border border-white/30 hover:scale-105 transform hover:-translate-y-1">
                <Download className="w-6 h-6" />
                Download CV
              </button>
            </div>
            
            {/* Animated Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 animate-fade-in-up delay-700">
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1 counter" data-target="5">5+</div>
                <div className="text-gray-300 text-sm font-medium">Years Experience</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1 counter" data-target="100">100+</div>
                <div className="text-gray-300 text-sm font-medium">Happy Clients</div>
              </div>
              <div className="text-center group hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1 counter" data-target="50">50+</div>
                <div className="text-gray-300 text-sm font-medium">Projects Done</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Professional Profile */}
          <div className="lg:w-1/2 flex justify-center animate-fade-in-right delay-300">
            <div className="relative">
              {/* Glowing background effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Main profile container */}
              <div className="relative bg-gradient-to-r from-purple-500/30 to-pink-500/30 p-8 rounded-full border-4 border-purple-500/50 backdrop-blur-lg hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80"
                  alt="Nisha, Chartered Accountant"
                  className="w-80 h-80 rounded-full object-cover shadow-2xl border-4 border-white/20"
                />
              </div>
              
              {/* Floating achievement badges */}
              <div className="absolute top-5 -right-5 bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-2xl animate-bounce hover:scale-110 transition-transform">
                <div className="text-white text-sm font-bold">CA Qualified</div>
                <div className="text-green-200 text-xs">Since 2019</div>
              </div>
              
              <div className="absolute bottom-5 -left-5 bg-gradient-to-r from-blue-500 to-cyan-500 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-2xl animate-bounce delay-1000 hover:scale-110 transition-transform">
                <div className="text-white text-sm font-bold">Expert in</div>
                <div className="text-blue-200 text-xs">Tax & Audit</div>
              </div>
              
              <div className="absolute top-1/2 -left-10 bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-2xl animate-bounce delay-500 hover:scale-110 transition-transform">
                <div className="text-white text-sm font-bold">Trusted by</div>
                <div className="text-purple-200 text-xs">100+ Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;

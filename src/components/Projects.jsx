import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace (neutral)
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional businesswoman
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Female financial analyst
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional woman working
];

const projects = [
  {
    title: "Financial Audit for Tech Startup",
    description: "Conducted a comprehensive financial audit for a fast-growing tech startup, identifying key areas for cost optimization and ensuring regulatory compliance.",
    client: "TechInnovate Solutions",
    duration: "3 months",
    impact: "15% cost reduction",
    technologies: ["Financial Analysis", "Risk Assessment", "Compliance Review"],
    icon: <TrendingUp className="w-6 h-6" />,
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Tax Compliance for E-commerce Business",
    description: "Managed end-to-end tax compliance for a multi-state e-commerce business, including GST filings and income tax returns.",
    client: "ShopEasy Marketplace",
    duration: "6 months",
    impact: "100% compliance rate",
    technologies: ["GST Management", "Income Tax", "Multi-state Compliance"],
    icon: <CheckCircle className="w-6 h-6" />,
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Business Valuation for Acquisition",
    description: "Performed a detailed business valuation for a mid-sized company, providing crucial insights for a successful acquisition deal.",
    client: "Growth Capital Partners",
    duration: "2 months",
    impact: "$2M valuation accuracy",
    technologies: ["DCF Analysis", "Market Valuation", "Due Diligence"],
    icon: <Award className="w-6 h-6" />,
    color: "from-orange-500 to-red-600"
  }
];

const Projects = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());

  // Rotate background images every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => new Set([...prev, entry.target.dataset.index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden min-h-screen">
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 left-32 w-12 h-12 bg-green-500/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-24 h-24 bg-orange-500/10 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 rounded-full text-blue-300 text-sm font-bold mb-6 backdrop-blur-lg">
            🚀 Portfolio Showcase
          </span>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering exceptional results through strategic financial expertise and innovative solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              data-index={index}
              className={`project-card group bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
                visibleCards.has(String(index)) 
                  ? 'animate-slide-up opacity-100' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: visibleCards.has(String(index)) ? 'translateY(0)' : 'translateY(40px)'
              }}
            >
              {/* Project Header */}
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-full bg-gradient-to-r ${project.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {project.icon}
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>

              {/* Project Content */}
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Project Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-400">
                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Client: {project.client}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2 text-green-400" />
                  <span>Duration: {project.duration}</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-green-300">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span>Impact: {project.impact}</span>
                </div>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white border border-white/30 hover:bg-white/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

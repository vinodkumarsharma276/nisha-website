import { ExternalLink, Calendar, Users, TrendingUp, Shield, DollarSign, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Technology finance
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // City business
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80', // Financial charts
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional meeting
];

interface Project {
  title: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  duration: string;
  teamSize: string;
  industry: string;
  technologies: string[];
  icon: ReactElement;
}

const projects: Project[] = [
  {
    title: "Financial Audit for Tech Startup",
    description: "Conducted a comprehensive financial audit for a fast-growing fintech startup, identifying key areas for cost optimization and ensuring regulatory compliance.",
    challenge: "The startup had rapid growth with complex revenue streams and needed to establish robust financial controls for investor confidence.",
    solution: "Implemented a comprehensive audit framework covering revenue recognition, internal controls, and compliance with RBI guidelines.",
    results: ["Identified $2M in cost savings", "Improved financial reporting accuracy by 95%", "Achieved clean audit opinion", "Enhanced investor confidence"],
    duration: "6 months",
    teamSize: "5 members",
    industry: "Financial Technology",
    technologies: ["SAP", "Advanced Excel", "Power BI", "Tally"],
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    title: "Tax Compliance for E-commerce Business",
    description: "Managed end-to-end tax compliance for a multi-state e-commerce business, including GST filings, income tax returns, and strategic tax planning.",
    challenge: "Complex multi-state operations with varying tax obligations across different jurisdictions and product categories.",
    solution: "Developed automated compliance workflows and implemented a centralized tax management system.",
    results: ["100% on-time filing record", "30% reduction in tax liability", "Zero compliance notices", "Streamlined operations across 15 states"],
    duration: "Ongoing (2+ years)",
    teamSize: "8 members",
    industry: "E-commerce",
    technologies: ["GST Portal", "Income Tax Portal", "Zoho Books", "Custom Tax Software"],
    icon: <Shield className="w-8 h-8" />
  },
  {
    title: "Business Valuation for Acquisition",
    description: "Performed a detailed business valuation for a mid-sized manufacturing company, providing crucial insights for a successful acquisition deal worth $50M.",
    challenge: "Complex asset structure with multiple subsidiaries and international operations requiring detailed due diligence.",
    solution: "Applied multiple valuation methodologies including DCF, comparable analysis, and asset-based approaches.",
    results: ["Successful $50M acquisition", "Identified hidden value worth $8M", "Risk mitigation strategies", "Post-acquisition integration plan"],
    duration: "4 months",
    teamSize: "12 members",
    industry: "Manufacturing",
    technologies: ["Financial Modeling", "Bloomberg Terminal", "FactSet", "Excel VBA"],
    icon: <DollarSign className="w-8 h-8" />
  },
  {
    title: "Financial Restructuring & Recovery",
    description: "Led financial restructuring for a distressed retail chain, developing recovery strategies and negotiating with creditors to avoid bankruptcy.",
    challenge: "Company facing bankruptcy with high debt levels and declining revenues due to market disruption.",
    solution: "Comprehensive restructuring plan including debt renegotiation, operational improvements, and strategic partnerships.",
    results: ["Avoided bankruptcy", "Reduced debt by 40%", "Returned to profitability within 18 months", "Preserved 500+ jobs"],
    duration: "8 months",
    teamSize: "15 members",
    industry: "Retail",
    technologies: ["Financial Modeling", "Scenario Analysis", "Cash Flow Management", "ERP Systems"],
    icon: <BarChart3 className="w-8 h-8" />
  }
];

const Projects = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Rotate background images every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="projects" 
      className="py-20 relative overflow-hidden min-h-screen"
    >
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <TrendingUp className="absolute top-32 left-16 w-16 h-16 text-blue-300/20 animate-float" />
        <BarChart3 className="absolute top-20 right-20 w-12 h-12 text-green-300/20 animate-float delay-700" />
        <DollarSign className="absolute bottom-32 left-24 w-14 h-14 text-purple-300/20 animate-float delay-1000" />
        <Shield className="absolute bottom-40 right-16 w-10 h-10 text-pink-300/20 animate-float delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-full text-purple-300 text-sm font-bold mb-6 backdrop-blur-lg">
            🚀 Portfolio Showcase
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent animate-fade-in-up delay-300">
            Featured Projects
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500">
            Explore some of my most impactful work in financial consulting, auditing, and business transformation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 animate-fade-in-up delay-700">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 group card-hover shadow-2xl hover:shadow-3xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Project Info */}
                <div className="lg:col-span-2">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mr-6 text-white shadow-lg">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-purple-300 font-bold text-lg">{project.industry}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Challenge & Solution */}
                  <div className="space-y-6 mb-8">
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mr-3"></div>
                        Challenge
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-purple-300 mb-3 flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-3"></div>
                        Solution
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <h4 className="text-lg font-bold text-purple-300 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                      Key Results
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-center text-gray-300 bg-white/5 rounded-xl p-3 border border-white/10">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm font-medium">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Project Details */}
                <div className="space-y-6">
                  {/* Project Stats */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                    <h4 className="text-lg font-bold text-white mb-6">Project Details</h4>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-300 bg-white/5 rounded-xl p-3">
                        <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                        <div>
                          <span className="text-xs text-gray-400 block">Duration</span>
                          <span className="text-sm font-bold text-white">{project.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-300 bg-white/5 rounded-xl p-3">
                        <Users className="w-5 h-5 mr-3 text-purple-400" />
                        <div>
                          <span className="text-xs text-gray-400 block">Team Size</span>
                          <span className="text-sm font-bold text-white">{project.teamSize}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                    <h4 className="text-lg font-bold text-white mb-6">Tools & Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-2 bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-bold hover:from-purple-500/50 hover:to-pink-500/50 transition-all cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-lg hover:shadow-xl hover:scale-105">
                    View Case Study
                    <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in-up delay-1000">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Let's discuss how I can help optimize your financial operations and drive growth.
            </p>
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

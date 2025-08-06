import React, { useState, useEffect } from 'react';
import { ExternalLink, Users, Calendar, Award, Building, Calculator, FileText, Shield, TrendingUp } from 'lucide-react';

const projects = [
  {
    title: "Corporate Tax Optimization for Manufacturing Company",
    description: "Comprehensive tax planning and restructuring for a mid-size manufacturing company, resulting in 30% reduction in tax liability while maintaining full compliance.",
    icon: Building,
    category: "Corporate Tax",
    duration: "6 months",
    clientSize: "Mid-size Enterprise",
    results: ["30% tax reduction", "Full compliance maintained", "Optimized cash flow"],
    year: "2024"
  },
  {
    title: "GST Implementation for E-commerce Business",
    description: "End-to-end GST setup and compliance management for a growing e-commerce platform, including system integration and staff training.",
    icon: Calculator,
    category: "GST Services",
    duration: "4 months",
    clientSize: "Growing Business",
    results: ["Seamless GST compliance", "Automated filing system", "Staff training completed"],
    year: "2023"
  },
  {
    title: "Startup Registration & Compliance Setup",
    description: "Complete incorporation process for a tech startup including company registration, compliance framework setup, and ongoing advisory services.",
    icon: TrendingUp,
    category: "Company Registration",
    duration: "2 months",
    clientSize: "Startup",
    results: ["Company incorporation", "Compliance framework", "Ongoing advisory"],
    year: "2023"
  },
  {
    title: "Financial Audit for Educational Institution",
    description: "Comprehensive financial audit and internal control assessment for a private educational institution with multiple campuses.",
    icon: Shield,
    category: "Audit Services",
    duration: "3 months",
    clientSize: "Large Institution",
    results: ["Clean audit report", "Improved controls", "Risk mitigation"],
    year: "2024"
  },
  {
    title: "Tax Planning for High Net Worth Individual",
    description: "Personal tax optimization and wealth structuring for an HNI client, including investment planning and succession planning advisory.",
    icon: FileText,
    category: "Personal Tax",
    duration: "Ongoing",
    clientSize: "Individual",
    results: ["Optimized tax structure", "Wealth preservation", "Succession planning"],
    year: "2023-24"
  },
  {
    title: "Multi-state Business Compliance Management",
    description: "Comprehensive compliance management for a business operating across multiple states, ensuring adherence to varying regulatory requirements.",
    icon: Award,
    category: "Compliance",
    duration: "12 months",
    clientSize: "Multi-location Business",
    results: ["Multi-state compliance", "Centralized management", "Cost optimization"],
    year: "2024"
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Corporate Tax', 'GST Services', 'Company Registration', 'Audit Services', 'Personal Tax', 'Compliance'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Corporate Tax':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'GST Services':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Company Registration':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      case 'Audit Services':
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
      case 'Personal Tax':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      case 'Compliance':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            <span>Client Success Stories</span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Recent Projects & Case Studies
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore real-world examples of how professional CA services have helped businesses achieve their financial and compliance objectives.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`mb-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-slate-800 text-white shadow-md'
                    : 'bg-gray-100 text-slate-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group bg-gray-50 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                    <project.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-700 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-slate-600">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    <span className="font-medium">{project.duration}</span>
                    <span className="mx-2">•</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="w-4 h-4 mr-2 text-slate-500" />
                    {project.clientSize}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Key Results:</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 bg-white text-slate-700 font-medium rounded-lg border border-gray-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>View Case Study</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-slate-800 text-white p-8 rounded-xl">
            <Award className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Success Story?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your specific requirements and create a customized solution that delivers measurable results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 bg-white text-slate-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                <span>View All Case Studies</span>
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center justify-center space-x-2 bg-slate-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors duration-300 border border-slate-600">
                <span>Start Your Project</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

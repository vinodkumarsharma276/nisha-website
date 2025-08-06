import React, { useState, useEffect } from 'react';
import { ExternalLink, Users, Calendar, Award, Building, Calculator, FileText, Shield, TrendingUp, Star, CheckCircle, Clock, Target, Zap, BarChart3 } from 'lucide-react';

const projects = [
  {
    title: "Corporate Tax Optimization for Manufacturing Company",
    description: "Comprehensive tax planning and restructuring for a mid-size manufacturing company, resulting in 30% reduction in tax liability while maintaining full compliance.",
    icon: Building,
    category: "Corporate Tax",
    duration: "6 months",
    clientSize: "Mid-size Enterprise",
    results: ["30% tax reduction", "Full compliance maintained", "Optimized cash flow"],
    year: "2024",
    status: "Completed",
    impact: "₹15L+ Annual Savings",
    complexity: "High",
    satisfaction: 5
  },
  {
    title: "GST Implementation for E-commerce Business",
    description: "End-to-end GST setup and compliance management for a growing e-commerce platform, including system integration and staff training.",
    icon: Calculator,
    category: "GST Services",
    duration: "4 months",
    clientSize: "Growing Business",
    results: ["Seamless GST compliance", "Automated filing system", "Staff training completed"],
    year: "2023",
    status: "Completed",
    impact: "100% Compliance Rate",
    complexity: "Medium",
    satisfaction: 5
  },
  {
    title: "Startup Registration & Compliance Setup",
    description: "Complete incorporation process for a tech startup including company registration, compliance framework setup, and ongoing advisory services.",
    icon: TrendingUp,
    category: "Company Registration",
    duration: "2 months",
    clientSize: "Startup",
    results: ["Company incorporation", "Compliance framework", "Ongoing advisory"],
    year: "2023",
    status: "Completed",
    impact: "Business Launch Ready",
    complexity: "Low",
    satisfaction: 5
  },
  {
    title: "Financial Audit for Educational Institution",
    description: "Comprehensive financial audit and internal control assessment for a private educational institution with multiple campuses.",
    icon: Shield,
    category: "Audit Services",
    duration: "3 months",
    clientSize: "Large Institution",
    results: ["Clean audit report", "Improved controls", "Risk mitigation"],
    year: "2024",
    status: "Completed",
    impact: "Zero Compliance Issues",
    complexity: "High",
    satisfaction: 5
  },
  {
    title: "Tax Planning for High Net Worth Individual",
    description: "Personal tax optimization and wealth structuring for an HNI client, including investment planning and succession planning advisory.",
    icon: FileText,
    category: "Personal Tax",
    duration: "Ongoing",
    clientSize: "Individual",
    results: ["Optimized tax structure", "Wealth preservation", "Succession planning"],
    year: "2023-24",
    status: "Ongoing",
    impact: "₹8L+ Tax Savings",
    complexity: "High",
    satisfaction: 5
  },
  {
    title: "Multi-state Business Compliance Management",
    description: "Comprehensive compliance management for a business operating across multiple states, ensuring adherence to varying regulatory requirements.",
    icon: Award,
    category: "Compliance",
    duration: "12 months",
    clientSize: "Multi-location Business",
    results: ["Multi-state compliance", "Centralized management", "Cost optimization"],
    year: "2024",
    status: "Completed",
    impact: "40% Cost Reduction",
    complexity: "High",
    satisfaction: 5
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

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Ongoing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section with enhanced design */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-gray-200 rounded-full blur opacity-75"></div>
            <div className="relative inline-flex items-center space-x-2 bg-white text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-gray-200 shadow-sm">
              <Award className="w-4 h-4" />
              <span>Client Success Stories</span>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold text-slate-800 mb-6 mt-8">
            Recent Projects &{' '}
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Case Studies
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Explore real-world examples of how professional CA services have helped businesses achieve their 
            <span className="font-semibold text-slate-800"> financial and compliance objectives</span> with measurable results.
          </p>
          
          {/* Stats Row */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <BarChart3 className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">₹50L+</div>
              <div className="text-sm text-slate-600">Total Savings Generated</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Target className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">100%</div>
              <div className="text-sm text-slate-600">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
              <Zap className="w-8 h-8 text-slate-700 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800">24hrs</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </div>
          </div>
        </div>

        {/* Enhanced Category Filter */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-slate-800 text-white shadow-lg scale-105'
                      : 'bg-transparent text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white text-slate-800 rounded-full text-xs font-bold">
                      {category === 'All' ? projects.length : projects.filter(p => p.category === category).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl border border-gray-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Project Header */}
              <div className="relative p-8 border-b border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-gray-200 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                    <div className="relative p-4 rounded-xl bg-slate-50 border border-slate-200 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                      <project.icon className="w-8 h-8 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getComplexityColor(project.complexity)}`}>
                      {project.complexity} Complexity
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-slate-900 transition-colors leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact Badge */}
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2 mb-4">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">{project.impact}</span>
                </div>
              </div>

              {/* Project Details */}
              <div className="relative p-8">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                      <span className="font-medium">{project.duration}</span>
                    </div>
                    <span className="text-slate-500">{project.year}</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <Users className="w-4 h-4 mr-2 text-slate-500" />
                    {project.clientSize}
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(project.satisfaction)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-xs text-slate-500 ml-2">Client Satisfaction</span>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-slate-800 mb-4 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    Key Results:
                  </h4>
                  <ul className="space-y-3">
                    {project.results.map((result, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-600">
                        <div className="w-2 h-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full mr-3 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-semibold rounded-xl hover:from-slate-900 hover:to-black transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                  <span>View Detailed Case Study</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center mt-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-12 rounded-3xl shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 translate-y-16"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-ping"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-4xl font-bold mb-4">Ready to Start Your Success Story?</h3>
              <p className="text-slate-300 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Join the growing list of satisfied clients who have achieved their financial objectives with professional CA services. 
                Let's discuss your specific requirements and create a customized solution that delivers 
                <span className="text-white font-semibold"> measurable results</span> for your business.
              </p>
              
              {/* Enhanced CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group inline-flex items-center justify-center space-x-3 bg-white text-slate-800 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span>View All Case Studies</span>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="group inline-flex items-center justify-center space-x-3 bg-transparent text-white px-10 py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Start Your Project</span>
                </button>
              </div>
              
              {/* Quick stats */}
              <div className="grid md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                  <div className="text-slate-300 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">&lt;24hrs</div>
                  <div className="text-slate-300 text-sm">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">₹50L+</div>
                  <div className="text-slate-300 text-sm">Client Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

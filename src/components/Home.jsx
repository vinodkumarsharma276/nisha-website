import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, Users, CheckCircle, FileText, Calculator, Shield } from 'lucide-react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to scroll to specific sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { icon: FileText, label: 'ITR Filing' },
    { icon: Calculator, label: 'Tax Audit' },
    { icon: Shield, label: 'GST Services' },
    { icon: Award, label: 'Company Registration' }
  ];

  const achievements = [
    { icon: Award, count: '5+', label: 'Years Experience' },
    { icon: Users, count: '200+', label: 'Happy Clients' },
    { icon: CheckCircle, count: '98%', label: 'Success Rate' }
  ];

  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center pt-20">
      {/* Enhanced Background with subtle patterns and colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400/70 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400/50 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(59,130,246) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-full blur opacity-75"></div>
                <div className="relative inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-blue-100/50 shadow-sm">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Chartered Accountant</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Hello, I'm</span>
                <span className="block bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent mt-2">CA Nisha</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                Your trusted partner in <span className="text-blue-700 font-semibold bg-blue-50/50 px-2 py-1 rounded">financial excellence</span>. 
                I help businesses navigate complex financial landscapes with precision and expertise.
              </p>
            </div>

            {/* Key Services Preview with enhanced cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Specialized Services</h3>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden flex items-center space-x-3 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100/50 hover:border-blue-200/70 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {/* Subtle gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/30 transition-all duration-300"></div>
                    <div className="relative p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                      <service.icon className="w-5 h-5 text-blue-700 group-hover:text-blue-800 transition-colors duration-300" />
                    </div>
                    <span className="relative text-slate-700 font-medium group-hover:text-slate-800 transition-colors duration-300">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>View Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="group inline-flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm text-slate-800 px-8 py-4 rounded-xl font-semibold border-2 border-blue-200/50 hover:border-blue-300/70 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>Get Consultation</span>
              </button>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-100/50">
              {achievements.map((achievement, index) => (
                <div key={index} className="group text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100/50 hover:border-blue-200/70 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/50 rounded-xl mx-auto mb-3 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    <achievement.icon className="w-6 h-6 text-blue-700 group-hover:text-blue-800 transition-colors duration-300" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">{achievement.count}</div>
                  <div className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Right Content - Professional Image */}
          <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Enhanced professional background pattern with colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 to-indigo-100/60 rounded-3xl transform rotate-3 shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100/70 to-cyan-100/50 rounded-3xl transform -rotate-3 shadow-lg"></div>
              
              {/* Main content area with enhanced styling */}
              <div className="relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl border border-blue-100/50 shadow-2xl">
                <div className="text-center space-y-8">
                  {/* Enhanced Professional Avatar */}
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/50 to-indigo-200/50 rounded-full blur animate-pulse"></div>
                    <div className="relative w-36 h-36 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-xl">
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-blue-700" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">Professional Excellence</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Delivering comprehensive financial solutions with <span className="text-blue-700 font-semibold">integrity</span>, 
                      <span className="text-indigo-700 font-semibold"> expertise</span>, and personalized service.
                    </p>
                    
                    {/* Enhanced professional credentials */}
                    <div className="space-y-4">
                      {[
                        'Chartered Accountant (CA) Certified',
                        '5+ Years Professional Experience', 
                        '200+ Satisfied Clients'
                      ].map((credential, index) => (
                        <div key={index} className="flex items-center space-x-3 text-sm p-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/30 rounded-lg border border-blue-100/30">
                          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <span className="text-slate-700 font-medium">{credential}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 rounded-full opacity-70 animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-cyan-200/40 to-blue-200/30 rounded-full opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/4 -right-3 w-3 h-3 bg-blue-400/60 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/4 -left-3 w-2 h-2 bg-indigo-400/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Enhanced bottom section with professional trust indicators */}
        <div className={`mt-24 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-blue-100/50 shadow-xl">
            {/* Subtle animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-indigo-50/20"></div>
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 right-1/3 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent mb-6">
                Why Choose Professional CA Services?
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { icon: Shield, title: '100% Compliance', desc: 'Ensuring full regulatory compliance', color: 'blue' },
                  { icon: Award, title: 'Expert Guidance', desc: 'Professional advice you can trust', color: 'indigo' },
                  { icon: CheckCircle, title: 'Timely Service', desc: 'Quick turnaround guaranteed', color: 'cyan' }
                ].map((item, index) => (
                  <div key={index} className="group space-y-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-blue-100/50 hover:border-blue-200/70 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 border border-${item.color}-100/50 rounded-2xl group-hover:from-${item.color}-100 group-hover:to-${item.color}-150 transition-all duration-300`}>
                      <item.icon className={`w-8 h-8 text-${item.color}-700 group-hover:text-${item.color}-800 transition-colors duration-300`} />
                    </div>
                    <h4 className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

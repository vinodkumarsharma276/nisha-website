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
    <section id="home" className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                <span>Chartered Accountant</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-800 leading-tight">
                Hello, I'm
                <span className="block text-slate-700 mt-2">CA Nisha</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                Your trusted partner in <span className="text-slate-800 font-semibold">financial excellence</span>. 
                I help businesses navigate complex financial landscapes with precision and expertise.
              </p>
            </div>

            {/* Key Services Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Specialized Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                  >
                    <service.icon className="w-5 h-5 text-slate-700" />
                    <span className="text-slate-700 font-medium">{service.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center justify-center space-x-2 bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-900 transition-all duration-300 transform hover:scale-105"
              >
                <span>View Services</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center space-x-2 bg-white text-slate-800 px-8 py-4 rounded-lg font-semibold border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                <span>Get Consultation</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mx-auto mb-2">
                    <achievement.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">{achievement.count}</div>
                  <div className="text-sm text-slate-600">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Professional Image */}
          <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="relative">
              {/* Professional background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl transform rotate-3"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-2xl transform -rotate-3"></div>
              
              {/* Main content area */}
              <div className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
                <div className="text-center space-y-6">
                  {/* Professional Avatar Placeholder */}
                  <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto flex items-center justify-center">
                    <div className="w-24 h-24 bg-slate-300 rounded-full flex items-center justify-center">
                      <Users className="w-12 h-12 text-slate-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Professional Excellence</h3>
                    <p className="text-slate-600">
                      Delivering comprehensive financial solutions with integrity, expertise, and personalized service.
                    </p>
                    
                    {/* Professional credentials */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Chartered Accountant (CA) Certified</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>5+ Years Professional Experience</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-slate-700">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>200+ Satisfied Clients</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-slate-100 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-slate-200 rounded-full opacity-40"></div>
          </div>
        </div>

        {/* Bottom section with professional trust indicators */}
        <div className={`mt-20 text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Why Choose Professional CA Services?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-slate-700 mx-auto" />
                <h4 className="font-semibold text-slate-800">100% Compliance</h4>
                <p className="text-sm text-slate-600">Ensuring full regulatory compliance</p>
              </div>
              <div className="space-y-2">
                <Award className="w-8 h-8 text-slate-700 mx-auto" />
                <h4 className="font-semibold text-slate-800">Expert Guidance</h4>
                <p className="text-sm text-slate-600">Professional advice you can trust</p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="w-8 h-8 text-slate-700 mx-auto" />
                <h4 className="font-semibold text-slate-800">Timely Service</h4>
                <p className="text-sm text-slate-600">Quick turnaround guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

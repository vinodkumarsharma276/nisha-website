import React, { useState, useEffect } from 'react';
import { FileText, Shield, Receipt, Building, CheckCircle, ArrowRight, Star, Users, Clock, Award } from 'lucide-react';

const services = [
  {
    id: 'itr',
    title: 'Income Tax Return (ITR)',
    description: 'Comprehensive ITR filing services for individuals and businesses with expert guidance and maximum refund optimization.',
    icon: FileText,
    features: [
      'Individual & Business ITR Filing',
      'Tax Planning & Optimization',
      'Refund Processing Support',
      'Assessment & Appeals'
    ],
    price: 'Starting from ₹1,500',
    duration: '2-3 business days',
    delay: '0s'
  },
  {
    id: 'tax-audit',
    title: 'Tax Audit',
    description: 'Professional tax audit services ensuring compliance with regulatory requirements and identifying optimization opportunities.',
    icon: Shield,
    features: [
      'Statutory Tax Audits',
      'Internal Tax Reviews',
      'Compliance Assessment',
      'Risk Management'
    ],
    price: 'Starting from ₹15,000',
    duration: '1-2 weeks',
    delay: '0.2s'
  },
  {
    id: 'gst-filing',
    title: 'GST Filing',
    description: 'End-to-end GST compliance services including registration, return filing, and ongoing support for seamless operations.',
    icon: Receipt,
    features: [
      'GST Registration & Setup',
      'Monthly/Quarterly Returns',
      'Input Tax Credit Optimization',
      'GST Compliance Management'
    ],
    price: 'Starting from ₹2,500/month',
    duration: 'Ongoing support',
    delay: '0.4s'
  },
  {
    id: 'company-registration',
    title: 'Company Registration',
    description: 'Complete company incorporation services with legal compliance, documentation, and post-registration support.',
    icon: Building,
    features: [
      'Private Limited Company Setup',
      'LLP & Partnership Registration',
      'Documentation & Compliance',
      'Post-Registration Support'
    ],
    price: 'Starting from ₹8,000',
    duration: '7-10 business days',
    delay: '0.6s'
  }
];

const whyChooseUs = [
  { icon: Award, title: 'Expert CA Professional', description: '5+ years of experience' },
  { icon: Users, title: '200+ Satisfied Clients', description: 'Trusted by businesses' },
  { icon: Clock, title: 'Quick Turnaround', description: 'Fast & reliable service' },
  { icon: CheckCircle, title: '100% Compliance', description: 'Error-free filing' }
];

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(services.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('services');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Infinite auto-play carousel with proper looping
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= services.length * 2 - 1) {
          return services.length;
        }
        return prev + 1;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle seamless loop transition
  useEffect(() => {
    if (currentSlide >= services.length * 3) {
      setTimeout(() => {
        setCurrentSlide(services.length);
      }, 50);
    }
    else if (currentSlide < 0) {
      setTimeout(() => {
        setCurrentSlide(services.length * 2 - 1);
      }, 50);
    }
  }, [currentSlide]);

  const handleGetStarted = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index + services.length);
  };

  const getTransform = () => {
    const cardWidth = 100 / 2.2;
    return `translateX(-${currentSlide * cardWidth}%)`;
  };

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Enhanced Background with subtle patterns and colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30"></div>
      
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-emerald-100/30 to-teal-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-br from-teal-100/25 to-cyan-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-emerald-400/60 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-teal-400/70 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16,185,129) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-200/50 to-teal-200/50 rounded-full blur opacity-75"></div>
            <div className="relative inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-slate-700 px-6 py-3 rounded-full text-sm font-medium border border-emerald-100/50 shadow-sm">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Professional Services</span>
            </div>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 mt-8">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Professional</span>{' '}
            <span className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive financial and compliance services tailored to meet your business needs with 
            <span className="text-emerald-700 font-semibold bg-emerald-50/50 px-2 py-1 rounded mx-1">expertise</span> 
            and 
            <span className="text-teal-700 font-semibold bg-teal-50/50 px-2 py-1 rounded mx-1">precision</span>.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative mb-16">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-1000 ease-in-out"
              style={{ 
                transform: getTransform(),
                transitionDuration: currentSlide >= services.length * 3 || currentSlide < 0 ? '0ms' : '1000ms'
              }}
            >
              {[...services, ...services, ...services].map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / 2.2}%` }}
                  >
                    <div className={`group relative overflow-hidden bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-100/50 hover:border-emerald-200/70 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                      isVisible ? 'animate-slide-up' : 'opacity-0'
                    } h-96`}>
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-teal-50/0 group-hover:from-emerald-50/30 group-hover:to-teal-50/20 transition-all duration-500 rounded-2xl"></div>

                      {/* Service Header */}
                      <div className="relative flex items-center space-x-4 mb-6">
                        <div className="relative">
                          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-200/50 to-teal-200/50 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
                          <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all duration-300">
                            <service.icon className="w-6 h-6 text-emerald-700 group-hover:text-emerald-800 transition-colors duration-300" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-300">{service.title}</h3>
                          <p className="text-sm text-slate-600 line-clamp-2 group-hover:text-slate-700 transition-colors duration-300">{service.description}</p>
                        </div>
                      </div>                      {/* Enhanced Features List */}
                      <div className="relative mb-6">
                        <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center group-hover:text-slate-900 transition-colors duration-300">
                          <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 group-hover:text-emerald-700 transition-colors duration-300" />
                          Key Features
                        </h4>
                        <ul className="space-y-3">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                              <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mr-3 flex-shrink-0 group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-300"></div>
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                          {service.features.length > 3 && (
                            <li className="text-sm text-emerald-600 ml-5 font-medium group-hover:text-emerald-700 transition-colors duration-300">+{service.features.length - 3} more features</li>
                          )}
                        </ul>
                      </div>

                      {/* Enhanced Service Details */}
                      <div className="relative grid grid-cols-2 gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-br from-emerald-50/50 to-teal-50/30 rounded-lg border border-emerald-100/30 group-hover:from-emerald-50 group-hover:to-teal-50 transition-all duration-300">
                          <p className="text-xs text-emerald-600 mb-1 font-medium">Starting Price</p>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">{service.price}</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-teal-50/50 to-cyan-50/30 rounded-lg border border-teal-100/30 group-hover:from-teal-50 group-hover:to-cyan-50 transition-all duration-300">
                          <p className="text-xs text-teal-600 mb-1 font-medium">Turnaround</p>
                          <p className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">{service.duration}</p>
                        </div>
                      </div>

                      {/* Enhanced CTA Button */}
                      <button
                        onClick={handleGetStarted}
                        className="relative w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg hover:shadow-xl group/btn"
                      >
                        <span>Get Started</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Pagination Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-4 h-4 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  (currentSlide % services.length) === index 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 scale-110 shadow-lg' 
                    : 'bg-emerald-200 hover:bg-emerald-300'
                }`}
                title={services[index].title}
              >
                {(currentSlide % services.length) === index && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-ping opacity-75"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Service Names Below Dots */}
          <div className="flex justify-center mt-4">
            <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-100/50 shadow-sm">
              <span className="text-sm text-slate-600">Currently Viewing:</span>
              <span className="font-semibold text-emerald-700 ml-2 bg-emerald-50/50 px-3 py-1 rounded-lg">
                {services[(currentSlide % services.length)].title}
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Why Choose Us Section */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent">Why Choose</span>{' '}
            <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">Our Services?</span>
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Experience the difference with our professional approach and commitment to excellence.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const colors = ['emerald', 'teal', 'cyan', 'blue'];
              const color = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className="group text-center p-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-emerald-100/50 hover:border-emerald-200/70 hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                >
                  {/* Icon with enhanced styling */}
                  <div className="relative mb-6">
                    <div className={`absolute -inset-2 bg-gradient-to-r from-${color}-200/50 to-${color}-300/50 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500`}></div>
                    <div className={`relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-${color}-50 to-${color}-100 border border-${color}-100/50 rounded-2xl group-hover:from-${color}-100 group-hover:to-${color}-150 transition-all duration-300`}>
                      <item.icon className={`w-8 h-8 text-${color}-700 group-hover:text-${color}-800 transition-colors duration-300`} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors duration-300">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Bottom CTA */}
        <div className={`text-center mt-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white p-12 rounded-3xl shadow-2xl">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/15 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                <ArrowRight className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-4xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-emerald-100 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
                Let's discuss your requirements and provide you with the best financial solutions for your business growth. 
                <span className="text-white font-semibold"> Experience professional excellence</span> with our comprehensive CA services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group inline-flex items-center justify-center space-x-3 bg-white text-emerald-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span>Schedule a Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="group inline-flex items-center justify-center space-x-3 bg-transparent text-white px-10 py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                  <span>View All Services</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

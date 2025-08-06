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
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Professional Services
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Comprehensive financial and compliance services tailored to meet your business needs with expertise and precision.
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
                  <div className={`bg-white p-8 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? 'animate-slide-up' : 'opacity-0'
                  } h-96`}>
                    {/* Service Header */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                        <service.icon className="w-6 h-6 text-slate-700" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                        <p className="text-sm text-slate-600 line-clamp-2">{service.description}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 text-slate-600 mr-2" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-slate-600">
                            <Star className="w-3 h-3 text-slate-400 mr-2 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                        {service.features.length > 3 && (
                          <li className="text-sm text-slate-500 ml-5">+{service.features.length - 3} more features</li>
                        )}
                      </ul>
                    </div>

                    {/* Service Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Starting Price</p>
                        <p className="text-sm font-semibold text-slate-800">{service.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Turnaround</p>
                        <p className="text-sm font-semibold text-slate-800">{service.duration}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={handleGetStarted}
                      className="w-full py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  (currentSlide % services.length) === index 
                    ? 'bg-slate-800 scale-110' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                title={services[index].title}
              />
            ))}
          </div>

          {/* Service Names Below Dots */}
          <div className="flex justify-center mt-3">
            <div className="text-sm text-slate-600 text-center">
              <span className="font-medium text-slate-800">
                {services[(currentSlide % services.length)].title}
              </span>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-3xl font-bold text-slate-800 text-center mb-12">Why Choose Our Services?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-lg mb-4">
                  <item.icon className="w-6 h-6 text-slate-700" />
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Get Started?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Let's discuss your requirements and provide you with the best financial solutions for your business growth.
            </p>
            <button className="inline-flex items-center space-x-2 bg-slate-800 text-white px-8 py-4 rounded-lg font-medium hover:bg-slate-900 transition-colors duration-300">
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

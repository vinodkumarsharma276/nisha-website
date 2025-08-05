import React, { useState, useEffect } from 'react';
import { FileText, Shield, Receipt, Building, CheckCircle, ArrowRight, Star, Users, Clock, Award } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace (neutral)
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional businesswoman
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Female financial analyst
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional woman working
];

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
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
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
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
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
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
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
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
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
  const [currentBg, setCurrentBg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <section id="services" className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBg ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(3px)'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/80 to-slate-900/85"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500/10 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-green-500/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500/10 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive financial and compliance services tailored to meet your business needs with expertise and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: service.delay }}
            >
              {/* Service Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className={`p-4 rounded-xl ${service.bgColor} ${service.borderColor} border-2 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Star className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Details */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 mb-1">Starting Price</p>
                  <p className="text-lg font-semibold text-green-400">{service.price}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400 mb-1">Turnaround Time</p>
                  <p className="text-lg font-semibold text-blue-400">{service.duration}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setSelectedService(service)}
                className={`w-full py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Why Choose Our Services?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Let's discuss your requirements and provide you with the best financial solutions for your business growth.
            </p>
            <button className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300">
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

import { FileText, Shield, Receipt, Building, CheckCircle, ArrowRight, Award, Users, Clock } from 'lucide-react';

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
  }
];

const whyChooseUs = [
  { icon: Award, title: 'Skilled Professional', description: '2+ years of hands-on experience' },
  { icon: Users, title: '200+ Satisfied Clients', description: 'Trusted by businesses across India' },
  { icon: Clock, title: 'Quick Turnaround', description: 'Fast, reliable, and on-time delivery' },
  { icon: CheckCircle, title: '100% Compliance', description: 'Error-free filing every time' }
];

const Services = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-3">What I Offer</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a5f] mb-4">
            Professional Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial and compliance services tailored to meet your business needs with expertise and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#1e3a5f]/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#f0f4f8] rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#1e3a5f] transition-colors">
                <service.icon className="w-6 h-6 text-[#1e3a5f] group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-lg font-semibold text-[#1e3a5f] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>

              <ul className="space-y-2 mb-5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-gray-100 space-y-1 mb-4">
                <p className="text-sm"><span className="text-gray-400">Price:</span> <span className="font-semibold text-[#1e3a5f]">{service.price}</span></p>
                <p className="text-sm"><span className="text-gray-400">Duration:</span> <span className="font-medium text-gray-700">{service.duration}</span></p>
              </div>

              <button
                onClick={scrollToContact}
                className="w-full py-2.5 border border-[#1e3a5f] text-[#1e3a5f] text-sm font-medium rounded-lg hover:bg-[#1e3a5f] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-[#f8fafc] rounded-2xl p-6 sm:p-10 lg:p-14">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1e3a5f] text-center mb-8 sm:mb-10">Why Choose Me?</h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <item.icon className="w-7 h-7 text-[#1e3a5f]" />
                </div>
                <h4 className="font-semibold text-[#1e3a5f] mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

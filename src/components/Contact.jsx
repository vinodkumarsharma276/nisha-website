import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Award, Users, Briefcase, MessageSquare, Star, CheckCircle, Building, Calendar, Globe, Linkedin, Twitter, Facebook, User, FileText } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      content: 'ca.nisha@example.com',
      description: 'Drop me a line anytime',
      delay: '0s'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      description: 'Available Mon-Fri, 9AM-6PM',
      delay: '0.2s'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Mumbai, India',
      description: 'Available for consultations',
      delay: '0.4s'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: '< 24 Hours',
      description: 'Quick response guaranteed',
      delay: '0.6s'
    }
  ];

  const achievements = [
    { icon: Award, text: 'Years of Experience', count: '5+' },
    { icon: Users, text: 'Clients Served', count: '200+' },
    { icon: Briefcase, text: 'Projects Completed', count: '150+' },
    { icon: Star, text: 'Client Satisfaction', count: '98%' }
  ];

  const serviceOptions = [
    'Income Tax Return (ITR)',
    'Tax Audit',
    'GST Filing',
    'Company Registration',
    'Other Services'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('contact');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-br from-green-50/80 via-teal-50/60 to-emerald-50/40">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-teal-400/20 to-emerald-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-gradient-to-br from-green-400/20 to-cyan-400/20 rounded-full animate-float"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-teal-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-200/50 backdrop-blur-sm">
            <MessageSquare className="w-4 h-4" />
            <span>Let's Connect</span>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-800 via-teal-700 to-emerald-800 bg-clip-text text-transparent mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Ready to start your financial journey? Contact me today for professional consultation and expert guidance.
          </p>
        </div>

        {/* Achievements Section */}
        <div className={`mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200/50 hover:border-teal-300/70 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-teal-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <achievement.icon className="w-8 h-8 text-green-600 mx-auto mb-3 relative z-10" />
                <p className="text-2xl font-bold bg-gradient-to-r from-green-700 to-teal-700 bg-clip-text text-transparent relative z-10">{achievement.count}</p>
                <p className="text-sm text-slate-600 relative z-10">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-green-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 to-teal-50/20"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <MessageSquare className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-teal-700 bg-clip-text text-transparent">Send a Message</h3>
              </div>
              
              {submitted ? (
                <div className="text-center py-12 relative z-10">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-slate-600">Thank you for your inquiry. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300/50 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300/50 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300/50 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-green-300/50 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-green-300/50 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none bg-white/70 backdrop-blur-sm"
                      placeholder="Tell me about your requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/25"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Contact Methods */}
            <div className="grid gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 hover:border-teal-300/70 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    isVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: method.delay }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-teal-50/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-100 to-teal-100 border border-green-200/50">
                      <method.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-slate-800 mb-1">{method.title}</h4>
                      <p className="text-lg text-green-700 font-medium">{method.content}</p>
                      <p className="text-sm text-slate-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 to-teal-50/20"></div>
              
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center relative z-10">
                <Calendar className="w-6 h-6 mr-2 text-green-600" />
                Business Hours
              </h4>
              <div className="space-y-3 text-slate-600 relative z-10">
                <div className="flex justify-between items-center py-2 border-b border-green-200/50">
                  <span>Monday - Friday</span>
                  <span className="text-green-600 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200/50">
                  <span>Saturday</span>
                  <span className="text-orange-600 font-medium">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Sunday</span>
                  <span className="text-red-600 font-medium">Closed</span>
                </div>
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 to-teal-50/20"></div>
              
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center relative z-10">
                <Award className="w-6 h-6 mr-2 text-green-600" />
                Professional Credentials
              </h4>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Chartered Accountant (CA)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Certified Tax Professional</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">GST Practitioner</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700">Company Law Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-green-700 to-teal-700 text-white p-8 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-800/20 to-teal-800/20"></div>
            
            <div className="relative z-10">
              <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Let's discuss how I can help you achieve your financial objectives and ensure complete compliance with regulations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center space-x-2 bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </button>
                <button className="inline-flex items-center justify-center space-x-2 bg-green-600/80 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-all duration-300 border border-green-500/50 backdrop-blur-sm">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

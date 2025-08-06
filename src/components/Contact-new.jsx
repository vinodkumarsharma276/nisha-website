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
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
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
                className="text-center p-6 bg-slate-50 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <achievement.icon className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <p className="text-2xl font-bold text-slate-800">{achievement.count}</p>
                <p className="text-sm text-slate-600">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-slate-700 mr-3" />
                <h3 className="text-2xl font-bold text-slate-800">Send a Message</h3>
              </div>
              
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Message Sent Successfully!</h4>
                  <p className="text-slate-600">Thank you for your inquiry. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        Service Interested In
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your requirements..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
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
                  className={`bg-white p-6 rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: method.delay }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-slate-100 border border-slate-200">
                      <method.icon className="w-6 h-6 text-slate-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-slate-800 mb-1">{method.title}</h4>
                      <p className="text-lg text-slate-700 font-medium">{method.content}</p>
                      <p className="text-sm text-slate-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-slate-700" />
                Business Hours
              </h4>
              <div className="space-y-3 text-slate-600">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span>Monday - Friday</span>
                  <span className="text-green-600 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
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
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-slate-700" />
                Professional Credentials
              </h4>
              <div className="space-y-3">
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
          <div className="bg-slate-800 text-white p-8 rounded-xl">
            <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Let's discuss how I can help you achieve your financial objectives and ensure complete compliance with regulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center space-x-2 bg-white text-slate-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </button>
              <button className="inline-flex items-center justify-center space-x-2 bg-slate-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-600 transition-colors duration-300 border border-slate-600">
                <Calendar className="w-5 h-5" />
                <span>Schedule Meeting</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

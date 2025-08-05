import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Award, Users, Briefcase, MessageSquare, Star, CheckCircle, Building, Calendar, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Professional businesswoman
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Female financial analyst
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80', // Modern office (neutral)
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'  // Professional woman working
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      content: 'nisha.ca@example.com',
      description: 'Drop me a line anytime',
      color: 'blue',
      delay: '0s'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      description: 'Available Mon-Fri, 9AM-6PM',
      color: 'green',
      delay: '0.2s'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Mumbai, India',
      description: 'Available for consultations',
      color: 'purple',
      delay: '0.4s'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: '< 24 Hours',
      description: 'Quick response guaranteed',
      color: 'orange',
      delay: '0.6s'
    }
  ];

  const achievements = [
    { icon: Award, text: 'Chartered Accountant', count: '5+ Years' },
    { icon: Users, text: 'Clients Served', count: '200+' },
    { icon: Briefcase, text: 'Projects Completed', count: '150+' },
    { icon: Star, text: 'Client Satisfaction', count: '98%' }
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', color: 'blue' },
    { icon: Twitter, label: 'Twitter', color: 'sky' },
    { icon: Facebook, label: 'Facebook', color: 'indigo' }
  ];

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
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
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
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/80 to-purple-900/90"></div>
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
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to discuss your financial goals? I'm here to help you achieve success.
          </p>
          
          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <achievement.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{achievement.count}</p>
                <p className="text-sm text-gray-300">{achievement.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-2xl">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/30 transition-all duration-300 resize-none"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-6 ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Contact Methods */}
            <div className="grid gap-6">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 ${
                    isVisible ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: method.delay }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-${method.color}-500/20`}>
                      <method.icon className={`w-6 h-6 text-${method.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-1">{method.title}</h4>
                      <p className="text-lg text-blue-300 font-medium">{method.content}</p>
                      <p className="text-sm text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-2 text-blue-400" />
                Connect on Social Media
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`p-3 rounded-xl bg-${social.color}-500/20 hover:bg-${social.color}-500/40 transition-all duration-300 transform hover:scale-110`}
                    aria-label={social.label}
                  >
                    <social.icon className={`w-6 h-6 text-${social.color}-400`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-green-400" />
                Business Hours
              </h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-green-400">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-yellow-400">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2 text-purple-400" />
                Office Location
              </h4>
              <div className="h-48 bg-gray-200/20 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.528026319015!2d77.2167213150821!3d28.6139393824243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d43%3A0x6b358f7d5b4d4b4b!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1620048272502!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how I can help you achieve your financial objectives and drive business growth.
            </p>
            <a
              href="#"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule a Consultation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

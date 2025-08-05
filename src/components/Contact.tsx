import { Send, Mail, Phone, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // City business
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Professional meeting
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', // Office workspace
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2126&q=80', // Financial charts
];

const Contact = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contact" 
      className="py-20 relative overflow-hidden min-h-screen"
    >
      {/* Animated Background Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95)), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <Mail className="absolute top-32 left-16 w-16 h-16 text-blue-300/20 animate-float" />
        <Phone className="absolute top-20 right-20 w-12 h-12 text-green-300/20 animate-float delay-700" />
        <MapPin className="absolute bottom-32 left-24 w-14 h-14 text-purple-300/20 animate-float delay-1000" />
        <MessageCircle className="absolute bottom-40 right-16 w-10 h-10 text-pink-300/20 animate-float delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-full text-purple-300 text-sm font-bold mb-6 backdrop-blur-lg">
            📞 Get In Touch
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-300 to-white bg-clip-text text-transparent animate-fade-in-up delay-300">
            Let's Work Together
          </h2>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500">
            Ready to take your business to the next level? Let's discuss how I can help you achieve your financial goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 animate-fade-in-up delay-700">
          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl card-hover">
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mr-4 shadow-lg">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Send a Message</h3>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 animate-fade-in-up">
                <div className="p-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-xl">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h4>
                <p className="text-gray-300 text-lg">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="animate-fade-in-left delay-800">
                    <label htmlFor="name" className="block text-white font-bold mb-3 text-lg">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/15 text-lg backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="animate-fade-in-right delay-800">
                    <label htmlFor="email" className="block text-white font-bold mb-3 text-lg">
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/15 text-lg backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div className="animate-fade-in-up delay-900">
                  <label htmlFor="subject" className="block text-white font-bold mb-3 text-lg">
                    Subject *
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-white/15 text-lg backdrop-blur-sm"
                    placeholder="What would you like to discuss?"
                  />
                </div>
                
                <div className="animate-fade-in-up delay-1000">
                  <label htmlFor="message" className="block text-white font-bold mb-3 text-lg">
                    Message *
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none hover:bg-white/15 text-lg backdrop-blur-sm"
                    placeholder="Tell me more about your requirements..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-5 rounded-2xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-xl text-lg animate-fade-in-up delay-1100"
                >
                  <Send className="w-6 h-6" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">Email</p>
                    <p className="text-white">nisha.ca@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">Phone</p>
                    <p className="text-white">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">Location</p>
                    <p className="text-white">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mr-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-purple-300 font-medium">Business Hours</p>
                    <p className="text-white">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-300 text-sm">Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Services */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Services Available</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Financial Auditing',
                  'Tax Planning',
                  'GST Compliance',
                  'Business Valuation',
                  'Financial Consulting',
                  'Risk Assessment'
                ].map((service, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></div>
                    <span className="text-gray-300 text-sm">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Office Location</h3>
              <div className="h-64 bg-gray-700 rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.9478819294495!2d72.82553631534476!3d19.011461087102523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ced2e8c9b7ab%3A0x15b30397e2ffc5c3!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620048272502!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(1) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

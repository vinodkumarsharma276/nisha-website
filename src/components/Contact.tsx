import { Send, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-[#1e3a5f]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Ready to take your business to the next level? Let's discuss how I can help you achieve your financial goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-[#1e3a5f] mb-6">Send a Message</h3>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-[#1e3a5f] mb-2">Message Sent!</h4>
                <p className="text-gray-500">I'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors"
                    placeholder="How can I help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] transition-colors resize-none"
                    placeholder="Tell me about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1e3a5f] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#16304d] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#c8a951]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white">nishashrm75@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#c8a951]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">Mayur Vihar Phase-3, Delhi</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#c8a951]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Business Hours</p>
                    <p className="text-white">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-400 text-sm">Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Services Available</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Financial Auditing',
                  'Tax Planning',
                  'GST Compliance',
                  'Business Valuation',
                  'Financial Consulting',
                  'Risk Assessment'
                ].map((service, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-[#c8a951] rounded-full mr-2"></span>
                    {service}
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

export default Contact;

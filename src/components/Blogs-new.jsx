import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye, BookOpen, PenTool, FileText, User } from 'lucide-react';

const blogs = [
  {
    title: "GST Updates 2024: What Businesses Need to Know",
    excerpt: "A comprehensive overview of the latest changes and updates in the Goods and Services Tax regulations for the year 2024, including new compliance requirements.",
    content: "The Goods and Services Tax (GST) landscape in India continues to evolve, with 2024 bringing several significant updates that businesses must be aware of. This comprehensive guide covers all the major changes, new compliance requirements, and their impact on different business sectors. From updated return filing procedures to new exemption categories, we'll explore how these changes affect your business operations and what steps you need to take to ensure continued compliance. Additionally, we'll discuss the technological improvements in the GST portal and how they can streamline your tax processes.",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Tax Law",
    views: "2.5k"
  },
  {
    title: "Tax Planning Strategies for Small Businesses",
    excerpt: "Effective strategies for small businesses to optimize their tax planning and ensure compliance while maximizing savings through legal deductions.",
    content: "Small businesses face unique challenges when it comes to tax planning. This detailed guide provides practical strategies that can help small business owners reduce their tax burden legally while maintaining full compliance. We'll cover various deduction opportunities, timing strategies for income and expenses, retirement planning benefits, and how to structure your business for optimal tax efficiency. Learn about Section 44AD benefits, depreciation strategies, and how to leverage various government schemes designed specifically for small businesses.",
    date: "February 28, 2024",
    readTime: "12 min read",
    category: "Business Finance",
    views: "3.1k"
  },
  {
    title: "Understanding Income Tax Returns: A Complete Guide",
    excerpt: "A beginner's guide to understanding and filing income tax returns in India, covering all forms, deadlines, and common mistakes to avoid.",
    content: "Filing income tax returns can seem daunting, especially for first-time filers. This comprehensive guide breaks down the entire process into manageable steps. We'll cover different ITR forms and when to use them, how to gather necessary documents, step-by-step filing procedures, and common mistakes that can lead to notices from the tax department. Additionally, we'll discuss e-verification methods, how to track your refund status, and what to do if you need to file a revised return. Special attention is given to new taxpayers and those switching between old and new tax regimes.",
    date: "January 20, 2024",
    readTime: "10 min read",
    category: "Personal Finance",
    views: "4.2k"
  }
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('blogs');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Tax Law':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Business Finance':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'Personal Finance':
        return 'bg-stone-100 text-stone-700 border-stone-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="blogs" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Financial Insights</span>
          </div>
          
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Latest Blogs & Articles
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Stay updated with the latest insights on taxation, business finance, and regulatory changes that impact your business.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className={`group bg-white rounded-xl border border-gray-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedBlog(blog)}
            >
              {/* Blog Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                  <div className="flex items-center text-xs text-slate-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {blog.views}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-700 transition-colors leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                  {blog.excerpt}
                </p>
              </div>

              {/* Blog Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {blog.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {blog.readTime}
                  </div>
                </div>
                
                <button className="group/btn flex items-center text-slate-700 font-medium text-sm hover:text-slate-800 transition-all duration-300">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedBlog(null)}>
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(selectedBlog.category)}`}>
                    {selectedBlog.category}
                  </span>
                  <div className="flex items-center text-xs text-slate-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {selectedBlog.views}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-4 leading-tight">
                  {selectedBlog.title}
                </h2>
                
                <div className="flex items-center space-x-6 text-sm text-slate-600 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    CA Nisha
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedBlog.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {selectedBlog.readTime}
                  </div>
                </div>
                
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed font-medium">
                    {selectedBlog.excerpt}
                  </p>
                  
                  <div className="text-slate-600 leading-relaxed space-y-4">
                    {selectedBlog.content.split('. ').map((sentence, index) => (
                      <p key={index} className="mb-4">
                        {sentence}{index < selectedBlog.content.split('. ').length - 1 ? '.' : ''}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Professional Assistance?</h3>
                  <p className="text-slate-600 mb-4">
                    Get expert guidance on your specific requirements. Contact me for personalized consultation.
                  </p>
                  <button className="inline-flex items-center space-x-2 bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors duration-300">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Section */}
        <div className={`text-center mt-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Want More Insights?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Subscribe to get the latest updates on tax regulations, business finance tips, and compliance requirements directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
              <button className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-900 transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

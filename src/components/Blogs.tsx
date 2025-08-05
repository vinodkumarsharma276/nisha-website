import { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye, BookOpen, PenTool, FileText } from 'lucide-react';

interface Blog {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  views: string;
}

const blogs: Blog[] = [
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
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <section 
      id="blogs" 
      className="py-20 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.95)), url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <BookOpen className="absolute top-20 left-10 w-12 h-12 text-purple-200/40 animate-float" />
        <PenTool className="absolute top-40 right-20 w-8 h-8 text-blue-200/40 animate-float delay-500" />
        <FileText className="absolute bottom-40 left-20 w-10 h-10 text-green-200/40 animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-full text-purple-700 text-sm font-bold mb-6 backdrop-blur-lg">
            📚 Knowledge Hub
          </span>
          <h2 className="text-4xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-purple-600 to-gray-800 bg-clip-text text-transparent animate-fade-in-up delay-300">
            Latest Insights & Articles
          </h2>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-500">
            Stay updated with the latest trends, regulations, and best practices in accounting, taxation, and financial management.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-700">
          {blogs.map((blog, index) => (
            <article 
              key={index} 
              className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group card-hover border border-white/50"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Category Badge */}
              <div className="p-8 pb-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs font-bold shadow-lg">
                    {blog.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-xs font-medium">
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.views}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-gray-800 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                  {blog.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-6 font-medium">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    {blog.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    {blog.readTime}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="group/btn flex items-center text-purple-600 font-bold text-sm hover:text-purple-700 transition-all duration-300 hover:scale-105"
                >
                  Read Full Article
                  <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in-up">
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-purple-200">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 p-8 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-bold">
                    {selectedBlog.category}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm font-medium">
                    <Calendar className="w-5 h-5 mr-2 text-purple-500" />
                    {selectedBlog.date}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm font-medium">
                    <Clock className="w-5 h-5 mr-2 text-purple-500" />
                    {selectedBlog.readTime}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors hover:scale-110"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="p-8">
                <h3 className="text-4xl font-bold mb-8 text-gray-800 leading-tight">
                  {selectedBlog.title}
                </h3>
                <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed">
                  {selectedBlog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-6 text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;

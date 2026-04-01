import { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye, ExternalLink } from 'lucide-react';

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

const categoryColors: Record<string, string> = {
  'Tax Law': 'bg-blue-50 text-blue-700',
  'Business Finance': 'bg-emerald-50 text-emerald-700',
  'Personal Finance': 'bg-amber-50 text-amber-700',
};

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <section id="blogs" className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#c8a951] font-semibold text-sm tracking-widest uppercase mb-3">Insights</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e3a5f] mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends, regulations, and best practices in accounting, taxation, and financial management.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[blog.category] || 'bg-gray-100 text-gray-700'}`}>
                    {blog.category}
                  </span>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    {blog.views}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-[#1e3a5f] mb-3 line-clamp-2 hover:text-[#2a5a8f] transition-colors">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {blog.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {blog.readTime}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="flex items-center text-[#1e3a5f] font-medium text-sm hover:text-[#c8a951] transition-colors group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Medium CTA Banner */}
        <a
          href="https://medium.com/@nishashrm75"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 flex items-center justify-between bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 hover:border-[#1e3a5f] hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Medium "M" logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1e3a5f] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl sm:text-2xl">M</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1e3a5f] mb-1">Read more on Medium</h3>
              <p className="text-sm text-gray-500">Follow me for in-depth articles on taxation, finance & compliance</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#1e3a5f] font-semibold group-hover:text-[#c8a951] transition-colors">
            <span>Visit</span>
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </a>

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[selectedBlog.category] || 'bg-gray-100 text-gray-700'}`}>
                    {selectedBlog.category}
                  </span>
                  <span className="text-sm text-gray-400">{selectedBlog.date}</span>
                  <span className="text-sm text-gray-400">{selectedBlog.readTime}</span>
                </div>
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1e3a5f] mb-6">
                  {selectedBlog.title}
                </h3>
                <div className="text-gray-600 leading-relaxed text-base">
                  {selectedBlog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
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

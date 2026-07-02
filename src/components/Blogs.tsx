import { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogs, type Blog, categoryColors } from '../data/blogs';

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <section id="insights" className="py-20 bg-[#f8fafc]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Thought Leadership</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0f172a] mb-4">
            Practical Insights for Businesses &amp; Individuals
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            I write regularly about GST, income tax, compliance, and smart financial practices that actually help Indian businesses and professionals.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover flex flex-col"
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

                <h3 className="text-lg font-semibold text-[#0f172a] mb-3 line-clamp-2 hover:text-[#0e7490] transition-colors">
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
                  className="flex items-center text-[#0f172a] font-medium text-sm hover:text-[#0e7490] transition-colors group"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Medium CTA Banner - Primary content destination */}
        <a
          href="https://medium.com/@nishashrm75"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white to-[#f8fafc] border-2 border-[#0f172a]/10 hover:border-[#0f172a] rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0f172a] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl sm:text-2xl">M</span>
            </div>
            <div>
              <div className="font-semibold text-[#0f172a]">Read my full library on Medium</div>
              <p className="text-sm text-gray-600">In-depth guides on GST, tax planning, ITR, compliance &amp; more — updated regularly.</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 font-semibold text-[#0f172a] group-hover:text-[#0e7490] transition-colors whitespace-nowrap">
            Visit Medium
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>

        {/* Link to full dedicated Blog page */}
        <div className="text-center mt-4">
          <Link 
            to="/blog" 
            className="text-sm font-medium text-[#0f172a] hover:text-[#0e7490] inline-flex items-center gap-1 transition-colors"
          >
            Browse all articles on the dedicated Blog page <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

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
                <h3 className="text-2xl lg:text-3xl font-bold text-[#0f172a] mb-6">
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

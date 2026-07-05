import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { type Blog } from '../lib/supabase';
import { fetchBlogs } from '../lib/blogs';
import { categoryColors } from '../data/blogs';

const BlogTeaser = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs().then((all) => setBlogs(all.slice(0, 3)));
  }, []);

  return (
    <section className="py-16 bg-[#f1f5f9]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Insights</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-4">Read my latest thoughts</h2>
          <p className="text-gray-600 max-w-md mx-auto">Practical articles on tax, GST, compliance and more.</p>
        </div>

        {blogs.length > 0 && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {blogs.map((blog, index) => (
              <Link
                key={index}
                to="/blog"
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover flex flex-col group"
              >
                <div className="p-6 flex flex-col flex-1">
                  <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold mb-4 ${categoryColors[blog.category] || 'bg-gray-100 text-gray-700'}`}>
                    {blog.category}
                  </span>

                  <h3 className="text-lg font-semibold text-[#0f172a] mb-3 line-clamp-2 group-hover:text-[#0e7490] transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      {blog.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {blog.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#16304d] transition"
          >
            Show more articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;

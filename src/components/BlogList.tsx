import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase, type Blog } from '../lib/supabase';
import { blogs as staticBlogs, categoryColors } from '../data/blogs';

const BlogList = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [blogList, setBlogList] = useState<Blog[]>(staticBlogs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!supabase) {
        setBlogList(staticBlogs as Blog[]);
        return;
      }
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('date', { ascending: false });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Assume DB uses camelCase or adjust here. Map if your columns use snake_case.
          const mapped = (data as any[]).map((b) => ({
            ...b,
            readTime: b.readTime || b.read_time || '5 min read',
          })) as Blog[];
          setBlogList(mapped);
        } else {
          setBlogList(staticBlogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs from Supabase, using static data', err);
        setBlogList(staticBlogs as Blog[]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0f172a] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>

          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Insights &amp; Articles</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] mb-4">
            Blogs by Nisha
          </h1>
          <p className="text-gray-600 text-lg">
            Practical guides on GST, tax planning, compliance, and financial management for Indian businesses and professionals.
          </p>
        </div>

        {/* Blog Grid - Full List */}
        {loading && <div className="text-center py-8 text-gray-500">Loading blogs from backend...</div>}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogList.map((blog, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden card-hover flex flex-col group cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
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

                <h3 className="text-lg font-semibold text-[#0f172a] mb-3 line-clamp-2 group-hover:text-[#0e7490] transition-colors">
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

                <div className="flex items-center text-[#0f172a] font-medium text-sm group-hover:text-[#0e7490] transition-colors">
                  Read full article
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Modal (reused pattern) */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
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
              <div className="text-gray-600 leading-relaxed text-base prose">
                {selectedBlog.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
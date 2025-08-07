import { useState } from 'react';
import { Calendar, Clock, ArrowRight, X, Eye } from 'lucide-react';

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
    excerpt: "Key Goods and Services Tax changes and compliance considerations for 2024.",
    content: "The GST landscape continues to evolve...",
    date: "Mar 15, 2024",
    readTime: "8 min",
    category: "Tax Law",
    views: "2.5k"
  },
  {
    title: "Tax Planning Strategies for Small Businesses",
    excerpt: "Practical, compliant strategies to reduce tax burden and improve cash flow.",
    content: "Small businesses face unique challenges...",
    date: "Feb 28, 2024",
    readTime: "12 min",
    category: "Business Finance",
    views: "3.1k"
  },
  {
    title: "Understanding Income Tax Returns: A Complete Guide",
    excerpt: "Step-by-step ITR overview including forms, timelines and common pitfalls.",
    content: "Filing income tax returns can seem daunting...",
    date: "Jan 20, 2024",
    readTime: "10 min",
    category: "Personal Finance",
    views: "4.2k"
  }
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  return (
    <section 
      id="blogs" 
      className="py-24 bg-[linear-gradient(to_bottom,rgba(var(--ca-bg),1),rgba(var(--ca-bg-alt),.7))] relative"
    >
      <div className="absolute inset-0 ca-grid-bg opacity-[0.04]" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-heading text-slate-900 mb-4">Latest Insights</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Concise, practitioner-focused commentary on taxation and financial governance.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(b => (
            <article key={b.title} className="card p-6 rounded-xl flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-medium tracking-wide text-accent bg-accent-soft px-2 py-1 rounded">
                  {b.category}
                </span>
                <div className="flex items-center text-[11px] text-slate-500">
                  <Eye className="w-3.5 h-3.5 mr-1" />
                  {b.views}
                </div>
              </div>
              
              <h3 className="font-semibold text-slate-800 mb-2 leading-snug line-clamp-2">
                {b.title}
              </h3>
              
              <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {b.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-4">
                <div className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-accent" />
                  {b.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-accent" />
                  {b.readTime}
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedBlog(b)}
                className="mt-auto text-accent text-sm font-medium inline-flex items-center hover:underline"
              >
                Read Article 
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </article>
          ))}
        </div>

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <div className="card max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl relative">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="absolute top-3 right-3 text-slate-500 hover:text-accent"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="text-[11px] font-medium tracking-wide text-accent bg-accent-soft px-2 py-1 rounded">
                    {selectedBlog.category}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-accent" />
                    {selectedBlog.date}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-accent" />
                    {selectedBlog.readTime}
                  </span>
                </div>
                
                <h3 className="text-2xl font-semibold text-slate-900 mb-6 leading-snug">
                  {selectedBlog.title}
                </h3>
                
                <div className="prose prose-sm max-w-none text-slate-600">
                  {selectedBlog.content.split('\n').map((p, i) => (
                    <p key={i}>{p}</p>
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

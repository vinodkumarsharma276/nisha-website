import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { type Blog } from '../lib/supabase';
import { fetchBlogs } from '../lib/blogs';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const BlogTeaser = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetchBlogs().then((all) => setBlogs(all.slice(0, 3)));
  }, []);

  return (
    <section id="insights" className="bg-sand/60 border-y border-line py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="Blog"
            title={
              <>
                Tax, explained in <em>plain English.</em>
              </>
            }
            intro="Practical articles on income tax, GST and compliance — written for people who'd rather not read the Act."
          />
          <Reveal delay={200}>
            <Link to="/blog" className="btn-ghost shrink-0">
              View all blogs <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        {blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
            {blogs.map((blog, index) => (
              <Reveal key={blog.title} delay={index * 110}>
                <Link
                  to="/blog"
                  className="lift group h-full flex flex-col rounded-3xl bg-white border border-line p-7 lg:p-8 hover:border-ink/25"
                >
                  <div className="flex items-center justify-between text-xs text-ink-soft">
                    <span className="font-semibold uppercase tracking-[0.14em] text-accent">{blog.category}</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[26px] leading-[1.15] text-ink line-clamp-3 group-hover:text-accent transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-ink-soft leading-relaxed line-clamp-3 flex-1">{blog.excerpt}</p>
                  <div className="mt-8 pt-5 border-t border-line flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-ink-soft">
                      <Clock className="w-3.5 h-3.5" /> {blog.readTime}
                    </span>
                    <span className="w-10 h-10 rounded-full border border-ink/15 flex items-center justify-center text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-paper group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogTeaser;

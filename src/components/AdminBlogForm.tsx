import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapLink from '@tiptap/extension-link';
import { supabase, type Blog } from '../lib/supabase';
import { categoryColors } from '../data/blogs';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  views: string;
}

const AdminBlogForm: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    category: 'Tax Law',
    views: '0',
  });
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [existingBlogs, setExistingBlogs] = useState<Blog[]>([]);
  const [view, setView] = useState<'list' | 'form'>('list');

  // Rich text editor (TipTap)
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TipTapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#0e7490] underline hover:text-[#0f172a]',
        },
      }),
    ],
    content: formData.content || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setFormData((prev) => ({ ...prev, content: html }));
    },
  });

  // Sync editor when formData.content is reset from outside (e.g. after submit).
  // Guard against the editor not being ready yet / destroyed (e.g. on route change),
  // where getHTML() would throw because the schema/view isn't initialized.
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    try {
      if (formData.content !== editor.getHTML()) {
        editor.commands.setContent(formData.content || '<p></p>');
      }
    } catch {
      // Editor view not ready yet; the initial `content` config already applies.
    }
  }, [formData.content, editor]);

  // Check for an existing Supabase auth session on mount + subscribe to changes
  useEffect(() => {
    if (!supabase) {
      setAuthChecked(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
      setAuthChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!supabase) {
      setLoginError('Blog backend is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setIsLoggingIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoggingIn(false);

    if (error) {
      setLoginError(error.message || 'Invalid email or password');
      return;
    }

    setIsAuthenticated(true);
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setView('list');
    setEditingId(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: 'Tax Law',
      views: '0',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Load the admin's existing articles (from Supabase) whenever authenticated
  const loadExisting = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    setExistingBlogs((data as Blog[]) ?? []);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadExisting();
    }
  }, [isAuthenticated]);

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id ?? null);
    setFormData({
      title: blog.title || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      date: blog.date || '',
      readTime: blog.readTime || '5 min read',
      category: blog.category || 'Tax Law',
      views: blog.views || '0',
    });
    setSubmitStatus('');
    setView('form');
  };

  const openAddForm = () => {
    cancelEdit();
    setView('form');
  };

  const backToList = () => {
    cancelEdit();
    setView('list');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: 'Tax Law',
      views: '0',
    });
    setSubmitStatus('');
  };

  const handleDelete = async (id?: number) => {
    if (!supabase || id == null) return;
    if (!window.confirm('Delete this article? This cannot be undone.')) return;
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      setSubmitStatus(`Error deleting: ${error.message}`);
      return;
    }
    if (editingId === id) cancelEdit();
    loadExisting();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('');
    setIsSubmitting(true);

    if (!supabase) {
      setSubmitStatus('Error: Blog backend is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
      setIsSubmitting(false);
      return;
    }

    // Ensure we still have a valid Supabase session (JWT) before writing
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      setSubmitStatus('Session expired. Please log in again.');
      setIsAuthenticated(false);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Supabase (match column names)
      const blogData = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: formData.date,
        readTime: formData.readTime,
        category: formData.category,
        views: formData.views,
      };

      if (editingId != null) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingId);
        if (error) throw error;
        setSubmitStatus('Blog updated successfully!');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);
        if (error) throw error;
        setSubmitStatus('Blog added successfully!');
      }

      // Reset form + refresh the article list
      setEditingId(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 min read',
        category: 'Tax Law',
        views: '0',
      });
      loadExisting();
      setView('list');

    } catch (error) {
      console.error('Error saving blog:', error);
      const message = error instanceof Error ? error.message : 'Failed to save blog.';
      setSubmitStatus(`Error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Admin Login</h1>

          {!supabase && (
            <p className="mb-4 p-3 rounded-lg bg-amber-50 text-amber-700 text-sm">
              Blog backend is not configured. Set <code>VITE_SUPABASE_URL</code> and{' '}
              <code>VITE_SUPABASE_ANON_KEY</code> to enable login.
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                autoComplete="current-password"
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={isLoggingIn || !supabase}
              className="w-full bg-[#0e7490] text-white py-3 rounded-lg font-medium hover:bg-[#0e7490] transition disabled:opacity-60"
            >
              {isLoggingIn ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Sign in with your Supabase admin account.
          </p>
          <div className="mt-4 text-center">
            <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</RouterLink>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'list') {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16">
        <div className="container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#0f172a]">Manage Articles</h1>
              <p className="text-sm text-gray-500 mt-1">
                {existingBlogs.length} article{existingBlogs.length === 1 ? '' : 's'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={openAddForm}
                className="bg-[#0e7490] text-white px-5 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
              >
                + Add New Blog
              </button>
              <RouterLink to="/meadminmessages" className="text-sm text-[#0e7490] hover:underline">Messages</RouterLink>
              <button onClick={handleLogout} className="text-sm text-red-600 hover:underline">Logout</button>
            </div>
          </div>

          {submitStatus && !submitStatus.includes('Error') && (
            <div className="mb-6 p-4 rounded-lg text-sm bg-green-50 text-green-700">{submitStatus}</div>
          )}

          {existingBlogs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-500">
              No articles yet. Click “Add New Blog” to create your first one.
            </div>
          ) : (
            <div className="space-y-3">
              {existingBlogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[blog.category] || 'bg-gray-100 text-gray-700'}`}>
                        {blog.category}
                      </span>
                      <span className="text-xs text-gray-400">{blog.date}</span>
                    </div>
                    <p className="font-semibold text-[#0f172a] truncate">{blog.title}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(blog)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-[#0e7490] hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog.id)}
                      className="px-3 py-1.5 text-sm rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <RouterLink to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</RouterLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5f9] pt-16">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Left: Form Section */}
        <div className="lg:w-1/2 overflow-y-auto p-6 lg:p-10 bg-white border-r border-gray-200">
          <div className="max-w-lg mx-auto">
            <button
              type="button"
              onClick={backToList}
              className="text-sm text-[#0e7490] hover:underline mb-4 inline-flex items-center gap-1"
            >
              ← Back to articles
            </button>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-[#0f172a]">{editingId != null ? 'Edit Blog' : 'Add New Blog'}</h1>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content *</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                  {/* Rich Text Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50 text-sm">
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('bold') ? 'bg-gray-200 font-bold' : ''}`}
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 italic ${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('heading', { level: 2 }) ? 'bg-gray-200 font-semibold' : ''}`}
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('heading', { level: 3 }) ? 'bg-gray-200 font-semibold' : ''}`}
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                      title="Bullet List"
                    >
                      • List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                      title="Numbered List"
                    >
                      1. List
                    </button>
                    <button
                      type="button"
                      onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                      className="px-2 py-1 rounded hover:bg-gray-200"
                      title="Horizontal Rule"
                    >
                      —
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = window.prompt('Enter URL');
                        if (url) {
                          editor?.chain().focus().setLink({ href: url }).run();
                        }
                      }}
                      className={`px-2 py-1 rounded hover:bg-gray-200 ${editor?.isActive('link') ? 'bg-gray-200' : ''}`}
                      title="Add Link"
                    >
                      🔗
                    </button>
                    {editor?.isActive('link') && (
                      <button
                        type="button"
                        onClick={() => editor?.chain().focus().unsetLink().run()}
                        className="px-2 py-1 rounded hover:bg-gray-200 text-red-600"
                        title="Remove Link"
                      >
                        ✕ Link
                      </button>
                    )}
                  </div>

                  {/* Editor */}
                  <div className="p-4 min-h-[220px] prose prose-sm max-w-none focus-within:outline-none">
                    <EditorContent editor={editor} />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Supports bold, italic, headings, lists, etc.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="March 15, 2024"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  >
                    <option value="Tax Law">Tax Law</option>
                    <option value="Business Finance">Business Finance</option>
                    <option value="Personal Finance">Personal Finance</option>
                    <option value="Compliance">Compliance</option>
                    <option value="GST">GST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Views (e.g. 1.2k)</label>
                  <input
                    type="text"
                    name="views"
                    value={formData.views}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0e7490] text-white py-3.5 rounded-lg font-semibold hover:bg-[#0e7490] transition disabled:opacity-60"
              >
                {isSubmitting
                  ? (editingId != null ? 'Updating...' : 'Adding Blog...')
                  : (editingId != null ? 'Update Blog' : 'Add New Blog')}
              </button>

              {submitStatus && (
                <div className={`p-4 rounded-lg text-sm ${submitStatus.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {submitStatus}
                  {!submitStatus.includes('Error') && (
                    <div className="mt-2">
                      <a href="/#/blog" className="underline hover:no-underline" onClick={() => { window.location.href = '/#/blog'; window.location.reload(); }}>Go to blog page (click to refresh & see your new blog)</a>
                    </div>
                  )}
                </div>
              )}
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Authenticated via Supabase Auth. This is a protected admin area.
            </p>
          </div>
        </div>

        {/* Right: Live Preview Section */}
        <div className="lg:w-1/2 overflow-y-auto p-6 lg:p-10 bg-[#f1f5f9]">
          <div className="max-w-2xl mx-auto">
            <div className="text-xs font-semibold text-gray-500 mb-3 tracking-[2px]">LIVE PREVIEW — HOW IT WILL LOOK ON THE BLOG PAGE</div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              {/* Preview metadata */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[formData.category] || 'bg-gray-100 text-gray-700'}`}>
                  {formData.category}
                </span>
                <span className="text-sm text-gray-500">
                  {formData.date} · {formData.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0f172a] mb-6 leading-tight">
                {formData.title || 'Your Blog Title Will Appear Here'}
              </h1>

              {/* Content preview - rendered as rich HTML */}
              <div 
                className="text-gray-700 leading-relaxed text-[15px] prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: formData.content || '<p>Start typing in the form on the left to see a live preview of the blog content here.</p>' 
                }} 
              />
            </div>

            <p className="text-[10px] text-gray-400 mt-3 text-center">
              This preview matches the styling on the public blog page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogForm;
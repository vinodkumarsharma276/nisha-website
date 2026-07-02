import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
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

const HARDCODED_USERNAME = 'admin'; // TODO: Change this
const HARDCODED_PASSWORD = 'admin123'; // TODO: Change this
const JWT_SECRET = 'your-super-secret-jwt-key-change-this'; // TODO: Change this in production

const AdminBlogForm: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
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

  // Simple JWT-like token creation (for demo - not cryptographically secure on client)
  const createToken = (user: string): string => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }));
    // In real app this would be signed on server. Here we simulate.
    const signature = btoa(JWT_SECRET + payload);
    return `${header}.${payload}.${signature}`;
  };

  const verifyToken = (token: string): boolean => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp < Date.now()) {
        localStorage.removeItem('admin_jwt_token');
        return false;
      }
      // Basic signature check (demo only)
      const expectedSig = btoa(JWT_SECRET + parts[1]);
      return parts[2] === expectedSig;
    } catch {
      return false;
    }
  };

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_jwt_token');
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (username === HARDCODED_USERNAME && password === HARDCODED_PASSWORD) {
      const token = createToken(username);
      localStorage.setItem('admin_jwt_token', token);
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_jwt_token');
    setIsAuthenticated(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('');
    setIsSubmitting(true);

    const token = localStorage.getItem('admin_jwt_token');
    if (!token || !verifyToken(token)) {
      setSubmitStatus('Session expired. Please log in again.');
      setIsAuthenticated(false);
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data for Supabase (match column names)
      const blogToInsert = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        date: formData.date,
        readTime: formData.readTime,
        category: formData.category,
        views: formData.views,
      };

      if (supabase) {
        const { error } = await supabase
          .from('blogs')
          .insert([blogToInsert]);

        if (error) {
          throw error;
        }
        setSubmitStatus('Blog added successfully to Supabase! It should appear on the /blog page shortly.');
      } else {
        // Fallback: just show what would be added (for demo without Supabase)
        console.log('Would insert to Supabase:', blogToInsert);
        setSubmitStatus('Blog "added" (demo mode - Supabase not configured). Check console.');
      }

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '5 min read',
        category: 'Tax Law',
        views: '0',
      });

      // Success - no auto navigate since View link removed

    } catch (error: any) {
      console.error('Error adding blog:', error);
      setSubmitStatus(`Error: ${error.message || 'Failed to add blog. Make sure RLS policies allow inserts or use service key for admin.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] pt-16 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow max-w-md w-full">
          <h1 className="text-2xl font-bold text-[#0f172a] mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
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
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full bg-[#0e7490] text-white py-3 rounded-lg font-medium hover:bg-[#0e7490] transition"
            >
              Login
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-4 text-center">
            Default: admin / admin123 (change in code)
          </p>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-[#0e7490] hover:underline">Back to site</Link>
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
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#0f172a]">Add New Blog</h1>
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
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#0e7490]"
                  required
                />
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
                {isSubmitting ? 'Adding Blog...' : 'Add New Blog'}
              </button>

              {submitStatus && (
                <div className={`p-4 rounded-lg text-sm ${submitStatus.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                  {submitStatus}
                </div>
              )}
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Authenticated via JWT (stored in localStorage). This is a protected admin area.
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
              <h1 className="text-3xl lg:text-4xl font-bold text-[#0e7490] mb-6 leading-tight">
                {formData.title || 'Your Blog Title Will Appear Here'}
              </h1>

              {/* Content preview */}
              <div className="text-gray-700 leading-relaxed text-[15px]">
                {(formData.content || 'Start typing in the form on the left to see a live preview of the blog content here. Use line breaks for paragraphs.').split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
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
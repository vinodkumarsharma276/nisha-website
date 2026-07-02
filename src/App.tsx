import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import AdminBlogForm from './components/AdminBlogForm';

function MainContent() {
  return (
    <main>
      <Home />
      <Services />
      <Process />
      <Projects />

      {/* Blog teaser - links to dedicated /blog page */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#0e7490] font-semibold text-sm tracking-widest uppercase mb-3">Insights</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-4">Read my latest thoughts</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Practical articles on tax, GST, compliance and more.</p>
          <Link to="/blog" className="inline-block bg-[#0f172a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#16304d] transition">Visit the Blog</Link>
        </div>
      </section>

      <Testimonials />
      <Experience />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <div className="font-sans overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/meadminblogs" element={<AdminBlogForm />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

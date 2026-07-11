import { Routes, Route } from 'react-router-dom';
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
import BlogTeaser from './components/BlogTeaser';
import AdminBlogForm from './components/AdminBlogForm';
import AdminMessages from './components/AdminMessages';

function MainContent() {
  return (
    <main>
      <Home />
      <Services />
      <Process />
      <Projects />

      {/* Blog teaser - 3 latest posts + link to dedicated /blog page */}
      <BlogTeaser />

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
        <Route path="/meadminmessages" element={<AdminMessages />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

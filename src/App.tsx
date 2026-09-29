import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Process from './components/Process';
import Highlights from './components/Highlights';
import Deadlines from './components/Deadlines';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogTeaser from './components/BlogTeaser';

// Secondary routes are code-split so the home page doesn't ship the rich-text editor.
const BlogList = lazy(() => import('./components/BlogList'));
const AdminBlogForm = lazy(() => import('./components/AdminBlogForm'));
const AdminMessages = lazy(() => import('./components/AdminMessages'));
const AdminDeadlines = lazy(() => import('./components/AdminDeadlines'));

function MainContent() {
  return (
    <main>
      <Home />
      <Highlights />
      <Experience />
      <Services />
      <Process />
      <Deadlines />
      <Testimonials />
      <BlogTeaser />
      <FAQ />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <div className="font-sans overflow-x-clip">
      <Header />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/meadminblogs" element={<AdminBlogForm />} />
          <Route path="/meadminmessages" element={<AdminMessages />} />
          <Route path="/meadmindeadlines" element={<AdminDeadlines />} />
          <Route path="/admin" element={<Navigate to="/meadminblogs" replace />} />
          <Route path="/blogs" element={<Navigate to="/blog" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;

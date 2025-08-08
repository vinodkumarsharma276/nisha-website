import Header from './components/Header.tsx';
import Home from './components/Home.tsx';
import Services from './components/Services.tsx';
import Blogs from './components/Blogs.tsx';
import Projects from './components/Projects.tsx';
import Experience from './components/Experience.tsx';
import Contact from './components/Contact.tsx';

function App() {
  return (
    <div className="font-sans overflow-x-hidden">
      <Header />
      <main>
        <Home />
        <Services />
        <Blogs />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;

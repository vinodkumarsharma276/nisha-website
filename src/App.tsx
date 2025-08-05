import Header from './components/Header';
import Home from './components/Home';
import Services from './components/Services';
import Blogs from './components/Blogs';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

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

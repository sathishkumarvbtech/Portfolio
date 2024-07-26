import { useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Nopage from './components/404Page';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import Projects from './components/Projects';

function App() {


  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      {
        isLoading ? <Preloader /> :
          <HashRouter>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="projects" element={<Projects />} />
                <Route path="experience" element={<Experience />} />
                <Route path="contact" element={<Contact />} />
                <Route path="*" element={<Nopage />} />
              </Route>
            </Routes>
          </HashRouter>
      }
    </div>
  );
}

export default App;

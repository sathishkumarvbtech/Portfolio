import { HashRouter, Route, Routes } from 'react-router-dom';
import Nopage from './404Page';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import Home from './Home';
import Navbar from './Navbar';
import Projects from './Projects';


import React from 'react';

const Layout = () => {
  return (
    <HashRouter>
              <Routes>
                <Route path="/" element={<Navbar/>}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="experience" element={<Experience />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="*" element={<Nopage />} />
                </Route>
              </Routes>
</HashRouter>
  )
}

export default Layout


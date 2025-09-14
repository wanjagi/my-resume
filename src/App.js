import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Profile from './components/Profile';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="App">
      <Nav 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        scrollToSection={scrollToSection}
      />
      <Profile scrollToSection={scrollToSection} />
      <About scrollToSection={scrollToSection} />
      <Experience scrollToSection={scrollToSection} />
      <Projects scrollToSection={scrollToSection} />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;

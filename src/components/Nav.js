import React from 'react';

const Nav = ({ isMenuOpen, toggleMenu, scrollToSection }) => {
  return (
    <>
      <nav id="desktop-nav">
        <div className="logo">FRANCIS WANJAGI GATONYE</div>
        <div>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a></li>
            <li><a href="#work-experience" onClick={(e) => { e.preventDefault(); scrollToSection('work-experience'); }}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
            <li><a href="websites.html">Websites</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </ul>
        </div>
      </nav>
      <nav id="hamburger-nav">
        <div className="logo">FRANCIS GATONYE</div>
        <div className="hamburger-menu">
          <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`menu-links ${isMenuOpen ? 'open' : ''}`}>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>Experience</a></li>
            <li><a href="#work-experience" onClick={(e) => { e.preventDefault(); scrollToSection('work-experience'); }}>Experience</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>Projects</a></li>
            <li><a href="websites.html">Projects</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;

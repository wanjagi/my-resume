import React from 'react';

const Profile = ({ scrollToSection }) => {
  const handleDownloadResume = () => {
    window.open('/assets/Francis_Gatonye_Resume.pdf');
  };

  const handleContactClick = () => {
    scrollToSection('contact');
  };

  const handleLinkedInClick = () => {
    window.open('https://linkedin.com/in/francis-wanjagi-01863518b');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/wanjagi');
  };

  return (
    <section id="profile">
      <div className="section__pic-container">
        <img src="./assets/profile-pic1.JPG" alt="Francis Gatonye" loading="lazy" />
      </div>
      <div className="section__text">
        <p className="section__text__p1">Hello, I'm</p>
        <h1 className="title">FRANCIS GATONYE</h1>
        <p className="section__text__p2">Software Engineer</p>
        <div className="btn-container">
          <button
            className="btn btn-color-2"
            onClick={handleDownloadResume}
          >
            Download Resume
          </button>
          <button className="btn btn-color-1" onClick={handleContactClick}>
            Contact Info
          </button>
        </div>
        <div id="socials-container">
          <img
            src="./assets/linkedin.png"
            alt="My LinkedIn profile"
            className="icon"
            onClick={handleLinkedInClick}
          />
          <img
            src="./assets/github.png"
            alt="My Github profile"
            className="icon"
            onClick={handleGithubClick}
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;

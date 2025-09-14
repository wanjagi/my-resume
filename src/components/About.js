import React from 'react';

const About = ({ scrollToSection }) => {
  const handleArrowClick = () => {
    scrollToSection('experience');
  };

  return (
    <section id="about">
      <p className="section__text__p1">Get To Know More</p>
      <h1 className="title">About Me</h1>
      <div className="section-container">
        <div className="section__pic-container">
          <img
            src="/assets/about-pic1.png"
            alt="Francis Gatonye"
            className="about-pic"
            loading="lazy"
          />
        </div>
        <div className="about-details-container">
          <div className="about-containers">
            <div className="details-container">
              <img
                src="/assets/education.png"
                alt="Education icon"
                className="icon"
              />
              <h3>Education</h3>
              <p>Jomo Kenyatta University of Agriculture and Technology</p>
              <p>B.Sc. Computer Technology</p>
            </div>
          </div>
          <div className="text-container">
            <p>
              Eager and ambitious individual equipped with a strong foundation in software development. 
              Throughout my academic journey, I have honed my skills through hands-on projects, that have helped me grow my skills.
              Committed to learning the latest industry trends, I am excited to transition from academia to the professional realm,
              bringing a blend of technical expertise, creativity, and a proactive mindset. 
              I am open to opportunities that allow me to apply my skills and continue learning in a dynamic environment.
            </p>
          </div>
        </div>
      </div>
      <img
        src="/assets/arrow.png"
        alt="Arrow icon"
        className="icon arrow"
        onClick={handleArrowClick}
      />
    </section>
  );
};

export default About;

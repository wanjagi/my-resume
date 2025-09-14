import React from 'react';

const Experience = ({ scrollToSection }) => {
  const skills = {
    technical: ['HTML', 'CSS', 'Python', 'JavaScript', 'React', 'Django', 'SQL', 'Git', 'PostgreSQL'],
    professional: ['Critical Thinking', 'Problem Solving', 'Leadership', 'Communication Skills']
  };

  const handleArrowClick = () => {
    scrollToSection('projects');
  };

  return (
    <section id="experience">
      <p className="section__text__p1">Explore My</p>
      <h1 className="title">Experience</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          <div className="details-container">
            <h2 className="experience-sub-title">Technical Skills</h2>
            <div className="article-container">
              {skills.technical.map((skill, index) => (
                <article key={index}>
                  <img
                    src="/assets/checkmark.png"
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>{skill}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="details-container">
            <h2 className="experience-sub-title">Professional Skills</h2>
            <div className="article-container">
              {skills.professional.map((skill, index) => (
                <article key={index}>
                  <img
                    src="/assets/checkmark.png"
                    alt="Experience icon"
                    className="icon"
                  />
                  <div>
                    <h3>{skill}</h3>
                  </div>
                </article>
              ))}
            </div>
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

export default Experience;

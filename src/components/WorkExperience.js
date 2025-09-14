import React from 'react';

const WorkExperience = ({ scrollToSection }) => {
  const handleArrowClick = () => {
    scrollToSection('projects');
  };

  const workExperiences = [
    {
      id: 1,
      company: "Tech Company",
      position: "Software Developer Intern",
      duration: "2023 - 2024",
      description: "Developed web applications using React and Django. Collaborated with team members on various projects and gained hands-on experience in full-stack development.",
      technologies: ["React", "Django", "JavaScript", "Python", "PostgreSQL"]
    },
    {
      id: 2,
      company: "Freelance Projects",
      position: "Web Developer",
      duration: "2022 - 2023",
      description: "Worked on various client projects including e-commerce websites and CRM systems. Managed project timelines and client communications.",
      technologies: ["HTML", "CSS", "JavaScript", "Python", "SQL"]
    }
  ];

  return (
    <section id="work-experience">
      <p className="section__text__p1">Explore My</p>
      <h1 className="title">Work Experience</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          {workExperiences.map((experience) => (
            <div key={experience.id} className="details-container">
              <div className="article-container">
                <img
                  src="./assets/company.png"
                  alt="Company icon"
                  className="icon"
                />
                <div>
                  <h3 className="experience-sub-title">{experience.position}</h3>
                  <h4 className="company-name">{experience.company}</h4>
                  <p className="duration">{experience.duration}</p>
                </div>
              </div>
              <div className="experience-description">
                <p>{experience.description}</p>
                <div className="technologies">
                  <h4>Technologies Used:</h4>
                  <div className="tech-tags">
                    {experience.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img
        src="./assets/arrow.png"
        alt="Arrow icon"
        className="icon arrow"
        onClick={handleArrowClick}
      />
    </section>
  );
};

export default WorkExperience;

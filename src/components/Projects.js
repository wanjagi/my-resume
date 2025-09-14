import React from 'react';

const Projects = ({ scrollToSection }) => {
  const handleArrowClick = () => {
    scrollToSection('contact');
  };

  const projects = [
    {
      id: 1,
      title: 'Resume Website',
      image: '/assets/project4.png',
      githubUrl: 'https://github.com/wanjagi/my-resume'
    },
    {
      id: 2,
      title: 'Online Store',
      image: '/assets/project1.png',
      githubUrl: 'https://github.com/wanjagi/ecommerce'
    },
    {
      id: 3,
      title: 'CRM',
      image: '/assets/project2.png',
      githubUrl: 'https://github.com/wanjagi/CRM'
    },
    {
      id: 4,
      title: 'JavaScript Music Player',
      image: '/assets/project3.png',
      githubUrl: 'https://github.com/wanjagi/music-player'
    }
  ];

  const handleGithubClick = (url) => {
    window.open(url);
  };

  return (
    <section id="projects">
      <p className="section__text__p1">Browse My Recent</p>
      <h1 className="title">Projects</h1>
      <div className="experience-details-container">
        <div className="about-containers">
          {projects.map((project) => (
            <div key={project.id} className="details-container color-container">
              <div className="article-container">
                <img
                  src={project.image}
                  alt={`Project ${project.id}`}
                  className="project-img"
                />
              </div>
              <h2 className="experience-sub-title project-title">{project.title}</h2>
              <div className="btn-container">
                <button
                  className="btn btn-color-2 project-btn"
                  onClick={() => handleGithubClick(project.githubUrl)}
                >
                  Github
                </button>
              </div>
            </div>
          ))}
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

export default Projects;

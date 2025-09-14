import React from 'react';

const Contact = () => {
  const handleEmailClick = () => {
    window.open('mailto:franciswanjagi0@gmail.com');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/francis-wanjagi-01863518b');
  };

  return (
    <section id="contact">
      <p className="section__text__p1">Get in Touch</p>
      <h1 className="title">Contact Me</h1>
      <div className="contact-info-upper-container">
        <div className="contact-info-container">
          <img
            src="./assets/phone.png"
            alt="Phone icon"
            className="icon contact-icon"
          />
          <p>0740209632</p>
        </div>
        <div className="contact-info-container">
          <img
            src="./assets/email.png"
            alt="Email icon"
            className="icon contact-icon email-icon"
          />
          <p><a href="mailto:franciswanjagi0@gmail.com" onClick={handleEmailClick}>franciswanjagi0@gmail.com</a></p>
        </div>
        <div className="contact-info-container">
          <img
            src="./assets/linkedin.png"
            alt="LinkedIn icon"
            className="icon contact-icon"
          />
          <p><a href="https://www.linkedin.com/in/francis-wanjagi-01863518b" onClick={handleLinkedInClick}>LinkedIn</a></p>
        </div>
      </div>
    </section>
  );
};

export default Contact;

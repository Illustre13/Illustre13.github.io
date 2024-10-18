import React from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AboutMe: React.FC = () => {
  return (
    <section className="aboutme brand_section" id="ABOUT">
      <h2 className="section-header">About Me</h2>
      <div className="about_holder">
        <div className="aboutme_text">
          <p className="pa_text">
            I am a proactive graduate in BSc of Information Technology in Software Engineering at
            Adventist University of Central Africa (AUCA), with strong ambition to excel academically.
            I possess technical, leadership, and communication skills with fluency in English.
            I am a passionate IT specialist with ambition to give back expected skills that I will acquire during
            my bachelor years to my community, in Information Technology career, or any other related fields.
            I&apos;m always interested in learning something new that can enhance my career as a professional
            in software development &#10024;✨.
          </p>
          <div className="aboutme_buttons">
            <div className="about_cv">
              <div className="about_cv_hire_me">
                <h6>Download My CV</h6>
                <a href="files/CV_new.pdf" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faDownload}  />
                </a>
              </div>
              <div className="about_cv_hire_me">
                <a href="#CONTACTS">
                  <h6>Contact Me</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="aboutme_profile_section">
          <div className="aboutme_profile">
            {/* Profile picture or other content can go here */}
          </div>
        </div>

        <div className="dots_animation">
          {[...Array(4)].map((_, idx) => (
            <div className="section1" key={idx}>
              <div className="diamond">&#9830;</div>
              <div className="diamond">&#9830;</div>
              <div className="diamond">&#9830;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

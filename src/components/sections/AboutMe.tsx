import React from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutMe: React.FC = () => {
  return (
    <section className="aboutme brand_section_b" id="ABOUT">
      <h2 className="section-header">About Me</h2>
      <div className="about_holder">
        <div className="aboutme_text">
          <p className="pa_text">
            {/* 
            I am a proactive graduate in BSc of Information Technology in
            Software Engineering at Adventist University of Central Africa
            (AUCA), with strong ambition to excel academically. I possess
            technical, leadership, and communication skills with fluency in
            English. I am a passionate IT specialist with ambition to give back
            expected skills that I will acquire during my bachelor years to my
            community, in Information Technology career, or any other related
            fields. I&apos;m always interested in learning something new that
            can enhance my career as a professional in software development ✨. 
            */}
            I am a passionate problem solver and innovator driven by the belief that
            technology should create lasting, human-centered impact. I&apos;m
            currently pursuing my <em>Master of Science in Information Technology at</em>
            Carnegie Mellon University Africa, where I focus on blending
            software engineering, data-driven thinking, and creative innovation
            to build solutions that empower people and communities. Over the
            years, I&apos;ve been part of projects that cut across education,
            environmental monitoring, and digital transformation, all inspired
            by a desire to use technology not just for efficiency, but for
            purpose. My experiences have shaped how I think about systems: not
            just as lines of code, but as living ecosystems that can inform,
            connect, and uplift society. I believe in designing with empathy,
            building with intention, and learning without limits. Whether I&apos;m
            working on a community initiative, a research driven project, or a
            new digital experience, I&apos;m guided by curiosity, collaboration, and
            a commitment to meaningful change. Outside the world of technology, 
            <em>I&apos;m deeply inspired by books, philosophy, and music. You&apos;ll often</em>
            find me reading, spending time with family, or reflecting on human
            nature and creativity. I&apos;ve recently started learning guitar,
            exploring how rhythm and sound mirror the patterns of thought and
            innovation. These quiet moments remind me that growth isn&apos;t just
            about building systems, it&apos;s also about understanding ourselves and
            the world we seek to improve ✨.
          </p>
          <div className="aboutme_buttons">
            <div className="about_cv">
              <div className="about_cv_hire_me">
                <h6>Download My CV</h6>
                <a
                  href="/files/CV_new.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faDownload} />
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
          <div className="aboutme_profile">{/* Profile content */}</div>
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

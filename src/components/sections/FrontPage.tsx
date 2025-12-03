import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodepen,
  faGithub,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import WordFlick from "@/components/common/WordFlick";

interface MyExperienceProps {
  value: string;
  description: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

const FrontPageSection: React.FC = () => {
  const [currentProject, setCurrentProject] = useState(0);

  const myOccupation = [
    "Software Engineer.",
    "Full Stack Developer.",
    "Problem Solver.",
    "Tech Innovator.",
    "CMU Africa Graduate Student.",
    "AI Enthusiast.",
    "Data Engineer."
  ];

  const experience: MyExperienceProps[] = [
    { value: "3+", description: "Years of Experience" },
    { value: "10+", description: "Projects Completed" },
    { value: "5+", description: "Tech Stacks" },
    { value: "15+", description: "Certifications" },
    // { value: "2+", description: "Degree" },
  ];

  const featuredProjects: ProjectCardProps[] = [
    {
      title: "P2P Training Scheduling System",
      description: "Developed a cloud-based scheduling platform using Node.js (NestJS) and AWS serverless technologies (Lambda, DynamoDB, Cognito) for Angaza Center.",
      tags: ["NestJS", "AWS Lambda", "DynamoDB"],
      image: "/images/projects/project1.jpg",
      link: "#PORTFOLIO"
    },
    {
      title: "Kubaka Building Permit Platform",
      description: "Optimized workflows for MININFRA's building permit management system, improving efficiency and data integrity across government systems.",
      tags: ["Full Stack", "Database Integration", "Gov Tech"],
      image: "/images/projects/project2.jpg",
      link: "#PORTFOLIO"
    },
    {
      title: "Huza HR SaaS Platform",
      description: "Built performance management features including 1:1 meetings and 360° feedback modules, integrated with CRB data APIs.",
      tags: ["React", "Node.js", "SaaS"],
      image: "/images/projects/project3.jpg",
      link: "#PORTFOLIO"
    },
  ];

  const socialLinks = [
    { href: "https://github.com/Illustre13", icon: faGithub, label: "GitHub" },
    { href: "https://codepen.io/Illustre13/", icon: faCodepen, label: "CodePen" },
    { href: "mailto:ndahayosibertin17@gmail.com", icon: faEnvelope, label: "Email" },
    { href: "https://linkedin.com/in/ndahayo-s-bertin", icon: faLinkedinIn, label: "LinkedIn" },
    { href: "https://x.com/illustre_b", icon: faXTwitter, label: "Twitter" },
    { href: "tel:+250786949188", icon: faPhone, label: "Phone" },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section className="front-page brand_section" id="front">
      <div className="front-page-grid">
        {/* Left Section - Hero Content */}
        <div className="hero-section">
          <div className="hero">
            <p className="hero-greeting">Hi, My Name Is</p>
            <h1 className="hero-name">
              Bertin <br /> NDAHAYO SINGIZWA
            </h1>
            <div className="hero-title">
              <span>I am a </span>
              <WordFlick words={myOccupation} speed={80} pauseDuration={1500} />
            </div>
          </div>

          <div className="hero-actions">
            <div className="action-buttons">
              <Link href="/files/bertin_ndahayo_cv.pdf" className="btn-primary" download>
                <span>Download CV</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
              <Link href="#CONTACTS" className="btn-secondary">
                <span>Contact Me</span>
              </Link>
            </div>

            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="social-icon"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Stats and Projects */}
        <div className="right-section">
          {/* Experience Stats */}
          <div className="experience-stats">
            {experience.map((item, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{item.value}</span>
                <span className="stat-label">{item.description}</span>
              </div>
            ))}
          </div>

          {/* Featured Projects Carousel - Compact */}
          <div className="projects-section">
            <div className="project-card-container">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className={`project-card_fp ${index === currentProject ? 'active' : ''}`}
                  style={{
                    transform: `translateX(${(index - currentProject) * 100}%)`,
                    opacity: index === currentProject ? 1 : 0,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div className="project-content_fp">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                      ))}
                    </div>
                    <Link href={project.link} className="read-more">
                      Read More <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </div>
              ))}  
            </div>
            <div className="projects-header">
              {/* <h3>Featured Work</h3> */}
              <div className="carousel-controls">
                <button onClick={prevProject} className="carousel-btn" aria-label="Previous project">
                  ‹
                </button>
                <span className="carousel-indicator">
                  {currentProject + 1} / {featuredProjects.length}
                </span>
                <button onClick={nextProject} className="carousel-btn" aria-label="Next project">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPageSection;

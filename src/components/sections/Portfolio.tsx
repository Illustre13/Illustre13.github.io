import React, { useState } from "react";
// import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faExternalLinkAlt,
  faCode,
  faFlask,
  faChartBar,
  faDatabase,
  faBrain,
  faLightbulb,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";

type Category =
  | "All"
  | "Research"
  | "Full Stack"
  | "Data Analysis"
  | "Data Engineering"
  | "ML/DL"
  | "Ideation";

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: string;
  liveLink?: string;
  githubLink?: string;
  publicationLink?: string;
}

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const projects: Project[] = [
    {
      id: 1,
      title: "GeoSolar Vision [WIP]",
      description:
        "A GIS-based solar energy potential assessment platform for Kigali, Rwanda, using Google Earth Engine (GEE) and deep learning to identify optimal solar sites and support smart grid planning.",
      category: "Research",
      image: "/images/geosolar.png",
      // githubLink: "https://github.com/Illustre13/GeoSolar-Vision",
    },
    {
      id: 2,
      title: "Angaza P2P Training Scheduler",
      description:
        "A serverless web platform using AWS Lambda, DynamoDB, and NestJS for real-time peer-to-peer training coordination across schools under Angaza Center.",
      category: "Full Stack",
      image: "/images/angaza.png",
      githubLink: "https://github.com/Angaza-Center/angaza-p2p",
    },
    {
      id: 3,
      title: "Air Quality Monitoring System",
      description:
        "Co-authored a research-driven platform for real-time air quality monitoring using IoT sensor data. Designed the data ingestion pipeline, implemented statistical models, and visualized pollution trends to support urban planning. Findings were published in IEEE Xplore: 'Mapping Socioeconomic Air Quality Disparities In Rwanda Using Sentinel-5P TROPOMI Data In Google Earth Engine'.",
      category: "Research",
      image: "/images/air-quality.png",
      publicationLink: "https://ieeexplore.ieee.org/document/11232033",
    },
    {
      id: 4,
      title: "Guraride MIS",
      description:
        "A management information system built with Spring Boot and Thymeleaf to streamline bike rental operations in Kigali City.",
      category: "Full Stack",
      image: "/images/guraride.png",
      githubLink: "https://github.com/Illustre13/Guraride_MIS",
    },
    {
      id: 5,
      title: "E-Ranga",
      description:
        "A .NET-based lost-and-found platform that connects users who find or lose important documents, improving retrieval efficiency across Rwanda.",
      category: "Full Stack",
      image: "/images/e-ranga.png",
      githubLink: "https://github.com/Illustre13/E_ranga",
    },
    {
      id: 6,
      title: "Capacity Development Management System for Public Institutions in Rwanda",
      description:
        "Case Study: Rwanda Development Board (RDB). A final year project presented in partial fulfillment of the requirements for the Bachelor’s Degree in Information Technology, majoring in Software Engineering. Developed a system to streamline capacity development processes, improve reporting, and enhance institutional efficiency.",
      category: "Full Stack",
      image: "/images/capacity-development.png",
      githubLink: "https://github.com/Illustre13/cdms_fn"
    },
    {
      id: 7,
      title: "Kubaka Building Permit Management System",
      description:
        "A digital government platform developed under MININFRA to streamline permit applications, improve transparency, and optimize data flow across agencies.",
      category: "Full Stack",
      image: "/images/kubaka.png",
    },
    {
      id: 8,
      title: "INKINGI Claim Platform [WIP]",
      description:
        "An AI-powered disaster insurance and real-time incident reporting platform for citizens, insurers, and emergency services across Africa.",
      category: "Ideation",
      image: "/images/inkingi.png",
    },
    {
      id: 9,
      title: "RISA Keycloak SSO Solution",
      description:
        "As part of my Master’s practicum, worked in a team to design and implement a Keycloak-based SSO solution for RISA, enabling secure authentication, role-based access, and seamless integration with multiple applications to improve system security and user management.",
      category: "Full Stack",
      image: "/images/risa-keycloak.png",
      githubLink: "https://github.com/RISA-SSO",
    },
  ];

  const categories: { name: Category; icon: typeof faCode }[] = [
    { name: "All", icon: faCode },
    { name: "Research", icon: faFlask },
    { name: "Full Stack", icon: faCode },
    { name: "Data Analysis", icon: faChartBar },
    { name: "Data Engineering", icon: faDatabase },
    { name: "ML/DL", icon: faBrain },
    { name: "Ideation", icon: faLightbulb },
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="portfolio brand_section" id="PORTFOLIO">
      <h2 className="section-header">My Work</h2>
      <div className="portfolio-container">
        <p className="portfolio-subtitle">
          Showcasing my work and projects worked on recently...
        </p>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-tab ${
                activeCategory === cat.name ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.name)}
            >
              <FontAwesomeIcon icon={cat.icon} className="tab-icon" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-content">
                <div className="project-category-badge">{project.category}</div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {(project.githubLink ||
                  project.liveLink ||
                  project.publicationLink) && (
                  <div className="project-links">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View on GitHub"
                      >
                        <FontAwesomeIcon icon={faGithub} />
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View live project"
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.publicationLink && (
                      <a
                        href={project.publicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label="View Publication"
                      >
                        <FontAwesomeIcon icon={faFileAlt} />
                        <span>Publication</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects">
            <p>Adding more projects soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;

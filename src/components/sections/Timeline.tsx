import React from 'react';
import Image from 'next/image';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  shortOrg: string;
  description: string;
  logo: string;
  logoAlt: string;
  date: string;
  location: string;
  position: 'left' | 'right';
}

const Timeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      id: 1,
      title: 'Software Engineer',
      organization: 'Angaza Center',
      shortOrg: 'Angaza',
      description: 'Developed and deployed a P2P Training Scheduling System using Node.js (NestJS) and AWS serverless technologies (Lambda, DynamoDB, Cognito). Streamlined coordination between trainers and schools through automated scheduling and collaborative dashboards.',
      logo: '/images/logos/angaza_002.png',
      logoAlt: 'Angaza Center Logo',
      date: 'June 2024 - Now',
      location: 'USA, Lincolnshire (Remote)',
      position: 'right',
    },
    {
      id: 2,
      title: 'Geospatial Data Annotator',
      organization: 'Kigali Collaborative Research Centre',
      shortOrg: 'KCRC',
      description: 'Participated in Crop Type Mapping Mapathon, contributing to AI-based crop mapping tools through geospatial data annotation. Gained experience in satellite image interpretation and data validation for agricultural mapping.',
      logo: '/images/logos/kcrc_001.png',
      logoAlt: 'Kigali Collaborative Research Centre Logo',
      date: 'May 2024',
      location: 'Kigali, Rwanda',
      position: 'left',
    },
    {
      id: 3,
      title: 'Software Engineer Intern',
      organization: 'MININFRA - Kubaka Platform',
      shortOrg: 'MININFRA',
      description: 'Analyzed and optimized workflows in the Kubaka Building Permit Management Platform. Collaborated with database administrators to improve integration between internal modules and external government data systems.',
      logo: '/images/logos/mininfra_001.jpg',
      logoAlt: 'MININFRA Logo',
      date: 'May 2024 - Aug 2024',
      location: 'Kigali, Rwanda',
      position: 'right',
    },
    {
      id: 4,
      title: 'Software Developer',
      organization: 'Huza HR',
      shortOrg: 'Huza HR',
      description: 'Developed features for HR SaaS platform including 1:1 meeting and 360-degree feedback modules. Integrated CRB data with third-party APIs and optimized data flows for enhanced user experience.',
      logo: '/images/logos/huza_001.svg',
      logoAlt: 'Huza HR Logo',
      date: 'Aug 2023 - Aug 2024',
      location: 'Kigali, Rwanda',
      position: 'left',
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      organization: 'Andela Technical Leadership Program',
      shortOrg: 'Andela',
      description: 'Collaborated in designing enterprise-grade e-commerce system using PERN stack (PostgreSQL, Express, React, Node). Worked through full SDLC, translating business needs into technical requirements.',
      logo: '/images/logos/andela-svgrepo-com.svg',
      logoAlt: 'Andela Logo',
      date: 'Jan 2023 - Aug 2023',
      location: 'Kigali, Rwanda (Remote)',
      position: 'right',
    },
    {
      id: 6,
      title: 'Lab Technician',
      organization: 'Adventist University of Central Africa',
      shortOrg: 'AUCA',
      description: 'Worked part-time as lab technician, providing IT support at AUCA Gishushu Campus. Maintained lab equipment and assisted students with technical issues.',
      logo: '/images/logos/auca_logo.png',
      logoAlt: 'AUCA Logo',
      date: 'Apr 2022 - Dec 2022',
      location: 'Kigali, Rwanda',
      position: 'left',
    },
    {
      id: 7,
      title: 'Web Developer',
      organization: 'Association Rwandaise pour la Défense des Droits de l\'Homme',
      shortOrg: 'ARDHO',
      description: 'Built and maintained web applications for internal operations. Developed reporting systems and improved access to internal information for human rights advocacy work.',
      logo: '/images/logos/ardho_001.jpg',
      logoAlt: 'ARDHO Logo',
      date: 'June 2021 - June 2023',
      location: 'Kigali, Rwanda',
      position: 'right',
    },
  ];

  return (
    <section className="my_timeline brand_section" id="EXPERIENCE">
      <h2 className="section-header">My Experience</h2>
      <div className="timeline-container">
        <div className="timeline-line"></div>
        
        {timelineData.map((item, index) => (
          <div 
            key={item.id} 
            className={`timeline-item ${item.position}`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Content Box */}
            <div className="timeline-content">
              <div className="timeline-card">
                <h2 className="timeline-title">{item.title}</h2>
                <h3 className="timeline-org">{item.shortOrg}</h3>
                <p className="timeline-description">{item.description}</p>
                <div className="timeline-meta">
                  <div className="timeline-date">
                    <span className="date-icon">🗓️</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="timeline-location">
                    <span className="location-icon">📍</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Dot */}
            <div className="timeline-dot">
              <div className="dot-inner"></div>
              <div className="dot-pulse"></div>
            </div>

            {/* Logo */}
            <div className="timeline-logo">
              <div className="logo-wrapper">
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={100}
                  height={100}
                  className="company-logo"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;

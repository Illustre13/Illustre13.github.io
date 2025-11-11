import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodepen,
  faGithub,
  faXTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import WordFlick from "@/components/common/WordFlick";

interface MyExperienceProps {
  value: string;
  description: string;
}

const FrontPageSection: React.FC = () => {
  const myOccupation = [
    "Software Engineer.",
    "Front End Developer.",
    "Back End Developer.",
    "Junior Developer.",
    "Prospective Graduate at AUCA.",
    "Prospective Graduate at ALX.",
  ];

  const experience: MyExperienceProps[] = [
    { value: "3+", description: "Years of Experience" },
    { value: "10+", description: "Projects Completed" },
    { value: "5+", description: "Programming Languages Learned" },
    { value: "15+", description: "Degrees and Certificates Obtained" },
  ];

  const socialLinks = [
    { href: "https://github.com/Illustre13", icon: faGithub, label: "GitHub" },
    { href: "https://codepen.io/Illustre13/", icon: faCodepen, label: "CodePen" },
    { href: "mailto:ndahayosibertin17@gmail.com", icon: faEnvelope, label: "Email" },
    { href: "https://linkedin.com/in/ndahayo-s-bertin", icon: faLinkedinIn, label: "LinkedIn" },
    { href: "https://x.com/ndahayo_s", icon: faXTwitter, label: "Twitter" },
    { href: "tel:+250786949188", icon: faPhone, label: "Phone" },
  ];

  return (
    <section className="front-page brand_section" id="front">
      <div className="hero-page">
        <div className="hero">
          <p>Hi, My Name Is</p>
          <h2>
            Bertin <br /> NDAHAYO SINGIZWA.
          </h2>
          <span>I am a </span>
          <div className="hero_text">
            <WordFlick words={myOccupation} speed={80} pauseDuration={1500} />
          </div>
        </div>

        <div className="mycv">
          <div className="cv">
            <div className="cv_hire_me">
              <h6>Download My CV</h6>
              <Link href="/files/bertin_ndahayo_cv.pdf" download>
                <i className="fa-solid fa-download"></i>
              </Link>
            </div>
            <div className="cv_hire_me">
              <Link href="#CONTACTS">
                <h6>Contact Me</h6>
              </Link>
            </div>

            <div className="social_media flex items-center justify-center space-x-4">
              <ul className="profile-content2 p-2 flex space-x-4">
                {socialLinks.map((social) => (
                  <li key={social.href} className="hover:text-blue-500 transition-colors">
                    <a
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={social.label}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Stats */}
      <div className="flex flex-wrap justify-center mt-4 p-6 bg-gray-800 text-white rounded-lg w-full gap-8">
        {experience.map((item, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <span className="text-4xl font-bold text-blue-400">{item.value}</span>
            <span className="text-lg text-gray-300">{item.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FrontPageSection;

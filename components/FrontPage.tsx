import React from "react";
import Link from "next/link";
import {
  faCodepen,
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";
import WordFlick from "./WordFlick";

interface  MyExperienceProps {
  value: string;
  description: string;
}

const FrontPageSection: React.FC = () => {
  const myOccoputation = [
    "Software Engineer.",
    "Front End Developer.",
    "Back End Developer.",
    "Junior Developer.",
    "Prospective Graduate at AUCA.",
    "Prospective Graduate at ALX.",
  ];

  const experience: MyExperienceProps[] = [
    {
      value: "3+",
      description: "Years of Experience",
    },
    {
        value: "10+",
        description: "Projects Completed",
    },
    {
        value: "5+",
        description: "Programming Languages Learned",
    },
    {
        value: "15+",
        description: "Degres and Certificate Obtained",
    }

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
            {/* My Typing animation goes Here */}
            {/* Example phrases: 
            'Web Developer.|', 'Junior Developer.|', 'Software Engineer.|', 
            'Prospective Graduate at AUCA.|', 'Prospective Graduate at ALX.|' 
          */}
            <WordFlick words={myOccoputation} speed={80} pauseDuration={1500} />
          </div>
        </div>

        <div className="mycv">
          <div className="cv">
            <div className="cv_hire_me">
              <h6>Download My CV</h6>
              <Link href="files/bertin_ndahayo_cv.pdf" download>
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
                <li className="hover:text-blue-500">
                  <a
                    href="https://github.com/Illustre13"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </li>
                <li className="hover:text-blue-500">
                  <a
                    href="https://codepen.io/Illustre13/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faCodepen} />
                  </a>
                </li>
                <li className="hover:text-blue-500">
                  <a href="mailto:ndahayosibertin17@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </a>
                </li>
                <li className="hover:text-blue-500">
                  <a
                    href="https://linkedin.com/in/ndahayo-s-bertin"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </a>
                </li>
                <li className="hover:text-blue-500">
                  <a
                    href="https://x.com/ndahayo_s"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faXTwitter} />
                  </a>
                </li>
                <li className="hover:text-blue-500">
                  <a href="tel:+250786949188">
                    <FontAwesomeIcon icon={faPhone} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-4 p-6 bg-gray-800 text-white rounded-lg w-full">
      {experience.map((item, index) => (
        <div key={index} className="flex flex-col items-center mx-4">
          <span className="text-4xl font-bold">{item.value}</span>
          <span className="text-lg">{item.description}</span>
        </div>
      ))}
    </div>

      <div className="scrollDown">
        {/* <i
          className="fa-solid fa-angles-up fa-bounce"
          style={{ "--fa-bounce-rebound": "0" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        ></i> */}
      </div>
    </section>
  );
};

export default FrontPageSection;

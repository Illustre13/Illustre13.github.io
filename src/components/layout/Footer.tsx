import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedinIn, 
  faXTwitter, 
  faGithub,
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot,
  faArrowUp,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '#front', label: 'Home' },
    { href: '#ABOUT', label: 'About' },
    { href: '#EXPERIENCE', label: 'Experience' },
    { href: '#SKILLS', label: 'Skills' },
    { href: '#PORTFOLIO', label: 'Portfolio' },
    { href: '#BLOG', label: 'Blog' },
    { href: '#CONTACTS', label: 'Contact' },
  ];

  const socialLinks = [
    { 
      href: 'https://linkedin.com/in/ndahayo-s-bertin', 
      icon: faLinkedinIn, 
      label: 'LinkedIn',
      color: '#0077b5' 
    },
    { 
      href: 'https://x.com/illustre_b', 
      icon: faXTwitter, 
      label: 'Twitter',
      color: '#1da1f2' 
    },
    { 
      href: 'https://github.com/Illustre13', 
      icon: faGithub, 
      label: 'GitHub',
      color: '#fff' 
    },
    { 
      href: 'https://instagram.com/illustre_bertin', 
      icon: faInstagram, 
      label: 'Instagram',
      color: '#e4405f' 
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="/images/logos/ITH_002.png"
                alt="Logo"
                width={140}
                height={50}
              />
            </div>
            <p className="footer-tagline">
              Building digital experiences that inspire and innovate.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  style={{ '--hover-color': social.color } as React.CSSProperties}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Get In Touch</h3>
            <ul className="footer-contact">
              <li>
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <span>Kigali, Rwanda 🇷🇼</span>
              </li>
              <li>
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <a href="tel:+250786949188">+250 786 949 188</a>
              </li>
              <li>
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <a href="mailto:ndahayosibertin17@gmail.com">
                  ndahayosibertin17@gmail.com
                </a>
              </li>
              <li>
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <a 
                  href="" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== 'undefined' && (window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({
                        url: 'https://calendly.com/ndahayosibertin17/1-1-meeting-with-bertin'
                      });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  Schedule a Meeting
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} <span className="highlight">@illustre_bertin</span>. All rights reserved.
            </p>
            <p className="footer-built">
              Built from scratch with <span className="heart">❤️</span> using Next.js & TypeScript
            </p>
          </div>

          {/* Back to Top Button */}
          <button 
            className="back-to-top" 
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="footer-line"></div>
    </footer>
  );
};

export default Footer;

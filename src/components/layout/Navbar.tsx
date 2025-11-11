import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Navbar: React.FC = () => {
  const [isImageDropdownOpen, setIsImageDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  const toggleImageDropdown = () => {
    setIsImageDropdownOpen(!isImageDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#ABOUT", label: "About" },
    { href: "#EXPERIENCE", label: "Experience" },
    { href: "#SKILLS", label: "Skills" },
    { href: "#PORTFOLIO", label: "My Work" },
    { href: "#BLOG", label: "Blog" },
    { href: "#CONTACTS", label: "Contacts" },
  ];

  const socialLinks = [
    { href: "mailto:ndahayosibertin17@gmail.com", icon: faEnvelope, label: "Email" },
    { href: "tel:+250786949188", icon: faPhone, label: "Phone" },
    { href: "https://linkedin.com/in/ndahayo-s-bertin", icon: faLinkedinIn, label: "LinkedIn" },
    { href: "https://x.com/illustre_b", icon: faXTwitter, label: "Twitter" },
  ];

  return (
    <header
      id="menu_header"
      className="flex items-center justify-between bg-black text-white"
    >
      {/* Logo Animation */}
      <div className="logo_animation flex items-center justify-center relative h-24 w-64">
        {/* <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent stroke-[2px] stroke-[#03a9f4]">
          BERTIN
        </h2>
        <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#03a9f4] animate-logoAnimation">
          BERTIN
        </h2> */}
        <Image
          src="/images/logos/ITH_002.png"
          alt="Logo"
          width={160}
          height={60}
        //   className="object-contain"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="nav-bar desktop-nav flex items-center">
        <ul className="menu flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link className="hover:text-blue-400 transition-colors" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative right-0 mt-2 mx-4">
          <Image
            src="/images/me3.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all"
            onClick={toggleImageDropdown}
          />
        </div>

        {isImageDropdownOpen && (
          <div
            id="myprofile"
            className="absolute right-4 ml-2 mt-36 bg-white text-black rounded-md shadow-lg z-10 w-40"
          >
            <ul className="profile-content1 p-2 border-b border-gray-200">
              <li className="hover:text-blue-500 cursor-pointer py-1">
                <Link href="/gallery">Photo Gallery</Link>
              </li>
              <li className="hover:text-blue-500 cursor-pointer py-1">
                <Link href="/admin/login">Admin Login</Link>
              </li>
            </ul>
            <ul className="profile-content2 p-2 flex space-x-4 justify-center">
              {socialLinks.map((social) => (
                <li key={social.href} className="hover:text-blue-500">
                  <Link 
                    href={social.href} 
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <button 
        id="menu_scrolling" 
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;

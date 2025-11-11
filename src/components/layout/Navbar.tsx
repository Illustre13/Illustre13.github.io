import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Navbar: React.FC = () => {
  const [isImageDropdownOpen, setIsImageDropdownOpen] = React.useState(false);
  
  const toggleImageDropdown = () => {
    setIsImageDropdownOpen(!isImageDropdownOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#ABOUT", label: "About" },
    { href: "#SKILLS", label: "Skills" },
    { href: "#PORTFOLIO", label: "My Work" },
    { href: "#BLOG", label: "Blog" },
    { href: "#CONTACTS", label: "Contacts" },
  ];

  const socialLinks = [
    { href: "mailto:ndahayosibertin17@gmail.com", icon: faEnvelope, label: "Email" },
    { href: "tel:+250786949188", icon: faPhone, label: "Phone" },
    { href: "https://linkedin.com/in/ndahayo-s-bertin", icon: faLinkedinIn, label: "LinkedIn" },
    { href: "https://x.com/ndahayo_s", icon: faXTwitter, label: "Twitter" },
  ];

  return (
    <header
      id="menu_header"
      className="flex items-center justify-between bg-black text-white"
    >
      {/* Logo Animation */}
      <div className="logo_animation flex items-center justify-center relative h-24 w-64">
        <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent stroke-[2px] stroke-[#03a9f4]">
          BERTIN
        </h2>
        <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#03a9f4] animate-logoAnimation">
          BERTIN
        </h2>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar flex items-center">
        <ul className="menu flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link className="hover:text-blue-400 transition-colors" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile Image Dropdown */}
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

        {/* Dropdown Content */}
        {isImageDropdownOpen && (
          <div
            id="myprofile"
            className="absolute right-4 ml-2 mt-36 bg-white text-black rounded-md shadow-lg z-10 w-36"
          >
            <ul className="profile-content1 p-2">
              <li className="hover:text-blue-500 cursor-pointer">
                <Link href="/gallery">Photo Gallery</Link>
              </li>
            </ul>
            <ul className="profile-content2 p-2 flex space-x-4">
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
      <div id="menu_scrolling" className="block lg:hidden">
        {/* Mobile menu toggle will go here */}
      </div>
    </header>
  );
};

export default Navbar;

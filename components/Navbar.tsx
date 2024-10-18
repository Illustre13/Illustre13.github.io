import Link from "next/link";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faXTwitter } from "@fortawesome/free-brands-svg-icons";

const Navbar: React.FC = () => {
  // const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isImageDropdownOpen, setIsImageDropdownOpen] = React.useState(false);
  const ImageDropdown = () => {
    setIsImageDropdownOpen(!isImageDropdownOpen);
  };
  return (
    <div>
      <header
        id="menu_header"
        className="flex items-center justify-between bg-black text-white"
      >
        {/* Logo Animation */}
        <div className="logo_animation flex items-center justify-center relative h-24 w-64">
          {/* <Link
            href="/"
            className="relative text-4xl font-bold tracking-wide overflow-hidden"
          > */}
          <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-transparent stroke-[2px] stroke-[#03a9f4]">
            BERTIN
          </h2>
          <h2 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#03a9f4] animate-logoAnimation">
            BERTIN
          </h2>
          {/* </Link> */}
        </div>

        {/* Navigation Bar */}
        <div className="nav-bar flex items-center">
          <ul className="menu flex space-x-6">
            <li>
              <Link className="hover:text-blue-400" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400" href="#ABOUT">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400" href="#SKILLS">
                Skills
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400" href="#PORTFOLIO">
                My Work
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400" href="#BLOG">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-blue-400" href="#CONTACTS">
                Contacts
              </Link>
            </li>
          </ul>

          {/* Image Dropdown */}
          <div className="relative right-0 mt-2 mx-4">
            <Image
              src="/images/me3.jpg"
              alt=""
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={ImageDropdown}
            />
          </div>
          {/* Image Dropdown Content */}
          {isImageDropdownOpen && (
            <div
              id="myprofile"
              className="absolute right-4 ml-2 mt-36 bg-white text-black rounded-md shadow-lg z-10 w-36"
            >
              <ul className="profile-content1 p-2">
                <li className="hover:text-blue-500">
                  <Link href="">Photo Gallery</Link>
                </li>
              </ul>
              <ul className="profile-content2 p-2 flex space-x-4">
                <li className="hover:text-blue-500">
                  <Link href="mailto:ndahayosibertin17@gmail.com">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </Link>
                </li>
                <li className="hover:text-blue-500">
                  <Link href="tel:+250786949188">
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                </li>
                <li className="hover:text-blue-500">
                  <Link
                    href="https://linkedin.com/in/ndahayo-s-bertin"
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </Link>
                </li>
                <li className="hover:text-blue-500">
                  <Link href="https://x.com/ndahayo_s" target="_blank">
                    <FontAwesomeIcon icon={faXTwitter} />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div id="menu_scrolling" className="block lg:hidden">
          {/* <i className="fa-solid fa-bars" onClick={}></i> */}
        </div>
      </header>
    </div>
  );
};

export default Navbar;

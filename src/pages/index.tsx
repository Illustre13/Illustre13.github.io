import AboutMe from "@/components/sections/AboutMe";
import FrontPageSection from "@/components/sections/FrontPage";
import Navbar from "@/components/layout/Navbar";
import Timeline from "@/components/sections/Timeline";
import React from "react";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Blog from "@/components/sections/Blog";

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <FrontPageSection />
      <AboutMe />
      <Timeline />
      <Skills />
      <Portfolio />
      <Blog />
    </div>
  );
};

export default HomePage;

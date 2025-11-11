import AboutMe from "@/components/sections/AboutMe";
import FrontPageSection from "@/components/sections/FrontPage";
import Navbar from "@/components/layout/Navbar";
import Timeline from "@/components/sections/Timeline";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <FrontPageSection />
      <AboutMe />
      <Timeline />
    </div>
  );
};

export default HomePage;

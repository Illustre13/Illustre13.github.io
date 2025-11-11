import AboutMe from "@/components/sections/AboutMe";
import FrontPageSection from "@/components/sections/FrontPage";
import Navbar from "@/components/layout/Navbar";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <FrontPageSection />
      <AboutMe />
    </div>
  );
};

export default HomePage;

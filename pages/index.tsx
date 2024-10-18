import AboutMe from "@/components/AboutMe";
import FrontPageSection from "@/components/FrontPage";
import Navbar from "@/components/Navbar";
import React from "react";

const HomePage: React.FC = () => {
  return <div className="overflow-x-hidden">
    <Navbar />
    <FrontPageSection />
    <AboutMe />
  </div>;
};

export default HomePage;

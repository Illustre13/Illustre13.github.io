import AboutMe from "@/components/sections/AboutMe";
import FrontPageSection from "@/components/sections/FrontPage";
import Navbar from "@/components/layout/Navbar";
import Timeline from "@/components/sections/Timeline";
import React from "react";
import Skills from "@/components/sections/Skills";
import Portfolio from "@/components/sections/Portfolio";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Head from "next/head";

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Illustre</title>
        <meta name="description" content="Bertin's Portfolio - Full Stack Developer, Data Engineer & ML Specialist" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="overflow-x-hidden">
        <Navbar />
        <FrontPageSection />
        <AboutMe />
        <Timeline />
        <Skills />
        <Portfolio />
        <Blog />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;

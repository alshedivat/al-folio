import React from "react";
import { Element } from "react-scroll";
import { useSelector } from "react-redux";
import { selectData } from "../pages/homeSlice";
// Components
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import AboutMe from "../components/AboutMe";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { BackToTop } from "../components/globalStyledComponents";
import Footer from "../components/Footer";

export default function Home() {
  const { name } = useSelector(selectData);

  React.useEffect(
    function () {
      document.title = `${name} | Portfolio`;
    },
    [name]
  );

  return (
    <>
      <Element name={"Home"} id="home">
        <NavBar />
        <Hero />
      </Element>
      <main>
        <AboutMe />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <BackToTop home={"Home"} />
      <Footer />
    </>
  );
}

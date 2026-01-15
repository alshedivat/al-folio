/**
 * PeoplePage Component
 * A React component that displays information about current members and alumni of the organization.
 * Features include:
 * - Responsive grid layout of people cards
 * - Intersection Observer animations for scroll effects
 * - Filtering between current members and alumni
 * - Research interest tags overlay on hover
 * - Homepage links for each person
 */

import React, { useCallback } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import peopledata from "../../Data/people.json";
import "./page.css";

export const PeoplePage = (props) => {
  // Custom intersection observer hook for scroll animations
  // Creates a reusable callback ref that adds/removes 'animation' class based on viewport visibility
  const element = useCallback((node) => {
    // Configure the Intersection Observer options
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the root
      threshold: 0.1, // Trigger when 10% of the element is visible
    };

    // Only create observer for valid DOM elements
    if (node && node.nodeType === Node.ELEMENT_NODE) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // Add animation class when element enters viewport
          if (entry.isIntersecting) {
            entry.target.classList.add("animation");
          } else {
            // Remove animation class when element leaves viewport
            entry.target.classList.remove("animation");
          }
        });
      }, options);

      observer.observe(node);
    }
  }, []);

  return (
    <>
      <Navbar />
      {/* <div className='banner'>
                <div ref={element} className='title'>We Are DxD</div>
                <img src={"/images/banner.png"} alt="banner"/>
            </div> */}
      <div className="page">
        {/* Page title with animation effect */}
        <div ref={element} className="title">
          <span>• PEOPLE •</span>
        </div>
        <div className="container">
          {/* Filter and map through people data to show only current members */}
          {peopledata
            .filter((person) => person.current === true)
            .map((person) => (
              <div className="person" key={person.name}>
                {/* Image container with research interests overlay */}
                <div className="image-container">
                  <img
                    ref={element}
                    className="image"
                    src={"/images/people/" + person.image}
                    alt={person.name}
                  />
                  {/* Conditional render of research interests overlay */}
                  {person.research_interest && (
                    <div className="research-overlay">
                      {/* Split research interests by comma and create individual tags */}
                      {person.research_interest
                        .split(",")
                        .map((interest, index) => (
                          <span key={index} className="research-tag">
                            # {interest.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
                {/* Person details with animation effects */}
                <p ref={element} className="name">
                  {person.name}
                </p>
                <p ref={element} className="position">
                  {person.position}
                </p>
                {/* Conditional render of homepage link */}
                {person.homepage === "" ? null : (
                  <a
                    className="link"
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="linkBtn"
                      ref={element}
                      src={`${process.env.PUBLIC_URL}/icons/home.svg`}
                      alt="home link"
                    />
                  </a>
                )}
              </div>
            ))}
        </div>
        <img
          className="line"
          ref={element}
          src={`${process.env.PUBLIC_URL}/icons/line.svg`}
          alt="line"
        />
        <div ref={element} className="title">
          • Alumni •
        </div>
        <div className="container">
          {/* Filter and map through people data to show only alumni */}
          {peopledata
            .filter((person) => person.current === false)
            .map((person) => (
              <div className="person alumni" key={person.name}>
                {/* Image container with research interests overlay */}
                <div className="image-container">
                  <img
                    ref={element}
                    className="image"
                    src={"/images/people/" + person.image}
                    alt={person.name}
                  />
                  {/* Conditional render of research interests overlay */}
                  {person.research_interest && (
                    <div className="research-overlay">
                      {/* Split research interests by comma and create individual tags */}
                      {person.research_interest
                        .split(",")
                        .map((interest, index) => (
                          <span key={index} className="research-tag">
                            # {interest.trim()}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
                {/* Person details with animation effects */}
                <p ref={element} className="name">
                  {person.name}
                </p>
                <p ref={element} className="position">
                  {person.position}
                </p>
                {/* Conditional render of homepage link */}
                {person.homepage === "" ? null : (
                  <a
                    className="link"
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="linkBtn"
                      ref={element}
                      src={`${process.env.PUBLIC_URL}/icons/home.svg`}
                      alt="home link"
                    />
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

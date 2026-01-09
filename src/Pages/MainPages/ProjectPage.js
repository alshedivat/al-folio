import React, { useCallback } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import { Link } from "react-router-dom";

export const ProjectPage = (props) => {
  const element = useCallback((node) => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 50%가 viewport에 들어와 있어야 callback 실행
    };

    if (node && node.nodeType === Node.ELEMENT_NODE) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animation");
          } else {
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
      <div className="page">
        <div ref={element} className="title">
          • PROJECTS •
        </div>
        <div className="project">
          <div className="contents left">
            <div ref={element} className="title">
              Human-Centered AI for Health
            </div>
            <div ref={element} className="description">
              We build and evaluate the next generation of interactive systems
              for mental health and well-being. We move beyond simple tracking,
              utilizing generative AI and novel interaction paradigms to create
              tools for human-AI co-creation in therapeutic journaling,
              data-driven self-reflection, and designing new approaches to
              understanding personal data.
            </div>
            <div className="more_holder">
              <Link ref={element} to="/project/health-ai" className="more">
                See More
              </Link>
            </div>
          </div>
          <img
            ref={element}
            className="image right"
            src={"/images/project/digital_health.png"}
            alt="Human-Centered AI for Health"
          />
        </div>
        <div className="project">
          <img
            ref={element}
            className="image left"
            src={"/images/project/inclusive_by_design.png"}
            alt="Neurodiversity, Accessibility, and Algorithmic Inclusion"
          />
          <div className="contents right">
            <div ref={element} className="title">
              Neurodiversity, Accessibility <br />
              &amp; Algorithmic Inclusion
            </div>
            <div ref={element} className="description">
              Grounded in Participatory Design, we design inclusive systems with
              neurodiverse individuals and people with disabilities. Our
              research follows two interconnected paths: we build novel
              assistive technologies to augment human capability, and we
              critically audit and redesign algorithm-driven platforms to ensure
              they are accessible, fair, and empowering for all.
            </div>
            <div className="more_holder">
              <Link ref={element} to="/project/accessibility" className="more">
                See More
              </Link>
            </div>
          </div>
        </div>
        <div className="project">
          <div className="contents left">
            <div ref={element} className="title">
              Socio-Technical Auditing for AI Alignment
            </div>
            <div ref={element} className="description">
              How do we ensure complex AI models are effective and aligned with
              human values? Our research addresses this challenge by developing
              methods for both technical evaluation and socio-technical
              auditing. This involves two interconnected perspectives: we build
              novel benchmarks and analyze training data to measure model
              capabilities rigorously, and we investigate the real-world impact
              of these algorithms to guide the alignment process.
            </div>
            <div className="more_holder">
              <Link ref={element} to="/project/alignment" className="more">
                See More
              </Link>
            </div>
          </div>
          <img
            ref={element}
            className="image right"
            src={"/images/project/data_storytelling.png"}
            alt="Socio-Technical Auditing for AI Alignment"
          />
        </div>
        <div className="project">
          <img
            ref={element}
            className="image left"
            src={"/images/project/human_ai_interaction.png"}
            alt="Human-AI Agent Collectives"
          />
          <div className="contents right">
            <div ref={element} className="title">
              Human-AI Agent Collectives
            </div>
            <div ref={element} className="description">
              We design Human-Agent Collectives (HACs) to move beyond the 1-to-1
              paradigm, enabling collaboration on complex tasks that require
              human creativity and nuanced teamwork. Supported by Google, our
              research explores collective curation—a new interaction primitive
              that allows users to act as orchestrators, defining the
              composition, roles, and dynamics of their AI teams.
            </div>
            <div className="more_holder">
              <Link ref={element} to="/project/collectives" className="more">
                See More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

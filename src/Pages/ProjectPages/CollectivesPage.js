import React, { useCallback } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import "./project.css";
import projectdata from "../../Data/project.json";

export const CollectivesPage = (props) => {
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
        <img
          ref={element}
          className="project_banner"
          src={"/images/project/human_ai_interaction.png"}
          alt={"human_ai_interaction"}
        />
        <div ref={element} className="title">
          Human-AI Agent Collectives
        </div>
        <div ref={element} className="project_description">
          We design Human-Agent Collectives (HACs) to move beyond the 1-to-1
          paradigm, enabling collaboration on complex tasks that require human
          creativity and nuanced teamwork. Supported by Google, our research
          explores collective curation—a new interaction primitive that allows
          users to act as orchestrators, defining the composition, roles, and
          dynamics of their AI teams.
        </div>
        <div className="projects">
          {projectdata
            .filter((project) => project.field === "hai")
            .sort((a, b) => {
              // Sort by selected field (true first), then maintain original order
              if (a.selected && !b.selected) return -1;
              if (!a.selected && b.selected) return 1;
              return 0;
            })
            .map((project) => (
              <div className="unit_project" key={project.title}>
                <div ref={element} className="title">
                  {project.title}{" "}
                  <div className="year">&nbsp;({project.year})</div>
                </div>
                <div ref={element} className="people">
                  {project.people}
                </div>
                {project.award && (
                  <div ref={element} className="award">
                    <span
                      style={{
                        backgroundColor: "rgb(255, 243, 131)",
                        borderRadius: "9999px",
                        padding: "1px 8px",
                        fontSize: "0.7em",
                        fontWeight: "bold",
                        display: "inline-block",
                      }}
                    >
                      🏆 {project.award}
                    </span>
                  </div>
                )}
                <div className="content">
                  <div ref={element} className="description">
                    {project.description}
                  </div>
                  {project.image !== "" ? (
                    <img
                      ref={element}
                      src={"/images/project/" + project.image}
                      alt={project.title}
                    />
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

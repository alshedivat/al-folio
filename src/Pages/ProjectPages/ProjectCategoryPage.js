import React, { useCallback } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import "./project.css";
import projectdata from "../../Data/project.json";

export const ProjectCategoryPage = ({
  bannerSrc,
  bannerAlt,
  title,
  description,
  field,
}) => {
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

  const renderTitle = (project) =>
    project.web ? (
      <a
        className="project-title-link"
        href={project.web}
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.title}
      </a>
    ) : (
      project.title
    );

  const projects = projectdata.filter(
    (project) => project.field === field && !project.hidden,
  );
  const selectedProjects = projects.filter((project) => project.selected);
  const otherProjects = projects.filter((project) => !project.selected);

  const renderProject = (project) => (
    <div className="unit_project" key={project.title}>
      <div ref={element} className="title">
        {renderTitle(project)}{" "}
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
  );

  return (
    <>
      <Navbar />
      <div className="page">
        <img
          ref={element}
          className="project_banner"
          src={bannerSrc}
          alt={bannerAlt}
        />
        <div ref={element} className="title">
          {title}
        </div>
        <div ref={element} className="project_description">
          {description}
        </div>
        <div className="projects">
          {selectedProjects.map(renderProject)}
          {otherProjects.map(renderProject)}
        </div>
      </div>
      <Footer />
    </>
  );
};

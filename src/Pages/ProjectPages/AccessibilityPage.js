import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import './project.css';
import projectdata from '../../Data/project.json';

export const AccessibilityPage = (props) => {
    const element = useCallback((node) => {
        const options = {
            root: null, // viewport
            rootMargin: "0px",
            threshold: 0.1,  // 50%가 viewport에 들어와 있어야 callback 실행
        }
        
        if (node && node.nodeType === Node.ELEMENT_NODE) {
            const observer = new IntersectionObserver(entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('animation');
                } else {
                  entry.target.classList.remove('animation');
                }
              });
            }, options);
        
            observer.observe(node);
        }
    }, []);

    return(
        <>
            <Navbar/>
            <div className='page'>
                <img ref={element} className='project_banner' src={"/images/project/inclusive_by_design.png"} alt={"inclusive_by_design"}/>
                <div ref={element} className='title'>Neurodiversity, Accessibility, &amp; Algorithmic Inclusion</div>
                <div ref={element} className='project_description'>Grounded in Participatory Design, we design inclusive systems with neurodiverse individuals and people with disabilities. Our research follows two interconnected paths: we build novel assistive technologies to augment human capability, and we critically audit and redesign algorithm-driven platforms to ensure they are accessible, fair, and empowering for all.</div>
                <div className='projects'>
                  {(() => {
                    const projects = projectdata.filter(
                      (project) =>
                        project.field === "accessibility" && !project.hidden,
                    );
                    const selectedProjects = projects.filter((project) => project.selected);
                    const otherProjects = projects.filter((project) => !project.selected);
                    return (
                      <>
                        {selectedProjects.map((project) => (
                          <div className='unit_project' key={project.title}>
                            <div ref={element} className='title'>{project.title} <div className='year'>&nbsp;({project.year})</div></div>
                            <div ref={element} className='people'>{project.people}</div>
                            {project.award && (
                              <div ref={element} className='award'>
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
                            <div className='content'>
                              <div ref={element} className='description'>{project.description}</div>
                              {project.image !== "" ? <img ref={element} src={"/images/project/" +  project.image} alt={project.title}/> : null}
                            </div>
                          </div>
                        ))}
                        {selectedProjects.length > 0 && otherProjects.length > 0 ? (
                          <img
                            className="line"
                            ref={element}
                            src={`${process.env.PUBLIC_URL}/icons/line.svg`}
                            alt="line"
                          />
                        ) : null}
                        {otherProjects.map((project) => (
                          <div className='unit_project' key={project.title}>
                            <div ref={element} className='title'>{project.title} <div className='year'>&nbsp;({project.year})</div></div>
                            <div ref={element} className='people'>{project.people}</div>
                            {project.award && (
                              <div ref={element} className='award'>
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
                            <div className='content'>
                              <div ref={element} className='description'>{project.description}</div>
                              {project.image !== "" ? <img ref={element} src={"/images/project/" +  project.image} alt={project.title}/> : null}
                            </div>
                          </div>
                        ))}
                      </>
                    );
                  })()}
                </div>
            </div> 
            <Footer/>
        </>
    )
}

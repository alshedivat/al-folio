import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import './project.css';
import projectdata from '../../Data/project.json';

export const AIPage = (props) => {
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
                <img ref={element} className='project_banner' src={"/images/project/human_ai_interaction.png"} alt={"human_ai_interaction"}/>
                <div ref={element} className='title'>Human-AI Interaction</div>
                <div ref={element} className='project_description'>We aim to explore the design of AI technologies that are more sensitive to human concerns and behavior to augment our humanity, by incorporating the design process to critically evaluate AI products and enable effective communication and collaboration with AI. We also seek to embrace discomfort in designing a better future, particularly in understanding how new technology might change the way we communicate and collaborate, and protect our privacy. </div>
                <div className='projects'>
                  {projectdata.filter(project => project.field === 'hai').map(project => 
                    <div className='unit_project' key={project.title}>
                      <div ref={element} className='title'>{project.title} <div className='year'>&nbsp;({project.year})</div></div>
                      <div ref={element} className='people'>{project.people}</div>
                      <div className='content'>
                        <div ref={element} className='description'>{project.description}</div>
                        {project.image !== "" ? <img ref={element} src={"/images/project/" +  project.image} alt={project.title}/> : null}
                      </div>
                    </div>
                  )}
                </div>
            </div>
            <Footer/>
        </>
    )
}
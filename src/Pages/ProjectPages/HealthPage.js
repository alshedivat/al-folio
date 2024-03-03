import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import './project.css';
import projectdata from '../../Data/project.json';


export const HealthPage = (props) => {
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
                <img ref={element} className='project_banner' src={"/images/project/digital_health.png"} alt={"digital_health"}/>
                <div ref={element} className='title'>Digital Health and Wellbeing</div>
                <div ref={element} className='project_description'>We aim to develop and evaluate innovative health and wellness technology that facilitates the management of chronic mental health conditions in daily life. Drawing on interdisciplinary research methods and theories from personal informatics, psychology, and machine learning, we explore the potential benefits and challenges of digital technologies on people’s mental health. We also showcase human-AI collaborations for managing mental health and well-being. </div>
                <div className='projects'>
                  {projectdata.filter(project => project.field === 'health').map(project => 
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
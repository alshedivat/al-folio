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
                <div ref={element} className='title'>Human-Centered AI for Health</div>
                <div ref={element} className='project_description'>We build and evaluate the next generation of interactive systems for mental health and well-being. We move beyond simple tracking, utilizing generative AI (LLMs) and novel interaction paradigms to create tools for human-AI co-creation in therapeutic journaling, data-driven self-reflection, and designing new approaches to understanding personal data.</div>
                <div ref={element} className='project_publications'>
                  <div className='project_publications_title'>Relevant Publications</div>
                  <ul className='project_publications_list'>
                    <li>Peerspective: A Study on Reciprocal Tracking for Self-awareness and Relational Insight (CHI 2025)</li>
                    <li>Thinking Outside the Data Box: Investigating the Potential of Data Manipulation for Self-Reflection on Personal Data (DIS 2025, Honorable Mention)</li>
                    <li>MindfulDiary: Harnessing Large Language Model to Support Psychiatric Patients' Journaling (CHI 2024)</li>
                    <li>DiaryMate: Understanding User Perceptions and Experience in Human-AI Collaboration for Personal Journaling (CHI 2024)</li>
                    <li>Prediction for retrospection: Integrating algorithmic stress prediction into personal informatics systems (CHI 2022)</li>
                  </ul>
                </div>
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

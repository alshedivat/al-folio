import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import './project.css';
import projectdata from '../../Data/project.json';

export const InclusivePage = (props) => {
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
                <div ref={element} className='project_publications'>
                  <div className='project_publications_title'>Relevant Publications</div>
                  <ul className='project_publications_list'>
                    <li>AACessTalk: Fostering Communication between Minimally Verbal Autistic Children and Parents with Contextual Guidance and Card Recommendation (CHI 2025, Best Paper Award 🏆)</li>
                    <li>Unlock Life with a Chat (GPT): Integrating Conversational AI with Large Language Models into Everyday Lives of Autistic Individuals (CHI 2024)</li>
                    <li>Love on the spectrum: Toward Inclusive online dating experience of autistic individuals (CHI 2023)</li>
                    <li>The workplace playbook VR: exploring the design space of virtual reality to foster understanding of and support for autistic people (CSCW 2022)</li>
                    <li>It's not wrong, but I'm quite disappointed: Toward an Inclusive Algorithmic Experience for Content Creators with Disabilities (CHI 2022)</li>
                  </ul>
                </div>
                <div className='projects'>
                  {projectdata.filter(project => project.field === 'inclusive').map(project => 
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

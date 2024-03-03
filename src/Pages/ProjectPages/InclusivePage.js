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
                <div ref={element} className='title'>Inclusive by Design</div>
                <div ref={element} className='project_description'>We aim to understand how technologies impact the physical and social well-being of marginalized individuals. Our work informs the design and development of equitable, inclusive technologies that account for the diverse realities in which they operate. By reflecting on what we learn from participatory design with neurodivergent individuals, such as those on the autism spectrum, we explore how digital technologies can support inclusivity. </div>
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
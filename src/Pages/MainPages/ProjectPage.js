import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import { Link } from 'react-router-dom';

export const ProjectPage = (props) => {
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
                <div ref={element} className='title'>• PROJECTS •</div>
                <div className='project'>
                    <div className='contents left'>
                        <div ref={element} className='title'>Digital Health and Wellbeing</div>                        
                        <div ref={element} className='description'>We aim to develop and evaluate innovative health and wellness technology that facilitates the management of chronic mental health conditions in daily life.</div>
                        <div className='more_holder'>
                            <Link ref={element} to="/project/health" className='more'>See More</Link>
                        </div>                    
                    </div>
                    <img ref={element} className='image right' src={"/images/project/digital_health.png"} alt={"digital_health"}/>
                </div>
                <div className='project'>
                    <img ref={element} className='image left' src={"/images/project/human_ai_interaction.png"} alt={"human_ai_interaction"}/>
                    <div className='contents right'>
                        <div ref={element} className='title'>Human-AI Interaction</div>                               
                        <div ref={element} className='description'>We aim to explore the design of AI technologies that are more sensitive to human concerns and behavior to augment our humanity, by incorporating the design process to critically evaluate AI products and enable effective communication and collaboration with AI.</div>
                        <div className='more_holder'>
                            <Link ref={element} to="/project/ai" className='more'>See More</Link>
                        </div>
                    </div>
                </div>
                <div className='project'>
                    <div className='contents left'>
                        <div ref={element} className='title'>Inclusive by Design</div>                                  
                        <div ref={element} className='description'>We aim to understand how technologies impact the physical and social well-being of marginalized individuals. Our work informs the design and development of equitable, inclusive technologies that account for the diverse realities in which they operate.</div>
                        <div className='more_holder'>
                            <Link ref={element} to="/project/inclusive" className='more'>See More</Link>
                        </div>
                    </div>
                    <img ref={element} className='image right' src={"/images/project/inclusive_by_design.png"} alt={"inclusive_by_designy"}/>
                </div>
                <div className='project'>
                    <img ref={element} className='image left' src={"/images/project/data_storytelling.png"} alt={"data_storytelling"}/>
                    <div className='contents right'>
                        <div ref={element} className='title'>Data Storytelling</div>                       
                        <div ref={element} className='description'>We view data as a lens to better understand our human nature and various aspects of society. We believe that synthesizing data and storytelling in novel ways can generate fresh perspectives on people, organizations, culture, and society.</div>
                        <div className='more_holder'>
                            <Link ref={element} to="/project/data" className='more'>See More</Link>
                        </div>                   
                    </div>
                </div>                                                              
            </div>
            <Footer/>
        </>
    )
}
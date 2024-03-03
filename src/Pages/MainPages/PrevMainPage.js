import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import './page.css';

export const MainPage = (props) => {
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
            <div>
                <video autoPlay muted playsInline className='main'>
                    <source src={"/main.mp4"} type="video/mp4" alt="main"/>                    
                </video>
                <video autoPlay muted playsInline className='main_mobile'>
                    <source src={"/main_mobile.mp4"} type="video/mp4" alt="main"/>                    
                </video>
                <div className='main_links'>
                    <Link to="/about" ref={element} className='aboutlink mainlink'>
                        <span>About</span>
                    </Link>
                    <Link to="/people" ref={element} className='peoplelink mainlink'>
                        <span>People</span>
                    </Link>
                    <Link to="/project" ref={element} className='projectlink mainlink'>
                        <span>Project</span>
                    </Link>
                    <Link to="/publication" ref={element} className='publicationlink mainlink'>
                        <span>Publication</span>
                    </Link>
                    <Link to="/course" ref={element} className='courselink mainlink'>
                        <span>Course</span>
                    </Link>
                </div>
            </div>
        </>
    )
}
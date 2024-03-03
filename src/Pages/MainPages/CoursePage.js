import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import coursedata from '../../Data/course.json';

export const CoursePage = (props) => {

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
                <div ref={element} className='title'>Course</div>
                <div className='courseContainer'>
                    {coursedata.map(course => 
                        <div className='course' key={course.title}>
                            <div ref={element} className='title'>{course.title}</div>
                            <div ref={element} className='description'>{course.description}</div>
                            <div ref={element} className='periodlist'>
                                {course.courses.map(period => (period.url ? <div className='period' href={period.url} key={period.period}>• &nbsp;{period.period}</div> : <div className='period' key={period.period}>• &nbsp;{period.period}</div>))}
                            </div>
                        </div>
                    )}        
                </div>
            </div>
            <Footer/>
        </>
    )
}
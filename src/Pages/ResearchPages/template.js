import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import './pages.css';

// 페이지 명을 본인의 연구가 포함되는 페이지 명으로 수정하셔야 합니다 TemplatePage => AQUAresearchPage
export const TemplatePage = (props) => {
    const element = useCallback((node) => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.1,
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
                <div ref={element} className='title'>Research Title</div>
                <img ref={element} className='research_banner' src={"/images/project/data_storytelling.png"} alt={"data_storytelling"}/>
                <div ref={element} className='research_description'>We view data as a lens to better understand our human nature and various aspects of society. We believe that synthesizing data and storytelling in novel ways can generate fresh perspectives on people, organizations, culture, and society. Through our unique methodology of collecting personal experiences, developing datasets, and visualizing data as designers, we strive to reveal the narratives that lie beneath the numbers and statistics.</div>
            </div>
            <Footer/>
        </>
    )
}
import React, { useCallback } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import peopledata from '../../Data/people.json';
import './page.css';

export const PeoplePage = (props) => {
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
            {/* <div className='banner'>
                <div ref={element} className='title'>We Are DxD</div>
                <img src={"/images/banner.png"} alt="banner"/>
            </div> */}
            <div className='page'>
                <div ref={element} className='title'><span>• PEOPLE •</span></div>
                <div className='container'>
                    {peopledata.filter(person => person.current === true).map(person => 
                    <div className='person' key={person.name}>
                        <img ref={element} className='image' src={"/images/people/" + person.image} alt={person.name}/>
                        <p ref={element}className='name'>{person.name}</p>
                        <p ref={element} className='position'>{person.position}</p>
                        {person.homepage === "" ?  null : 
                            <a className='link' href={person.homepage}><img className='linkBtn' ref={element} src={`${process.env.PUBLIC_URL}/icons/home.svg`} alt="home link" /></a>
                        }
                    </div>)}
                </div>
                {/* <div ref={element} className='title'>Alumni</div> */}
                <img className='line' ref={element} src={`${process.env.PUBLIC_URL}/icons/line.svg`} alt="line" />
                <div className='container'>
                    {peopledata.filter(person => person.current === false).map(person => 
                    <div className='person alumni' key={person.name}>
                        <img ref={element} className='image' src={"/images/people/" + person.image} alt={person.name}/>
                        <p ref={element}className='name'>{person.name}</p>
                        <p ref={element} className='position'>{person.position}</p>
                        {person.homepage === "" ?  null : 
                            <a className='link' href={person.homepage}><img className='linkBtn' ref={element} src={`${process.env.PUBLIC_URL}/icons/home.svg`} alt="home link" /></a>
                        }
                    </div>)}    
                </div>                
            </div>
            <Footer/>
        </>
    )
}
import React, { useCallback, useState, useEffect } from 'react';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import coursedata from '../../Data/course.json';
import newsdata from '../../Data/news.json';


export const MainPage = (props) => {

  const [newsOn, setNewsOn] = useState(false);
  const [newsNum, setNewsNum] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200 ) {
        setNewsNum(8);
      }
      else if (window.innerWidth >= 800) {
        setNewsNum(6);
      }
      else {
        setNewsNum(4);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  function newsToggle() {
    setNewsOn(!newsOn);
  }

  return(
      <>
          <Navbar/>
          <div className='banner'>
              <div ref={element} className='title'>DATA &nbsp;INTERACTION &nbsp;DESIGN</div>
              <div ref={element} className='description'>DxD Lab is a human-computer interaction research <br/> group in the Industrial Design Department at KAIST </div>
              <img src={"/images/banner.png"} alt="banner"/>
          </div>
          <div className='page aboutpage'>
              <div className='abouts'>
                  <div className='description'>
                    <div ref={element} className='maintext'>
                      <b>DxD stands for Design, Interaction, and Data where we explore design from, with, and by data.</b><br/>
                      Our mission is to build a more inclusive society by understanding the social impact of data and AI and by making technology accountable and accessible. We seek to explore where data and design intersect, with current research projects mainly lying within the subjects of digital health, inclusive AI/algorithms, and design futures.
                    </div>
                    <div className='researcharea'>
                      <div ref={element} className='title'>RESEARCH AREAS</div>
                      <div className='areas'>
                        <div ref={element} className='area'>HCI</div>
                        <div ref={element} className='area'>AI</div>
                        <div ref={element} className='area'>DIGITAL HEALTH</div>
                      </div>
                    </div>
                  </div>
                  <img ref={element} src={"/images/thumbnail.png"} alt="thumbnail"/>
              </div>
              <div ref={element} className='title'>• NEWS •</div>
              <div className= {newsOn ?'newsContainer' : 'newsContainer Wrap'}>
                { newsOn ?
                    (newsdata.map((news, index) => 
                      <div className='news' key={news.content}>
                        <img ref={element} className='image' src={"/images/news/" + news.image} alt={news.content}/>
                        <div ref={element} className='date'>{news.date}</div>
                        <div ref={element} className='newscontents'>{news.content}</div>
                      </div>
                    ))
                  :
                  (newsdata.map((news, index) => {
                    return index < newsNum ? 
                    (<div className='news' key={news.content}>
                      <img ref={element} className='image' src={"/images/news/" + news.image} alt={news.content}/>
                      <div ref={element} className='date'>{news.date}</div>
                      <div ref={element} className='newscontents'>{news.content}</div>
                    </div>)
                    :
                    null;
                  }))
                }
              </div>
              <div ref={element} className='newstoggle' onClick={newsToggle}>
                {
                  newsOn ? 
                  <>Show Less</> 
                  : 
                  <>Show More</>
                }  
              </div> 

              <div ref={element} className='title'>• COURSE •</div>
              <div className='courseContainer'>
                  {coursedata.map(course => 
                      <div className='course' key={course.title}>
                          <div ref={element} className='title'>{course.id}</div>
                          <div ref={element} className='title'>{course.title}</div>
                          <div ref={element} className='description'>{course.description}</div>
                          <div ref={element} className='periodlist'>
                              {course.courses.map(period => (period.url ? <div className='period' href={period.url} key={period.period}>• &nbsp;{period.period}</div> : <div className='period' key={period.period}>• &nbsp;{period.period}</div>))}
                          </div>
                      </div>
                  )}     
              </div>
              <div ref={element} className='title'>• CONTACT US •</div>
              <div className='contactContainer'>
                <div  ref={element} className='contact'>
                  <div className='title'>DxD Lab</div>
                  <div>Room 304, Dept. of Industrial Design, KAIST 291 Daehak-ro, Yuseong-gu, Daejeon 34141, Republic of Korea</div>
                  <a className='button' href='https://maps.app.goo.gl/sP7Bp7KrpDLca7ec6'>Google Map</a>
                  <div className='title'>Email</div>
                  <div>Prof. Hwajung Hong : hwajung@kaist.ac.kr</div>
                  <div>Lab Mail: dxd.kaist@gmail.com</div>
                </div>
                <img ref={element} className='map' src={"/images/map.png"} alt='map'/>
              </div>
          </div>
          <Footer/>
      </>
  )
}
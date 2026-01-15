import React, { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import { NewsContainer } from "../../Components/NewsContainer/NewsContainer";
import coursedata from "../../Data/course.json";

export const MainPage = (props) => {
  const [newsNum, setNewsNum] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setNewsNum(8);
      } else if (window.innerWidth >= 800) {
        setNewsNum(6);
      } else if (window.innerWidth >= 450) {
        setNewsNum(3);
      } else {
        setNewsNum(4);
      }
    };

    // Call handleResize immediately to set correct initial newsNum based on window width
    handleResize();

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const element = useCallback((node) => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 50%가 viewport에 들어와 있어야 callback 실행
    };

    if (node && node.nodeType === Node.ELEMENT_NODE) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animation");
          } else {
            entry.target.classList.remove("animation");
          }
        });
      }, options);

      observer.observe(node);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="banner">
        <div ref={element} className="title">
          DATA &nbsp;INTERACTION &nbsp;DESIGN
        </div>
        <div ref={element} className="description">
          DxD Lab is a Human-Computer Interaction research <br />
          group in the Department of Industrial Design at KAIST
        </div>
        <img src={"/images/banner.png"} alt="banner" />
      </div>
      <div className="page aboutpage">
        <div className="abouts">
          <div className="description">
            <div ref={element} className="maintext">
              <b>
                DxD stands for Design, Interaction, and Data where we explore
                design from, with, and by data.
              </b>
              <br />
              {/* Our mission is to build a more inclusive and healthy society by
              shaping the future of human-AI partnership. We design, build, and
              evaluate novel experiences and interactive systems that align
              complex AI with human values and augment human capability. We
              advance the fundamental methods of AI interaction, from designing
              human-AI collectives to building socio-technical auditing
              frameworks. Grounded in our identity as design researchers, we
              apply this deep technical focus to high-stakes domains, pioneering
              new experiences for digital mental health and developing inclusive
              technologies for and with neurodiverse populations. */}
              Our mission is to build a more inclusive and healthy society by
              shaping the future of human-AI partnership. We design, build and
              evaluate interactive systems that align AI with human values and
              augment human capability. As design researchers, we advance
              fundamental methods of AI interaction and apply them to
              high-stakes domains, pioneering new experiences for digital mental
              health and developing inclusive technologies for and with
              neurodiverse populations.
            </div>
            <div className="researcharea">
              <div ref={element} className="title">
                RESEARCH AREAS
              </div>
              <div className="areas">
                <div ref={element} className="area">
                  HCI
                </div>
                <div ref={element} className="area">
                  AI
                </div>
                <div ref={element} className="area">
                  DIGITAL HEALTH
                </div>
              </div>
            </div>
          </div>
          <img ref={element} src={"/images/thumbnail.png"} alt="thumbnail" />
        </div>
        <NewsContainer limit={newsNum} showTitle={true} />
        <Link to="/news" ref={element} className="newstoggle">
          View All News
        </Link>

        {/* <div ref={element} className="title">
          • COURSE •
        </div>
        <div className="courseContainer">
          {coursedata.map((course) => (
            <div className="course" key={course.title}>
              <div ref={element} className="title">
                {course.id}
              </div>
              <div ref={element} className="title">
                {course.title}
              </div>
              <div ref={element} className="description">
                {course.description}
              </div>
              <div ref={element} className="periodlist">
                {course.courses.map((period) =>
                  period.url ? (
                    <div
                      className="period"
                      href={period.url}
                      key={period.period}
                    >
                      • &nbsp;{period.period}
                    </div>
                  ) : (
                    <div className="period" key={period.period}>
                      • &nbsp;{period.period}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div> */}
        <div ref={element} className="title">
          • CONTACT US •
        </div>
        <div className="contactContainer">
          <div ref={element} className="contact">
            <div className="title">DxD Lab</div>
            <div>
              Room 304, Dept. of Industrial Design, KAIST 291 Daehak-ro,
              Yuseong-gu, Daejeon 34141, Republic of Korea
            </div>
            <a
              className="button"
              href="https://maps.app.goo.gl/sP7Bp7KrpDLca7ec6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Map
            </a>
            <div className="title">Email</div>
            <div>Prof. Hwajung Hong : hwajung@kaist.ac.kr</div>
            <div>Lab Mail: dxd.kaist@gmail.com</div>
          </div>
          <img
            ref={element}
            className="map"
            src={"/images/map.png"}
            alt="map"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

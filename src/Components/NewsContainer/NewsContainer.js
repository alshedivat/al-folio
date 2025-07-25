import React, { useCallback } from "react";
import newsdata from "../../Data/news.json";

export const NewsContainer = ({ limit, showTitle = false }) => {
  const element = useCallback((node) => {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1, // 10% of element must be visible to trigger animation
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

  const displayedNews = limit ? newsdata.slice(0, limit) : newsdata;

  return (
    <>
      {showTitle && (
        <div ref={element} className="title">
          • NEWS •
        </div>
      )}
      <div className="newsContainer">
        {displayedNews.map((news, index) => (
          <div className="news" key={news.content}>
            <img
              ref={element}
              className="image"
              src={"/images/news/" + news.image}
              alt={news.content}
            />
            <div ref={element} className="date">
              {news.date}
            </div>
            <div 
              ref={element} 
              className="newscontents"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
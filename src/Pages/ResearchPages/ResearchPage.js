import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import publicationData from '../../Data/bib.json';
import './pages.css';

export const ResearchPage = () => {
    const { id } = useParams();
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Find the publication with the matching ID
        // Assuming ID is the index in the array
        const index = parseInt(id);
        if (!isNaN(index) && index >= 0 && index < publicationData.length) {
            setPublication(publicationData[index]);
        } else {
            // Try to find by matching some other field like pdf or title
            const foundPublication = publicationData.find(pub => 
                pub.pdf === id || 
                pub.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
            );
            setPublication(foundPublication || null);
        }
        setLoading(false);
    }, [id]);

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
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : publication ? (
                    <>
                        {/* Display publication venue above the title */}
                        <div ref={element} className='publication-venue'>
                            {/* Display venue and year */}
                            {publication.venue}
                        </div>
                        
                        {/* Check if the publication title contains a colon */}
                        {publication.title.includes(':') ? (
                            <>
                                {/* If title has colon, split it and display the first part as title */}
                                <div ref={element} className='publication-title'>
                                    {/* Extract the part before the colon */}
                                    {publication.title.split(':')[0]}
                                </div>
                                {/* Display the part after the colon as subtitle */}
                                <div ref={element} className='publication-subtitle'>
                                    {/* Extract the part after the colon and trim any leading whitespace */}
                                    {publication.title.split(':')[1].trim()}
                                </div>
                            </>
                        ) : (
                            /* If no colon in title, display the entire title as subtitle */
                            <div ref={element} className='publication-subtitle'>{publication.title}</div>
                        )}
                        <div ref={element} className='publication-meta'>
                            {/* Display only authors in the metadata section */}
                            <div className='publication-authors'>{publication.author}</div>
                        </div>
                    </>
                ) : (
                    <div className="not-found">Publication not found</div>
                )}
            </div>
            <Footer/>
        </>
    )
}
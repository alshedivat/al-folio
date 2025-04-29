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
                        <div ref={element} className='publication-title'>{publication.title}</div>
                        <div ref={element} className='publication-meta'>
                            <div className='publication-authors'>{publication.author}</div>
                            <div className='publication-venue'>{publication.venue} ({publication.year})</div>
                        </div>
                        {publication.pdf && (
                            <img 
                                ref={element} 
                                className='research_banner' 
                                src={`/images/publications/${publication.pdf}.png`} 
                                alt={publication.title}
                            />
                        )}
                        <div ref={element} className='research_description'>
                            {/* Publication abstract or description would go here */}
                            This publication explores innovative approaches in the field 
                            of {publication.field?.join(', ')}.
                        </div>
                        {publication.doi && (
                            <div ref={element} className='publication-links'>
                                <a href={publication.doi} target="_blank" rel="noopener noreferrer">
                                    View Publication
                                </a>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="not-found">Publication not found</div>
                )}
            </div>
            <Footer/>
        </>
    )
}
import { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from '../../Components/Navbar/navbar';
import { Footer } from '../../Components/Footer/footer';
import { SegmentedControl } from '../../Components/SegmentedButton/segmentedbutton';
import bibdata from '../../Data/bib.json';

export const PublicationPage = (props) => {
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

    const [isMobile, setIsMobile] = useState(Number(window.innerWidth <= 992));
    const label = [["Digital Health and Wellbeing", "Human-AI Interaction", "Inclusive by Design", "Data Storytelling"], ["Health", "HAI", "Inclusive", "Data"]];

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(Number(window.innerWidth <= 992));
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);  

    const [fieldValue, setFieldValue] = useState("all");
    const [typeValue, setTypeValue] = useState("all");
    const [yearList, setYearList] = useState([]);

    function getYear(currentbib) {
        let newYearList = [];
        for (let i = 0; i < currentbib.length; i++) {
        if (currentbib[i].year && !newYearList.includes(currentbib[i].year)) {
                newYearList = [...newYearList, currentbib[i].year];
            }
        }
        return newYearList;
    }

    useEffect(() => {
        setYearList(getYear(bibdata));
    }, []);

    useEffect(() => {
        if (fieldValue !== "all" && typeValue !== "all") {
            setYearList(getYear(bibdata.filter(bib => bib.field === fieldValue && bib.type === typeValue)));
        } else if (fieldValue !== "all") {
            setYearList(getYear(bibdata.filter(bib => bib.field === fieldValue)));
        } else if (typeValue !== "all") {
            setYearList(getYear(bibdata.filter(bib => bib.type === typeValue)));
        } else {
            setYearList(getYear(bibdata));
        }
    }, [fieldValue, typeValue]);
    
    return(
        <>
            <Navbar/>        
            <div className='page'>
                <div ref={element} className='title'>• PUBLICATIONS •</div>
                <div ref={element} className="selection">
                    <SegmentedControl
                        name="field"
                        callback={(val) => setFieldValue(val)}
                        controlRef={useRef()}
                        segments={[
                        {
                            label: "All",
                            value: "all",
                            ref: useRef()
                        },
                        {
                            label: label[isMobile][0],
                            value: "health",
                            ref: useRef()
                        },
                        {
                            label: label[isMobile][1],
                            value: "hai",
                            ref: useRef()
                        },
                        {
                            label: label[isMobile][2],
                            value: "inclusive",
                            ref: useRef()
                        },
                        {
                            label: label[isMobile][3],
                            value: "data",
                            ref: useRef()
                        },
                        {
                            label: "Others",
                            value: "others",
                            ref: useRef()
                        }
                        ]}
                    />
                    <SegmentedControl
                        name="type"
                        callback={(val) => setTypeValue(val)}
                        controlRef={useRef()}
                        segments={[
                        {
                            label: "All",
                            value: "all",
                            ref: useRef()
                        },
                        {
                            label: "Conference",
                            value: "conference",
                            ref: useRef()
                        },
                        {
                            label: "Journal",
                            value: "journal",
                            ref: useRef()
                        },
                        {
                            label: "Workshop",
                            value: "workshop",
                            ref: useRef()
                        },
                        {
                            label: "Poster",
                            value: "poster",
                            ref: useRef()
                        }
                        ]}
                    />                    
                </div>
                <div className="publications">
                    {yearList.map(year =>
                        <div key ={year}>
                            <div ref={element} className="year">{year}</div>
                            {bibdata.filter(bib => bib.year === year).map(bib =>
                                (fieldValue === "all" || bib.field === fieldValue) && (typeValue === "all" || bib.type === typeValue)?
                                <div className="bibliography" key ={bib.title + bib.author}>
                                    <div ref={element} className="title">{bib.title}</div>
                                    <div ref={element} className="author">{bib.author}</div>
                                    <div ref={element} className="others">
                                        <div className="venue">{bib.venue}</div>
                                        {bib.pdf ? <div className="other">&nbsp; • &nbsp;<a href={"/pdf/" + bib.pdf + ".pdf"}>PDF</a></div> : null}
                                        {bib.doi ? <div className="other">&nbsp; • &nbsp;<a href={bib.doi}>DOI</a></div> : null}
                                        {bib.bibtex ? <div className="other">&nbsp; • &nbsp;<a href={"/bib/" + bib.bibtex + ".bib"}>BibTeX</a></div> : null}
                                        {bib.recording ? <div className="other">&nbsp; • &nbsp;<a href={bib.recording}>talk recording</a></div> : null}
                                    </div>
                                </div>
                                : null                                   
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </>
    )
}
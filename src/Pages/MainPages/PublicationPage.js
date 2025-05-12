import { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import { SegmentedControl } from "../../Components/SegmentedButton/segmentedbutton";
import bibdata from "../../Data/bib.json";
import peopleData from "../../Data/people.json";
import { Link } from "react-router-dom";

export const PublicationPage = (props) => {
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

  const [isMobile, setIsMobile] = useState(Number(window.innerWidth <= 992));
  const label = [
    [
      "Digital Health and Wellbeing",
      "Human-AI Interaction",
      "Inclusive by Design",
      "Data Storytelling",
    ],
    ["Health", "HAI", "Inclusive", "Data"],
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Number(window.innerWidth <= 992));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [fieldValue, setFieldValue] = useState("all");
  const [typeValue, setTypeValue] = useState("all");
  const [yearList, setYearList] = useState([]);

  // Create a array of DxD Lab member names for quick lookup
  const [dxdLabMembers, setDxdLabMembers] = useState([]);

  useEffect(() => {
    // Extract all lab member names (both current and former)
    // Normalize names to lowercase for case-insensitive comparison
    const memberNames = peopleData.map((person) =>
      person.name.toLowerCase().trim(),
    );
    setDxdLabMembers(memberNames);
  }, []);

  // Function to highlight DxD Lab members in author lists
  const highlightLabMembers = (authorString) => {
    if (!authorString) return "";

    // Split the author string by comma and handle "and" in the last author
    const authorList = authorString.split(", ");
    let lastAuthor = authorList[authorList.length - 1];

    // Check if the last author contains " and "
    if (lastAuthor && lastAuthor.includes(" and ")) {
      // Split the last entry by " and "
      const lastSplit = lastAuthor.split(" and ");
      // Remove the last entry with "and"
      authorList.pop();
      // Add the split parts separately
      authorList.push(lastSplit[0]);
      authorList.push(lastSplit[1]);
    }

    // Process each author name and apply underlining if they are a lab member
    return authorList.map((author, index) => {
      // Case-insensitive comparison
      const isLabMember = dxdLabMembers.includes(author.trim().toLowerCase());

      return (
        <span key={index}>
          {index > 0 ? ", " : ""}
          {isLabMember ? (
            <span style={{ fontWeight: "bold" }}>{author}</span>
          ) : (
            author
          )}
        </span>
      );
    });
  };

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
      setYearList(
        getYear(
          bibdata.filter(
            (bib) => bib.field.includes(fieldValue) && bib.type === typeValue,
          ),
        ),
      );
    } else if (fieldValue !== "all") {
      setYearList(
        getYear(bibdata.filter((bib) => bib.field.includes(fieldValue))),
      );
    } else if (typeValue !== "all") {
      setYearList(getYear(bibdata.filter((bib) => bib.type === typeValue)));
    } else {
      setYearList(getYear(bibdata));
    }
  }, [fieldValue, typeValue]);

  return (
    <>
      <Navbar />
      <div className="page">
        <div ref={element} className="title">
          • PUBLICATIONS •
        </div>
        <div ref={element} className="selection">
          <SegmentedControl
            name="field"
            callback={(val) => setFieldValue(val)}
            controlRef={useRef()}
            segments={[
              {
                label: "All",
                value: "all",
                ref: useRef(),
              },
              {
                label: label[isMobile][0],
                value: "health",
                ref: useRef(),
              },
              {
                label: label[isMobile][1],
                value: "hai",
                ref: useRef(),
              },
              {
                label: label[isMobile][2],
                value: "inclusive",
                ref: useRef(),
              },
              {
                label: label[isMobile][3],
                value: "data",
                ref: useRef(),
              },
              {
                label: "Others",
                value: "others",
                ref: useRef(),
              },
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
                ref: useRef(),
              },
              {
                label: "Conference",
                value: "conference",
                ref: useRef(),
              },
              {
                label: "Journal",
                value: "journal",
                ref: useRef(),
              },
              {
                label: "Workshop",
                value: "workshop",
                ref: useRef(),
              },
              {
                label: "Poster",
                value: "poster",
                ref: useRef(),
              },
            ]}
          />
        </div>
        <div className="publications">
          {yearList.map((year) => (
            <div key={year}>
              <div ref={element} className="year">
                {year}
              </div>
              {bibdata
                .filter((bib) => bib.year === year)
                .map((bib) =>
                  (fieldValue === "all" || bib.field.includes(fieldValue)) &&
                  (typeValue === "all" || bib.type === typeValue) ? (
                    <div className="bibliography" key={bib.title + bib.author}>
                      <div ref={element} className="title">
                        {bib.title}
                      </div>
                      <div ref={element} className="author">
                        {highlightLabMembers(bib.author)}
                      </div>
                      <div ref={element} className="others">
                        <div className="venue">{bib.venue}</div>
                        {bib.award && (
                          <span
                            style={{
                              backgroundColor:
                                "rgb(255, 243, 131)" /* badge background color */,
                              borderRadius:
                                "9999px" /* fully rounded container */,
                              padding:
                                "1px 8px" /* smaller vertical/horizontal padding */,
                              marginLeft: "4px" /* reduced space from title */,
                              fontSize: "0.7em" /* smaller font size */,
                              fontWeight: "bold" /* bold text for emphasis */,
                              display:
                                "inline-block" /* inline-block for positioning */,
                            }}
                          >
                            🏆 {bib.award}
                          </span>
                        )}
                        {bib.web && (
                          <div className="other">
                            &nbsp; • &nbsp;
                            <Link
                              to={`/publication/${bib.pdf}`}
                              target="_blank"
                            >
                              WEB
                            </Link>
                          </div>
                        )}
                        {bib.pdf ? (
                          <div className="other">
                            &nbsp; • &nbsp;
                            <a href={"/pdf/" + bib.pdf + ".pdf"}>PDF</a>
                          </div>
                        ) : null}
                        {bib.doi ? (
                          <div className="other">
                            &nbsp; • &nbsp;<a href={bib.doi}>DOI</a>
                          </div>
                        ) : null}
                        {bib.bibtex ? (
                          <div className="other">
                            &nbsp; • &nbsp;
                            <a href={"/bib/" + bib.bibtex + ".bib"}>BibTeX</a>
                          </div>
                        ) : null}
                        {bib.recording ? (
                          <div className="other">
                            &nbsp; • &nbsp;
                            <a href={bib.recording}>talk recording</a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null,
                )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

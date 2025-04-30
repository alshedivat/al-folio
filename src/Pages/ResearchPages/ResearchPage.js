import React, { useCallback, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/navbar";
import { Footer } from "../../Components/Footer/footer";
import { NotFound } from "../../Components/NotFound/NotFound";

// Import data sources
import publicationData from "../../Data/bib.json";
import peopleData from "../../Data/people.json";

// Import styles
import "./pages.css";

export const ResearchPage = () => {
  const { id } = useParams();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  // State to hold the loaded BibTeX text
  const [bibtexText, setBibtexText] = useState("");
  // State to track loading status for BibTeX
  const [bibtexLoading, setBibtexLoading] = useState(false);
  // State to track error status for BibTeX
  const [bibtexError, setBibtexError] = useState(null);
  // State to show 'Copied!' message
  const [bibtexCopied, setBibtexCopied] = useState(false);

  useEffect(() => {
    // Find the publication with the matching ID
    // Assuming ID is the index in the array
    const index = parseInt(id);
    if (!isNaN(index) && index >= 0 && index < publicationData.length) {
      setPublication(publicationData[index]);
    } else {
      // Try to find by matching some other field like pdf or title
      const foundPublication = publicationData.find(
        (pub) =>
          pub.pdf === id ||
          pub.title.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
      );
      setPublication(foundPublication || null);
    }
    setLoading(false);
  }, [id]);

  // Effect to fetch BibTeX file if publication.bibtex exists
  useEffect(() => {
    // Only fetch if bibtex field is present
    if (publication && publication.bibtex) {
      // Start loading
      setBibtexLoading(true);
      setBibtexError(null);
      // Construct the file path
      const bibtexPath = `/bib/${publication.bibtex}.bib`;
      // Fetch the BibTeX file from the public directory
      fetch(bibtexPath)
        .then((res) => {
          if (!res.ok) throw new Error("BibTeX file not found");
          return res.text();
        })
        .then((text) => {
          setBibtexText(text);
          setBibtexLoading(false);
        })
        .catch((err) => {
          setBibtexError("BibTeX 파일을 불러올 수 없습니다.");
          setBibtexText("");
          setBibtexLoading(false);
        });
    } else {
      // Reset if no bibtex
      setBibtexText("");
      setBibtexLoading(false);
      setBibtexError(null);
    }
  }, [publication]);

  const element = useCallback((node) => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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

  // Handler for copying BibTeX to clipboard
  const handleCopyBibtex = useCallback(() => {
    // Only copy if bibtexText is available and not loading/error
    if (bibtexText && !bibtexLoading && !bibtexError) {
      // Use the Clipboard API to copy text
      navigator.clipboard.writeText(bibtexText).then(() => {
        // Show the 'Copied!' message (persistent)
        setBibtexCopied(true);
      });
    }
  }, [bibtexText, bibtexLoading, bibtexError]);

  return (
    <>
      <Navbar />
      <div className="page">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : publication && publication.web ? (
          <>
            {/* Display publication venue above the title */}
            <div ref={element} className="publication-venue">
              {/* Display venue and year */}
              {publication.venue}
              {/* If there is an award, display the badge next to the venue */}
              {publication.award && (
                <span className="award-badge">
                  {/* Trophy emoji and award text */}
                  🏆 {publication.award}
                </span>
              )}
            </div>

            {/* Check if the publication title contains a colon */}
            {publication.title.includes(":") ? (
              <>
                {/* If title has colon, split it and display the first part as title */}
                <div ref={element} className="publication-title">
                  {/* Extract the part before the colon */}
                  {publication.title.split(":")[0]}
                </div>
                {/* Display the part after the colon as subtitle */}
                <div ref={element} className="publication-subtitle">
                  {/* Extract the part after the colon and trim any leading whitespace */}
                  {publication.title.split(":")[1].trim()}
                </div>
              </>
            ) : (
              /* If no colon in title, display the entire title as subtitle */
              <div ref={element} className="publication-subtitle">
                {publication.title}
              </div>
            )}
            {/* Author profiles with circular images */}
            <div ref={element} className="author-profiles-container">
              {/* Group authors into rows of maximum 5 */}
              {(() => {
                // Split author names by comma
                const authors = publication.author.split(", ");
                // Calculate number of authors per row (max 5)
                const authorsPerRow = Math.min(5, authors.length);
                // Calculate number of rows needed
                const numRows = Math.ceil(authors.length / authorsPerRow);
                // Create an array of rows
                const rows = [];

                // Distribute authors into rows
                for (let i = 0; i < numRows; i++) {
                  // Get authors for this row (up to authorsPerRow)
                  const rowAuthors = authors.slice(
                    i * authorsPerRow,
                    (i + 1) * authorsPerRow,
                  );
                  // Add row to rows array
                  rows.push(rowAuthors);
                }

                // Return the JSX for all rows
                return rows.map((row, rowIndex) => {
                  // Calculate width percentage for each author in this row
                  // Each author in a row will take an equal proportion of the available width
                  const widthPercent = 100 / row.length;

                  return (
                    // Create a row container
                    <div key={`row-${rowIndex}`} className="author-row">
                      {/* Map each author in the row to a profile */}
                      {row.map((authorName, authorIndex) => {
                        // Calculate the global author index for affiliation
                        const globalAuthorIndex =
                          rowIndex * authorsPerRow + authorIndex;

                        // Check if the author is in the people.json file
                        const labMember = peopleData.find(
                          (person) => person.name === authorName,
                        );

                        // Get the author's affiliation if available
                        // Split affiliations by comma to match with authors
                        const authorAffiliation = publication.affiliation
                          ? publication.affiliation.split(", ")[
                              globalAuthorIndex
                            ]
                          : null;

                        // Return the author profile with dynamic width based on number of authors in row
                        return (
                          <div
                            key={`author-${rowIndex}-${authorIndex}`}
                            className="author-profile"
                            style={{ width: `${widthPercent}%` }}
                          >
                            {/* Profile content wrapper for better alignment */}
                            <div className="profile-content">
                              {/* Circular image container */}
                              <div className="author-image-container">
                                {/* Use lab member image if available, otherwise use placeholder */}
                                <img
                                  className="author-image"
                                  src={
                                    labMember
                                      ? `/images/people/${labMember.image}`
                                      : "/images/people/human-placeholder.png"
                                  }
                                  alt={authorName}
                                />
                              </div>

                              {/* Author details container */}
                              <div className="author-details">
                                {/* Author name with special formatting for lab members */}
                                <div
                                  className={`author-name ${
                                    labMember ? "lab-member" : ""
                                  }`}
                                >
                                  {authorName}
                                </div>

                                {/* Author affiliation if available */}
                                {authorAffiliation && (
                                  <div className="author-affiliation">
                                    {authorAffiliation}
                                  </div>
                                )}

                                {/* Homepage link for lab members */}
                                {labMember &&
                                  labMember.homepage &&
                                  labMember.homepage !== "" && (
                                    <div className="author-homepage">
                                      <a
                                        href={labMember.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          className="homepage-icon"
                                          src="/icons/home.svg"
                                          alt="Homepage"
                                        />
                                      </a>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()}
            </div>

            {/* Horizontal line */}
            <img className="animation" src="/icons/line.svg" alt="line" />

            {/* If there is a video, display the video player centered below the line */}
            {publication.video && publication.video !== "" && (
              <>
                <div ref={element} className="responsive-video-container">
                  {/* Responsive video player: width 100%, always centered */}
                  <video
                    className="responsive-video"
                    controls
                    poster="/icons/video-placeholder.svg"
                  >
                    <source
                      src={`/videos/${publication.video}.mp4`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                {/* Add another horizontal line below the video if video exists */}
                <img className="animation" src="/icons/line.svg" alt="line" />
              </>
            )}

            {publication.abstract && (
              <>
                <div ref={element} className="section-container">
                  {/* Abstract section title, always shown below the last horizontal line */}
                  <div ref={element} className="section-title">
                    {/* Section title for the abstract, styled to match publication-title */}
                    Abstract
                  </div>
                  {/* Render the publication's abstract below the section title if available */}
                  <div ref={element} className="publication-abstract">
                    {/* The abstract text from the publication data */}
                    {publication.abstract}
                  </div>
                </div>
                {/* Add another horizontal line below the abstract */}
                <img className="animation" src="/icons/line.svg" alt="line" />
              </>
            )}

            {publication.bibtex && (
              <>
                <div ref={element} className="section-container animation">
                  {/* Section title for the bibtex citation, styled to match publication-title */}
                  <div ref={element} className="section-title">
                    Cite This Work
                  </div>
                  {/* BibTeX code block in a styled container, clickable for copy */}
                  <pre
                    className="bibtex-container"
                    tabIndex={0}
                    role="button"
                    aria-label="Copy BibTeX to clipboard"
                    title="Click to copy BibTeX"
                    onClick={handleCopyBibtex}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        handleCopyBibtex();
                    }}
                    style={{
                      cursor:
                        bibtexText && !bibtexLoading && !bibtexError
                          ? "pointer"
                          : "default",
                    }}
                  >
                    {/* Show green Copied! message inside the bibtex container when copied */}
                    {bibtexCopied && (
                      <div
                        className="bibtex-copied-message"
                        role="status"
                        aria-live="polite"
                      >
                        Copied!
                      </div>
                    )}
                    {/* Show loading, error, or the BibTeX text */}
                    {bibtexLoading
                      ? "Loading..."
                      : bibtexError
                      ? bibtexError
                      : bibtexText}
                  </pre>
                </div>
              </>
            )}
          </>
        ) : (
          /* Display the 404 NotFound component when publication is not found */
          <NotFound />
        )}
      </div>
      <Footer />
    </>
  );
};

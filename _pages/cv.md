---
layout: page
title: cv
permalink: /cv/
nav: true
nav_order: 2
---

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Load CS papers
    fetch('/assets/json/cs_papers.json')
        .then(response => response.json())
        .then(papers => {
            const container = document.getElementById('cs-papers-container');
            papers.forEach(paper => {
                const paperDiv = createPaperElement(paper, false);
                container.appendChild(paperDiv);
            });
        })
        .catch(error => console.error('Error loading CS papers:', error));

    // Load Philosophy papers
    fetch('/assets/json/philosophy_papers.json')
        .then(response => response.json())
        .then(papers => {
            const container = document.getElementById('philosophy-papers-container');
            papers.forEach(paper => {
                const paperDiv = createPaperElement(paper, true);
                container.appendChild(paperDiv);
            });
        })
        .catch(error => console.error('Error loading philosophy papers:', error));

    function createPaperElement(paper, isPhilosophy) {
        const paperDiv = document.createElement('div');
        paperDiv.className = 'paper-item-compact';
        
        let authorText = paper.authors.map(author => 
            author.includes('Andre Ye') ? `<strong>${author}</strong>` : author
        ).join(', ');

        // Create icon links
        let iconLinksHtml = '';
        if (paper.paper_link) {
            iconLinksHtml += `
                <div class="icon-link" data-tooltip="Paper Link">
                    <a href="${paper.paper_link}" target="_blank">
                        <i class="fas fa-file-alt"></i>
                    </a>
                </div>`;
        }
        if (paper.slides_link) {
            iconLinksHtml += `
                <div class="icon-link" data-tooltip="Slides">
                    <a href="${paper.slides_link}" target="_blank">
                        <i class="fas fa-file-powerpoint"></i>
                    </a>
                </div>`;
        }
        if (paper.poster_link) {
            iconLinksHtml += `
                <div class="icon-link" data-tooltip="Poster">
                    <a href="${paper.poster_link}" target="_blank">
                        <i class="fas fa-image"></i>
                    </a>
                </div>`;
        }
        if (paper.presentation_link) {
            iconLinksHtml += `
                <div class="icon-link" data-tooltip="Presentation">
                    <a href="${paper.presentation_link}" target="_blank">
                        <i class="fas fa-play-circle"></i>
                    </a>
                </div>`;
        }

        let awardHtml = paper.award ? `<div class="paper-award-compact">${paper.award}</div>` : '';
        
        let imageHtml = '';
        if (paper.image_url) {
            imageHtml = `<div class="paper-image-large"><img src="${paper.image_url}" alt="${paper.title}"></div>`;
        }

        paperDiv.innerHTML = `
            <div class="paper-content-wrapper">
                ${imageHtml}
                <div class="paper-main-content">
                    <div class="paper-title-compact">${paper.title}</div>
                    <div class="paper-authors-compact">${authorText}</div>
                    <div class="paper-venue-compact">${paper.conference_full} (${paper.conference_abbrev}) ${paper.conference_year}</div>
                    ${awardHtml}
                </div>
                <div class="paper-icon-links">
                    ${iconLinksHtml}
                </div>
            </div>
        `;
        
        return paperDiv;
    }
});
</script>

<!-- Personal Blurb Space -->
I am an incoming PhD student at MIT EECS, advised by [Mitchell Gordon](https://mgordon.me/){:target="_blank"}.
I received by bachelor's in Computer Science (BS) and Philosophy (BA w/ honors) with minors in mathematics and history from the University of Washington.
In undergrad, I was very fortunate to be advised by [Amy Zhang](https://homes.cs.washington.edu/~axz/){:target="_blank"} and [Ranjay Krishna](https://www.ranjaykrishna.com/index.html){:target="_blank"} in CS and [Rose Novick](https://www.rosenovick.com/){:target="_blank"} in philosophy.
I was also mentored by [Jared Moore](https://jaredmoore.org/){:target="_blank"}, [Quan Ze (Jim) Chen](https://cqz.name/){:target="_blank"}, [Sebastin Santy](https://sebastinsanty.com/){:target="_blank"}, [Matt Wallingford](https://mattwallingford.github.io/){:target="_blank"}, [Carina Fourie](https://phil.washington.edu/people/carina-fourie){:target="_blank"}, and others.

<!-- CV Links -->
<div style="text-align: center; margin: 2rem 0;">
<a href="/assets/pdf/Ye-Resume-Updated.pdf" target="_blank" style="display: inline-block; margin-right: 1rem; margin-bottom: 0.5rem; padding: 0.5rem 1rem; background-color: var(--global-theme-color); color: var(--global-hover-text-color); text-decoration: none; border-radius: 5px; font-size: 0.9rem; transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='var(--global-hover-color)'; this.style.boxShadow='0 0 10px rgba(255, 68, 68, 0.5)';" onmouseout="this.style.backgroundColor='var(--global-theme-color)'; this.style.boxShadow='none';">CV PDF</a>
<a href="/assets/pdf/phd-sop.pdf" target="_blank" style="display: inline-block; margin-bottom: 0.5rem; padding: 0.5rem 1rem; background-color: var(--global-theme-color); color: var(--global-hover-text-color); text-decoration: none; border-radius: 5px; font-size: 0.9rem; transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='var(--global-hover-color)'; this.style.boxShadow='0 0 10px rgba(255, 68, 68, 0.5)';" onmouseout="this.style.backgroundColor='var(--global-theme-color)'; this.style.boxShadow='none';">PhD Statement of Purpose</a>
</div>

<!-- Computer Science Publications -->
<div class="cv-section">
<h2>CS Work</h2>
<div id="cs-papers-container"></div>
</div>

<!-- Philosophy Work -->
<div class="cv-section">
<h2>Philosophy Writings</h2>
<div id="philosophy-papers-container"></div>
</div>

<!-- Education -->
<div class="cv-section">
<h2>Education</h2>

<div class="education-item">
<div class="item-title">Ph.D., Computer Science — Massachusetts Institute of Technology, 2025-?</div>
</div>

<div class="education-item">
<div class="item-title">B.A., Philosophy with Honors — University of Washington, 2021-2025</div>
<div class="item-details">Minor in History.</div>
</div>

<div class="education-item">
<div class="item-title">B.S., Computer Science — University of Washington, 2021-2025</div>
<div class="item-details">Minor in Mathematics.</div>
</div>

<div class="education-item">
<div class="item-title">Early Entrance Program — Robinson Center, University of Washington</div>
<div class="item-details">Admission to university at 14</div>
</div>

</div>

<!-- News -->
<div class="cv-section">
<h2>News</h2>

<div class="news-item-with-photo">
<div class="news-photo">
<img src="/assets/thumbnails/ugrad-questions-the-ai-answer.png" alt="News photo">
</div>
<div class="news-content">
<div class="news-title">Undergrad Questions the AI Answer</div>
<div class="news-venue">University of Washington Office of Undergraduate Academic Affairs</div>
</div>
<div class="news-icon-link">
<a href="https://www.washington.edu/uaa/undergrad-researcher-questions-the-ai-answer/" target="_blank" title="Read Article">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>

<div class="news-item-with-photo">
<div class="news-photo">
<img src="/assets/thumbnails/undergraduate-with-interdisciplinary-focus-earns-fellowship.png" alt="News photo">
</div>
<div class="news-content">
<div class="news-title">UW undergraduate with interdisciplinary AI focus earns fellowship of up to $90,000 for graduate study</div>
<div class="news-venue">University of Washington Office of Undergraduate Academic Affairs</div>
</div>
<div class="news-icon-link">
<a href="https://www.washington.edu/uaa/2025/04/09/uw-undergraduate-earns-fellowship-for-graduate-study/" target="_blank" title="Read Article">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>

<div class="news-item-with-photo">
<div class="news-photo">
<img src="/assets/thumbnails/deans-medalists.png" alt="News photo">
</div>
<div class="news-content">
<div class="news-title">2025 Dean's Medalists, Energized & Inspiring</div>
<div class="news-venue">University of Washington College of Arts and Sciences</div>
</div>
<div class="news-icon-link">
<a href="https://artsci.washington.edu/news/2025-06/2025-deans-medalists-energized-inspiring" target="_blank" title="Read Article">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>

<div class="news-item-with-photo">
<div class="news-photo">
<img src="/assets/thumbnails/research-impact-is-its-own-reward.png" alt="News photo">
</div>
<div class="news-content">
<div class="news-title">For these nationally recognized Allen School undergraduates, research impact is its own reward</div>
<div class="news-venue">University of Washington Allen School News</div>
</div>
<div class="news-icon-link">
<a href="https://news.cs.washington.edu/2024/06/28/for-these-nationally-recognized-allen-school-undergraduates-research-impact-is-its-own-reward/" target="_blank" title="Read Article">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>

</div>

<!-- Recognition & Scholarships Timeline -->
<div class="cv-section">
<h2>Recognition & Scholarships</h2>

<div class="timeline">
<div class="timeline-item">
<div class="timeline-year">2025</div>
<div class="timeline-content">
• Fellow, Paul and Daisy Soros Fellowship for New Americans<br>
• Awardee, NSF Graduate Research Fellowship Program<br>
• Fellow, Ashar Aziz Presidential Fellowship (MIT)<br>
• Finalist, Hertz Foundation Fellowship<br>
• Gonfalonier (Banner Carrier) for the College of Arts and Sciences, 150th University of Washington Commencement<br>
• UW College of Arts and Sciences Dean's Medal (for the Social Sciences)<br>
• UW CSE Outstanding Senior<br>
• UW Philosophy Department Outstanding Graduating Senior<br>
• UW CSE Best Senior Thesis Award (submitted by co-first author Andrew Shaw)
</div>
</div>

<div class="timeline-item">
<div class="timeline-year">2024</div>
<div class="timeline-content">
• UW Philosophy Department Outstanding Undergraduate Scholar
</div>
</div>

<div class="timeline-item">
<div class="timeline-year">2023</div>
<div class="timeline-content">
• CRA Outstanding Undergraduate Researcher Finalist<br>
• Mary Gates Research Scholar<br>
• Phi Beta Kappa Scholar<br>
• Philosophy Department Honors
</div>
</div>
</div>

</div>

<!-- Teaching -->
<div class="cv-section">
<h2>Teaching</h2>

<div class="teaching-item">
<div class="item-title">Teaching Assistant, CSE [160, 163, 311]</div>
<div class="item-institution">Allen School of CSE, University of Washington, 2022-2025</div>
<div class="item-details">Intro and intermediate Python programming, discrete math for CS. 7 quarters.</div>
</div>

<div class="teaching-item">
<div class="item-title">Teaching Assistant, English Composition and Literary Analysis</div>
<div class="item-institution">Robinson Center, University of Washington, 2022-2024</div>
</div>

<div class="teaching-item">
<div class="item-title">Teaching Assistant, Introduction to Machine Learning</div>
<div class="item-institution">The Coding School, 2022-2023</div>
</div>

</div>


<!-- Academic Service -->
<div class="cv-section">
<h2>Academic Service & Volunteering</h2>

<div class="service-item">
<div class="item-title">Reviewer</div>
<div class="item-details">
• 2024 CSCW (Computer-Supported Cooperative Work)<br>
• 2023 NeurIPS Moral Psychology and Moral Philosophy Workshop<br>
• 2023 ICML AI + HCI Workshop
</div>
</div>

<div class="service-item">
<div class="item-title">Panelist & Host</div>
<div class="item-details">
• 2024 Allen School Direct Admits, Undergrad Research Panelist<br>
• 2022, 2023 Robinson Center Student Panelist<br>
• 2024 Robinson Center Research Panelist, Student Host
</div>
</div>

<div class="service-item">
<div class="item-title">Marketing Manager</div>
<div class="item-institution">Vivek for Redmond City Council, Summer 2025</div>
<div class="item-details">
Managed social media presence and produced social media content for Vivek Prakriya's compaign runnning for Redmond City Council seat no. 2.
</div>
</div>

</div>

<!-- Other Publications -->
<div class="cv-section">
<h2>Books</h2>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">Modern Deep Learning Design and Applications</div>
<div class="paper-authors-compact">Andre Ye</div>
<div class="paper-venue-compact">Apress (Springer Nature)</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="SpringerLink">
<a href="https://link.springer.com/book/10.1007/978-1-4842-7413-2" target="_blank">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">Modern Deep Learning for Tabular Data</div>
<div class="paper-authors-compact">Andre Ye, Andy Wang</div>
<div class="paper-venue-compact">Apress (Springer Nature)</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="SpringerLink">
<a href="https://link.springer.com/book/10.1007/978-1-4842-8692-0" target="_blank">
<i class="fas fa-external-link-alt"></i>
</a>
</div>
</div>
</div>
</div>

</div>

<!-- Fun Projects -->
<div class="cv-section">
<h2>Misc. Work</h2>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">AyahuascaNet: Rigorously Investigating Hallucination in Large Language Models with Hardcore Psychedelic Drugs</div>
<div class="paper-venue-compact">SIGBOVIK 2023</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="Proceedings">
<a href="/assets/pdf/SIGBOVIK_2023.pdf" target="_blank">
<i class="fas fa-file-alt"></i>
</a>
</div>
<div class="icon-link" data-tooltip="Talk PDF">
<a href="/assets/pdf/AyahuascaNet.pdf" target="_blank">
<i class="fas fa-file-pdf"></i>
</a>
</div>
<div class="icon-link" data-tooltip="Viral Tweet">
<a href="https://x.com/deepfates/status/1752052061863387374" target="_blank">
<i class="fab fa-twitter"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">How does the AI community pronounce 'epoch'? A semirigorous sociolinguistic survey</div>
<div class="paper-venue-compact">SIGBOVIK 2024</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="Proceedings">
<a href="/assets/pdf/Epoch_SIGBOVIK_2024.pdf" target="_blank">
<i class="fas fa-file-alt"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">ITF;)LM: Innocuous Table Formatting ;) with Language Models</div>
<div class="paper-venue-compact">SIGBOVIK 2024</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="Proceedings">
<a href="/assets/pdf/Table_SIGBOVIK_2024.pdf" target="_blank">
<i class="fas fa-file-alt"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">Mobiod Streams</div>
<div class="paper-venue-compact">Digital Art</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="Interactive Art">
<a href="https://andre-ye.github.io/mobiod-streams/" target="_blank">
<i class="fas fa-palette"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">A Novel Approach to Segment Specialized Annotations in Electron Microscopy Images of Glomerular Podocytes</div>
<div class="paper-authors-compact">David Smerkous, <strong>Andre Ye</strong>, Behzad Najafian</div>
<div class="paper-venue-compact">Najafian Lab for Kidney Pathology, UW Medicine</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="UW Symposium PDF">
<a href="/assets/pdf/podocyte_seg.pdf" target="_blank">
<i class="fas fa-file-pdf"></i>
</a>
</div>
</div>
</div>
</div>

<div class="paper-item-compact">
<div class="paper-content-wrapper">
<div class="paper-main-content">
<div class="paper-title-compact">Emergent Language: Independent AI Development of a Language-Like Syntax</div>
<div class="paper-authors-compact">Alec Bunn, Amelia Johnson, <strong>Andre Ye</strong>, Yegor Kuznetzov, Eric Xia</div>
<div class="paper-venue-compact">Interactive Intelligence Research Group, Paul G. Allen School</div>
</div>
<div class="paper-icon-links">
<div class="icon-link" data-tooltip="eScience Poster">
<a href="/assets/pdf/emergent_language.pdf" target="_blank">
<i class="fas fa-image"></i>
</a>
</div>
</div>
</div>
</div>

</div>
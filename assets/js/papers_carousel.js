document.addEventListener('DOMContentLoaded', function() {
    let allPapers = [];

    async function loadPapers() {
        try {
            // Load both CS and philosophy papers
            const [csResponse, philResponse] = await Promise.all([
                fetch('/assets/json/cs_papers.json'),
                fetch('/assets/json/philosophy_papers.json')
            ]);

            const csPapers = await csResponse.json();
            const philPapers = await philResponse.json();

            // Combine and sort by date (most recent first)
            allPapers = [...csPapers, ...philPapers].sort((a, b) => new Date(b.date) - new Date(a.date));
            
            renderCarousel();
        } catch (error) {
            console.error('Error loading papers:', error);
        }
    }

    function createCompactPaperCard(paper) {
        const card = document.createElement('div');
        card.className = 'paper-card';
        
        // Use full author names
        let authorsText = paper.authors.map(author => 
            author.includes('Andre Ye') ? `<strong>${author}</strong>` : author
        ).join(', ');

        // Truncate if too long
        if (authorsText.length > 60) {
            authorsText = authorsText.substring(0, 57) + '...';
        }

        card.innerHTML = `
            <div class="paper-card-inner">
                <div class="paper-card-image">
                    <img src="${paper.image_url}" alt="${paper.title}" loading="lazy">
                </div>
                <div class="paper-card-content">
                    <div class="paper-card-title">${paper.title}</div>
                    <div class="paper-card-authors">${authorsText}</div>
                    <div class="paper-card-venue">${paper.conference_abbrev} ${paper.conference_year}</div>
                </div>
                <div class="paper-card-link">
                    <a href="${paper.paper_link}" target="_blank" title="Read paper">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;

        return card;
    }

    function renderCarousel() {
        const carousel = document.getElementById('papers-carousel');
        if (!carousel) return;

        carousel.innerHTML = '';
        
        // Show all papers in a scrollable container
        allPapers.forEach(paper => {
            const card = createCompactPaperCard(paper);
            carousel.appendChild(card);
        });
    }


    // Initialize the carousel
    loadPapers();
});
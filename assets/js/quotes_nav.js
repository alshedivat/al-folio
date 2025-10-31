// Dynamic Navigation Panel for Quotes Page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on quotes page
    if (!window.location.pathname.includes('/me-like/quotes')) return;
    
    // Fetch quotes data and build navigation
    fetch('/assets/json/me-like-quotes.json')
        .then(response => response.json())
        .then(data => {
            // Apply daily randomization to categories and quotes
            const shuffledData = applyDailyRandomization(data);
            // Use original order for navigation, shuffled order for content
            createQuotesNavigation(data.categories);
            buildQuotesContent(shuffledData.categories);
            setupRandomQuoteBox(shuffledData.categories);
        })
        .catch(error => {
            console.error('Error loading quotes data:', error);
        });
});

// Seeded random number generator for consistent daily randomization
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Get today's date as a seed (YYYY-MM-DD format)
function getTodaysSeed() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    // Convert date string to a numeric seed
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
        seed = seed * 31 + dateString.charCodeAt(i);
    }
    return seed;
}

// Shuffle array using seeded random
function shuffleWithSeed(array, seed) {
    const shuffled = [...array];
    let currentSeed = seed;
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        currentSeed++;
        const randomValue = seededRandom(currentSeed);
        const j = Math.floor(randomValue * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

// Apply daily randomization to categories and quotes
function applyDailyRandomization(data) {
    const todaysSeed = getTodaysSeed();
    
    // Shuffle categories
    const shuffledCategories = shuffleWithSeed(data.categories, todaysSeed);
    
    // Shuffle quotes within each category
    const categoriesWithShuffledQuotes = shuffledCategories.map((category, categoryIndex) => ({
        ...category,
        quotes: shuffleWithSeed(category.quotes, todaysSeed + categoryIndex * 1000)
    }));
    
    return {
        categories: categoriesWithShuffledQuotes
    };
}

function createQuotesNavigation(categories) {
    // Create navigation panel
    const navPanel = document.createElement('div');
    navPanel.className = 'quotes-nav-panel';
    navPanel.innerHTML = `
        <div class="quotes-nav-header">Navigate</div>
        <div class="quotes-nav-items">
            ${categories.map(category => 
                `<a href="#${createSlug(category.title)}" class="quotes-nav-item" data-section="${createSlug(category.title)}">${category.title}</a>`
            ).join('')}
        </div>
    `;
    
    document.body.appendChild(navPanel);
    
    // Add smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.quotes-nav-panel .quotes-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll spy functionality
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 200;
        let activeSection = null;
        
        categories.forEach(category => {
            const sectionId = createSlug(category.title);
            const sectionElement = document.getElementById(sectionId);
            if (sectionElement) {
                const sectionTop = sectionElement.offsetTop;
                const sectionHeight = sectionElement.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    activeSection = sectionId;
                }
            }
        });
        
        // Update active state
        navItems.forEach(item => {
            const sectionId = item.getAttribute('data-section');
            if (sectionId === activeSection) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // Throttled scroll listener
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveSection();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateActiveSection(); // Initial call
}

function buildQuotesContent(categories) {
    const quotesContainer = document.getElementById('quotes-content');
    if (!quotesContainer) return;
    
    quotesContainer.innerHTML = `
        <div class="random-quote-section">
            <div class="random-quote-box">
                <div class="random-quote-header">
                    <h3>Random Quote</h3>
                    <button class="refresh-quote-btn" onclick="refreshRandomQuote()">🔄</button>
                </div>
                <div class="random-quote-content">
                    <div class="random-quote-text"></div>
                    <div class="random-quote-author"></div>
                </div>
            </div>
        </div>
        <hr class="random-section-divider">
    ` + categories.map(category => `
        <div class="quotes-section" id="${createSlug(category.title)}">
            <h2 class="quotes-section-header">${category.title}</h2>
            <div class="quotes-section-description-inline">${category.description}</div>
            <div class="quotes-grid">
                ${category.quotes.map(quote => `
                    <div class="quote-item">
                        <div class="quote-text">${quote.text}</div>
                        <div class="quote-author">${quote.author}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function createSlug(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Global variable to store quotes data for random quote functionality
let allQuotes = [];

function setupRandomQuoteBox(categories) {
    // Flatten all quotes into a single array
    allQuotes = [];
    categories.forEach(category => {
        category.quotes.forEach(quote => {
            allQuotes.push(quote);
        });
    });
    
    // Show initial random quote
    refreshRandomQuote();
}

function refreshRandomQuote() {
    if (allQuotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    const randomQuote = allQuotes[randomIndex];
    
    const quoteTextElement = document.querySelector('.random-quote-text');
    const quoteAuthorElement = document.querySelector('.random-quote-author');
    
    if (quoteTextElement && quoteAuthorElement) {
        quoteTextElement.textContent = randomQuote.text;
        quoteAuthorElement.textContent = randomQuote.author;
    }
}
// AI Image Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // List of AI images for transitions
    const aiImages = [
        'AI Architecture Better Images.png',
        'AI is Everywhere - Ariyana Ahmed.png',
        'AI4Media Labour Resources.png',
        'Archival Images of AI (1).png',
        'Archival Images of AI.png',
        'Building Corp Jamillah Knowles 2560x1440.png',
        'Data Mining AI Archival Images.png',
        'Deceptive Dialogues 2560x1440.png',
        'Digital Nomads Across Time.png',
        'Digital Nomads Beyond the Cubicle.png',
        'Digital Nomads Connection by Yutong Liu.png',
        'Entry Level Janet Turra 2560x1440.png',
        'Hanna Barakat Archival Images of AI.png',
        'Isolation Kathryn Conrad 2560x1440.png',
        'Joining the Table Yutong Liu.png',
        'Lovelace GPU Diversity Fund.png',
        'Model Collapse Archival Images.png',
        'Nadia Piet AI Classification Images.png',
        'Pink Office Jamillah Knowles 2560x1440.png',
        'Stochastic Parrots at Work.png',
        'Telling Tales 3000x2000.png',
        'Textiles and Tech Archival Images.png',
        'Weaving Wires 2.png',
        'Wheel of Progress 3200x1800.png',
        'Hidden Labour of Internet Browsing.jpg',
        'Humans Do the Heavy Data Lifting.jpg',
        'Morning View by Elise Recine.jpg'
    ];
    
    // Add CSS animation for fade effect and mobile responsiveness
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        .ai-transition-overlay.fading-out {
            animation: fadeOut 1.5s ease-out forwards;
        }
        
        /* Mobile responsive styles */
        @media (max-width: 768px) {
            .ai-transition-overlay {
                background-position: center center !important;
                background-size: cover !important;
            }
            
            .skip-instruction-display {
                bottom: 80px !important;
                padding: 12px 20px !important;
                font-size: 16px !important;
                background: rgba(0, 0, 0, 0.8) !important;
                border: 2px solid rgba(255, 255, 255, 0.6) !important;
                border-radius: 10px !important;
                color: white !important;
                font-weight: bold !important;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4) !important;
            }
            
            .countdown-display {
                top: 30px !important;
                right: 30px !important;
                width: 50px !important;
                height: 50px !important;
                font-size: 22px !important;
                background: rgba(0, 0, 0, 0.8) !important;
                border: 3px solid rgba(255, 255, 255, 0.9) !important;
            }
            
            .ai-credit-display {
                bottom: 30px !important;
                padding: 10px 18px !important;
                font-size: 16px !important;
                background: rgba(0, 0, 0, 0.8) !important;
                border: 2px solid rgba(255, 255, 255, 0.4) !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'ai-transition-overlay';
    transitionOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        pointer-events: auto;
        opacity: 0;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: opacity 0.3s ease;
        display: none;
        overflow: hidden;
    `;
    
    // Add dimming overlay to reduce brightness
    const dimmingLayer = document.createElement('div');
    dimmingLayer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 1;
    `;
    transitionOverlay.appendChild(dimmingLayer);
    
    // Add countdown display
    const countdownDisplay = document.createElement('div');
    countdownDisplay.className = 'countdown-display';
    countdownDisplay.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.7);
        border: 2px solid rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 18px;
        font-weight: bold;
        color: white;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    transitionOverlay.appendChild(countdownDisplay);
    
    // Add "From Better Images of AI" credit
    const creditDisplay = document.createElement('div');
    creditDisplay.className = 'ai-credit-display';
    creditDisplay.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 8px;
        padding: 8px 16px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        color: white;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
        cursor: pointer;
        pointer-events: auto;
    `;
    
    const creditLink = document.createElement('a');
    creditLink.href = 'https://betterimagesofai.org/';
    creditLink.target = '_blank';
    creditLink.rel = 'noopener noreferrer';
    creditLink.textContent = 'From Better Images of AI';
    creditLink.style.cssText = `
        color: white;
        text-decoration: none;
        transition: color 0.2s ease;
    `;
    creditLink.addEventListener('mouseenter', () => {
        creditLink.style.color = '#a8c8ff';
    });
    creditLink.addEventListener('mouseleave', () => {
        creditLink.style.color = 'white';
    });
    
    creditDisplay.appendChild(creditLink);
    transitionOverlay.appendChild(creditDisplay);
    
    // Add skip instruction display
    const skipDisplay = document.createElement('div');
    skipDisplay.className = 'skip-instruction-display';
    skipDisplay.style.cssText = `
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.6);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        padding: 6px 12px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.8);
        z-index: 2;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        text-align: center;
    `;
    skipDisplay.textContent = 'Press SPACE or tap to skip';
    transitionOverlay.appendChild(skipDisplay);
    
    document.body.appendChild(transitionOverlay);
    
    // Function to get random AI image
    function getRandomAIImage() {
        const randomIndex = Math.floor(Math.random() * aiImages.length);
        const imageName = aiImages[randomIndex];
        return `/assets/better-ai-imgs/${encodeURIComponent(imageName)}`;
    }
    
    // Countdown function
    function startCountdown() {
        let count = 3;
        countdownDisplay.textContent = count;
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownDisplay.textContent = count;
            } else {
                clearInterval(countdownInterval);
                countdownDisplay.textContent = '';
            }
        }, 1000);
    }
    
    // Skip transition variables
    let currentTransitionTimeouts = [];
    let currentTransitionCallback = null;
    let transitionActive = false;
    
    // Function to skip transition
    function skipTransition() {
        if (!transitionActive) return;
        
        console.log('Skipping transition');
        
        // Clear all timeouts
        currentTransitionTimeouts.forEach(timeout => clearTimeout(timeout));
        currentTransitionTimeouts = [];
        
        // Immediately fade out
        transitionOverlay.classList.add('fading-out');
        
        // Complete transition quickly
        setTimeout(() => {
            transitionOverlay.classList.remove('fading-out');
            transitionOverlay.style.display = 'none';
            transitionOverlay.style.opacity = '0';
            countdownDisplay.style.opacity = '0';
            creditDisplay.style.opacity = '0';
            skipDisplay.style.opacity = '0';
            transitionActive = false;
            
            if (currentTransitionCallback) {
                currentTransitionCallback();
                currentTransitionCallback = null;
            }
        }, 300); // Quick fade out
    }
    
    // Function to show transition
    function showTransition(callback) {
        const randomImage = getRandomAIImage();
        console.log(`Starting transition with image: ${randomImage}`);
        
        transitionActive = true;
        currentTransitionCallback = callback;
        currentTransitionTimeouts = [];
        
        transitionOverlay.style.backgroundImage = `url('${randomImage}')`;
        transitionOverlay.style.display = 'block';
        
        // Fade in
        const fadeInTimeout = setTimeout(() => {
            console.log('Fading in transition overlay');
            transitionOverlay.style.opacity = '1';
        }, 10);
        currentTransitionTimeouts.push(fadeInTimeout);
        
        // Start countdown and show skip instruction almost immediately
        const startDisplayTimeout = setTimeout(() => {
            countdownDisplay.style.opacity = '1';
            creditDisplay.style.opacity = '1';
            skipDisplay.style.opacity = '1';
            startCountdown();
        }, 100);
        currentTransitionTimeouts.push(startDisplayTimeout);
        
        // Hold for 5 seconds, then fade away
        const fadeOutTimeout = setTimeout(() => {
            console.log('Starting fade out animation');
            // Use CSS animation for reliable fade effect
            transitionOverlay.classList.add('fading-out');
            
            // Complete transition and execute callback
            const completeTimeout = setTimeout(() => {
                console.log('Completing transition');
                transitionOverlay.classList.remove('fading-out');
                transitionOverlay.style.display = 'none';
                transitionOverlay.style.opacity = '0';
                countdownDisplay.style.opacity = '0';
                creditDisplay.style.opacity = '0';
                skipDisplay.style.opacity = '0';
                transitionActive = false;
                if (callback) {
                    callback();
                    currentTransitionCallback = null;
                }
            }, 1500);
            currentTransitionTimeouts.push(completeTimeout);
        }, 5000);
        currentTransitionTimeouts.push(fadeOutTimeout);
    }
    
    // Function to show transition with proper navigation timing
    function showTransitionWithNavigation(href) {
        const randomImage = getRandomAIImage();
        console.log(`Starting transition with navigation to: ${href}`);
        
        transitionActive = true;
        currentTransitionCallback = () => { window.location.href = href; };
        currentTransitionTimeouts = [];
        
        transitionOverlay.style.backgroundImage = `url('${randomImage}')`;
        transitionOverlay.style.display = 'block';
        
        // Fade in
        const fadeInTimeout = setTimeout(() => {
            console.log('Fading in transition overlay');
            transitionOverlay.style.opacity = '1';
        }, 10);
        currentTransitionTimeouts.push(fadeInTimeout);
        
        // Navigate to new page near the end of the display time
        const navigationTimeout = setTimeout(() => {
            console.log(`Navigating to: ${href}`);
            window.location.href = href;
        }, 4500);
        currentTransitionTimeouts.push(navigationTimeout);
        
        // Start countdown and show skip instruction almost immediately
        const startDisplayTimeout = setTimeout(() => {
            console.log('Starting countdown');
            countdownDisplay.style.opacity = '1';
            creditDisplay.style.opacity = '1';
            skipDisplay.style.opacity = '1';
            startCountdown();
        }, 100);
        currentTransitionTimeouts.push(startDisplayTimeout);
        
        // Start fade out after showing image for 5 seconds
        const fadeOutTimeout = setTimeout(() => {
            console.log('Starting fade out animation');
            transitionOverlay.classList.add('fading-out');
            
            // Complete transition (fade takes 1.5s)
            const completeTimeout = setTimeout(() => {
                console.log('Completing transition');
                transitionOverlay.classList.remove('fading-out');
                transitionOverlay.style.display = 'none';
                transitionOverlay.style.opacity = '0';
                countdownDisplay.style.opacity = '0';
                creditDisplay.style.opacity = '0';
                skipDisplay.style.opacity = '0';
                transitionActive = false;
                currentTransitionCallback = null;
            }, 1500);
            currentTransitionTimeouts.push(completeTimeout);
        }, 5000);
        currentTransitionTimeouts.push(fadeOutTimeout);
    }
    
    // Intercept all internal links
    function interceptLinks() {
        const links = document.querySelectorAll('a[href]');
        console.log(`Found ${links.length} links to analyze`);
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Check if it's an internal link (not external, not anchor, not file download)
            if (href && 
                !href.startsWith('http') && 
                !href.startsWith('mailto:') && 
                !href.startsWith('tel:') && 
                !href.startsWith('#') &&
                !href.includes('.pdf') &&
                !href.includes('.zip') &&
                !href.includes('.doc') &&
                !link.hasAttribute('download') &&
                link.target !== '_blank') {
                
                console.log(`Intercepting link: ${href}`);
                
                // Remove any existing listeners first
                link.removeEventListener('click', link._transitionHandler);
                
                // Create new handler
                link._transitionHandler = function(e) {
                    console.log(`Transition triggered for: ${href}`);
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Start transition, navigate immediately, then wipe to reveal new page
                    showTransitionWithNavigation(href);
                };
                
                link.addEventListener('click', link._transitionHandler, true);
            } else {
                console.log(`Skipping link: ${href} (external or special)`);
            }
        });
    }
    
    // Initialize link interception
    interceptLinks();
    
    // Re-intercept links when new content is added (for dynamic content)
    const observer = new MutationObserver(() => {
        interceptLinks();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Add skip event listeners
    function setupSkipListeners() {
        // Keyboard listener for spacebar
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' && transitionActive) {
                event.preventDefault(); // Prevent page scroll
                skipTransition();
            }
        });
        
        // Touch/click listener for mobile and desktop
        transitionOverlay.addEventListener('click', (event) => {
            if (transitionActive) {
                // Don't skip if user clicked on the credit link
                if (!event.target.closest('.ai-credit-display')) {
                    skipTransition();
                }
            }
        });
        
        // Touch listener for better mobile support
        transitionOverlay.addEventListener('touchstart', (event) => {
            if (transitionActive) {
                // Don't skip if user touched the credit link
                if (!event.target.closest('.ai-credit-display')) {
                    event.preventDefault();
                    skipTransition();
                }
            }
        });
    }
    
    // Initialize skip listeners
    setupSkipListeners();
    
    // Global test function for debugging
    window.testTransition = function() {
        console.log('Testing transition manually');
        showTransition(() => {
            console.log('Test transition completed');
        });
    };
    
    console.log('AI Page Transitions loaded. Type testTransition() in console to test.');
});
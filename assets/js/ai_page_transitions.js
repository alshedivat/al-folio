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
    
    // Add CSS animation for fade effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        .ai-transition-overlay.fading-out {
            animation: fadeOut 1.5s ease-out forwards;
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
        pointer-events: none;
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
    
    // Function to show transition
    function showTransition(callback) {
        const randomImage = getRandomAIImage();
        console.log(`Starting transition with image: ${randomImage}`);
        
        transitionOverlay.style.backgroundImage = `url('${randomImage}')`;
        transitionOverlay.style.display = 'block';
        
        // Fade in
        setTimeout(() => {
            console.log('Fading in transition overlay');
            transitionOverlay.style.opacity = '1';
        }, 10);
        
        // Start countdown at 2 seconds (to show 3, 2, 1 for the last 3 seconds)
        setTimeout(() => {
            countdownDisplay.style.opacity = '1';
            startCountdown();
        }, 2000);
        
        // Hold for 5 seconds, then fade away
        setTimeout(() => {
            console.log('Starting fade out animation');
            // Use CSS animation for reliable fade effect
            transitionOverlay.classList.add('fading-out');
            
            // Complete transition and execute callback
            setTimeout(() => {
                console.log('Completing transition');
                transitionOverlay.classList.remove('fading-out');
                transitionOverlay.style.display = 'none';
                transitionOverlay.style.opacity = '0';
                countdownDisplay.style.opacity = '0';
                if (callback) callback();
            }, 1500);
        }, 5000);
    }
    
    // Function to show transition with proper navigation timing
    function showTransitionWithNavigation(href) {
        const randomImage = getRandomAIImage();
        console.log(`Starting transition with navigation to: ${href}`);
        
        transitionOverlay.style.backgroundImage = `url('${randomImage}')`;
        transitionOverlay.style.display = 'block';
        
        // Fade in
        setTimeout(() => {
            console.log('Fading in transition overlay');
            transitionOverlay.style.opacity = '1';
        }, 10);
        
        // Navigate to new page near the end of the display time
        setTimeout(() => {
            console.log(`Navigating to: ${href}`);
            window.location.href = href;
        }, 4500);
        
        // Start countdown at 2 seconds (to show 3, 2, 1 for the last 3 seconds)
        setTimeout(() => {
            console.log('Starting countdown');
            countdownDisplay.style.opacity = '1';
            startCountdown();
        }, 2000);
        
        // Start fade out after showing image for 5 seconds
        setTimeout(() => {
            console.log('Starting fade out animation');
            transitionOverlay.classList.add('fading-out');
            
            // Complete transition (fade takes 1.5s)
            setTimeout(() => {
                console.log('Completing transition');
                transitionOverlay.classList.remove('fading-out');
                transitionOverlay.style.display = 'none';
                transitionOverlay.style.opacity = '0';
                countdownDisplay.style.opacity = '0';
            }, 1500);
        }, 5000);
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
    
    // Global test function for debugging
    window.testTransition = function() {
        console.log('Testing transition manually');
        showTransition(() => {
            console.log('Test transition completed');
        });
    };
    
    console.log('AI Page Transitions loaded. Type testTransition() in console to test.');
});
// Custom Red Dot Cursor with Glow
document.addEventListener('DOMContentLoaded', function() {
    // Check if device supports hover (desktop)
    if (!window.matchMedia("(hover: hover)").matches) {
        return; // Skip cursor customization on touch devices
    }

    // Skip word bubbles on feeling diary page
    const skipBubblesOnPages = ['/misc/feeling-diary'];
    const shouldSkipBubbles = skipBubblesOnPages.some(path => window.location.pathname.includes(path));
    
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create word bubble element (skip on certain pages)
    let wordBubble, meaningBubble;
    if (!shouldSkipBubbles) {
        wordBubble = document.createElement('div');
        wordBubble.className = 'cursor-word-bubble hidden';
        wordBubble.style.fontFamily = 'sans-serif';
        wordBubble.style.userSelect = 'none';
        document.body.appendChild(wordBubble);

        // Create meaning bubble element
        meaningBubble = document.createElement('div');
        meaningBubble.className = 'cursor-meaning-bubble hidden';
        meaningBubble.style.fontFamily = 'sans-serif';
        meaningBubble.style.userSelect = 'none';
        document.body.appendChild(meaningBubble);
    }
    
    // Word functionality variables
    let wordsData = [];
    let currentWord = null;
    let bubblesEnabled = !shouldSkipBubbles && localStorage.getItem('wordBubblesEnabled') !== 'false'; // Default true, false only if explicitly set
    let meaningVisible = false;

    // Load words data (skip on certain pages)
    if (!shouldSkipBubbles) {
        fetch('/assets/json/words.json')
            .then(response => response.json())
            .then(data => {
                wordsData = data;
                selectDailyWord();
            })
            .catch(error => {
                console.error('Error loading words:', error);
                wordsData = [{word: "hello", meaning: "a greeting"}];
                selectDailyWord();
            });
    }
    
    // Function to get current EST date as seed
    function getESTDateSeed() {
        const now = new Date();
        // Convert to EST (UTC-5) or EDT (UTC-4) - accounting for daylight saving
        const estOffset = -5; // EST is UTC-5
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const est = new Date(utc + (estOffset * 3600000));
        
        // Check if it's daylight saving time (rough approximation)
        const year = est.getFullYear();
        const dstStart = new Date(year, 2, 14 - (Math.floor(5 * year / 4) + 1) % 7); // 2nd Sunday in March
        const dstEnd = new Date(year, 10, 7 - (Math.floor(5 * year / 4) + 1) % 7); // 1st Sunday in November
        
        if (now >= dstStart && now < dstEnd) {
            // It's EDT (UTC-4), adjust by 1 hour
            est.setHours(est.getHours() + 1);
        }
        
        // Return date string as seed (YYYY-MM-DD format)
        return est.getFullYear() + '-' + 
               String(est.getMonth() + 1).padStart(2, '0') + '-' + 
               String(est.getDate()).padStart(2, '0');
    }
    
    // Simple seeded random number generator
    function seededRandom(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        
        // Use the hash as seed for a simple linear congruential generator
        let x = Math.abs(hash);
        return function() {
            x = (x * 9301 + 49297) % 233280;
            return x / 233280;
        };
    }
    
    // Function to select daily word based on EST date
    function selectDailyWord() {
        if (wordsData.length > 0) {
            const dateSeed = getESTDateSeed();
            const rng = seededRandom(dateSeed);
            const index = Math.floor(rng() * wordsData.length);
            currentWord = wordsData[index];
            wordBubble.textContent = currentWord.word;
            
            // Debug: log the date seed and selected word
            console.log('Daily word for', dateSeed, ':', currentWord.word);
        }
    }
    
    let mouseX = window.innerWidth / 2; // Start at center
    let mouseY = window.innerHeight / 2; // Start at center
    let cursorX = mouseX; // Initialize cursor position to mouse position
    let cursorY = mouseY; // Initialize cursor position to mouse position
    let bubbleX = mouseX + 25; // Initialize bubble position offset (top right)
    let bubbleY = mouseY - 35; // Initialize bubble position offset (top right)
    let meaningX = mouseX + 25; // Initialize meaning bubble position (bottom right)
    let meaningY = mouseY + 20; // Initialize meaning bubble position (bottom right)
    let isInitialized = false;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // On first mouse movement, initialize positions
        if (!isInitialized) {
            cursorX = mouseX;
            cursorY = mouseY;
            bubbleX = cursorX + 25;
            bubbleY = cursorY - 35;
            meaningX = cursorX + 25;
            meaningY = cursorY + 20;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursor.style.opacity = '1';
            
            if (bubblesEnabled && wordBubble) {
                wordBubble.classList.remove('hidden');
            }
            isInitialized = true;
        }
    });
    
    // Simple smooth cursor animation
    function animateCursor() {
        const followSpeed = 0.15; // Smooth following with minimal lag
        
        // Update cursor position with smooth following
        cursorX += (mouseX - cursorX) * followSpeed;
        cursorY += (mouseY - cursorY) * followSpeed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Position bubbles relative to cursor position (not mouse position)
        if (wordBubble) {
            // Word bubble - top right of cursor
            bubbleX = cursorX + 25;
            bubbleY = cursorY - 35;
            wordBubble.style.left = bubbleX + 'px';
            wordBubble.style.top = bubbleY + 'px';
        }

        if (meaningBubble) {
            // Meaning bubble - bottom right of cursor
            meaningX = cursorX + 25;
            meaningY = cursorY + 20;
            meaningBubble.style.left = meaningX + 'px';
            meaningBubble.style.top = meaningY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start cursor animation
    animateCursor();
    
    // Keyboard event handlers
    document.addEventListener('keydown', function(e) {
        // Only respond to key events if not in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
            return;
        }
        
        switch(e.key.toLowerCase()) {
            case 'e':
                if (wordBubble && meaningBubble) {
                    // Toggle all bubbles and save state to localStorage
                    bubblesEnabled = !bubblesEnabled;
                    localStorage.setItem('wordBubblesEnabled', bubblesEnabled.toString());

                    if (bubblesEnabled) {
                        if (isInitialized) {
                            wordBubble.classList.remove('hidden');
                            if (meaningVisible) {
                                meaningBubble.classList.remove('hidden');
                            }
                        }
                    } else {
                        wordBubble.classList.add('hidden');
                        meaningBubble.classList.add('hidden');
                        meaningVisible = false; // Reset meaning state when disabling
                    }
                }
                break;

            case 'm':
                if (bubblesEnabled && currentWord && meaningBubble) {
                    // Toggle meaning bubble
                    meaningVisible = !meaningVisible;
                    if (meaningVisible) {
                        meaningBubble.textContent = currentWord.meaning;
                        meaningBubble.classList.remove('hidden');
                    } else {
                        meaningBubble.classList.add('hidden');
                    }
                }
                break;
        }
    });
    
    // Particle effect variables
    let isHovering = false;
    let particleInterval = null;
    
    // Function to create a particle
    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('cursor-particle');
        
        // Start at cursor position with slight random offset
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        particle.style.left = (cursorX + offsetX) + 'px';
        particle.style.top = (cursorY + offsetY) + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle outward
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const endX = cursorX + offsetX + Math.cos(angle) * distance;
            const endY = cursorY + offsetY + Math.sin(angle) * distance;
            
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.classList.add('diffusing');
        }, 10);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 600);
    }
    
    // Function to start particle effect
    function startParticleEffect() {
        if (particleInterval) return;
        particleInterval = setInterval(createParticle, 100);
    }
    
    // Function to stop particle effect
    function stopParticleEffect() {
        if (particleInterval) {
            clearInterval(particleInterval);
            particleInterval = null;
        }
    }
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            isHovering = true;
            startParticleEffect();
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            isHovering = false;
            stopParticleEffect();
        });
    });
    
    // Handle dynamically added elements
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    const newInteractiveElements = node.querySelectorAll('a, button, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"])');
                    newInteractiveElements.forEach(element => {
                        element.addEventListener('mouseenter', function() {
                            cursor.classList.add('hover');
                            isHovering = true;
                            startParticleEffect();
                        });
                        
                        element.addEventListener('mouseleave', function() {
                            cursor.classList.remove('hover');
                            isHovering = false;
                            stopParticleEffect();
                        });
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        if (bubblesEnabled && wordBubble && meaningBubble) {
            wordBubble.classList.add('hidden');
            meaningBubble.classList.add('hidden');
        }
        stopParticleEffect();
    });

    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        if (isInitialized && bubblesEnabled && wordBubble) {
            wordBubble.classList.remove('hidden');
            if (meaningVisible && meaningBubble) {
                meaningBubble.classList.remove('hidden');
            }
        }
    });
    
    // Hide cursor initially until mouse moves
    cursor.style.opacity = '0';
    
    // Initialize cursor position immediately if mouse is already on page
    // This helps when transitioning between pages
    const initialMouseEvent = new MouseEvent('mousemove', {
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    });
    
    // Set initial positions
    cursor.style.left = (window.innerWidth / 2) + 'px';
    cursor.style.top = (window.innerHeight / 2) + 'px';
    if (wordBubble) {
        wordBubble.style.left = (window.innerWidth / 2 + 25) + 'px';
        wordBubble.style.top = (window.innerHeight / 2 - 35) + 'px';
    }
    if (meaningBubble) {
        meaningBubble.style.left = (window.innerWidth / 2 + 25) + 'px';
        meaningBubble.style.top = (window.innerHeight / 2 + 20) + 'px';
    }
});
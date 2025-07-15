// Custom Red Dot Cursor with Glow
document.addEventListener('DOMContentLoaded', function() {
    // Check if device supports hover (desktop)
    if (!window.matchMedia("(hover: hover)").matches) {
        return; // Skip cursor customization on touch devices
    }
    
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Create word bubble element
    const wordBubble = document.createElement('div');
    wordBubble.className = 'cursor-word-bubble hidden';
    wordBubble.style.fontFamily = 'sans-serif';
    wordBubble.style.userSelect = 'none';
    document.body.appendChild(wordBubble);
    
    // Create meaning bubble element
    const meaningBubble = document.createElement('div');
    meaningBubble.className = 'cursor-meaning-bubble hidden';
    meaningBubble.style.fontFamily = 'sans-serif';
    meaningBubble.style.userSelect = 'none';
    document.body.appendChild(meaningBubble);
    
    // Word functionality variables
    let wordsData = [];
    let currentWord = null;
    let bubblesEnabled = localStorage.getItem('wordBubblesEnabled') !== 'false'; // Default true, false only if explicitly set
    let meaningVisible = false;
    
    // Load words data
    fetch('/assets/json/words.json')
        .then(response => response.json())
        .then(data => {
            wordsData = data;
            selectRandomWord();
        })
        .catch(error => {
            console.error('Error loading words:', error);
            wordsData = [{word: "hello", meaning: "a greeting"}];
            selectRandomWord();
        });
    
    // Function to select random word
    function selectRandomWord() {
        if (wordsData.length > 0) {
            currentWord = wordsData[Math.floor(Math.random() * wordsData.length)];
            wordBubble.textContent = currentWord.word;
        }
    }
    
    let mouseX = window.innerWidth / 2; // Start at center
    let mouseY = window.innerHeight / 2; // Start at center
    let cursorX = mouseX; // Initialize cursor position to mouse position
    let cursorY = mouseY; // Initialize cursor position to mouse position
    let bubbleX = mouseX + 60; // Initialize bubble position offset
    let bubbleY = mouseY - 40; // Initialize bubble position offset
    let meaningX = mouseX + 60; // Initialize meaning bubble position
    let meaningY = mouseY + 20; // Initialize meaning bubble position
    let isInitialized = false;
    
    // Enhanced movement variables for organic behavior
    let bubbleVelX = 0; // Bubble velocity for momentum
    let bubbleVelY = 0;
    let meaningVelX = 0; // Meaning bubble velocity
    let meaningVelY = 0;
    let bubbleOffsetX = 60 + (Math.random() - 0.5) * 40; // Random initial offset
    let bubbleOffsetY = -40 + (Math.random() - 0.5) * 30;
    let meaningOffsetX = 80 + (Math.random() - 0.5) * 40;
    let meaningOffsetY = 30 + (Math.random() - 0.5) * 30;
    let swerveTime = 0; // For sine wave swerving
    let lastMouseMoveTime = Date.now();
    let mouseSpeed = 0;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        // Calculate mouse speed for dynamic behavior
        const currentTime = Date.now();
        const deltaTime = currentTime - lastMouseMoveTime;
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        mouseSpeed = deltaTime > 0 ? distance / deltaTime : 0;
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMouseX = mouseX;
        lastMouseY = mouseY;
        lastMouseMoveTime = currentTime;
        
        // On first mouse movement, initialize positions
        if (!isInitialized) {
            cursorX = mouseX;
            cursorY = mouseY;
            bubbleX = mouseX + bubbleOffsetX;
            bubbleY = mouseY + bubbleOffsetY;
            meaningX = mouseX + meaningOffsetX;
            meaningY = mouseY + meaningOffsetY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursor.style.opacity = '1';
            
            if (bubblesEnabled) {
                wordBubble.classList.remove('hidden');
            }
            isInitialized = true;
        }
    });
    
    // Enhanced organic bubble animation
    function animateCursor() {
        const cursorSpeed = 0.25; // Cursor speed
        const currentTime = Date.now();
        const timeSinceLastMove = currentTime - lastMouseMoveTime;
        
        // Update cursor position
        cursorX += (mouseX - cursorX) * cursorSpeed;
        cursorY += (mouseY - cursorY) * cursorSpeed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Dynamic movement parameters based on mouse speed and time
        const isMouseMoving = timeSinceLastMove < 100; // Mouse considered moving if moved within 100ms
        const speedMultiplier = Math.min(mouseSpeed * 0.5, 2); // Scale with mouse speed, cap at 2x
        const restingFactor = isMouseMoving ? 1 : Math.max(0.3, 1 - (timeSinceLastMove - 100) / 2000); // Slow down when resting
        
        // Organic movement for word bubble
        swerveTime += 0.02; // Increment for sine wave
        const bubbleBaseSpeed = 0.06 * restingFactor; // Base speed affected by resting
        const bubbleSwerve = Math.sin(swerveTime * 1.2) * 8; // Swerving motion
        const bubbleJitter = (Math.random() - 0.5) * 2; // Small random jitter
        
        // Dynamic offset that changes slightly over time
        bubbleOffsetX += (Math.random() - 0.5) * 0.3;
        bubbleOffsetY += (Math.random() - 0.5) * 0.3;
        bubbleOffsetX = Math.max(20, Math.min(100, bubbleOffsetX)); // Keep within bounds
        bubbleOffsetY = Math.max(-80, Math.min(10, bubbleOffsetY));
        
        const targetBubbleX = mouseX + bubbleOffsetX + bubbleSwerve + bubbleJitter;
        const targetBubbleY = mouseY + bubbleOffsetY + Math.sin(swerveTime * 0.8) * 5;
        
        // Apply momentum and drag
        const bubbleForceX = (targetBubbleX - bubbleX) * bubbleBaseSpeed;
        const bubbleForceY = (targetBubbleY - bubbleY) * bubbleBaseSpeed;
        bubbleVelX += bubbleForceX;
        bubbleVelY += bubbleForceY;
        bubbleVelX *= 0.85; // Drag/friction
        bubbleVelY *= 0.85;
        
        bubbleX += bubbleVelX;
        bubbleY += bubbleVelY;
        wordBubble.style.left = bubbleX + 'px';
        wordBubble.style.top = bubbleY + 'px';
        
        // Organic movement for meaning bubble (even more chaotic)
        const meaningBaseSpeed = 0.04 * restingFactor;
        const meaningSwerve = Math.sin(swerveTime * 0.7 + Math.PI) * 12; // Different phase
        const meaningJitter = (Math.random() - 0.5) * 3;
        
        // Dynamic offset for meaning bubble
        meaningOffsetX += (Math.random() - 0.5) * 0.4;
        meaningOffsetY += (Math.random() - 0.5) * 0.4;
        meaningOffsetX = Math.max(40, Math.min(120, meaningOffsetX));
        meaningOffsetY = Math.max(10, Math.min(80, meaningOffsetY));
        
        const targetMeaningX = mouseX + meaningOffsetX + meaningSwerve + meaningJitter;
        const targetMeaningY = mouseY + meaningOffsetY + Math.sin(swerveTime * 0.5) * 8;
        
        const meaningForceX = (targetMeaningX - meaningX) * meaningBaseSpeed;
        const meaningForceY = (targetMeaningY - meaningY) * meaningBaseSpeed;
        meaningVelX += meaningForceX;
        meaningVelY += meaningForceY;
        meaningVelX *= 0.8; // More drag for meaning bubble
        meaningVelY *= 0.8;
        
        meaningX += meaningVelX;
        meaningY += meaningVelY;
        meaningBubble.style.left = meaningX + 'px';
        meaningBubble.style.top = meaningY + 'px';
        
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
                break;
                
            case 'm':
                if (bubblesEnabled && currentWord) {
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
        if (bubblesEnabled) {
            wordBubble.classList.add('hidden');
            meaningBubble.classList.add('hidden');
        }
        stopParticleEffect();
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        if (isInitialized && bubblesEnabled) {
            wordBubble.classList.remove('hidden');
            if (meaningVisible) {
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
    wordBubble.style.left = (window.innerWidth / 2 + 60) + 'px';
    wordBubble.style.top = (window.innerHeight / 2 - 40) + 'px';
    meaningBubble.style.left = (window.innerWidth / 2 + 80) + 'px';
    meaningBubble.style.top = (window.innerHeight / 2 + 30) + 'px';
});
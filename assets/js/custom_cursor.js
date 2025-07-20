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
            selectDailyWord();
        })
        .catch(error => {
            console.error('Error loading words:', error);
            wordsData = [{word: "hello", meaning: "a greeting"}];
            selectDailyWord();
        });
    
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
    
    // Random settling position variables
    let settleOffsetX = (Math.random() - 0.5) * 120; // Random settle position around cursor
    let settleOffsetY = (Math.random() - 0.5) * 100;
    let settleChangeTime = Date.now() + 3000 + Math.random() * 5000; // Time to change settle position
    let driftPhase = Math.random() * Math.PI * 2; // Random drift phase
    
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
        const cursorSpeed = 0.4; // Increased cursor responsiveness
        const currentTime = Date.now();
        const timeSinceLastMove = currentTime - lastMouseMoveTime;
        
        // Update cursor position with higher responsiveness
        cursorX += (mouseX - cursorX) * cursorSpeed;
        cursorY += (mouseY - cursorY) * cursorSpeed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Check if it's time to change settle position
        if (currentTime > settleChangeTime) {
            settleOffsetX = (Math.random() - 0.5) * 120;
            settleOffsetY = (Math.random() - 0.5) * 100;
            settleChangeTime = currentTime + 4000 + Math.random() * 6000; // 4-10 seconds
            driftPhase = Math.random() * Math.PI * 2; // New random drift phase
        }
        
        // Dynamic movement parameters based on mouse speed and time
        const isMouseMoving = timeSinceLastMove < 200; // Mouse considered moving if moved within 200ms
        const speedMultiplier = Math.min(mouseSpeed * 0.3, 1.5); // Reduced sensitivity, lower cap
        const restingFactor = isMouseMoving ? 0.8 : Math.max(0.4, 1 - (timeSinceLastMove - 200) / 4000); // Slower transition to rest
        
        // Organic movement for word bubble - smooth and fluid
        swerveTime += 0.004; // Even slower for ultra-smooth movement
        driftPhase += 0.003; // Much slower drift progression
        const bubbleBaseSpeed = 0.02 * restingFactor; // Slower base speed for smoothness
        const bubbleSwerve = Math.sin(swerveTime * 0.3) * 2; // Much smaller and slower swerving
        const bubbleJitter = (Math.random() - 0.5) * 0.2; // Minimal jitter
        
        // Very gentle continuous drifting behavior
        const driftAmplitude = isMouseMoving ? 4 : 8; // Much smaller drift amplitudes
        const driftX = Math.sin(driftPhase * 0.4) * driftAmplitude + Math.cos(driftPhase * 0.2) * (driftAmplitude * 0.5);
        const driftY = Math.cos(driftPhase * 0.3) * driftAmplitude + Math.sin(driftPhase * 0.5) * (driftAmplitude * 0.5);
        
        // Minimal local wandering - almost eliminated
        const wanderTime = currentTime * 0.0002; // Much slower wandering
        const localWanderRadius = 8; // Much smaller radius
        const autonomousWanderX = Math.sin(wanderTime * 0.4) * localWanderRadius * 0.2;
        const autonomousWanderY = Math.cos(wanderTime * 0.3) * localWanderRadius * 0.2;
        
        // Smoother transition to settle position
        const settleTransition = isMouseMoving ? 0.9 : Math.min(1.0, (timeSinceLastMove - 200) / 3000); // Slower transition
        const currentSettleX = settleOffsetX * settleTransition;
        const currentSettleY = settleOffsetY * settleTransition;
        
        // Reduced autonomy for smoother behavior
        const autonomyFactor = isMouseMoving ? 0.05 : Math.min(0.2, (timeSinceLastMove - 200) / 6000); // Much lower autonomy
        const mouseInfluence = 1 - autonomyFactor * 0.15; // Very strong mouse influence
        
        let targetBubbleX = mouseX + currentSettleX + driftX + autonomousWanderX * autonomyFactor + bubbleSwerve + bubbleJitter;
        let targetBubbleY = mouseY + currentSettleY + driftY + autonomousWanderY * autonomyFactor + Math.sin(swerveTime * 0.2) * 1;
        
        // Prevent bubble from overlapping with cursor - maintain minimum distance
        const minDistance = 40; // Minimum distance from cursor center
        const cursorDistanceX = targetBubbleX - mouseX;
        const cursorDistanceY = targetBubbleY - mouseY;
        const currentDistance = Math.sqrt(cursorDistanceX * cursorDistanceX + cursorDistanceY * cursorDistanceY);
        
        if (currentDistance < minDistance) {
            // Push bubble away from cursor to maintain minimum distance
            const pushDirection = currentDistance > 0 ? 1 : 1; // Avoid division by zero
            const normalizedX = currentDistance > 0 ? cursorDistanceX / currentDistance : 1;
            const normalizedY = currentDistance > 0 ? cursorDistanceY / currentDistance : 0;
            
            targetBubbleX = mouseX + normalizedX * minDistance;
            targetBubbleY = mouseY + normalizedY * minDistance;
        }
        
        // Apply momentum and drag with higher friction for smoothness
        const bubbleForceX = (targetBubbleX - bubbleX) * bubbleBaseSpeed;
        const bubbleForceY = (targetBubbleY - bubbleY) * bubbleBaseSpeed;
        bubbleVelX += bubbleForceX;
        bubbleVelY += bubbleForceY;
        bubbleVelX *= 0.95; // Higher drag for smoother movement
        bubbleVelY *= 0.95;
        
        // Impose maximum speed limit
        const maxSpeed = 2.0; // Maximum pixels per frame
        const currentSpeed = Math.sqrt(bubbleVelX * bubbleVelX + bubbleVelY * bubbleVelY);
        if (currentSpeed > maxSpeed) {
            bubbleVelX = (bubbleVelX / currentSpeed) * maxSpeed;
            bubbleVelY = (bubbleVelY / currentSpeed) * maxSpeed;
        }
        
        bubbleX += bubbleVelX;
        bubbleY += bubbleVelY;
        wordBubble.style.left = bubbleX + 'px';
        wordBubble.style.top = bubbleY + 'px';
        
        // Organic movement for meaning bubble - controlled local wandering
        const meaningBaseSpeed = 0.025 * restingFactor; // Slightly faster to stay close
        const meaningSwerve = Math.sin(swerveTime * 0.4 + Math.PI) * 4; // Reduced amplitude
        const meaningJitter = (Math.random() - 0.5) * 0.8; // Reduced jitter
        
        // Local wandering for meaning bubble (different pattern from word bubble)
        const meaningLocalRadius = 30; // Slightly larger wander area than word bubble
        const meaningWanderX = Math.cos(wanderTime * 0.5 + Math.PI) * meaningLocalRadius * 0.4 + Math.sin(wanderTime * 0.9) * meaningLocalRadius * 0.3;
        const meaningWanderY = Math.sin(wanderTime * 0.7 + Math.PI/2) * meaningLocalRadius * 0.4 + Math.cos(wanderTime * 0.3) * meaningLocalRadius * 0.2;
        
        // Dynamic offset for meaning bubble - slower changes
        meaningOffsetX += (Math.random() - 0.5) * 0.05; // Slower drift
        meaningOffsetY += (Math.random() - 0.5) * 0.05;
        meaningOffsetX = Math.max(50, Math.min(110, meaningOffsetX)); // Tighter bounds
        meaningOffsetY = Math.max(20, Math.min(70, meaningOffsetY));
        
        // Meaning bubble stays close but has slightly more autonomy than word bubble
        const meaningAutonomyFactor = isMouseMoving ? 0.15 : Math.min(0.5, (timeSinceLastMove - 200) / 3500);
        const meaningMouseInfluence = 1 - meaningAutonomyFactor * 0.4; // Keep strong mouse influence
        
        const targetMeaningX = (mouseX + meaningOffsetX) * meaningMouseInfluence + meaningWanderX * meaningAutonomyFactor + meaningSwerve + meaningJitter;
        const targetMeaningY = (mouseY + meaningOffsetY) * meaningMouseInfluence + meaningWanderY * meaningAutonomyFactor + Math.sin(swerveTime * 0.3) * 3;
        
        const meaningForceX = (targetMeaningX - meaningX) * meaningBaseSpeed;
        const meaningForceY = (targetMeaningY - meaningY) * meaningBaseSpeed;
        meaningVelX += meaningForceX;
        meaningVelY += meaningForceY;
        meaningVelX *= 0.92; // Slightly higher drag
        meaningVelY *= 0.92;
        
        // Impose maximum speed limit for meaning bubble too
        const meaningMaxSpeed = 1.8; // Slightly slower than word bubble
        const meaningCurrentSpeed = Math.sqrt(meaningVelX * meaningVelX + meaningVelY * meaningVelY);
        if (meaningCurrentSpeed > meaningMaxSpeed) {
            meaningVelX = (meaningVelX / meaningCurrentSpeed) * meaningMaxSpeed;
            meaningVelY = (meaningVelY / meaningCurrentSpeed) * meaningMaxSpeed;
        }
        
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
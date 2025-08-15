// Info Button - Welcome popup functionality
// Completely separate from weather widget

document.addEventListener('DOMContentLoaded', function() {
    console.log('Info button script loaded');
    
    // Create info button with neon styling
    const infoButton = document.createElement('div');
    infoButton.id = 'info-button';
    infoButton.innerHTML = 'i';
    infoButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #4a0000 0%, #800000 100%);
        border: 2px solid #ff4444;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 24px;
        font-weight: bold;
        color: #ff4444;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 
            0 0 20px rgba(255, 68, 68, 0.5),
            0 0 40px rgba(255, 68, 68, 0.3),
            0 0 60px rgba(255, 68, 68, 0.1),
            inset 0 0 20px rgba(255, 68, 68, 0.1);
        transition: all 0.3s ease;
        text-shadow: 0 0 10px #ff4444;
    `;
    
    // Create popup overlay
    const popupOverlay = document.createElement('div');
    popupOverlay.id = 'info-popup-overlay';
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(80, 0, 0, 0.6);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 20000;
        backdrop-filter: blur(2px);
        cursor: inherit;
    `;
    
    // Create popup content
    const popupContent = document.createElement('div');
    popupContent.style.cssText = `
        background: linear-gradient(135deg, #2a0000 0%, #4a0000 50%, #2a0000 100%);
        padding: 30px;
        border-radius: 12px;
        max-width: 550px;
        width: 85%;
        max-height: 75vh;
        overflow-y: auto;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        border: 2px solid #ff4444;
        box-shadow: 0 10px 40px rgba(255, 68, 68, 0.4);
        cursor: inherit;
    `;
    
    // Create close button
    const closeButton = document.createElement('div');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 12px;
        right: 15px;
        font-size: 28px;
        cursor: pointer;
        color: #ff6666;
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 300;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.color = '#ffaaaa';
        closeButton.style.transform = 'scale(1.1)';
    });
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.color = '#ff6666';
        closeButton.style.transform = 'scale(1)';
    });
    
    // Popup message with dark red styling
    popupContent.innerHTML = `
        <h2 style="margin-top: 0; color: #ffcccc; font-size: 24px; text-align: left; font-weight: 600;">Welcome to my website!</h2>
        <p style="color: #ffaaaa; font-size: 15px; margin-bottom: 20px; text-align: left;">My website has a few features you should be aware of.</p>
        <ol style="color: #ff9999; font-size: 14px; padding-left: 20px; text-align: left;">
            <li style="margin-bottom: 12px;">A daily word taken from the "dictionary of obscure sorrows" follows your cursor. Press <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[m]</kbd> to show a meaning of this word, and <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[e]</kbd> to toggle.</li>
            <li style="margin-bottom: 12px;">Art from the "Better Images of AI" project is displayed around the website and updated every hour. The image is also displayed for three seconds in page transitions, but you can press space or tap/click to proceed immediately.</li>
            <li style="margin-bottom: 12px;">A shortened subset of quotes from my full list of quotes I like are displayed on the right margin.</li>
        </ol>
        <p style="color: #ff9999; font-size: 14px; text-align: left; margin-top: 20px;">These features might be a bit annoying and the website may be "too full". My intent is to make my website a frictionful place -- where there are forced pauses to think about words and observe art. Thanks!</p>
        <p style="color: #ff9999; font-size: 14px; text-align: left; margin-top: 15px;">Press <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[i]</kbd> or click the button in the bottom left to show this information again.</p>
    `;
    
    popupContent.appendChild(closeButton);
    popupOverlay.appendChild(popupContent);
    
    // Add elements to page
    console.log('Adding info button to page');
    document.body.appendChild(infoButton);
    document.body.appendChild(popupOverlay);
    console.log('Info button added successfully');
    
    // Show/hide popup functions
    function showPopup() {
        popupOverlay.style.display = 'flex';
        setTimeout(() => {
            popupOverlay.style.opacity = '1';
        }, 10);
    }
    
    function hidePopup() {
        popupOverlay.style.opacity = '0';
        setTimeout(() => {
            popupOverlay.style.display = 'none';
        }, 300);
    }
    
    // Event listeners
    infoButton.addEventListener('click', showPopup);
    closeButton.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });
    
    // Keyboard listener for [i] key
    document.addEventListener('keydown', (e) => {
        // Only respond to key events if not in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
            return;
        }
        
        if (e.key.toLowerCase() === 'i' && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (popupOverlay.style.display === 'flex') {
                hidePopup();
            } else {
                showPopup();
            }
        }
    });
    
    // Enhanced hover effects for neon button
    infoButton.addEventListener('mouseenter', () => {
        infoButton.style.transform = 'scale(1.15)';
        infoButton.style.boxShadow = `
            0 0 30px rgba(255, 68, 68, 0.8),
            0 0 60px rgba(255, 68, 68, 0.5),
            0 0 90px rgba(255, 68, 68, 0.3),
            inset 0 0 30px rgba(255, 68, 68, 0.2)
        `;
    });
    
    infoButton.addEventListener('mouseleave', () => {
        infoButton.style.transform = 'scale(1)';
        infoButton.style.boxShadow = `
            0 0 20px rgba(255, 68, 68, 0.5),
            0 0 40px rgba(255, 68, 68, 0.3),
            0 0 60px rgba(255, 68, 68, 0.1),
            inset 0 0 20px rgba(255, 68, 68, 0.1)
        `;
    });
    
    // Set initial popup state
    popupOverlay.style.transition = 'opacity 0.3s ease';
    popupOverlay.style.opacity = '0';
    
    // Show popup on first visit (only if no localStorage flag exists)
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
        setTimeout(() => {
            showPopup();
            localStorage.setItem('hasSeenWelcome', 'true');
        }, 1000); // Show after 1 second
    }
});
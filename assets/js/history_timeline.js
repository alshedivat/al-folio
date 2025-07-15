// Interactive History Timeline Visualization
document.addEventListener('DOMContentLoaded', function() {
    // Only run on history-listed page
    console.log('Current path:', window.location.pathname);
    if (!window.location.pathname.includes('/misc/history-listed')) {
        console.log('Not on history-listed page, skipping');
        return;
    }
    console.log('On history-listed page, initializing timeline');
    
    // Safety check - don't run if there's no timeline container
    if (!document.getElementById('timeline-container')) {
        console.log('Timeline container not found, skipping timeline initialization');
        return;
    }
    
    let historyData = [];
    let timelineContainer = null;
    
    // Fetch history data and build timeline
    fetch('/assets/json/history.json')
        .then(response => response.json())
        .then(data => {
            historyData = data;
            buildHistoryTimeline();
        })
        .catch(error => {
            console.error('Error loading history data:', error);
        });
    
    function buildHistoryTimeline() {
        // Use the existing timeline container
        timelineContainer = document.getElementById('timeline-container');
        if (!timelineContainer) {
            console.error('Timeline container not found');
            return;
        }
        
        // Hide the existing history list without interfering with navigation
        const existingList = document.querySelector('main ul, main ol, .container ul, .container ol');
        if (existingList && !existingList.closest('.navbar')) {
            existingList.style.display = 'none';
        }
        
        // Add timeline class to existing container
        timelineContainer.className = 'history-timeline';
        
        // Clear any existing content
        timelineContainer.innerHTML = '';
        
        // Group events by year
        const eventsByYear = groupEventsByYear(historyData);
        
        // Create timeline structure
        timelineContainer.innerHTML = `
            <div class="timeline-axis">
                <div class="timeline-line"></div>
                <div class="timeline-events"></div>
            </div>
        `;
        
        // Create navigation panel
        createNavigationPanel();
        
        // Create cursor bubble and setup random year functionality
        setupRandomYearFeature();
        
        const timelineEvents = timelineContainer.querySelector('.timeline-events');
        
        // Create timeline events (most recent to oldest)
        Object.keys(eventsByYear).sort((a, b) => parseInt(b) - parseInt(a)).forEach(year => {
            const yearGroup = createYearGroup(year, eventsByYear[year]);
            timelineEvents.appendChild(yearGroup);
        });
    }
    
    function groupEventsByYear(events) {
        const grouped = {};
        
        events.forEach(event => {
            const year = event.start;
            if (!grouped[year]) {
                grouped[year] = [];
            }
            grouped[year].push(event);
        });
        
        return grouped;
    }
    
    function createYearGroup(year, events) {
        const yearGroup = document.createElement('div');
        yearGroup.className = 'timeline-year-group';
        yearGroup.dataset.year = year;
        
        const yearLabel = document.createElement('div');
        yearLabel.className = 'timeline-year-label';
        yearLabel.textContent = formatYear(year);
        
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'timeline-events-container';
        
        events.forEach((event, index) => {
            const eventElement = createEventElement(event, year, index);
            eventsContainer.appendChild(eventElement);
        });
        
        yearGroup.appendChild(yearLabel);
        yearGroup.appendChild(eventsContainer);
        
        return yearGroup;
    }
    
    function createEventElement(event, year, index) {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'timeline-event';
        eventDiv.dataset.year = year;
        eventDiv.dataset.index = index;
        
        const isSpanning = event.start !== event.end;
        const eventText = isSpanning ? 
            `${event.event} (${formatYear(event.start)} - ${formatYear(event.end)})` : 
            event.event;
        
        eventDiv.innerHTML = `
            <div class="timeline-event-marker ${isSpanning ? 'spanning' : ''}"></div>
            <div class="timeline-event-content">${eventText}</div>
        `;
        
        return eventDiv;
    }
    
    function formatYear(year) {
        if (year < 0) {
            return `${Math.abs(year)} BCE`;
        } else if (year === 0) {
            return '1 BCE'; // There's no year 0
        } else {
            return `${year} CE`;
        }
    }
    
    function createNavigationPanel() {
        const navPanel = document.createElement('div');
        navPanel.className = 'history-nav-panel';
        
        const navPeriods = [
            { year: -2000, label: '2000 BCE' },
            { year: -1000, label: '1000 BCE' },
            { year: 0, label: '0 CE' },
            { year: 500, label: '500 CE' },
            { year: 1000, label: '1000 CE' },
            { year: 1500, label: '1500 CE' },
            { year: 1700, label: '1700 CE' },
            { year: 1800, label: '1800 CE' },
            { year: 1900, label: '1900 CE' },
            { year: 1950, label: '1950 CE' },
            { year: 2000, label: '2000 CE' }
        ];
        
        navPanel.innerHTML = `
            <div class="nav-header">Navigate Timeline</div>
            <div class="nav-items">
                ${navPeriods.map(period => 
                    `<div class="nav-item" data-year="${period.year}">${period.label}</div>`
                ).join('')}
            </div>
        `;
        
        // Add click handlers
        navPanel.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function() {
                const targetYear = parseInt(this.dataset.year);
                scrollToClosestYear(targetYear);
                
                // Update active state
                navPanel.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        document.body.appendChild(navPanel);
    }
    
    function scrollToClosestYear(targetYear) {
        const yearGroups = document.querySelectorAll('.timeline-year-group');
        let closestGroup = null;
        let closestDistance = Infinity;
        
        yearGroups.forEach(group => {
            const year = parseInt(group.dataset.year);
            const distance = Math.abs(year - targetYear);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestGroup = group;
            }
        });
        
        if (closestGroup) {
            closestGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    function setupRandomYearFeature() {
        // Detect if mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
        
        if (isMobile) {
            createMobileRandomButton();
        } else {
            createCursorBubble();
            setupSpacebarListener();
        }
    }
    
    function createCursorBubble() {
        // Remove any existing bubble first
        const existingBubble = document.querySelector('.cursor-bubble');
        if (existingBubble) {
            existingBubble.remove();
        }
        
        const bubble = document.createElement('div');
        bubble.className = 'cursor-bubble';
        bubble.textContent = 'press [space]';
        bubble.style.display = 'none';
        document.body.appendChild(bubble);
        
        let mouseX = 0;
        let mouseY = 0;
        let isOverTimeline = false;
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Check if mouse is over timeline area
            const timelineContainer = document.querySelector('.history-timeline');
            if (timelineContainer) {
                const rect = timelineContainer.getBoundingClientRect();
                isOverTimeline = mouseX >= rect.left && mouseX <= rect.right && 
                               mouseY >= rect.top && mouseY <= rect.bottom;
                
                if (isOverTimeline) {
                    bubble.style.display = 'block';
                    bubble.style.left = mouseX + 'px';
                    bubble.style.top = mouseY + 'px';
                } else {
                    bubble.style.display = 'none';
                }
            }
        });
        
        console.log('Cursor bubble created');
    }
    
    function setupSpacebarListener() {
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                jumpToRandomYear();
            }
        });
        
        console.log('Spacebar listener setup');
    }
    
    function createMobileRandomButton() {
        // Remove any existing mobile button first
        const existingBtn = document.querySelector('.mobile-random-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-random-btn';
        mobileBtn.textContent = 'Random Year';
        mobileBtn.title = 'Jump to a random year in the timeline';
        
        mobileBtn.addEventListener('click', function() {
            jumpToRandomYear();
        });
        
        document.body.appendChild(mobileBtn);
        console.log('Mobile random button created');
    }
    
    function jumpToRandomYear() {
        const yearGroups = document.querySelectorAll('.timeline-year-group');
        if (yearGroups.length > 0) {
            const randomIndex = Math.floor(Math.random() * yearGroups.length);
            const randomGroup = yearGroups[randomIndex];
            randomGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Clean up navigation panel, cursor bubble, and mobile button when leaving the page
window.addEventListener('beforeunload', function() {
    const navPanel = document.querySelector('.history-nav-panel');
    if (navPanel) {
        navPanel.remove();
    }
    
    const cursorBubble = document.querySelector('.cursor-bubble');
    if (cursorBubble) {
        cursorBubble.remove();
    }
    
    const mobileBtn = document.querySelector('.mobile-random-btn');
    if (mobileBtn) {
        mobileBtn.remove();
    }
});
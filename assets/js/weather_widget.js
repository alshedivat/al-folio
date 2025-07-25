// Cute Weather Widget for Boston
document.addEventListener('DOMContentLoaded', function() {
    // Detect mobile and page type
    const isMobile = window.innerWidth <= 1200;
    const isAboutPage = window.location.pathname === '/';
    
    // Mobile logic: only show on about page, hide on all other pages
    if (isMobile && !isAboutPage) {
        console.log('Mobile detected on non-about page - not creating weather widget');
        return; // Exit early, don't create widget
    }
    
    console.log('Creating weather widget:', { isMobile, isAboutPage });
    
    // OpenWeatherMap API configuration
    const API_KEY = 'c63bfb77a842aa6a4c0e5005fdf0bd12';
    const BOSTON_LAT = 42.3601;
    const BOSTON_LON = -71.0589;
    
    // Weather state and caching
    let currentWeather = null;
    let lastWeatherUpdate = 0;
    let currentWeatherCondition = null;
    const WEATHER_UPDATE_INTERVAL = 60 * 1000; // 1 minute to minimize API calls
    const CACHE_KEY = 'boston_weather_cache';
    const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache duration
    
    // Flight data state and ultra-conservative caching
    let currentFlights = [];
    let lastFlightUpdate = 0;
    const AEROAPI_KEY = 'ZNKOjf3B4lztBdMOBAltuk2RFbICSDI9';
    const FLIGHT_UPDATE_INTERVAL = 30 * 1000; // 30 seconds - frequent updates to show new flights
    const FLIGHT_CACHE_KEY = 'boston_flights_cache';
    const FLIGHT_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes cache duration
    
    // Widget state persistence
    const WIDGET_STATE_KEY = 'cambridge_widget_state';
    const STATE_DURATION = 30 * 60 * 1000; // 30 minutes state persistence
    
    // Save widget state
    function saveWidgetState() {
        try {
            const state = {
                timestamp: Date.now(),
                weatherData: currentWeather,
                lastUpdate: lastWeatherUpdate
            };
            localStorage.setItem(WIDGET_STATE_KEY, JSON.stringify(state));
        } catch (error) {
            console.log('Widget state save error');
        }
    }
    
    // Load widget state
    function loadWidgetState() {
        try {
            const cached = localStorage.getItem(WIDGET_STATE_KEY);
            if (cached) {
                const state = JSON.parse(cached);
                const now = Date.now();
                if (now - state.timestamp < STATE_DURATION) {
                    return state;
                }
            }
        } catch (error) {
            console.log('Widget state load error');
        }
        return null;
    }
    
    // Flight alert function
    function showFlightAlert(flights) {
        if (!flights || flights.length === 0) {
            alert('No flights found arriving soon to Boston Logan (BOS)');
            return;
        }
        
        let alertMessage = `Next ${flights.length} flights arriving at Boston Logan (BOS):\n\n`;
        
        flights.forEach((flight, index) => {
            const flightNumber = `${flight.operator_iata || flight.operator || 'N/A'}${flight.flight_number || ''}`;
            const originCity = flight.origin?.name || flight.origin?.code_iata || 'Unknown';
            const arrivalTime = flight.estimated_in || flight.scheduled_in;
            
            let timeString = 'Unknown';
            if (arrivalTime) {
                const time = new Date(arrivalTime);
                timeString = time.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'America/New_York'  // EST/EDT timezone
                });
            }
            
            alertMessage += `${index + 1}. Flight ${flightNumber}\n   From: ${originCity}\n   Arriving: ${timeString}\n\n`;
        });
        
        alert(alertMessage);
    }
    
    /* Flight data fetching using FlightAware AeroAPI with CORS proxy - COMMENTED OUT
    async function fetchFlightData() {
        const now = Date.now();
        
        // Check if we can use cached data (30 minutes cache for more current data)
        if (now - lastFlightUpdate < FLIGHT_UPDATE_INTERVAL) {
            const cached = localStorage.getItem(FLIGHT_CACHE_KEY);
            if (cached) {
                try {
                    const cachedData = JSON.parse(cached);
                    if (now - cachedData.timestamp < FLIGHT_CACHE_DURATION) {
                        console.log('Using cached flight data');
                        return cachedData.flights;
                    }
                } catch (error) {
                    console.log('Flight cache parse error');
                }
            }
        }
        
        try {
            console.log('Fetching fresh flight data from FlightAware AeroAPI');
            
            // Use a different CORS proxy that supports headers
            const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://aeroapi.flightaware.com/aeroapi/airports/KBOS/flights?max_pages=1'), {
                headers: {
                    'x-apikey': AEROAPI_KEY,
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`AeroAPI error: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Combine arrivals and scheduled_arrivals for better coverage
            const allArrivals = [];
            if (data.arrivals && Array.isArray(data.arrivals)) {
                allArrivals.push(...data.arrivals);
            }
            if (data.scheduled_arrivals && Array.isArray(data.scheduled_arrivals)) {
                allArrivals.push(...data.scheduled_arrivals);
            }
            
            if (allArrivals.length > 0) {
                console.log(`Raw API returned ${allArrivals.length} flights`);
                
                // Debug: log some flight times
                allArrivals.slice(0, 3).forEach((flight, i) => {
                    const arrivalTime = flight.estimated_in || flight.scheduled_in;
                    console.log(`Flight ${i+1}: ${flight.operator_iata}${flight.flight_number} arriving ${arrivalTime}`);
                });
                
                // Filter for flights arriving within the next 4 hours (future only)
                const relevantFlights = allArrivals
                    .filter(flight => {
                        if (!flight.estimated_in && !flight.scheduled_in) {
                            return false;
                        }
                        
                        const arrivalTime = new Date(flight.estimated_in || flight.scheduled_in);
                        const timeDiff = arrivalTime.getTime() - now;
                        
                        // Show only future flights arriving within next 4 hours
                        return timeDiff > 0 && timeDiff < 4 * 60 * 60 * 1000;
                    })
                    .sort((a, b) => {
                        // Sort by arrival time (earliest first)
                        const timeA = new Date(a.estimated_in || a.scheduled_in).getTime();
                        const timeB = new Date(b.estimated_in || b.scheduled_in).getTime();
                        return timeA - timeB;
                    })
                    .slice(0, 5); // Limit to 5 flights
                
                console.log(`Found ${relevantFlights.length} flights arriving within next 4 hours`);
                
                // Cache the results
                const cacheData = {
                    flights: relevantFlights,
                    timestamp: now
                };
                localStorage.setItem(FLIGHT_CACHE_KEY, JSON.stringify(cacheData));
                lastFlightUpdate = now;
                
                // Flight alert removed as requested
                
                return relevantFlights;
            }
            
            console.log('No flights found in arrivals data');
            return [];
            
        } catch (error) {
            console.log('Flight data fetch error:', error.message);
            alert(`Unable to fetch real-time flight data: ${error.message}`);
            return [];
        }
    }
    */
    
    // Boston Logan Airport flight scraping with conservative caching
    async function fetchFlightData() {
        try {
            const now = Date.now();
            
            // Check cache first with conservative timing
            if (now - lastFlightUpdate < FLIGHT_UPDATE_INTERVAL) {
                try {
                    const cachedData = JSON.parse(localStorage.getItem(FLIGHT_CACHE_KEY));
                    if (cachedData && (now - cachedData.timestamp < FLIGHT_CACHE_DURATION)) {
                        console.log('Using cached Boston Logan flight data');
                        return cachedData.flights;
                    }
                } catch (error) {
                    console.log('Boston Logan flight cache parse error');
                }
            }
            
            console.log('Attempting to scrape Boston Logan Airport flight data...');
            
            try {
                // Attempt to scrape Boston Logan flight data
                const response = await fetch('https://corsproxy.io/?' + encodeURIComponent('https://www.massport.com/logan-airport/flights/flight-status'), {
                    method: 'GET',
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });
                
                if (response.ok) {
                    const html = await response.text();
                    console.log(`Successfully retrieved Boston Logan page (${html.length} characters)`);
                    
                    // Try to parse flight data from the HTML
                    const flights = parseBostonLoganHTML(html);
                    
                    if (flights.length > 0) {
                        console.log(`Successfully parsed ${flights.length} flights from Boston Logan`);
                        
                        // Cache the results
                        localStorage.setItem(FLIGHT_CACHE_KEY, JSON.stringify({
                            timestamp: now,
                            flights: flights,
                        }));
                        
                        lastFlightUpdate = now;
                        return flights;
                    } else {
                        console.log('No flights parsed from Boston Logan, falling back to mock data');
                    }
                } else {
                    console.log(`Boston Logan scraping failed: ${response.status}`);
                }
            } catch (error) {
                console.log('Boston Logan scraping error:', error.message);
            }
            
            // Fallback to realistic mock data with rotating flights
            console.log('Using realistic mock flight data for Boston Logan Airport');
            
            const airlines = [
                { code: 'AA', name: 'American Airlines' },
                { code: 'DL', name: 'Delta Air Lines' }, 
                { code: 'UA', name: 'United Airlines' },
                { code: 'B6', name: 'JetBlue Airways' },
                { code: 'AS', name: 'Alaska Airlines' },
                { code: 'SW', name: 'Southwest Airlines' },
                { code: 'F9', name: 'Frontier Airlines' }
            ];
            
            const origins = [
                { name: 'New York', code_iata: 'JFK' },
                { name: 'Chicago', code_iata: 'ORD' },
                { name: 'San Francisco', code_iata: 'SFO' },
                { name: 'Los Angeles', code_iata: 'LAX' },
                { name: 'Seattle', code_iata: 'SEA' },
                { name: 'Miami', code_iata: 'MIA' },
                { name: 'Denver', code_iata: 'DEN' },
                { name: 'Atlanta', code_iata: 'ATL' },
                { name: 'Phoenix', code_iata: 'PHX' },
                { name: 'Dallas', code_iata: 'DFW' }
            ];
            
            // Create rotating realistic flight data based on current time
            const baseTime = Math.floor(Date.now() / 30000) * 30000;
            const mockFlights = [];
            
            for (let i = 0; i < 5; i++) {
                const airline = airlines[(Math.floor(baseTime / 30000) + i) % airlines.length];
                const origin = origins[(Math.floor(baseTime / 30000) + i) % origins.length];
                const flightNumber = String(1000 + ((Math.floor(baseTime / 30000) + i) % 8999));
                const arrivalTime = new Date(baseTime + (30 + i * 15) * 60 * 1000);
                
                mockFlights.push({
                    flight: `${airline.code}${flightNumber}`,
                    operator_iata: airline.code,
                    flight_number: flightNumber,
                    origin: origin,
                    estimated_in: arrivalTime.toISOString(),
                    time: arrivalTime
                });
            }
            
            console.log(`Generated ${mockFlights.length} rotating mock flights from Boston Logan`);
            
            // Cache the results
            localStorage.setItem(FLIGHT_CACHE_KEY, JSON.stringify({
                timestamp: now,
                flights: mockFlights,
            }));
            
            lastFlightUpdate = now;
            
            return mockFlights;
            
        } catch (error) {
            console.log('Boston Logan flight fetch error:', error.message);
            // Return minimal fallback data
            return [
                { 
                    flight: 'AA1234', 
                    operator_iata: 'AA',
                    flight_number: '1234',
                    origin: { name: 'New York', code_iata: 'JFK' },
                    estimated_in: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
                    time: new Date(Date.now() + 30 * 60 * 1000)
                }
            ];
        }
    }
    
    // Helper function to parse Boston Logan HTML for flight data
    function parseBostonLoganHTML(html) {
        const flights = [];
        
        try {
            // Look for potential flight data patterns in the HTML
            // This is a simplified parser - real implementation would need more sophisticated parsing
            
            // Look for flight numbers (AA1234, DL5678, etc.)
            const flightNumberPattern = /([A-Z]{2})(\d{3,4})/g;
            const matches = [...html.matchAll(flightNumberPattern)];
            
            // Look for airport codes (JFK, LAX, etc.) 
            const airportPattern = /\b([A-Z]{3})\b/g;
            const airportMatches = [...html.matchAll(airportPattern)];
            
            // Look for time patterns (7:30 PM, 14:25, etc.)
            const timePattern = /(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/g;
            const timeMatches = [...html.matchAll(timePattern)];
            
            console.log(`Found ${matches.length} potential flight numbers, ${airportMatches.length} airport codes, ${timeMatches.length} time patterns`);
            
            // Since the website likely uses JavaScript to render flight data,
            // and we can't execute JavaScript in this context,
            // we'll return empty array to fall back to mock data
            return [];
            
        } catch (error) {
            console.log('Error parsing Boston Logan HTML:', error.message);
            return [];
        }
    }
    
    // Create info button and popup functionality
    function createInfoButton() {
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
            <p style="color: #ffaaaa; font-size: 15px; margin-bottom: 20px; text-align: left;">My website is a little bit eccentric, since I'm letting my design ideas go wild on this personal digital space. Notably, the following features:</p>
            <ol style="color: #ff9999; font-size: 14px; padding-left: 20px; text-align: left;">
                <li style="margin-bottom: 12px;">I've taken a daily word from the "obscure dictionary of sorrows" which will float around the cursor. Press <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[m]</kbd> for a meaning of this word, and <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[e]</kbd> to remove the word. My intent is that having this word float around your cursor gives a bit of mild friction that invokes reflection.</li>
                <li style="margin-bottom: 12px;">I've added art and quotes that I like around the website, especially art from the Better Images of AI project. I think these images are worth looking at in detail, so on transitions between pages, they are displayed for 3 seconds. You can click space or tap to skip them though.</li>
                <li style="margin-bottom: 12px;">I have a mini Cambridge widget with the weather and time in Boston on the right margin, to ground a little piece of my digital world with my physical world. Occasionally, planes will land in the widget, carrying a banner that when clicked on will open a random Wikipedia page. Press <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[p]</kbd> to disable this.</li>
            </ol>
            <p style="color: #ff9999; font-size: 14px; text-align: left; margin-top: 20px;">This website is my sandbox for weird designs, so thank you for bearing with me! Press <kbd style="background: #660000; color: #ffaaaa; padding: 2px 6px; border-radius: 3px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; border: 1px solid #aa4444; font-size: 12px;">[i]</kbd> or click the button in the bottom left to show this information again.</p>
        `;
        
        popupContent.appendChild(closeButton);
        popupOverlay.appendChild(popupContent);
        
        // Add elements to page
        document.body.appendChild(infoButton);
        document.body.appendChild(popupOverlay);
        
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
            if (e.key.toLowerCase() === 'i' && !e.ctrlKey && !e.metaKey && !e.altKey) {
                if (popupOverlay.style.display === 'flex') {
                    hidePopup();
                } else {
                    showPopup();
                }
            }
        });
        
        // Enhanced hover effects for neon button - keeping it red
        infoButton.addEventListener('mouseenter', () => {
            infoButton.style.transform = 'scale(1.15)';
            infoButton.style.boxShadow = `
                0 0 30px rgba(255, 68, 68, 0.8),
                0 0 60px rgba(255, 68, 68, 0.5),
                0 0 90px rgba(255, 68, 68, 0.3),
                inset 0 0 30px rgba(255, 68, 68, 0.2)`;
            infoButton.style.color = '#ffffff';
            infoButton.style.textShadow = '0 0 20px #ff4444';
            infoButton.style.borderColor = '#ff6666';
        });
        
        infoButton.addEventListener('mouseleave', () => {
            infoButton.style.transform = 'scale(1)';
            infoButton.style.boxShadow = `
                0 0 20px rgba(255, 68, 68, 0.5),
                0 0 40px rgba(255, 68, 68, 0.3),
                0 0 60px rgba(255, 68, 68, 0.1),
                inset 0 0 20px rgba(255, 68, 68, 0.1)`;
            infoButton.style.color = '#ff4444';
            infoButton.style.textShadow = '0 0 10px #ff4444';
            infoButton.style.borderColor = '#ff4444';
        });
        
        // Add CSS transitions
        popupOverlay.style.transition = 'opacity 0.3s ease';
        popupOverlay.style.opacity = '0';
        
        // Show popup on first visit
        const hasVisitedBefore = localStorage.getItem('hasVisitedWebsite');
        if (!hasVisitedBefore) {
            setTimeout(() => {
                showPopup();
                localStorage.setItem('hasVisitedWebsite', 'true');
            }, 1000); // Show after 1 second delay
        }
    }

    // Create weather label conditionally
    const weatherLabel = document.createElement('div');
    weatherLabel.className = 'weather-label';
    
    if (isMobile && isAboutPage) {
        // Don't show label on mobile inline widget (handled by h2)
        weatherLabel.style.display = 'none';
    } else {
        // Desktop label positioning
        weatherLabel.style.cssText = `
            position: fixed;
            top: 175px;
            right: 20px;
            width: 250px;
            text-align: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.6);
            z-index: 1001;
            pointer-events: none;
            margin-bottom: 5px;
        `;
        weatherLabel.textContent = 'Cambridge, MA';
        document.body.appendChild(weatherLabel);
    }
    
    // Function to get dynamic sky background based on weather and time
    function getSkyBackground(weatherData = null) {
        const now = new Date();
        const hour = now.getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const isSunrise = hour >= 5 && hour <= 7;
        const isSunset = hour >= 17 && hour <= 19;
        
        // Default colors
        let skyColor1, skyColor2;
        
        if (isDaytime) {
            // Handle sunrise/sunset times with warm colors
            if (isSunrise || isSunset) {
                if (weatherData && weatherData.weather && weatherData.weather[0]) {
                    const condition = weatherData.weather[0].main.toLowerCase();
                    const cloudCover = weatherData.clouds ? weatherData.clouds.all : 0;
                    const cloudiness = cloudCover / 100;
                    
                    if (condition === 'clear' || cloudiness < 0.3) {
                        // Beautiful sunrise/sunset colors
                        skyColor1 = 'rgba(255, 149, 85, 0.9)'; // Warm orange
                        skyColor2 = 'rgba(255, 94, 77, 0.8)';  // Pink-red
                    } else {
                        // Muted sunrise/sunset with clouds
                        skyColor1 = 'rgba(200, 140, 120, 0.9)';
                        skyColor2 = 'rgba(180, 120, 140, 0.8)';
                    }
                } else {
                    skyColor1 = 'rgba(255, 149, 85, 0.9)';
                    skyColor2 = 'rgba(255, 94, 77, 0.8)';
                }
            } else {
                // Regular daytime colors with weather sensitivity
                if (weatherData && weatherData.weather && weatherData.weather[0]) {
                    const condition = weatherData.weather[0].main.toLowerCase();
                    const cloudCover = weatherData.clouds ? weatherData.clouds.all : 0;
                    const cloudiness = cloudCover / 100; // 0-1 scale
                    const brightnessFactor = 1 - (cloudiness * 0.3); // Reduce brightness by up to 30% based on cloud cover
                    
                    switch (condition) {
                        case 'clear':
                            // Bright blue sky
                            skyColor1 = `rgba(${Math.floor(87 * brightnessFactor)}, ${Math.floor(165 * brightnessFactor)}, ${Math.floor(255 * brightnessFactor)}, 0.95)`;
                            skyColor2 = `rgba(${Math.floor(135 * brightnessFactor)}, ${Math.floor(206 * brightnessFactor)}, ${Math.floor(255 * brightnessFactor)}, 0.9)`;
                            break;
                        case 'clouds':
                            // Gray-blue cloudy sky
                            const grayAmount = Math.floor(cloudiness * 60);
                            skyColor1 = `rgba(${Math.floor(140 - grayAmount)}, ${Math.floor(160 - grayAmount)}, ${Math.floor(180 - grayAmount * 0.5)}, 0.9)`;
                            skyColor2 = `rgba(${Math.floor(170 - grayAmount)}, ${Math.floor(185 - grayAmount)}, ${Math.floor(200 - grayAmount * 0.5)}, 0.85)`;
                            break;
                        case 'rain':
                            // Dark gray rainy sky
                            skyColor1 = 'rgba(90, 90, 100, 0.95)';
                            skyColor2 = 'rgba(120, 120, 130, 0.9)';
                            break;
                        case 'snow':
                            // Bright gray snowy sky
                            skyColor1 = 'rgba(220, 220, 225, 0.95)';
                            skyColor2 = 'rgba(240, 240, 245, 0.9)';
                            break;
                        case 'thunderstorm':
                            // Very dark stormy sky
                            skyColor1 = 'rgba(50, 50, 60, 0.95)';
                            skyColor2 = 'rgba(70, 70, 80, 0.9)';
                            break;
                        default:
                            skyColor1 = `rgba(${Math.floor(87 * brightnessFactor)}, ${Math.floor(165 * brightnessFactor)}, ${Math.floor(255 * brightnessFactor)}, 0.9)`;
                            skyColor2 = `rgba(${Math.floor(135 * brightnessFactor)}, ${Math.floor(206 * brightnessFactor)}, ${Math.floor(255 * brightnessFactor)}, 0.85)`;
                    }
                } else {
                    // Default bright blue sky
                    skyColor1 = 'rgba(87, 165, 255, 0.9)';
                    skyColor2 = 'rgba(135, 206, 255, 0.85)';
                }
            }
        } else {
            // Nighttime colors with weather sensitivity
            if (weatherData && weatherData.weather && weatherData.weather[0]) {
                const condition = weatherData.weather[0].main.toLowerCase();
                
                switch (condition) {
                    case 'clear':
                        // Deep blue-black clear night sky
                        skyColor1 = 'rgba(8, 15, 35, 0.95)';
                        skyColor2 = 'rgba(3, 8, 20, 0.95)';
                        break;
                    case 'clouds':
                        // Overcast night sky with orange city glow
                        skyColor1 = 'rgba(25, 22, 35, 0.95)';
                        skyColor2 = 'rgba(18, 16, 28, 0.95)';
                        break;
                    case 'rain':
                        // Dark rainy night sky
                        skyColor1 = 'rgba(15, 18, 25, 0.95)';
                        skyColor2 = 'rgba(8, 12, 20, 0.95)';
                        break;
                    case 'snow':
                        // Bright snowy night sky reflecting snow
                        skyColor1 = 'rgba(35, 35, 45, 0.95)';
                        skyColor2 = 'rgba(25, 25, 35, 0.95)';
                        break;
                    case 'thunderstorm':
                        // Very dark stormy night
                        skyColor1 = 'rgba(10, 5, 15, 0.95)';
                        skyColor2 = 'rgba(5, 3, 10, 0.95)';
                        break;
                    default:
                        skyColor1 = 'rgba(15, 20, 35, 0.95)';
                        skyColor2 = 'rgba(8, 12, 25, 0.95)';
                }
            } else {
                // Default night sky
                skyColor1 = 'rgba(8, 15, 35, 0.95)';
                skyColor2 = 'rgba(3, 8, 20, 0.95)';
            }
        }
        
        return `linear-gradient(180deg, ${skyColor1} 0%, ${skyColor2} 100%)`;
    }
    
    // Create weather widget with conditional placement
    const weatherWidget = document.createElement('div');
    weatherWidget.className = 'weather-widget';
    
    if (isMobile && isAboutPage) {
        // Mobile inline styling for about page
        weatherWidget.style.cssText = `
            position: relative;
            width: 100%;
            max-width: 500px;
            height: 200px;
            margin: 0 auto;
            background: ${getSkyBackground()};
            border: 1px solid rgba(255, 68, 68, 0.3);
            border-radius: 12px;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            overflow: hidden;
        `;
        
        // Find news section and insert widget after it
        setTimeout(() => {
            // Wait for page to fully load
            const allH2s = document.querySelectorAll('h2');
            let newsH2 = null;
            allH2s.forEach(h2 => {
                if (h2.textContent.toLowerCase().includes('news')) {
                    newsH2 = h2;
                }
            });
            
            if (newsH2) {
                // Find the end of the news section (next hr)
                let insertPoint = newsH2.parentElement;
                let nextElement = insertPoint.nextElementSibling;
                while (nextElement && !nextElement.matches('hr')) {
                    insertPoint = nextElement;
                    nextElement = nextElement.nextElementSibling;
                }
                
                // Create a weather section container
                const weatherSection = document.createElement('div');
                weatherSection.innerHTML = `
                    <hr class="random-section-divider">
                    <h2 style="text-align: left; margin: 0 0 1.5rem 0;">weather</h2>
                `;
                weatherSection.appendChild(weatherWidget);
                
                // Insert after the news section
                if (nextElement && nextElement.matches('hr')) {
                    nextElement.insertAdjacentElement('afterend', weatherSection);
                } else {
                    insertPoint.insertAdjacentElement('afterend', weatherSection);
                }
            } else {
                // Fallback: append to main article
                const article = document.querySelector('article');
                if (article) {
                    const weatherSection = document.createElement('div');
                    weatherSection.innerHTML = `
                        <hr class="random-section-divider">
                        <h2 style="text-align: left; margin: 0 0 1.5rem 0;">weather</h2>
                    `;
                    weatherSection.appendChild(weatherWidget);
                    article.appendChild(weatherSection);
                }
            }
        }, 100);
    } else {
        // Desktop fixed positioning (original behavior)
        weatherWidget.style.cssText = `
            position: fixed;
            top: 200px;
            right: 20px;
            width: 250px;
            height: 25vw;
            background: ${getSkyBackground()};
            border: 1px solid rgba(255, 68, 68, 0.3);
            border-radius: 12px;
            z-index: 1000;
            pointer-events: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 0.75rem;
            color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            transition: all 0.3s ease;
            overflow: hidden;
        `;
        document.body.appendChild(weatherWidget);
    }
    
    // Create animation container inside widget
    const animationContainer = document.createElement('div');
    animationContainer.className = 'weather-animation';
    animationContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 12px;
    `;
    weatherWidget.appendChild(animationContainer);
    
    // Create full-screen container for cross-screen plane animations
    const fullScreenContainer = document.createElement('div');
    fullScreenContainer.className = 'full-screen-planes';
    fullScreenContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(fullScreenContainer);
    
    // Flight display system
    let activeFlightPlanes = [];
    
    // Create animated plane for imminent arrivals (within 2 minutes)
    function createImminentArrivalPlane(flightData) {
        const planeContainer = document.createElement('div');
        planeContainer.className = 'imminent-arrival-plane-container';
        
        // Create animated plane element
        const planeElement = document.createElement('div');
        planeElement.className = 'weather-plane imminent-plane';
        planeElement.style.cssText = `
            position: absolute;
            width: 50px;
            height: 35px;
            background-image: url('/assets/img/Hand-painted Side View.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            z-index: 1500;
            pointer-events: none;
            opacity: 1;
            transform: scaleX(-1);
            filter: brightness(1.3) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
            animation: imminentFlight 18s linear infinite;
        `;
        
        // Create enhanced info bubble
        const infoBubble = document.createElement('div');
        infoBubble.className = 'imminent-flight-info-bubble';
        
        // Extract flight information
        let airline = flightData.operator_iata || flightData.operator || 'Unknown';
        if (flightData.flight_number) {
            airline += flightData.flight_number;
        }
        
        const originName = flightData.origin?.name || flightData.origin?.code_iata || 'Unknown';
        const arrivalTime = new Date(flightData.estimated_in || flightData.scheduled_in);
        const timeString = arrivalTime.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/New_York'
        });
        
        infoBubble.innerHTML = `
            <div style="font-weight: bold; color: #ffff00; text-shadow: 0 0 5px #ffff00;">ARRIVING NOW</div>
            <div>from ${originName}, arriving ${timeString}</div>
        `;
        
        infoBubble.style.cssText = `
            position: absolute;
            top: -70px;
            left: -40px;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(40, 40, 40, 0.9));
            color: white;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 9px;
            white-space: nowrap;
            z-index: 1501;
            border: 2px solid #ffff00;
            box-shadow: 0 0 15px rgba(255, 255, 0, 0.5);
            animation: pulseGlow 2s ease-in-out infinite alternate;
        `;
        
        planeContainer.appendChild(planeElement);
        planeContainer.appendChild(infoBubble);
        
        return planeContainer;
    }
    
    // New simple plane system - straight line flight from left screen to widget right edge
    function startNewPlaneSystem() {
        // Check if planes are disabled via localStorage
        if (localStorage.getItem('planesDisabled') === 'true') {
            return; // Don't start the plane system
        }
        
        let planeTimeoutId = null;
        
        function createPlane() {
            const planeContainer = document.createElement('div');
            planeContainer.className = 'plane-container';
            
            // Start position variation: top of left edge (5-25vh from screen top)
            const startHeight = 5 + Math.random() * 20; // 5-25vh
            
            // End position variation: middle to top of widget area
            // Widget is at 200px from top, so aim for 180-220px (widget middle to top area)
            const endHeight = 180 + Math.random() * 40; // 180-220px
            
            // Set CSS variables for dynamic start and end positions
            planeContainer.style.setProperty('--start-height', `${startHeight}vh`);
            planeContainer.style.setProperty('--end-height', `${endHeight}px`);
            
            planeContainer.style.cssText = `
                position: fixed;
                left: -50px;
                top: var(--start-height);
                z-index: 1500;
                pointer-events: auto;
                cursor: pointer;
                animation: simplePlaneFlight 19.2s linear;
                --start-height: ${startHeight}vh;
                --end-height: ${endHeight}px;
            `;
            
            // Create the plane element
            const planeElement = document.createElement('div');
            planeElement.className = 'weather-plane';
            planeElement.style.cssText = `
                position: relative;
                width: 55px;
                height: 38px;
                background-image: url('/assets/img/Hand-painted Side View.png');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                transform: scaleX(-1);
                opacity: 1;
            `;
            
            // Create the fluttering banner
            const banner = document.createElement('div');
            banner.className = 'plane-banner';
            banner.textContent = 'click me';
            banner.style.cssText = `
                position: absolute;
                right: 60px;
                top: 50%;
                transform: translateY(-50%);
                background: linear-gradient(45deg, #ff4444, #ff6666);
                color: white;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 11px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                white-space: nowrap;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                animation: bannerFlutter 0.8s ease-in-out infinite alternate;
            `;
            
            planeContainer.appendChild(planeElement);
            planeContainer.appendChild(banner);
            
            // Add click handler
            planeContainer.addEventListener('click', () => {
                window.open('https://en.wikipedia.org/wiki/Special:RandomInCategory/Featured_articles', '_blank');
            });
            
            document.body.appendChild(planeContainer);
            
            // Clean up after animation completes
            setTimeout(() => {
                if (planeContainer.parentNode) {
                    planeContainer.parentNode.removeChild(planeContainer);
                }
            }, 19200);
        }
        
        function scheduleNextPlane() {
            // Random interval between 2-3 minutes (120-180 seconds)
            const interval = 120000 + Math.random() * 60000;
            planeTimeoutId = setTimeout(() => {
                if (localStorage.getItem('planesDisabled') !== 'true') {
                    createPlane();
                    scheduleNextPlane();
                }
            }, interval);
        }
        
        // Start first plane after 10 seconds
        planeTimeoutId = setTimeout(() => {
            if (localStorage.getItem('planesDisabled') !== 'true') {
                createPlane();
                scheduleNextPlane();
            }
        }, 10000);
        
        // Store timeout ID globally for potential cleanup
        window.planeSystemTimeoutId = planeTimeoutId;
    }
    
    
    
    // Initialize new simple plane system
    startNewPlaneSystem();
    
    // Add keyboard listener for plane toggle
    document.addEventListener('keydown', function(e) {
        if (e.key === 'p' || e.key === 'P') {
            const currentState = localStorage.getItem('planesDisabled') === 'true';
            const newState = !currentState;
            localStorage.setItem('planesDisabled', newState.toString());
            
            if (newState) {
                // Planes disabled - clear any pending timeouts
                if (window.planeSystemTimeoutId) {
                    clearTimeout(window.planeSystemTimeoutId);
                }
                // Remove any existing planes
                const existingPlanes = document.querySelectorAll('.plane-container');
                existingPlanes.forEach(plane => plane.remove());
                console.log('Planes disabled. Press [p] again to re-enable.');
            } else {
                // Planes re-enabled - restart the system
                console.log('Planes re-enabled.');
                startNewPlaneSystem();
            }
        }
    });
    
    // Create weather info container
    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';
    weatherInfo.style.cssText = `
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 20;
        text-align: center;
        padding: 0;
        background: transparent;
        border-radius: 0;
        margin: 0;
        backdrop-filter: none;
        box-shadow: none;
        border: none;
    `;
    weatherWidget.appendChild(weatherInfo);
    
    // Create MIT skyline container
    const skylineContainer = document.createElement('div');
    skylineContainer.className = 'mit-skyline';
    skylineContainer.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 140px;
        z-index: 1;
        overflow: visible;
        border-radius: 0 0 12px 12px;
    `;
    weatherWidget.appendChild(skylineContainer);
    
    // Load cached weather data
    function loadCachedWeather() {
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const data = JSON.parse(cached);
                const now = Date.now();
                if (now - data.timestamp < CACHE_DURATION) {
                    return data.weather;
                }
            }
        } catch (error) {
            console.log('Weather cache read error');
        }
        return null;
    }
    
    // Save weather data to cache
    function cacheWeatherData(weatherData) {
        try {
            const cacheData = {
                weather: weatherData,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (error) {
            console.log('Weather cache write error');
        }
    }
    
    // Fetch weather data
    async function fetchWeather() {
        const cachedWeather = loadCachedWeather();
        if (cachedWeather) {
            return cachedWeather;
        }
        
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${BOSTON_LAT}&lon=${BOSTON_LON}&appid=${API_KEY}&units=metric`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            
            const weatherData = await response.json();
            cacheWeatherData(weatherData);
            return weatherData;
            
        } catch (error) {
            console.log('Weather fetch failed, using fallback');
            // Simple fallback
            return {
                weather: [{ main: 'Clouds', description: 'cloudy', icon: '02d' }],
                main: { temp: 15 },
                name: 'Boston'
            };
        }
    }
    
    // Create cute weather animations based on time and weather
    function createWeatherAnimation(condition) {
        // Only clear animations if weather condition actually changed
        if (currentWeatherCondition !== condition) {
            // Clear only weather-specific animations, preserve persistent ones like plane
            const weatherElements = animationContainer.querySelectorAll(':not(.weather-plane)');
            weatherElements.forEach(element => element.remove());
            currentWeatherCondition = condition;
        }
        
        const now = new Date();
        const hour = now.getHours();
        const isDaytime = hour >= 6 && hour < 18;
        
        // Show sun/moon and stars based on time and conditions
        if (isDaytime) {
            // Always show sun during daytime, regardless of weather condition
            createSunAnimation(currentWeather);
        } else {
            // Show moon at night for most conditions (unless very stormy)
            const condition_lower = condition.toLowerCase();
            if (condition_lower !== 'thunderstorm' && condition_lower !== 'rain') {
                createMoonAnimation(currentWeather);
            }
            // Always show stars at night (visibility varies by weather)
            createStarsAnimation(condition_lower);
        }
        
        // Always show other weather conditions regardless of time
        switch (condition.toLowerCase()) {
            case 'clouds':
                createCloudAnimation();
                break;
            case 'rain':
                createRainAnimation();
                break;
            case 'snow':
                createSnowAnimation();
                break;
            case 'fog':
            case 'mist':
                createFogAnimation();
                break;
            case 'thunderstorm':
                createThunderstormAnimation();
                break;
        }
    }
    
    // Sun animation with position based on actual sunrise/sunset times
    function createSunAnimation(weatherData) {
        // Remove existing sun if it exists
        const existingSun = animationContainer.querySelector('.weather-sun');
        if (existingSun) existingSun.remove();
        const now = new Date();
        const currentTimeMs = now.getTime();
        
        // Get sunrise/sunset from weather data, fallback to estimated times
        let sunriseMs, sunsetMs;
        if (weatherData && weatherData.sys) {
            sunriseMs = weatherData.sys.sunrise * 1000; // Convert to milliseconds
            sunsetMs = weatherData.sys.sunset * 1000;
        } else {
            // Fallback to approximate times (6am-6pm)
            const today = new Date();
            today.setHours(6, 0, 0, 0);
            sunriseMs = today.getTime();
            today.setHours(18, 0, 0, 0);
            sunsetMs = today.getTime();
        }
        
        // Calculate sun position based on actual daylight hours
        const dayLengthMs = sunsetMs - sunriseMs;
        const progress = Math.max(0, Math.min(1, (currentTimeMs - sunriseMs) / dayLengthMs));
        
        // Position from right (east) 215px to left (west) 10px across the widget  
        const leftPosition = 215 - (progress * 205);
        
        // Height follows arc - highest at solar noon
        const arcHeight = Math.sin(progress * Math.PI) * 18; // 0-18px arc
        const topPosition = 22 - arcHeight;
        
        const sun = document.createElement('div');
        sun.className = 'weather-sun';
        sun.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle at 30% 30%, #FFE55C 0%, #FFD700 40%, #FFA500 100%);
            border-radius: 50%;
            transform: translateX(-50%);
            z-index: 12;
        `;
        
        // Add glowing orb around the sun
        const sunGlow = document.createElement('div');
        sunGlow.style.cssText = `
            position: absolute;
            top: -8px;
            left: -8px;
            width: 36px;
            height: 36px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.1) 50%, transparent 100%);
            border-radius: 50%;
            animation: sunGlow 3s ease-in-out infinite alternate;
        `;
        sun.appendChild(sunGlow);
        
        animationContainer.appendChild(sun);
    }
    
    // Stars animation - fewer, better-looking stars with twinkling
    function createStarsAnimation(condition) {
        // Remove existing stars if they exist
        const existingStars = animationContainer.querySelectorAll('.weather-star');
        existingStars.forEach(star => star.remove());
        let starCount = 3;
        let starOpacity = 0.9;
        
        // Adjust star visibility based on weather (50% more stars)
        switch (condition) {
            case 'clear':
                starCount = 6; // was 4
                starOpacity = 1.0;
                break;
            case 'clouds':
                starCount = 3; // was 2
                starOpacity = 0.6;
                break;
            case 'rain':
            case 'thunderstorm':
                starCount = 1; // kept at 1 (already minimal)
                starOpacity = 0.3;
                break;
            case 'snow':
                starCount = 5; // was 3 (rounded up)
                starOpacity = 0.7;
                break;
            default:
                starCount = 5; // was 3 (rounded up)
                starOpacity = 0.8;
        }
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'weather-star';
            // Most stars are small (1-2px), with occasional larger ones (up to 3px)
            const starSize = Math.random() < 0.7 ? 1 + Math.random() * 1 : 2 + Math.random() * 1; 
            
            star.style.cssText = `
                position: absolute;
                top: ${10 + Math.random() * 120}px;
                left: ${15 + Math.random() * 220}px;
                width: ${starSize}px;
                height: ${starSize}px;
                background: rgba(255, 255, 255, ${starOpacity});
                border-radius: 50%;
                box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
                animation: starTwinkleImproved ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                z-index: 11;
            `;
            animationContainer.appendChild(star);
        }
    }
    
    // Moon animation with position based on actual sunset/sunrise times
    function createMoonAnimation(weatherData) {
        // Remove existing moon if it exists
        const existingMoon = animationContainer.querySelector('.weather-moon');
        if (existingMoon) existingMoon.remove();
        const now = new Date();
        const currentTimeMs = now.getTime();
        
        // Get sunrise/sunset from weather data, fallback to estimated times
        let sunriseMs, sunsetMs;
        if (weatherData && weatherData.sys) {
            sunriseMs = weatherData.sys.sunrise * 1000;
            sunsetMs = weatherData.sys.sunset * 1000;
        } else {
            // Fallback to approximate times
            const today = new Date();
            today.setHours(6, 0, 0, 0);
            sunriseMs = today.getTime();
            today.setHours(18, 0, 0, 0);
            sunsetMs = today.getTime();
        }
        
        // Calculate moon position during nighttime hours
        let nightProgress = 0;
        
        if (currentTimeMs >= sunsetMs) {
            // Evening - from sunset to midnight (next day)
            const midnightMs = new Date(sunsetMs + 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
            const eveningDurationMs = midnightMs - sunsetMs;
            nightProgress = (currentTimeMs - sunsetMs) / (eveningDurationMs * 2); // First half of night
        } else if (currentTimeMs <= sunriseMs) {
            // Early morning - from midnight to sunrise
            const midnightMs = new Date(currentTimeMs).setHours(0, 0, 0, 0);
            const morningDurationMs = sunriseMs - midnightMs;
            nightProgress = 0.5 + ((currentTimeMs - midnightMs) / (morningDurationMs * 2)); // Second half of night
        } else {
            // Daytime - don't show moon (this shouldn't happen if called correctly)
            return;
        }
        
        nightProgress = Math.max(0, Math.min(1, nightProgress));
        
        // Debug info for moon positioning
        console.log('Moon positioning:', {
            currentTime: new Date(currentTimeMs).toLocaleTimeString(),
            sunrise: new Date(sunriseMs).toLocaleTimeString(),
            sunset: new Date(sunsetMs).toLocaleTimeString(),
            nightProgress: nightProgress.toFixed(3),
            isNight: currentTimeMs >= sunsetMs || currentTimeMs <= sunriseMs
        });
        
        // Position from east (right) to west (left) across the sky
        const leftPosition = 215 - (nightProgress * 205);
        
        // Height follows realistic lunar arc - highest at midnight (nightProgress = 0.5)
        const arcHeight = Math.sin(nightProgress * Math.PI) * 12; // 0-12px arc for lower position
        const topPosition = 50 - arcHeight; // Start from 50px down for much lower moon
        
        const moon = document.createElement('div');
        moon.className = 'weather-moon';
        moon.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle at 30% 30%, #F5F5DC 0%, #E6E6FA 70%, #D3D3D3 100%);
            border-radius: 50%;
            box-shadow: 0 0 15px rgba(245, 245, 220, 0.4);
            animation: moonGlow 4s ease-in-out infinite alternate;
            transform: translateX(-50%);
            z-index: 12;
        `;
        
        animationContainer.appendChild(moon);
    }
    
    // Cloud animation - sleek rectangular style with randomness
    function createCloudAnimation() {
        // Check if clouds already exist to prevent duplicates
        if (animationContainer.querySelector('.weather-cloud')) {
            return;
        }
        
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'weather-cloud';
            
            // Staggered, continuous cloud movement with consistent speeds
            const baseSpeed = 18 + (i * 2); // Base speed 18, 20, 22 seconds
            const finalSpeed = baseSpeed; // Remove random variation for smoother continuous motion
            
            const baseDelay = i * 6; // Stagger clouds by 6 seconds each
            const finalDelay = baseDelay;
            
            cloud.style.cssText = `
                position: absolute;
                top: ${25 + i * 18}px;
                left: -100px;
                width: ${70 + i * 8}px;
                height: ${8 + i * 2}px;
                background: rgba(200, 200, 220, ${0.75 + i * 0.05});
                border-radius: 20px;
                animation: cloudFloat ${finalSpeed}s linear infinite;
                animation-delay: ${finalDelay}s;
                z-index: 5;
            `;
            animationContainer.appendChild(cloud);
        }
    }
    
    // Rain animation
    function createRainAnimation() {
        // Add a cloud first
        createCloudAnimation();
        
        // Add rain drops
        for (let i = 0; i < 8; i++) {
            const drop = document.createElement('div');
            drop.style.cssText = `
                position: absolute;
                width: 1px;
                height: 8px;
                background: rgba(100, 150, 255, 0.6);
                left: ${20 + Math.random() * 80}%;
                animation: rainDrop ${1 + Math.random()}s linear infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            animationContainer.appendChild(drop);
        }
    }
    
    // Snow animation
    function createSnowAnimation() {
        for (let i = 0; i < 6; i++) {
            const flake = document.createElement('div');
            flake.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: snowFlake ${3 + Math.random() * 2}s linear infinite;
                animation-delay: ${Math.random() * 3}s;
            `;
            animationContainer.appendChild(flake);
        }
    }
    
    // Fog animation
    function createFogAnimation() {
        for (let i = 0; i < 3; i++) {
            const fog = document.createElement('div');
            fog.style.cssText = `
                position: absolute;
                top: ${20 + i * 20}px;
                left: -40px;
                width: 60px;
                height: 15px;
                background: rgba(180, 180, 200, 0.4);
                border-radius: 30px;
                animation: fogDrift ${6 + i * 2}s linear infinite;
                animation-delay: ${i * 1.5}s;
            `;
            animationContainer.appendChild(fog);
        }
    }
    
    // Thunderstorm animation
    function createThunderstormAnimation() {
        createCloudAnimation();
        createRainAnimation();
        
        // Add lightning flashes
        const lightning = document.createElement('div');
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0);
            animation: lightning 4s infinite;
            pointer-events: none;
        `;
        animationContainer.appendChild(lightning);
    }
    
    // Get current Boston time
    function getBostonTime() {
        const now = new Date();
        const options = {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return now.toLocaleTimeString('en-US', options);
    }
    
    // Create MIT skyline with better buildings
    function createMITSkyline() {
        skylineContainer.innerHTML = '';
        
        // Time-based brightness for buildings
        const now = new Date();
        const hour = now.getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const windowOpacity = isDaytime ? 0.3 : 0.8;
        // Use solid colors instead of transparency
        const buildingBrightness = isDaytime ? 1.0 : 1.0;
        
        // Add Charles River at the bottom - larger riverbank
        const charlesRiver = document.createElement('div');
        charlesRiver.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 22px;
            background: linear-gradient(180deg, 
                rgba(40, 80, 140, 0.8) 0%, 
                rgba(25, 60, 110, 0.9) 50%,
                rgba(15, 40, 80, 1) 100%);
            z-index: 0;
        `;
        
        // Add simple flowing water lines
        for (let i = 0; i < 5; i++) {
            const waterLine = document.createElement('div');
            waterLine.style.cssText = `
                position: absolute;
                top: ${6 + i * 3}px;
                left: -20px;
                width: 15px;
                height: 1px;
                background: rgba(150, 200, 240, 0.6);
                animation: simpleWaterFlow ${8 + i * 2}s linear infinite;
                animation-delay: ${i * 1.5}s;
                z-index: 2;
            `;
            charlesRiver.appendChild(waterLine);
        }
        
        skylineContainer.appendChild(charlesRiver);
        
        // Add gray riverbank strip for streetlights
        const riverbankStrip = document.createElement('div');
        riverbankStrip.style.cssText = `
            position: absolute;
            bottom: 22px;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgb(130, 130, 130);
            z-index: 1;
        `;
        skylineContainer.appendChild(riverbankStrip);
        
        // Add sidewalk/walkway (made thicker for pedestrians)
        const sidewalk = document.createElement('div');
        sidewalk.style.cssText = `
            position: absolute;
            bottom: 25px;
            left: 0;
            width: 100%;
            height: 8px;
            background: linear-gradient(180deg, 
                rgb(120, 120, 120) 0%, 
                rgb(100, 100, 100) 100%);
            z-index: 1;
        `;
        skylineContainer.appendChild(sidewalk);
        
        // Add road (made thicker for bidirectional traffic)
        const road = document.createElement('div');
        road.style.cssText = `
            position: absolute;
            bottom: 33px;
            left: 0;
            width: 100%;
            height: 12px;
            background: linear-gradient(180deg, 
                rgb(60, 60, 60) 0%, 
                rgb(40, 40, 40) 100%);
            z-index: 1;
        `;
        
        // Add road center line - sleek and geometric
        const roadLine = document.createElement('div');
        roadLine.style.cssText = `
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background: repeating-linear-gradient(90deg, 
                rgb(200, 200, 200) 0px, 
                rgb(200, 200, 200) 8px, 
                transparent 8px, 
                transparent 12px);
            z-index: 2;
        `;
        road.appendChild(roadLine);
        skylineContainer.appendChild(road);
        
        // Car tracking for maximum limit
        let activeCars = 0;
        const MAX_CARS = 6;
        
        // Create car animation system - cars drive along the road occasionally (bidirectional)
        function createCarAnimation() {
            // Don't create car if at maximum
            if (activeCars >= MAX_CARS) {
                return;
            }
            
            activeCars++;
            const car = document.createElement('div');
            const carId = 'car-' + Date.now();
            car.id = carId;
            
            // Define realistic car types and colors
            const carTypes = [
                {
                    type: 'sedan',
                    colors: ['#c83232', '#2d4a87', '#4a4a4a', '#8b0000', '#2f4f2f', '#483d8b'],
                    width: 18,
                    height: 6
                },
                {
                    type: 'suv',
                    colors: ['#2f2f2f', '#4169e1', '#696969', '#800080', '#8b4513'],
                    width: 20,
                    height: 8
                },
                {
                    type: 'compact',
                    colors: ['#ff6347', '#32cd32', '#ffd700', '#ff69b4', '#00ced1'],
                    width: 14,
                    height: 5
                }
            ];
            
            const carType = carTypes[Math.floor(Math.random() * carTypes.length)];
            const carColor = carType.colors[Math.floor(Math.random() * carType.colors.length)];
            const carSpeed = 6 + Math.random() * 4; // 6-10 seconds to cross (faster for more traffic)
            
            // Randomly choose direction (50% chance each way)
            const goingRight = Math.random() > 0.5;
            const laneOffset = goingRight ? 3 : 8; // Top lane vs bottom lane on 12px road
            
            car.style.cssText = `
                position: absolute;
                bottom: ${33 + laneOffset}px;
                left: ${goingRight ? -(carType.width + 5) : 280}px;
                width: ${carType.width}px;
                height: ${carType.height}px;
                z-index: ${goingRight ? 16 : 15};
                animation: ${goingRight ? 'carDriveRight' : 'carDriveLeft'} ${carSpeed}s linear forwards;
                transform: ${goingRight ? 'none' : 'scaleX(-1)'};
            `;
            
            // Create car body
            const carBody = document.createElement('div');
            carBody.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 70%;
                background: linear-gradient(180deg, 
                    ${carColor} 0%, 
                    ${carColor} 60%, 
                    ${carColor} 100%);
                border-radius: 2px 2px 1px 1px;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
            `;
            car.appendChild(carBody);
            
            // Create car roof/cabin (different for each type)
            const carRoof = document.createElement('div');
            if (carType.type === 'sedan') {
                carRoof.style.cssText = `
                    position: absolute;
                    bottom: 70%;
                    left: 25%;
                    width: 50%;
                    height: 30%;
                    background: linear-gradient(180deg, 
                        ${carColor} 0%, 
                        ${carColor} 100%);
                    border-radius: 1px 1px 0 0;
                `;
            } else if (carType.type === 'suv') {
                carRoof.style.cssText = `
                    position: absolute;
                    bottom: 60%;
                    left: 20%;
                    width: 60%;
                    height: 40%;
                    background: linear-gradient(180deg, 
                        ${carColor} 0%, 
                        ${carColor} 100%);
                    border-radius: 1px;
                `;
            } else { // compact
                carRoof.style.cssText = `
                    position: absolute;
                    bottom: 70%;
                    left: 20%;
                    width: 60%;
                    height: 30%;
                    background: linear-gradient(180deg, 
                        ${carColor} 0%, 
                        ${carColor} 100%);
                    border-radius: 2px 2px 0 0;
                `;
            }
            car.appendChild(carRoof);
            
            // Add car windows
            const frontWindow = document.createElement('div');
            frontWindow.style.cssText = `
                position: absolute;
                bottom: 75%;
                right: 10%;
                width: 20%;
                height: 20%;
                background: rgb(135, 206, 235);
                border-radius: 1px;
            `;
            car.appendChild(frontWindow);
            
            const rearWindow = document.createElement('div');
            rearWindow.style.cssText = `
                position: absolute;
                bottom: 75%;
                left: 10%;
                width: 20%;
                height: 20%;
                background: rgb(135, 206, 235);
                border-radius: 1px;
            `;
            car.appendChild(rearWindow);
            
            // Add wheels
            const frontWheel = document.createElement('div');
            frontWheel.style.cssText = `
                position: absolute;
                bottom: -1px;
                right: 15%;
                width: 3px;
                height: 3px;
                background: #1a1a1a;
                border-radius: 50%;
                box-shadow: inset 0 0 1px rgba(255,255,255,0.3);
            `;
            car.appendChild(frontWheel);
            
            const rearWheel = document.createElement('div');
            rearWheel.style.cssText = `
                position: absolute;
                bottom: -1px;
                left: 15%;
                width: 3px;
                height: 3px;
                background: #1a1a1a;
                border-radius: 50%;
                box-shadow: inset 0 0 1px rgba(255,255,255,0.3);
            `;
            car.appendChild(rearWheel);
            
            // Add car headlights if it's nighttime (direction-aware)
            if (!isDaytime) {
                const headlights = document.createElement('div');
                headlights.style.cssText = `
                    position: absolute;
                    bottom: 40%;
                    ${goingRight ? 'right: -2px' : 'left: -2px'};
                    width: 6px;
                    height: 2px;
                    background: linear-gradient(${goingRight ? '90deg' : '-90deg'}, rgba(255, 255, 200, 0.9) 0%, rgba(255, 255, 200, 0.3) 70%, transparent 100%);
                    z-index: 21;
                    border-radius: ${goingRight ? '0 1px 1px 0' : '1px 0 0 1px'};
                `;
                car.appendChild(headlights);
                
                // Add tail lights
                const taillights = document.createElement('div');
                taillights.style.cssText = `
                    position: absolute;
                    bottom: 40%;
                    ${goingRight ? 'left: -1px' : 'right: -1px'};
                    width: 2px;
                    height: 2px;
                    background: rgba(255, 50, 50, 0.8);
                    z-index: 21;
                    border-radius: ${goingRight ? '1px 0 0 1px' : '0 1px 1px 0'};
                `;
                car.appendChild(taillights);
            }
            
            skylineContainer.appendChild(car);
            
            // Remove car after animation
            setTimeout(() => {
                if (car.parentNode) {
                    car.parentNode.removeChild(car);
                }
                activeCars--; // Decrement counter when car is removed
            }, carSpeed * 1000 + 1000);
        }
        
        // Time-based car frequency system reflecting real MIT traffic patterns
        function getCarFrequency() {
            const now = new Date();
            const hour = now.getHours();
            const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
            
            let baseInterval, spawnChance;
            
            if (isWeekday) {
                // Weekday schedule around MIT
                if (hour >= 7 && hour <= 9) {
                    // Morning rush hour (7-9 AM) - commuters, students
                    baseInterval = 3000;
                    spawnChance = 0.9;
                } else if (hour >= 17 && hour <= 18.5) {
                    // Evening rush hour (5-6:30 PM) - leaving campus
                    baseInterval = 3500;
                    spawnChance = 0.85;
                } else if (hour >= 10 && hour <= 16) {
                    // Daytime traffic (10 AM - 4 PM) - normal campus activity
                    baseInterval = 6000;
                    spawnChance = 0.65;
                } else if (hour >= 19 && hour <= 22) {
                    // Evening traffic (7-10 PM) - dining, events
                    baseInterval = 8000;
                    spawnChance = 0.5;
                } else {
                    // Night/early morning (10 PM - 7 AM) - minimal traffic
                    baseInterval = 15000;
                    spawnChance = 0.25;
                }
            } else {
                // Weekend schedule - lighter but still active campus
                if (hour >= 10 && hour <= 18) {
                    // Weekend daytime - visitors, events
                    baseInterval = 8000;
                    spawnChance = 0.6;
                } else if (hour >= 19 && hour <= 23) {
                    // Weekend evening - social activities
                    baseInterval = 10000;
                    spawnChance = 0.45;
                } else {
                    // Weekend night/morning
                    baseInterval = 18000;
                    spawnChance = 0.2;
                }
            }
            
            // Add natural randomness to intervals
            const randomVariation = (Math.random() - 0.5) * 0.3;
            const finalInterval = baseInterval * (1 + randomVariation);
            
            return { interval: Math.max(2000, finalInterval), chance: spawnChance };
        }
        
        // Dynamic car spawning with realistic timing
        function scheduleNextCar() {
            const { interval, chance } = getCarFrequency();
            
            setTimeout(() => {
                if (Math.random() < chance) {
                    createCarAnimation();
                }
                scheduleNextCar(); // Continue the cycle
            }, interval);
        }
        
        // Smart initial car deployment based on current time
        const { chance: initialChance } = getCarFrequency();
        if (initialChance > 0.7) {
            // Rush hour - populate road with traffic
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createCarAnimation(), i * 2000);
            }
        } else if (initialChance > 0.4) {
            // Moderate traffic
            for (let i = 0; i < 2; i++) {
                setTimeout(() => createCarAnimation(), i * 3000);
            }
        } else {
            // Light traffic
            setTimeout(() => createCarAnimation(), 2000);
        }
        
        // Begin dynamic traffic scheduling
        scheduleNextCar();
        
        // Pedestrian tracking for maximum limit
        let activePedestrians = 0;
        const maxPedestrians = 10;

        // Create pedestrian animation system
        function createPedestrianAnimation() {
            if (activePedestrians >= maxPedestrians) {
                return; // Don't create more if at limit
            }
            
            activePedestrians++;
            const pedestrian = document.createElement('div');
            const pedId = 'ped-' + Date.now();
            pedestrian.id = pedId;
            
            // Randomly choose direction and walking speed (much slower)
            const goingRight = Math.random() > 0.5;
            const walkSpeed = 30 + Math.random() * 25; // 30-55 seconds to cross (very slow, varied speeds)
            
            // Random pedestrian appearance
            const pedColors = [
                '#2c3e50', '#34495e', '#8b4513', '#800000', '#2f4f4f', 
                '#483d8b', '#008000', '#ff6347', '#4682b4', '#daa520'
            ];
            const pedColor = pedColors[Math.floor(Math.random() * pedColors.length)];
            
            // Random behavior flags
            const willStop = Math.random() < 0.3; // 30% chance to stop
            const willChangeDirection = Math.random() < 0.2; // 20% chance to change direction
            
            pedestrian.style.cssText = `
                position: absolute;
                bottom: 27px;
                left: ${goingRight ? -8 : 260}px;
                width: 4px;
                height: 9px;
                z-index: 16;
                animation: ${goingRight ? 'pedWalkRight' : 'pedWalkLeft'} ${walkSpeed}s linear forwards;
            `;
            
            // Create pedestrian body
            const pedBody = document.createElement('div');
            pedBody.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 6px;
                background: ${pedColor};
                border-radius: 1px 1px 0 0;
            `;
            pedestrian.appendChild(pedBody);
            
            // Create pedestrian head
            const pedHead = document.createElement('div');
            pedHead.style.cssText = `
                position: absolute;
                bottom: 6px;
                left: 50%;
                transform: translateX(-50%);
                width: 1.5px;
                height: 1.5px;
                background: ${['rgba(255, 220, 177, 0.9)', 'rgba(222, 184, 135, 0.9)', 'rgba(160, 82, 45, 0.9)', 'rgba(139, 69, 19, 0.9)', 'rgba(101, 67, 33, 0.9)', 'rgba(92, 51, 23, 0.9)'][Math.floor(Math.random() * 6)]};
                border-radius: 50%;
            `;
            pedestrian.appendChild(pedHead);
            
            // Create simple legs (animated dots)
            const legs = document.createElement('div');
            legs.style.cssText = `
                position: absolute;
                bottom: -1px;
                left: 50%;
                transform: translateX(-50%);
                width: 3px;
                height: 2px;
                background: repeating-linear-gradient(90deg, 
                    ${pedColor} 0px, 
                    ${pedColor} 1px, 
                    transparent 1px, 
                    transparent 2px);
                animation: pedLegs 0.8s ease-in-out infinite;
            `;
            pedestrian.appendChild(legs);
            
            skylineContainer.appendChild(pedestrian);
            
            // Add random behaviors
            if (willStop) {
                setTimeout(() => {
                    if (pedestrian.parentNode) {
                        pedestrian.style.animationPlayState = 'paused';
                        setTimeout(() => {
                            if (pedestrian.parentNode) {
                                pedestrian.style.animationPlayState = 'running';
                            }
                        }, 2000 + Math.random() * 3000); // Stop for 2-5 seconds
                    }
                }, (walkSpeed * 0.3 + Math.random() * walkSpeed * 0.4) * 1000); // Stop at 30-70% through journey
            }
            
            if (willChangeDirection) {
                setTimeout(() => {
                    if (pedestrian.parentNode) {
                        const newDirection = !goingRight;
                        const remainingTime = walkSpeed * 0.6; // Continue for remaining time
                        pedestrian.style.animation = `${newDirection ? 'pedWalkRight' : 'pedWalkLeft'} ${remainingTime}s linear forwards`;
                    }
                }, (walkSpeed * 0.4) * 1000); // Change direction at 40% through journey
            }
            
            // Remove pedestrian after animation
            setTimeout(() => {
                if (pedestrian.parentNode) {
                    pedestrian.parentNode.removeChild(pedestrian);
                    activePedestrians--; // Decrease counter when removed
                }
            }, walkSpeed * 1000 + 2000);
        }
        
        // Start pedestrian system - immediate pedestrians and more frequent
        // Create initial pedestrians immediately
        for (let i = 0; i < 2; i++) {
            setTimeout(() => createPedestrianAnimation(), i * 2000 + 500);
        }
        setInterval(() => {
            if (Math.random() > 0.2) { // 80% chance each interval
                createPedestrianAnimation();
            }
        }, 6000 + Math.random() * 6000); // 6-12 seconds (more frequent)
        
        // Add land bank for buildings to stand on (adjusted for thicker road)
        const landBank = document.createElement('div');
        landBank.style.cssText = `
            position: absolute;
            bottom: 45px;
            left: 0;
            width: 100%;
            height: 6px;
            background: linear-gradient(180deg, 
                rgba(70, 60, 50, ${buildingBrightness}) 0%, 
                rgba(55, 45, 35, ${buildingBrightness}) 100%);
            z-index: 1;
        `;
        skylineContainer.appendChild(landBank);
        
        // Add lamp posts along the riverwalk - lowered position
        const lampPostPositions = [30, 70, 110, 150, 190, 230];
        lampPostPositions.forEach((position, index) => {
            // Lamp post base (concrete curb)
            const lampBase = document.createElement('div');
            lampBase.style.cssText = `
                position: absolute;
                bottom: 22px;
                left: ${position - 3}px;
                width: 7px;
                height: 3px;
                background: linear-gradient(180deg, 
                    rgba(160, 160, 160, ${buildingBrightness}) 0%,
                    rgba(120, 120, 120, ${buildingBrightness}) 100%);
                border-radius: 1px 1px 0 0;
                box-shadow: inset 0 1px 0 rgba(200, 200, 200, 0.3);
                z-index: 10;
            `;
            
            // Lamp post pole
            const lampPole = document.createElement('div');
            lampPole.style.cssText = `
                position: absolute;
                bottom: 24px;
                left: ${position}px;
                width: 1px;
                height: 10px;
                background: rgba(70, 70, 70, ${buildingBrightness});
                z-index: 10;
            `;
            
            // Lamp post top fixture
            const lampFixture = document.createElement('div');
            lampFixture.style.cssText = `
                position: absolute;
                bottom: 34px;
                left: ${position - 1}px;
                width: 3px;
                height: 2px;
                background: ${isDaytime ? 'rgba(60, 60, 60, 0.9)' : 'rgba(40, 40, 40, 0.9)'};
                border-radius: 1px;
                z-index: 10;
            `;
            
            // Lamp light and beams (only visible at night)
            if (!isDaytime) {
                const lampLight = document.createElement('div');
                lampLight.style.cssText = `
                    position: absolute;
                    bottom: 33px;
                    left: ${position - 0.5}px;
                    width: 2px;
                    height: 1px;
                    background: rgba(255, 220, 120, 1);
                    border-radius: 1px;
                    z-index: 11;
                    box-shadow: 0 0 4px rgba(255, 220, 120, 0.6);
                `;
                
                // Light beam cone - sleek geometric
                const lightBeam = document.createElement('div');
                lightBeam.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: ${position - 4}px;
                    width: 8px;
                    height: 12px;
                    background: linear-gradient(180deg, 
                        rgba(255, 220, 120, 0.1) 0%, 
                        rgba(255, 220, 120, 0.05) 50%,
                        transparent 100%);
                    clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
                    z-index: 9;
                `;
                
                // Ground light circle - more defined
                const lightPool = document.createElement('div');
                lightPool.style.cssText = `
                    position: absolute;
                    bottom: 20px;
                    left: ${position - 3}px;
                    width: 6px;
                    height: 2px;
                    background: radial-gradient(ellipse, rgba(255, 220, 120, 0.2) 0%, transparent 70%);
                    border-radius: 50%;
                    z-index: 8;
                `;
                
                skylineContainer.appendChild(lampLight);
                skylineContainer.appendChild(lightBeam);
                skylineContainer.appendChild(lightPool);
            }
            
            skylineContainer.appendChild(lampBase);
            skylineContainer.appendChild(lampPole);
            skylineContainer.appendChild(lampFixture);
        });
        
        // Full skyline coverage with overlapping buildings at varied heights
        // Stata Center is 68px tall, so 85% = 58px max for non-specialty buildings
        const backgroundBuildings = [];
        let currentLeft = 0;
        const widgetWidth = 250; // Total widget width
        const stataCenterHeight = 68;
        const maxNonSpecialtyHeight = Math.floor(stataCenterHeight * 0.85); // 58px max
        
        // More varied height distribution: 40%, 50%, 60%, 70%, 85% of Stata Center
        const heightVariations = [0.4, 0.5, 0.6, 0.7, 0.85];
        const targetHeightRange = [
            Math.floor(stataCenterHeight * 0.4), // 27px (40%)
            maxNonSpecialtyHeight // 58px (85%)
        ];
        
        // Colors for diverse buildings
        const buildingColors = [
            [120, 85, 95], [85, 110, 60], [60, 80, 130], [140, 120, 80], [95, 85, 135],
            [130, 90, 65], [70, 120, 85], [145, 75, 70], [80, 90, 140], [110, 135, 65],
            [135, 65, 95], [65, 105, 125], [125, 115, 70], [90, 65, 120], [140, 100, 65],
            [60, 125, 100], [115, 70, 125], [85, 115, 65], [130, 80, 85], [80, 95, 135],
            [120, 135, 65], [135, 70, 100], [65, 110, 120], [110, 95, 135], [145, 115, 75],
            [75, 130, 90], [125, 80, 110], [90, 120, 85], [100, 75, 125], [150, 100, 70]
        ];
        
        // Generate fixed building pattern for consistency
        const fixedPattern = [
            { width: 12, heightVar: 0.6, colorIdx: 0 },
            { width: 15, heightVar: 0.4, colorIdx: 2 },
            { width: 10, heightVar: 0.7, colorIdx: 1 },
            { width: 18, heightVar: 0.5, colorIdx: 4 },
            { width: 14, heightVar: 0.65, colorIdx: 3 },
            { width: 11, heightVar: 0.8, colorIdx: 5 },
            { width: 16, heightVar: 0.45, colorIdx: 6 },
            { width: 13, heightVar: 0.6, colorIdx: 7 },
            { width: 20, heightVar: 0.35, colorIdx: 8 },
            { width: 9, heightVar: 0.75, colorIdx: 9 },
            { width: 17, heightVar: 0.55, colorIdx: 1 },
            { width: 12, heightVar: 0.4, colorIdx: 0 },
            { width: 14, heightVar: 0.65, colorIdx: 3 },
            { width: 11, heightVar: 0.5, colorIdx: 2 },
            { width: 19, heightVar: 0.3, colorIdx: 4 },
            { width: 13, heightVar: 0.7, colorIdx: 5 },
            { width: 15, heightVar: 0.6, colorIdx: 6 },
            { width: 10, heightVar: 0.8, colorIdx: 7 },
            { width: 16, heightVar: 0.45, colorIdx: 8 }
        ];
        
        let patternIndex = 0;
        while (currentLeft < widgetWidth + 20) {
            const pattern = fixedPattern[patternIndex % fixedPattern.length];
            const width = pattern.width;
            
            // Use predefined height variations, with extra variation on the right side
            let heightVariation;
            if (currentLeft > 200) { // Right side of widget - more variation
                const rightSideVariations = [0.3, 0.4, 0.5, 0.6, 0.65, 0.75, 0.8];
                heightVariation = rightSideVariations[patternIndex % rightSideVariations.length];
            } else {
                heightVariation = pattern.heightVar;
            }
            const height = Math.floor(stataCenterHeight * heightVariation);
            
            const colorIndex = pattern.colorIdx % buildingColors.length;
            const [r, g, b] = buildingColors[colorIndex];
            
            backgroundBuildings.push({
                left: currentLeft,
                width: width,
                height: height,
                color: `rgb(${r}, ${g}, ${b})`
            });
            
            // Overlap buildings slightly for dense coverage
            currentLeft += width * 0.7; // 30% overlap
            patternIndex++;
        }
        
        backgroundBuildings.forEach((building, index) => {
            const bgBuilding = document.createElement('div');
            bgBuilding.style.cssText = `
                position: absolute;
                bottom: 51px;
                left: ${building.left}px;
                width: ${building.width}px;
                height: ${building.height}px;
                background: linear-gradient(180deg, 
                    ${building.color} 0%, 
                    rgb(${building.color.match(/\d+/g)[0] - 10}, ${building.color.match(/\d+/g)[1] - 10}, ${building.color.match(/\d+/g)[2] - 10}) 100%);
                box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
                z-index: 1;
            `;
            
            // Add small windows to background buildings
            const windowsPerFloor = Math.max(1, Math.floor(building.width / 4));
            const floors = Math.max(1, Math.floor(building.height / 8));
            
            for (let floor = 0; floor < floors; floor++) {
                for (let windowNum = 0; windowNum < windowsPerFloor; windowNum++) {
                    if (Math.random() > 0.2) { // 80% chance for each window
                        const window = document.createElement('div');
                        let isLit = Math.random() > 0.4; // 60% chance of being lit initially
                        
                        const windowX = 2 + (windowNum * (building.width - 4) / Math.max(1, windowsPerFloor - 1));
                        const windowY = 3 + (floor * (building.height - 6) / Math.max(1, floors - 1));
                        
                        const updateWindowState = () => {
                            window.style.background = isLit ? `rgba(255, 220, 120, ${windowOpacity})` : 'rgba(30, 30, 30, 0.8)';
                            window.style.boxShadow = isLit ? `0 0 1px rgba(255, 220, 120, ${windowOpacity * 0.5})` : 'none';
                        };
                        
                        window.style.cssText = `
                            position: absolute;
                            left: ${Math.floor(windowX)}px;
                            top: ${Math.floor(windowY)}px;
                            width: 2px;
                            height: 3px;
                        `;
                        
                        updateWindowState();
                        
                        // Individual window flickering with truly random timing
                        function scheduleWindowFlicker() {
                            setTimeout(() => {
                                if (Math.random() > 0.75) { // 25% chance to change state
                                    isLit = !isLit;
                                    updateWindowState();
                                }
                                scheduleWindowFlicker(); // Schedule next check
                            }, 8000 + Math.random() * 25000); // 8-33 second intervals
                        }
                        
                        // Start with random delay
                        setTimeout(scheduleWindowFlicker, Math.random() * 15000);
                        
                        bgBuilding.appendChild(window);
                    }
                }
            }
            
            skylineContainer.appendChild(bgBuilding);
        });
        
        // MIT Great Dome - positioned on the LEFT
        const domeBase = document.createElement('div');
        domeBase.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 15px;
            width: 60px;
            height: 32px;
            background: linear-gradient(180deg, 
                rgb(233, 228, 212) 0%, 
                rgb(200, 190, 170) 100%);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
            z-index: 3;
        `;
        
        // Add classical columns to the dome base with better details
        for (let i = 0; i < 6; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${8 + i * 8}px;
                width: 4px;
                height: 32px;
                background: linear-gradient(180deg, 
                    rgb(220, 214, 197) 0%, 
                    rgb(180, 170, 150) 100%);
                box-shadow: inset -1px 0 1px rgba(0, 0, 0, 0.2);
            `;
            
            // Add column capital
            const capital = document.createElement('div');
            capital.style.cssText = `
                position: absolute;
                top: -3px;
                left: -1px;
                width: 6px;
                height: 3px;
                background: rgb(170, 170, 170);
                z-index: 1;
            `;
            column.appendChild(capital);
            
            // Add column base
            const base = document.createElement('div');
            base.style.cssText = `
                position: absolute;
                bottom: -2px;
                left: -1px;
                width: 6px;
                height: 2px;
                background: rgb(170, 170, 170);
                z-index: 1;
            `;
            column.appendChild(base);
            
            domeBase.appendChild(column);
        }
        
        // Add portico/entrance structure (flat roofed section)
        const portico = document.createElement('div');
        portico.style.cssText = `
            position: absolute;
            bottom: 83px;
            left: 20px;
            width: 50px;
            height: 12px;
            background: linear-gradient(180deg, 
                rgb(230, 220, 200) 0%, 
                rgb(200, 190, 170) 100%);
            box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.2);
            z-index: 4;
        `;
        
        // Create a proper dome using CSS ellipse - positioned higher
        const dome = document.createElement('div');
        dome.style.cssText = `
            position: absolute;
            bottom: 90px;
            left: 30px;
            width: 30px;
            height: 15px;
            background: radial-gradient(ellipse 30px 15px at 50% 100%, 
                rgb(246, 240, 214) 0%, 
                rgb(220, 210, 190) 40%, 
                rgb(180, 167, 140) 100%);
            border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
            overflow: hidden;
            box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);
            z-index: 5;
        `;
        
        // Add dome highlight for more 3D effect
        const domeHighlight = document.createElement('div');
        domeHighlight.style.cssText = `
            position: absolute;
            top: 0;
            left: 25%;
            width: 30%;
            height: 60%;
            background: linear-gradient(45deg, 
                rgba(255, 255, 255, 0.3) 0%, 
                rgba(255, 255, 255, 0.1) 50%, 
                transparent 100%);
            border-radius: 50% 50% 50% 50% / 100% 100% 0% 0%;
        `;
        dome.appendChild(domeHighlight);
        
        skylineContainer.appendChild(domeBase);
        skylineContainer.appendChild(portico);
        skylineContainer.appendChild(dome);
        
        // Stata Center - Frank Gehry's complex with multiple skewed buildings (more prominent)
        
        // Main orange brick tower (tallest, center-back) - made larger and more prominent
        const stataMain = document.createElement('div');
        stataMain.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 165px;
            width: 24px;
            height: 68px;
            background: linear-gradient(135deg, 
                rgb(216, 140, 66) 0%, 
                rgb(200, 125, 50) 50%,
                rgb(180, 105, 30) 100%);
            transform: skewX(-5deg);
            box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
            z-index: 6;
        `;
        
        // Secondary orange tower (varied height) - enlarged
        const stataSecondary = document.createElement('div');
        stataSecondary.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 145px;
            width: 20px;
            height: 61px;
            background: linear-gradient(135deg, 
                rgb(227, 156, 62) 0%, 
                rgb(210, 140, 45) 50%,
                rgb(190, 120, 25) 100%);
            transform: skewX(8deg);
            box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.35);
            z-index: 5;
        `;
        
        // Metallic tower (silver/gray, back-right) - varied height
        const stataMetallic = document.createElement('div');
        stataMetallic.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 192px;
            width: 18px;
            height: 47px;
            background: linear-gradient(135deg, 
                rgb(196, 196, 196) 0%, 
                rgb(160, 160, 160) 50%,
                rgb(140, 140, 140) 100%);
            transform: skewX(12deg);
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            z-index: 4;
        `;
        
        // White offset box (varied height, mid-level) - enlarged
        const stataWhite = document.createElement('div');
        stataWhite.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 175px;
            width: 16px;
            height: 39px;
            background: linear-gradient(135deg, 
                rgb(240, 240, 240) 0%, 
                rgb(220, 220, 220) 50%,
                rgb(200, 200, 200) 100%);
            transform: skewX(-10deg);
            box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
            z-index: 7;
        `;
        
        // Add distinctive Stata architectural details
        const stataDetail1 = document.createElement('div');
        stataDetail1.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 152px;
            width: 8px;
            height: 42px;
            background: linear-gradient(135deg, 
                rgb(245, 170, 80) 0%, 
                rgb(225, 150, 60) 100%);
            transform: skewX(-15deg);
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
            z-index: 6;
        `;
        
        const stataDetail2 = document.createElement('div');
        stataDetail2.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 213px;
            width: 10px;
            height: 34px;
            background: linear-gradient(135deg, 
                rgb(180, 180, 200) 0%, 
                rgb(160, 160, 180) 100%);
            transform: skewX(18deg);
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
            z-index: 3;
        `;
        
        // Add organized windows to Stata buildings with controlled chaos
        const stataBuildings = [
            { element: stataMain, rows: 4, cols: 2, irregularity: 0.3 },
            { element: stataSecondary, rows: 3, cols: 1, irregularity: 0.4 },
            { element: stataMetallic, rows: 3, cols: 1, irregularity: 0.5 },
            { element: stataWhite, rows: 4, cols: 2, irregularity: 0.2 },
            { element: stataDetail1, rows: 2, cols: 1, irregularity: 0.6 },
            { element: stataDetail2, rows: 2, cols: 1, irregularity: 0.7 }
        ];
        
        stataBuildings.forEach((building) => {
            const buildingRect = {
                width: parseInt(building.element.style.width) || 15,
                height: parseInt(building.element.style.height) || 30
            };
            
            // Create organized grid of windows with Stata-style irregularity
            for (let row = 0; row < building.rows; row++) {
                for (let col = 0; col < building.cols; col++) {
                    // Skip some windows randomly to maintain Stata's chaotic aesthetic
                    if (Math.random() < 0.15) continue;
                    
                    const window = document.createElement('div');
                    let isLit = Math.random() > 0.4;
                    
                    // Calculate grid position with architectural irregularity
                    const baseX = (col + 0.5) * (buildingRect.width / building.cols);
                    const baseY = (row + 0.5) * (buildingRect.height / building.rows);
                    
                    const irregularOffset = building.irregularity * 3;
                    const winX = Math.max(1, Math.min(buildingRect.width - 4, 
                        baseX + (Math.random() - 0.5) * irregularOffset));
                    const winY = Math.max(2, Math.min(buildingRect.height - 3, 
                        baseY + (Math.random() - 0.5) * irregularOffset));
                    
                    const updateWindowState = () => {
                        window.style.background = isLit ? `rgba(255, 224, 102, ${windowOpacity})` : 'rgba(50, 50, 50, 0.6)';
                        window.style.boxShadow = isLit ? `0 0 2px rgba(255, 224, 102, ${windowOpacity * 0.5})` : 'none';
                    };
                    
                    // Vary window sizes for architectural diversity
                    const windowWidth = 2.5 + Math.random() * 1.5;
                    const windowHeight = 2 + Math.random() * 1.5;
                    
                    window.style.cssText = `
                        position: absolute;
                        left: ${winX}px;
                        top: ${winY}px;
                        width: ${windowWidth}px;
                        height: ${windowHeight}px;
                        border-radius: 0.3px;
                        z-index: 15;
                    `;
                    
                    updateWindowState();
                    building.element.appendChild(window);
                    
                    // Individual random flickering for each window
                    const flickerInterval = 20000 + Math.random() * 40000; // 20-60 seconds
                    setInterval(() => {
                        if (Math.random() > 0.85) { // 15% chance to change state each check
                            isLit = !isLit;
                            updateWindowState();
                        }
                    }, flickerInterval);
                }
            }
        });
        
        skylineContainer.appendChild(stataMetallic);
        skylineContainer.appendChild(stataDetail2);
        skylineContainer.appendChild(stataSecondary);
        skylineContainer.appendChild(stataDetail1);
        skylineContainer.appendChild(stataMain);
        skylineContainer.appendChild(stataWhite);
        
        // Green Building (reduced height) - center left - 60% of Stata Center height
        const greenBuilding = document.createElement('div');
        greenBuilding.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 90px;
            width: 18px;
            height: ${Math.floor(68 * 0.6)}px;
            background: linear-gradient(180deg, 
                rgb(40, 60, 40) 0%, 
                rgb(20, 40, 20) 100%);
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
            z-index: 1;
        `;
        // Add building segments
        for (let i = 1; i < 5; i++) {
            const segment = document.createElement('div');
            segment.style.cssText = `
                position: absolute;
                top: ${i * 10}px;
                left: 0;
                width: 100%;
                height: 1px;
                background: rgba(0, 0, 0, 0.2);
            `;
            greenBuilding.appendChild(segment);
        }
        skylineContainer.appendChild(greenBuilding);
        
        // Additional shorter buildings between dome and Stata Center for better transition
        
        // Building 1 - 40% height, between dome and green building
        const shortBuilding1 = document.createElement('div');
        shortBuilding1.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 75px;
            width: 12px;
            height: ${Math.floor(68 * 0.4)}px;
            background: linear-gradient(180deg, 
                rgb(80, 70, 60) 0%, 
                rgb(60, 50, 40) 100%);
            box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(shortBuilding1);
        
        // Building 2 - 70% height, between green building and Koch
        const shortBuilding2 = document.createElement('div');
        shortBuilding2.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 110px;
            width: 15px;
            height: ${Math.floor(68 * 0.7)}px;
            background: linear-gradient(180deg, 
                rgb(65, 75, 85) 0%, 
                rgb(45, 55, 65) 100%);
            box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(shortBuilding2);
        
        // Building 3 - 45% height, very short building
        const shortBuilding3 = document.createElement('div');
        shortBuilding3.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 95px;
            width: 8px;
            height: ${Math.floor(68 * 0.45)}px;
            background: linear-gradient(180deg, 
                rgb(70, 60, 80) 0%, 
                rgb(50, 40, 60) 100%);
            box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(shortBuilding3);
        
        // Koch Institute (reduced height) - center right - 50% of Stata Center height
        const kochBuilding = document.createElement('div');
        kochBuilding.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 130px;
            width: 25px;
            height: ${Math.floor(68 * 0.5)}px;
            background: linear-gradient(135deg, 
                rgb(40, 50, 70) 0%, 
                rgb(60, 70, 90) 50%, 
                rgb(30, 40, 60) 100%);
            box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(kochBuilding);
        
        // Student Center (lower, wider) - center
        const studentCenter = document.createElement('div');
        studentCenter.style.cssText = `
            position: absolute;
            bottom: 51px;
            left: 180px;
            width: 25px;
            height: 20px;
            background: linear-gradient(180deg, 
                rgb(45, 45, 65) 0%, 
                rgb(25, 25, 45) 100%);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(studentCenter);
        
        // Add organized windows to major buildings with architectural consistency
        const buildings = [
            { element: greenBuilding, rows: 6, cols: 2, spacing: 'regular', name: 'Green Building' },
            { element: kochBuilding, rows: 5, cols: 3, spacing: 'regular', name: 'Koch Institute' },
            { element: studentCenter, rows: 4, cols: 4, spacing: 'regular', name: 'Student Center' },
            { element: shortBuilding1, rows: 3, cols: 2, spacing: 'compact', name: 'Short Building 1' },
            { element: shortBuilding2, rows: 3, cols: 2, spacing: 'compact', name: 'Short Building 2' },
            { element: shortBuilding3, rows: 3, cols: 2, spacing: 'compact', name: 'Short Building 3' }
        ];
        
        buildings.forEach(building => {
            const buildingRect = {
                width: parseInt(building.element.style.width) || 20,
                height: parseInt(building.element.style.height) || 20
            };
            
            // Create systematic window layout
            for (let row = 0; row < building.rows; row++) {
                for (let col = 0; col < building.cols; col++) {
                    // Skip some windows for realistic variation (5% skip rate)
                    if (Math.random() < 0.05) continue;
                    
                    const window = document.createElement('div');
                    let isLit = Math.random() > 0.35; // 65% chance of being lit
                    
                    // Calculate systematic window positioning
                    const marginX = building.spacing === 'compact' ? 2 : 3;
                    const marginY = building.spacing === 'compact' ? 2 : 3;
                    
                    const availableWidth = buildingRect.width - (2 * marginX);
                    const availableHeight = buildingRect.height - (2 * marginY);
                    
                    const windowSpacingX = availableWidth / building.cols;
                    const windowSpacingY = availableHeight / building.rows;
                    
                    const winX = marginX + (col * windowSpacingX) + (windowSpacingX / 2) - 1;
                    const winY = marginY + (row * windowSpacingY) + (windowSpacingY / 2) - 1;
                    
                    const updateWindowState = () => {
                        window.style.background = isLit ? `rgba(255, 220, 120, ${windowOpacity})` : 'rgba(45, 45, 60, 0.7)';
                        window.style.boxShadow = isLit ? `0 0 2px rgba(255, 220, 120, ${windowOpacity * 0.6})` : 'none';
                    };
                    
                    // Standard window size with slight variation
                    const windowWidth = building.spacing === 'compact' ? 2.5 : 3;
                    const windowHeight = building.spacing === 'compact' ? 2.5 : 3.5;
                    
                    window.className = 'building-window';
                    window.style.cssText = `
                        position: absolute;
                        left: ${Math.round(winX)}px;
                        top: ${Math.round(winY)}px;
                        width: ${windowWidth}px;
                        height: ${windowHeight}px;
                        border-radius: 0.4px;
                        z-index: 10;
                    `;
                    
                    updateWindowState();
                    building.element.appendChild(window);
                    
                    // Individual random flickering for each window
                    // Use setTimeout for truly independent timing
                    function scheduleNextFlicker() {
                        setTimeout(() => {
                            if (Math.random() > 0.8) { // 20% chance to change state
                                isLit = !isLit;
                                updateWindowState();
                            }
                            scheduleNextFlicker(); // Schedule next check with new random interval
                        }, 5000 + Math.random() * 15000); // 5-20 second intervals between checks
                    }
                    
                    // Start with random initial delay
                    setTimeout(scheduleNextFlicker, Math.random() * 10000);
                }
            }
        });
    }
    
    // Update weather display to use dynamic sky
    function updateWeatherDisplay(weather) {
        if (!weather) {
            weatherInfo.innerHTML = `
                <div style="color: white; text-align: center; font-size: 0.7rem;">
                    Loading weather...
                </div>
            `;
            return;
        }
        
        // Update sky background based on current weather
        weatherWidget.style.background = getSkyBackground(weather);
        
        const condition = weather.weather[0].main;
        const tempCelsius = weather.main.temp;
        const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
        const description = weather.weather[0].description;
        const currentTime = getBostonTime();
        
        weatherInfo.innerHTML = `
            <div style="color: white; text-align: center; font-family: 'Segoe UI', system-ui, sans-serif; font-weight: 400;">
                <div style="font-size: clamp(0.8rem, 2.5vw, 1.1rem); font-weight: 500; margin-bottom: 3px; white-space: nowrap;">${tempFahrenheit}°F • ${currentTime}</div>
                <div style="font-size: clamp(0.55rem, 2vw, 0.65rem); opacity: 0.9; text-transform: capitalize; white-space: nowrap;">${description}</div>
            </div>
        `;
        
        // Only recreate animations if weather condition changed or it's the first time
        if (currentWeatherCondition !== condition) {
            createWeatherAnimation(condition);
        }
        // Always update skyline for time-based changes (day/night)
        createMITSkyline();
    }
    
    

    // Update weather function
    async function updateWeather() {
        const now = Date.now();
        if (now - lastWeatherUpdate > WEATHER_UPDATE_INTERVAL) {
            currentWeather = await fetchWeather();
            lastWeatherUpdate = now;
        }
        updateWeatherDisplay(currentWeather);
    }
    
    
    // Add CSS animations and responsive styling
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sunPulse {
            0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
            50% { transform: translateX(-50%) scale(1.1); opacity: 1; }
        }
        
        @keyframes sunRays {
            0%, 100% { opacity: 0.6; transform: translateX(-50%) rotate(var(--rotation)) scale(1); }
            50% { opacity: 1; transform: translateX(-50%) rotate(var(--rotation)) scale(1.2); }
        }
        
        @keyframes cloudFloat {
            from { transform: translateX(0px); }
            to { transform: translateX(370px); }
        }
        
        @keyframes rainDrop {
            from { top: 30px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { top: 100px; opacity: 0; }
        }
        
        @keyframes snowFlake {
            from { top: -5px; transform: translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            to { top: 105px; transform: translateX(10px); opacity: 0; }
        }
        
        @keyframes fogDrift {
            from { left: -60px; opacity: 0; }
            20% { opacity: 0.4; }
            80% { opacity: 0.4; }
            to { left: 140px; opacity: 0; }
        }
        
        @keyframes moonGlow {
            0% { box-shadow: 0 0 10px rgba(245, 245, 220, 0.4); }
            100% { box-shadow: 0 0 20px rgba(245, 245, 220, 0.6), 0 0 30px rgba(245, 245, 220, 0.3); }
        }
        
        @keyframes sunGlow {
            0% { opacity: 0.3; transform: scale(1); }
            100% { opacity: 0.5; transform: scale(1.1); }
        }
        
        @keyframes simplePlaneFlight {
            0% { 
                left: -50px;                    /* Off-screen left */
                top: var(--start-height);       /* Variable start height */
                opacity: 1; 
            }
            97% { 
                left: calc(100vw - 66px);       /* Much closer to widget edge before fade */
                top: var(--end-height);         /* Variable end height */
                opacity: 1; 
            }
            100% { 
                left: calc(100vw - 60px);       /* Plane completely gone before reaching widget edge */
                top: var(--end-height);         /* Maintain end height */
                opacity: 0;                     /* Very fast fade over only 6px of movement */
            }
        }
        
        @keyframes bannerFlutter {
            0% { 
                transform: translateY(-50%) rotate(-2deg) scale(1); 
            }
            100% { 
                transform: translateY(-50%) rotate(2deg) scale(1.05); 
            }
        }
        
        @keyframes starTwinkle {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0.4; transform: scale(1); }
        }
        
        @keyframes starTwinkleImproved {
            0% { 
                opacity: 0.3; 
                transform: scale(0.8); 
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 255, 255, 0.2);
            }
            25% { 
                opacity: 0.8; 
                transform: scale(1.1); 
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4);
            }
            50% { 
                opacity: 1; 
                transform: scale(1.3); 
                box-shadow: 0 0 12px rgba(255, 255, 255, 1), 0 0 24px rgba(255, 255, 255, 0.6);
            }
            75% { 
                opacity: 0.9; 
                transform: scale(1); 
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4);
            }
            100% { 
                opacity: 0.3; 
                transform: scale(0.8); 
                box-shadow: 0 0 4px rgba(255, 255, 255, 0.4), 0 0 8px rgba(255, 255, 255, 0.2);
            }
        }
        
        @keyframes simpleWaterFlow {
            0% { transform: translateX(0); }
            100% { transform: translateX(280px); }
        }
        
        @keyframes carDriveRight {
            from { transform: translateX(0px); }
            to { transform: translateX(320px); }
        }
        
        @keyframes carDriveLeft {
            from { transform: translateX(0px); }
            to { transform: translateX(-320px); }
        }
        
        @keyframes pedWalkRight {
            from { transform: translateX(0px); }
            to { transform: translateX(270px); }
        }
        
        @keyframes pedWalkLeft {
            from { transform: translateX(0px); }
            to { transform: translateX(-270px); }
        }
        
        @keyframes pedLegs {
            0% { opacity: 1; transform: translateX(-50%) scaleX(1); }
            50% { opacity: 0.7; transform: translateX(-50%) scaleX(0.8); }
            100% { opacity: 1; transform: translateX(-50%) scaleX(1); }
        }
        
        @keyframes debrisFloat {
            from { 
                transform: translateX(0px) translateY(0px); 
                opacity: 0.4; 
            }
            20% { opacity: 0.6; }
            80% { opacity: 0.6; }
            to { 
                transform: translateX(270px) translateY(2px); 
                opacity: 0.2; 
            }
        }
        
        @keyframes currentFlow {
            from { 
                transform: translateX(0px); 
                opacity: 0.2; 
            }
            10% { opacity: 0.4; }
            90% { opacity: 0.4; }
            to { 
                transform: translateX(260px); 
                opacity: 0.1; 
            }
        }
        
        @keyframes lightning {
            0%, 90%, 100% { opacity: 0; }
            5%, 10% { opacity: 0.8; background: rgba(255, 255, 255, 0.9); }
        }
        
        @keyframes planeFly {
            0% { 
                left: 0px; /* Screen left edge */
                top: var(--start-height, 15vh); /* Randomized start height from TOP of screen */
                opacity: 0; 
            }
            2% { 
                opacity: 1; 
            }
            40% {
                left: calc(100vw - 450px); /* Approaching widget area */
                top: calc(200px + 3vw); /* Descending toward widget */
                opacity: 1;
            }
            60% {
                left: calc(100vw - 270px); /* Enter widget LEFT edge */
                top: calc(200px + 5vw); /* 20% widget height */
                opacity: 1;
            }
            80% {
                left: calc(100vw - 145px); /* Cross middle of widget */
                top: calc(200px + 6vw); /* 24% widget height */
                opacity: 1;
            }
            95% {
                left: calc(100vw - 30px); /* Near widget RIGHT edge */
                top: calc(200px + 7vw); /* 28% widget height */
                opacity: 1;
            }
            100% { 
                left: calc(100vw + 30px); /* Past widget completely */
                top: calc(200px + 7.5vw); /* 30% widget height */
                opacity: 0; /* Disappear after flying through */
            }
        }
        
        @keyframes imminentFlight {
            0% { 
                left: -150px; 
                top: 220px; 
                opacity: 0; 
            }
            2% { 
                opacity: 1; 
            }
            50% {
                left: calc(100vw - 300px);
                top: 235px;
                opacity: 1;
            }
            85% {
                left: calc(100vw - 80px);
                top: 245px;
                opacity: 1;
            }
            100% { 
                left: calc(100vw + 30px); 
                top: 250px; 
                opacity: 0; 
            }
        }
        
        @keyframes pulseGlow {
            0% { 
                box-shadow: 0 0 15px rgba(255, 255, 0, 0.5);
                transform: scale(1);
            }
            50% { 
                box-shadow: 0 0 25px rgba(255, 255, 0, 0.8);
                transform: scale(1.02);
            }
            100% { 
                box-shadow: 0 0 15px rgba(255, 255, 0, 0.5);
                transform: scale(1);
            }
        }
        
        .weather-widget:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Progressive responsive behavior with overlap prevention */
        @media (max-width: 1500px) {
            .weather-widget {
                top: 140px !important;
                width: 250px !important;
                height: 22vw !important;
                max-height: 280px !important;
            }
            .weather-label {
                top: 115px !important;
                width: 250px !important;
            }
            .fixed-quote-box {
                top: calc(140px + 22vw + 20px) !important;
                transform: none !important;
            }
        }
        
        @media (max-width: 1400px) {
            .weather-widget {
                width: 250px !important;
                height: 20vw !important;
                max-height: 240px !important;
                font-size: 0.7rem !important;
            }
            .weather-label {
                width: 250px !important;
                font-size: 0.65rem !important;
            }
            .mit-skyline {
                height: 80px !important;
            }
            .weather-info > div > div:first-child {
                font-size: clamp(0.75rem, 2.2vw, 1rem) !important;
            }
        }
        
        @media (max-width: 1300px) {
            .weather-widget {
                width: 180px !important;
                height: 260px !important;
                font-size: 0.65rem !important;
            }
            .weather-label {
                width: 180px !important;
                font-size: 0.6rem !important;
            }
            .mit-skyline {
                height: 70px !important;
            }
            .weather-info > div > div:first-child {
                font-size: clamp(0.7rem, 2vw, 0.95rem) !important;
            }
        }
        
        @media (max-width: 1200px) {
            .weather-widget {
                width: 160px !important;
                height: 240px !important;
                font-size: 0.6rem !important;
            }
            .weather-label {
                width: 160px !important;
                font-size: 0.55rem !important;
            }
            .mit-skyline {
                height: 60px !important;
            }
        }
        
        @media (max-width: 768px) {
            .weather-widget {
                right: 10px !important;
                top: 130px !important;
                width: 250px !important;
                height: 18vw !important;
                max-height: 180px !important;
                min-height: 160px !important;
                font-size: 0.7rem !important;
            }
            
            /* Mobile inline widget styling */
            .weather-widget[style*="position: relative"] {
                position: relative !important;
                width: 100% !important;
                max-width: 100% !important;
                height: 240px !important;
                margin: 0 auto !important;
                right: auto !important;
                top: auto !important;
                font-size: 0.65rem !important;
            }
            
            .fixed-quote-box {
                top: 295px !important; /* 150 + 120 + 25 gap */
                transform: none !important;
            }
            .mit-skyline {
                height: 40px !important;
            }
        }
        
        @media (max-height: 600px) {
            .weather-widget {
                top: 80px !important;
                height: 20vh !important;
                max-height: 160px !important;
            }
            .fixed-quote-box {
                top: calc(80px + 20vh + 20px) !important;
                transform: none !important;
            }
            .mit-skyline {
                height: 40px !important;
            }
        }
        
        /* Next flight info responsive positioning */
        @media (max-width: 1500px) {
            #next-flight-info {
                top: 480px !important;
                width: 250px !important;
            }
        }
        
        @media (max-width: 1400px) {
            #next-flight-info {
                top: 440px !important;
                width: 250px !important;
            }
        }
        
        @media (max-width: 1300px) {
            #next-flight-info {
                top: 420px !important;
                width: 180px !important;
            }
        }
        
        @media (max-width: 1200px) {
            #next-flight-info {
                display: none !important;
            }
        }
        
        @media (max-width: 768px) {
            #next-flight-info {
                right: 10px !important;
                top: 360px !important;
                width: 250px !important;
                display: block !important;
            }
        }
        
        /* Responsive plane animations */
    `;
    document.head.appendChild(style);
    
    // Let CSS handle positioning - removed dynamic positioning logic to prevent misalignment
    
    // Create info button and popup
    createInfoButton();

    // Initialize with state persistence
    const savedState = loadWidgetState();
    if (savedState && savedState.weatherData) {
        currentWeather = savedState.weatherData;
        lastWeatherUpdate = savedState.lastUpdate;
        updateWeatherDisplay(currentWeather); // Display immediately
        // Still fetch fresh data but don't wait for it
        fetchWeather().then(data => {
            currentWeather = data;
            updateWeatherDisplay(currentWeather);
            saveWidgetState();
        });
    } else {
        updateWeather(); // Normal initialization
    }
    
    // Update every minute to minimize API calls
    // Update weather data periodically
    setInterval(() => {
        updateWeather();
        saveWidgetState(); // Save state on each update
    }, WEATHER_UPDATE_INTERVAL);
    
    // Update time display every minute for current time
    setInterval(() => {
        updateWeatherDisplay(currentWeather);
    }, 60 * 1000);
    
    // Update when user returns to tab
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateWeather();
            saveWidgetState();
        }
    });
});
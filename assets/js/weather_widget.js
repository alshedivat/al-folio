// Cute Weather Widget for Boston
document.addEventListener('DOMContentLoaded', function() {
    // OpenWeatherMap API configuration
    const API_KEY = 'c63bfb77a842aa6a4c0e5005fdf0bd12';
    const BOSTON_LAT = 42.3601;
    const BOSTON_LON = -71.0589;
    
    // Weather state and caching
    let currentWeather = null;
    let lastWeatherUpdate = 0;
    const WEATHER_UPDATE_INTERVAL = 60 * 1000; // 1 minute to minimize API calls
    const CACHE_KEY = 'boston_weather_cache';
    const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes cache duration
    
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
    
    // Create weather label
    const weatherLabel = document.createElement('div');
    weatherLabel.className = 'weather-label';
    weatherLabel.style.cssText = `
        position: fixed;
        top: 215px;
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
    
    // Create weather widget
    const weatherWidget = document.createElement('div');
    weatherWidget.className = 'weather-widget';
    weatherWidget.style.cssText = `
        position: fixed;
        top: 240px;
        right: 20px;
        width: 250px;
        height: 250px;
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
        transition: all 0.3s ease;
        overflow: hidden;
    `;
    document.body.appendChild(weatherWidget);
    
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
        height: 160px;
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
        animationContainer.innerHTML = '';
        
        const now = new Date();
        const hour = now.getHours();
        const isDaytime = hour >= 6 && hour < 18;
        
        // Show sun/moon and stars based on time and conditions
        if (isDaytime) {
            // Always show sun during daytime, regardless of weather condition
            createSunAnimation(currentWeather);
        } else {
            // Show moon at night for clear conditions
            if (condition.toLowerCase() === 'clear') {
                createMoonAnimation(currentWeather);
            }
            // Always show stars at night (visibility varies by weather)
            createStarsAnimation(condition.toLowerCase());
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
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 165, 0, 0.2) 50%, transparent 100%);
            border-radius: 50%;
            animation: sunGlow 3s ease-in-out infinite alternate;
        `;
        sun.appendChild(sunGlow);
        
        animationContainer.appendChild(sun);
    }
    
    // Stars animation - visibility varies by weather condition
    function createStarsAnimation(condition) {
        let starCount = 8;
        let starOpacity = 0.8;
        
        // Adjust star visibility based on weather
        switch (condition) {
            case 'clear':
                starCount = 12;
                starOpacity = 0.9;
                break;
            case 'clouds':
                starCount = 6;
                starOpacity = 0.4;
                break;
            case 'rain':
            case 'thunderstorm':
                starCount = 2;
                starOpacity = 0.2;
                break;
            case 'snow':
                starCount = 8;
                starOpacity = 0.6;
                break;
            default:
                starCount = 8;
                starOpacity = 0.6;
        }
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                top: ${5 + Math.random() * 60}px;
                left: ${10 + Math.random() * 230}px;
                width: ${1 + Math.random() * 2}px;
                height: ${1 + Math.random() * 2}px;
                background: rgba(255, 255, 255, ${starOpacity});
                border-radius: 50%;
                animation: starTwinkle ${2 + Math.random() * 4}s ease-in-out infinite alternate;
                animation-delay: ${Math.random() * 3}s;
                z-index: 11;
            `;
            animationContainer.appendChild(star);
        }
    }
    
    // Moon animation with position based on actual sunset/sunrise times
    function createMoonAnimation(weatherData) {
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
        const nightLengthMs = (24 * 60 * 60 * 1000) - (sunsetMs - sunriseMs); // Total night duration
        let nightProgress;
        
        if (currentTimeMs >= sunsetMs) {
            // Evening to midnight
            nightProgress = (currentTimeMs - sunsetMs) / nightLengthMs;
        } else if (currentTimeMs <= sunriseMs) {
            // Midnight to sunrise
            const midnightMs = sunsetMs + (nightLengthMs / 2);
            nightProgress = 0.5 + ((currentTimeMs + (24 * 60 * 60 * 1000) - midnightMs) / nightLengthMs);
        } else {
            nightProgress = 0; // Shouldn't show moon during day
        }
        
        nightProgress = Math.max(0, Math.min(1, nightProgress));
        
        // Position from right (east) 215px to left (west) 10px
        const leftPosition = 215 - (nightProgress * 205);
        
        // Height follows arc - highest at midnight
        const arcHeight = Math.sin(nightProgress * Math.PI) * 15; // 0-15px arc
        const topPosition = 18 - arcHeight;
        
        const moon = document.createElement('div');
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
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            // Add realistic randomness to speed and timing
            const baseSpeed = 16 + (i * 2); // Base speed 16, 18, 20 seconds
            const speedVariation = (Math.random() - 0.5) * 4; // ±2 seconds variation
            const finalSpeed = Math.max(12, baseSpeed + speedVariation);
            
            const baseDelay = i * 2; // Base delay 0, 2, 4 seconds  
            const delayVariation = Math.random() * 3; // 0-3 seconds additional delay
            const finalDelay = baseDelay + delayVariation;
            
            cloud.style.cssText = `
                position: absolute;
                top: ${10 + i * 15 + (Math.random() - 0.5) * 6}px;
                left: ${-100 - (Math.random() * 20)}px;
                width: ${75 + Math.random() * 10}px;
                height: ${10 + Math.random() * 4}px;
                background: rgba(200, 200, 220, ${0.7 + Math.random() * 0.2});
                border-radius: 20px;
                animation: cloudFloat ${finalSpeed}s linear infinite;
                animation-delay: ${finalDelay}s;
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
        const buildingBrightness = isDaytime ? 1.2 : 0.8;
        
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
        
        // Add subtle water shimmer with multiple layers for depth
        const waterShimmer = document.createElement('div');
        waterShimmer.style.cssText = `
            position: absolute;
            top: 2px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(150, 200, 250, 0.2) 50%, 
                transparent 100%);
            animation: riverFlowMain 12s ease-in-out infinite;
        `;
        charlesRiver.appendChild(waterShimmer);
        
        // Add secondary water movement layer for more realism
        const waterFlow1 = document.createElement('div');
        waterFlow1.style.cssText = `
            position: absolute;
            top: 6px;
            left: 0;
            width: 120%;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(120, 180, 230, 0.15) 30%, 
                rgba(140, 190, 240, 0.15) 70%, 
                transparent 100%);
            animation: riverFlowSecondary 16s ease-in-out infinite;
        `;
        charlesRiver.appendChild(waterFlow1);
        
        // Add tertiary subtle flow for depth
        const waterFlow2 = document.createElement('div');
        waterFlow2.style.cssText = `
            position: absolute;
            top: 10px;
            left: 0;
            width: 110%;
            height: 1px;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(100, 160, 210, 0.1) 40%, 
                rgba(130, 180, 220, 0.1) 60%, 
                transparent 100%);
            animation: riverFlowTertiary 20s ease-in-out infinite reverse;
        `;
        charlesRiver.appendChild(waterFlow2);
        
        // Add occasional gentle ripples
        const ripples = document.createElement('div');
        ripples.style.cssText = `
            position: absolute;
            top: 4px;
            left: 0;
            width: 100%;
            height: 8px;
            background: repeating-linear-gradient(90deg, 
                transparent 0px, 
                transparent 15px,
                rgba(160, 200, 240, 0.08) 16px, 
                rgba(160, 200, 240, 0.08) 18px,
                transparent 19px,
                transparent 35px);
            animation: riverRipples 24s ease-in-out infinite;
        `;
        charlesRiver.appendChild(ripples);
        
        // Add floating debris/leaves for subtle motion cues
        for (let i = 0; i < 3; i++) {
            const debris = document.createElement('div');
            debris.style.cssText = `
                position: absolute;
                top: ${8 + Math.random() * 8}px;
                left: ${-5 - Math.random() * 10}px;
                width: ${1 + Math.random()}px;
                height: ${1 + Math.random()}px;
                background: rgba(101, 67, 33, 0.4);
                border-radius: 50%;
                animation: debrisFloat ${18 + Math.random() * 8}s linear infinite;
                animation-delay: ${Math.random() * 10}s;
                z-index: 1;
            `;
            charlesRiver.appendChild(debris);
        }
        
        // Add subtle current indicators (very small moving dots)
        for (let i = 0; i < 4; i++) {
            const currentDot = document.createElement('div');
            currentDot.style.cssText = `
                position: absolute;
                top: ${6 + Math.random() * 10}px;
                left: ${-3 - Math.random() * 8}px;
                width: 0.5px;
                height: 0.5px;
                background: rgba(140, 180, 220, 0.3);
                border-radius: 50%;
                animation: currentFlow ${14 + Math.random() * 6}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
                z-index: 2;
            `;
            charlesRiver.appendChild(currentDot);
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
            background: rgba(130, 130, 130, ${buildingBrightness});
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
                rgba(120, 120, 120, ${buildingBrightness}) 0%, 
                rgba(100, 100, 100, ${buildingBrightness}) 100%);
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
                rgba(60, 60, 60, ${buildingBrightness}) 0%, 
                rgba(40, 40, 40, ${buildingBrightness}) 100%);
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
                rgba(200, 200, 200, ${buildingBrightness * 0.6}) 0px, 
                rgba(200, 200, 200, ${buildingBrightness * 0.6}) 8px, 
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
                z-index: 15;
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
                    ${carColor}dd 60%, 
                    ${carColor}aa 100%);
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
                        ${carColor}cc 0%, 
                        ${carColor}88 100%);
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
                        ${carColor}cc 0%, 
                        ${carColor}88 100%);
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
                        ${carColor}cc 0%, 
                        ${carColor}88 100%);
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
                background: rgba(135, 206, 235, 0.6);
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
                background: rgba(135, 206, 235, 0.6);
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
        
        // Start car system - moderate traffic with max limit
        // Create initial cars immediately
        for (let i = 0; i < 2; i++) {
            setTimeout(() => createCarAnimation(), i * 3000);
        }
        setInterval(() => {
            if (Math.random() > 0.3) { // 70% chance each interval (moderate frequency)
                createCarAnimation();
            }
        }, 8000 + Math.random() * 6000); // 8-14 seconds (less frequent)
        
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
                color: `rgba(${r}, ${g}, ${b}, ${buildingBrightness * 0.75})`
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
                    rgba(${building.color.match(/\d+/g)[0] - 10}, ${building.color.match(/\d+/g)[1] - 10}, ${building.color.match(/\d+/g)[2] - 10}, ${buildingBrightness * 0.7}) 100%);
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
                        
                        // Set up random flickering for each window
                        const flickerInterval = 30000 + Math.random() * 60000; // 30-90 seconds
                        setInterval(() => {
                            isLit = Math.random() > 0.3; // 70% chance to be lit
                            updateWindowState();
                        }, flickerInterval);
                        
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
                rgba(233, 228, 212, ${buildingBrightness}) 0%, 
                rgba(200, 190, 170, ${buildingBrightness}) 100%);
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
                    rgba(220, 214, 197, ${buildingBrightness}) 0%, 
                    rgba(180, 170, 150, ${buildingBrightness}) 100%);
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
                background: rgba(170, 170, 170, ${buildingBrightness});
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
                background: rgba(170, 170, 170, ${buildingBrightness});
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
                rgba(230, 220, 200, ${buildingBrightness}) 0%, 
                rgba(200, 190, 170, ${buildingBrightness}) 100%);
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
                rgba(246, 240, 214, ${buildingBrightness}) 0%, 
                rgba(220, 210, 190, ${buildingBrightness}) 40%, 
                rgba(180, 167, 140, ${buildingBrightness}) 100%);
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
                rgba(216, 140, 66, ${buildingBrightness}) 0%, 
                rgba(200, 125, 50, ${buildingBrightness}) 50%,
                rgba(180, 105, 30, ${buildingBrightness}) 100%);
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
                rgba(227, 156, 62, ${buildingBrightness}) 0%, 
                rgba(210, 140, 45, ${buildingBrightness}) 50%,
                rgba(190, 120, 25, ${buildingBrightness}) 100%);
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
                rgba(196, 196, 196, ${buildingBrightness}) 0%, 
                rgba(160, 160, 160, ${buildingBrightness}) 50%,
                rgba(140, 140, 140, ${buildingBrightness}) 100%);
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
                rgba(240, 240, 240, ${buildingBrightness}) 0%, 
                rgba(220, 220, 220, ${buildingBrightness}) 50%,
                rgba(200, 200, 200, ${buildingBrightness}) 100%);
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
                rgba(245, 170, 80, ${buildingBrightness}) 0%, 
                rgba(225, 150, 60, ${buildingBrightness}) 100%);
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
                rgba(180, 180, 200, ${buildingBrightness}) 0%, 
                rgba(160, 160, 180, ${buildingBrightness}) 100%);
            transform: skewX(18deg);
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
            z-index: 3;
        `;
        
        // Add irregular windows to Stata buildings
        const stataBuildings = [stataMain, stataSecondary, stataMetallic, stataWhite, stataDetail1, stataDetail2];
        stataBuildings.forEach((building, buildingIndex) => {
            const buildingRect = {
                width: parseInt(building.style.width) || 15,
                height: parseInt(building.style.height) || 30
            };
            
            const windowCount = Math.max(2, Math.floor((buildingRect.width * buildingRect.height) / 120));
            
            for (let i = 0; i < windowCount * 2; i++) { // Double the window count for more windows
                if (Math.random() > 0.2) { // 80% chance for windows
                    const window = document.createElement('div');
                    let isLit = Math.random() > 0.4; // 60% chance of being lit initially
                    
                    // Irregular positioning with overlap prevention
                    const winX = 3 + Math.random() * (buildingRect.width - 8);
                    const winY = 6 + Math.random() * (buildingRect.height - 12);
                    
                    const updateWindowState = () => {
                        window.style.background = isLit ? `rgba(255, 224, 102, ${windowOpacity})` : 'rgba(50, 50, 50, 0.6)';
                        window.style.boxShadow = isLit ? `0 0 2px rgba(255, 224, 102, ${windowOpacity * 0.5})` : 'none';
                    };
                    
                    window.style.cssText = `
                        position: absolute;
                        left: ${winX}px;
                        top: ${winY}px;
                        width: 3px;
                        height: 3px;
                        border-radius: 0.5px;
                    `;
                    
                    updateWindowState();
                    
                    // Set up random flickering for each window
                    const flickerInterval = 20000 + Math.random() * 40000; // 20-60 seconds
                    setInterval(() => {
                        isLit = Math.random() > 0.35; // 65% chance to be lit
                        updateWindowState();
                    }, flickerInterval);
                    
                    building.appendChild(window);
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
                rgba(40, 60, 40, ${buildingBrightness}) 0%, 
                rgba(20, 40, 20, ${buildingBrightness}) 100%);
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
                rgba(80, 70, 60, ${buildingBrightness}) 0%, 
                rgba(60, 50, 40, ${buildingBrightness}) 100%);
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
                rgba(65, 75, 85, ${buildingBrightness}) 0%, 
                rgba(45, 55, 65, ${buildingBrightness}) 100%);
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
                rgba(70, 60, 80, ${buildingBrightness}) 0%, 
                rgba(50, 40, 60, ${buildingBrightness}) 100%);
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
                rgba(40, 50, 70, ${buildingBrightness}) 0%, 
                rgba(60, 70, 90, ${buildingBrightness}) 50%, 
                rgba(30, 40, 60, ${buildingBrightness}) 100%);
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
                rgba(45, 45, 65, ${buildingBrightness}) 0%, 
                rgba(25, 25, 45, ${buildingBrightness}) 100%);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
            z-index: 1;
        `;
        skylineContainer.appendChild(studentCenter);
        
        // Add windows to major buildings (excluding Stata which has its own window system)
        const buildings = [greenBuilding, kochBuilding, studentCenter, shortBuilding1, shortBuilding2, shortBuilding3];
        buildings.forEach(building => {
            const buildingRect = {
                width: parseInt(building.style.width) || 20,
                height: parseInt(building.style.height) || 20
            };
            
            const windowsX = Math.max(1, Math.floor(buildingRect.width / 4));
            const windowsY = Math.max(1, Math.floor(buildingRect.height / 6));
            
            for (let x = 0; x < windowsX; x++) {
                for (let y = 0; y < windowsY; y++) {
                    if (Math.random() > 0.2) { // 80% chance for windows
                        const window = document.createElement('div');
                        let isLit = Math.random() > 0.4; // 60% chance of being lit initially
                        
                        const updateWindowState = () => {
                            window.style.background = isLit ? `rgba(255, 200, 100, ${windowOpacity})` : 'rgba(50, 50, 50, 0.6)';
                            window.style.boxShadow = isLit ? `0 0 3px rgba(255, 200, 100, ${windowOpacity * 0.4})` : 'none';
                        };
                        
                        window.className = 'building-window';
                        window.dataset.isLit = isLit;
                        window.style.cssText = `
                            position: absolute;
                            left: ${(x + 1) * (buildingRect.width / (windowsX + 1)) - 1}px;
                            top: ${(y + 1) * (buildingRect.height / (windowsY + 1)) - 1}px;
                            width: 3px;
                            height: 3px;
                            border-radius: 0.5px;
                        `;
                        
                        updateWindowState();
                        
                        // Set up random flickering for each window
                        const flickerInterval = 35000 + Math.random() * 70000; // 35-105 seconds
                        setInterval(() => {
                            isLit = Math.random() > 0.3; // 70% chance to be lit
                            updateWindowState();
                        }, flickerInterval);
                        
                        building.appendChild(window);
                    }
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
        
        createWeatherAnimation(condition);
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
            0% { opacity: 0.6; transform: scale(1); }
            100% { opacity: 0.9; transform: scale(1.1); }
        }
        
        @keyframes starTwinkle {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0.4; transform: scale(1); }
        }
        
        @keyframes riverFlowMain {
            0% { transform: translateX(-20px); opacity: 0.3; }
            50% { transform: translateX(100%); opacity: 0.7; }
            100% { transform: translateX(120%); opacity: 0.3; }
        }
        
        @keyframes riverFlowSecondary {
            0% { transform: translateX(-30px); opacity: 0.15; }
            25% { opacity: 0.35; }
            60% { transform: translateX(80%); opacity: 0.35; }
            100% { transform: translateX(110%); opacity: 0.12; }
        }
        
        @keyframes riverFlowTertiary {
            0% { transform: translateX(-15px); opacity: 0.05; }
            40% { opacity: 0.1; }
            70% { transform: translateX(90%); opacity: 0.1; }
            100% { transform: translateX(105%); opacity: 0.03; }
        }
        
        @keyframes riverRipples {
            0% { transform: translateX(-25px) scaleX(1); opacity: 0.1; }
            20% { opacity: 0.2; }
            50% { transform: translateX(50%) scaleX(1.1); opacity: 0.2; }
            80% { opacity: 0.15; }
            100% { transform: translateX(125%) scaleX(0.9); opacity: 0.08; }
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
        
        .weather-widget:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Progressive responsive behavior */
        @media (max-width: 1400px) {
            .weather-widget {
                width: 220px !important;
                height: 180px !important;
                font-size: 0.7rem !important;
            }
            .weather-label {
                width: 220px !important;
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
                width: 200px !important;
                height: 160px !important;
                font-size: 0.65rem !important;
            }
            .weather-label {
                width: 200px !important;
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
            .weather-widget, .weather-label {
                display: none !important;
            }
        }
        
        @media (max-width: 768px) {
            .weather-widget {
                right: 10px !important;
                top: 150px !important;
                width: 220px !important;
                height: 120px !important;
                font-size: 0.7rem !important;
            }
            .fixed-quote-box {
                top: 320px !important; /* 150 + 120 + 50 gap */
                transform: none !important;
            }
            .mit-skyline {
                height: 40px !important;
            }
        }
        
        @media (max-height: 600px) {
            .weather-widget {
                top: 120px !important;
                height: 120px !important;
            }
            .fixed-quote-box {
                top: 290px !important; /* 120 + 120 + 50 gap */
                transform: none !important;
            }
            .mit-skyline {
                height: 40px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Position quotes box to avoid overlap with larger gap
    function positionQuotesBox() {
        const quotesBox = document.querySelector('.fixed-quote-box');
        if (quotesBox) {
            // Remove the transform that centers it vertically
            quotesBox.style.transform = 'none';
            
            // Calculate safe position: weather label top + weather widget height + smaller gap
            const labelTop = 215; // Weather label top position (215px)
            const weatherHeight = 220; // Weather widget height (220px)
            const safeGap = 20; // Smaller gap between widgets for closer positioning
            const quotesTop = labelTop + weatherHeight + safeGap; // 215 + 220 + 20 = 455px
            
            quotesBox.style.top = quotesTop + 'px';
            console.log(`Quotes box positioned at: ${quotesTop}px (transform removed)`);
        }
    }
    
    // Position immediately and on resize
    positionQuotesBox();
    window.addEventListener('resize', positionQuotesBox);
    

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
    setInterval(() => {
        updateWeather();
        saveWidgetState(); // Save state on each update
    }, WEATHER_UPDATE_INTERVAL);
    
    // Update when user returns to tab
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateWeather();
            saveWidgetState();
        }
    });
});
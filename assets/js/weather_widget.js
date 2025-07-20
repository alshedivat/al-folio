// Cute Weather Widget for Boston
document.addEventListener('DOMContentLoaded', function() {
    // OpenWeatherMap API configuration
    const API_KEY = '48d877ff561e145ebbbc6319311cd291';
    const BOSTON_LAT = 42.3601;
    const BOSTON_LON = -71.0589;
    
    // Weather state and caching
    let currentWeather = null;
    let lastWeatherUpdate = 0;
    const WEATHER_UPDATE_INTERVAL = 30 * 1000; // 30 seconds
    const CACHE_KEY = 'boston_weather_cache';
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration
    
    // Create weather label
    const weatherLabel = document.createElement('div');
    weatherLabel.className = 'weather-label';
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
    
    // Create weather widget
    const weatherWidget = document.createElement('div');
    weatherWidget.className = 'weather-widget';
    weatherWidget.style.cssText = `
        position: fixed;
        top: 200px;
        right: 20px;
        width: 250px;
        height: 160px;
        background: rgba(20, 20, 30, 0.9);
        border: 1px solid rgba(255, 68, 68, 0.3);
        border-radius: 12px;
        z-index: 1000;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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
        position: relative;
        z-index: 2;
        text-align: center;
        padding: 8px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        margin: 8px;
        margin-bottom: 20px;
        margin-top: 4px;
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
        height: 60px;
        z-index: 1;
        overflow: hidden;
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
        
        // Show moon at night for clear conditions
        if (!isDaytime && condition.toLowerCase() === 'clear') {
            createMoonAnimation();
        } else if (isDaytime && condition.toLowerCase() === 'clear') {
            createSunAnimation();
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
        }
    }
    
    // Sun animation with position based on time
    function createSunAnimation() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // Calculate sun position (6am = far left, 12pm = center, 6pm = far right)
        const totalMinutes = (hour - 6) * 60 + minute; // Minutes since 6am
        const dayLength = 12 * 60; // 12 hours in minutes
        const progress = Math.max(0, Math.min(1, totalMinutes / dayLength)); // 0 to 1
        
        // Position from left (10px) to right (215px) across the widget
        const leftPosition = 10 + (progress * 205);
        
        // Height follows arc - highest at noon
        const arcHeight = Math.sin(progress * Math.PI) * 15; // 0-15px arc
        const topPosition = 25 - arcHeight;
        
        const sun = document.createElement('div');
        sun.style.cssText = `
            position: absolute;
            top: ${topPosition}px;
            left: ${leftPosition}px;
            width: 25px;
            height: 25px;
            background: radial-gradient(circle, #FFD700 0%, #FFA500 70%);
            border-radius: 50%;
            animation: sunGlow 3s ease-in-out infinite alternate;
            transform: translateX(-50%);
        `;
        
        // Sun rays
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.style.cssText = `
                position: absolute;
                top: 22px;
                left: 50%;
                width: 1px;
                height: 8px;
                background: #FFD700;
                transform-origin: bottom;
                transform: translateX(-50%) rotate(${i * 45}deg);
                animation: sunRays 2s ease-in-out infinite;
                animation-delay: ${i * 0.1}s;
            `;
            sun.appendChild(ray);
        }
        
        animationContainer.appendChild(sun);
    }
    
    // Moon animation with position based on time
    function createMoonAnimation() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        
        // Calculate moon position (6pm = far left, 12am = center, 6am = far right)
        let totalMinutes;
        if (hour >= 18) {
            // Evening: 6pm to midnight
            totalMinutes = (hour - 18) * 60 + minute;
        } else {
            // Early morning: midnight to 6am
            totalMinutes = (6 * 60) + (hour * 60) + minute;
        }
        
        const nightLength = 12 * 60; // 12 hours in minutes
        const progress = Math.max(0, Math.min(1, totalMinutes / nightLength)); // 0 to 1
        
        // Position from left (10px) to right (215px) across the widget
        const leftPosition = 10 + (progress * 205);
        
        // Height follows arc - highest at midnight
        const arcHeight = Math.sin(progress * Math.PI) * 12; // 0-12px arc
        const topPosition = 20 - arcHeight;
        
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
        `;
        
        // Add some stars
        for (let i = 0; i < 4; i++) {
            const star = document.createElement('div');
            star.style.cssText = `
                position: absolute;
                top: ${5 + Math.random() * 40}px;
                left: ${10 + Math.random() * 200}px;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                animation: starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite alternate;
                animation-delay: ${Math.random() * 2}s;
            `;
            animationContainer.appendChild(star);
        }
        
        animationContainer.appendChild(moon);
    }
    
    // Cloud animation - full width
    function createCloudAnimation() {
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.style.cssText = `
                position: absolute;
                top: ${10 + i * 15}px;
                left: -60px;
                width: 80px;
                height: 12px;
                background: rgba(200, 200, 220, 0.8);
                border-radius: 20px;
                animation: cloudFloat ${8 + i * 3}s linear infinite;
                animation-delay: ${i * 1.5}s;
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
        
        // Stata Center (accurate Frank Gehry design - crumpled paper effect)
        const stata = document.createElement('div');
        stata.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 15px;
            width: 35px;
            height: 45px;
            background: linear-gradient(155deg, 
                rgba(180, 140, 80, ${buildingBrightness}) 0%, 
                rgba(160, 120, 60, ${buildingBrightness}) 25%,
                rgba(140, 160, 180, ${buildingBrightness}) 50%,
                rgba(200, 180, 140, ${buildingBrightness}) 75%,
                rgba(160, 140, 100, ${buildingBrightness}) 100%);
            clip-path: polygon(5% 100%, 0% 80%, 15% 65%, 8% 45%, 25% 35%, 20% 20%, 40% 15%, 35% 5%, 55% 10%, 70% 0%, 85% 15%, 95% 25%, 90% 45%, 100% 60%, 95% 85%, 100% 100%);
            box-shadow: 
                inset -5px -5px 10px rgba(0, 0, 0, 0.3),
                inset 5px 5px 10px rgba(255, 255, 255, 0.1);
            transform: perspective(100px) rotateY(5deg);
        `;
        skylineContainer.appendChild(stata);
        
        // Great Dome - accurate classical architecture with columns
        const domeBase = document.createElement('div');
        domeBase.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 55px;
            width: 45px;
            height: 30px;
            background: linear-gradient(180deg, 
                rgba(220, 210, 190, ${buildingBrightness}) 0%, 
                rgba(180, 170, 150, ${buildingBrightness}) 100%);
            box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.1);
        `;
        
        // Add classical columns to the front
        for (let i = 0; i < 5; i++) {
            const column = document.createElement('div');
            column.style.cssText = `
                position: absolute;
                bottom: 0;
                left: ${6 + i * 8}px;
                width: 2px;
                height: 28px;
                background: linear-gradient(180deg, 
                    rgba(240, 230, 210, ${buildingBrightness}) 0%, 
                    rgba(200, 190, 170, ${buildingBrightness}) 100%);
                box-shadow: 1px 0 2px rgba(0, 0, 0, 0.2);
            `;
            domeBase.appendChild(column);
        }
        
        // Classical pediment/triangular top
        const pediment = document.createElement('div');
        pediment.style.cssText = `
            position: absolute;
            bottom: 28px;
            left: 55px;
            width: 45px;
            height: 8px;
            background: linear-gradient(180deg, 
                rgba(240, 230, 210, ${buildingBrightness}) 0%, 
                rgba(200, 190, 170, ${buildingBrightness}) 100%);
            clip-path: polygon(10% 100%, 50% 0%, 90% 100%);
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
        `;
        
        const dome = document.createElement('div');
        dome.style.cssText = `
            position: absolute;
            bottom: 36px;
            left: 62px;
            width: 31px;
            height: 20px;
            background: linear-gradient(180deg, 
                rgba(160, 160, 180, ${buildingBrightness}) 0%, 
                rgba(120, 120, 140, ${buildingBrightness}) 100%);
            border-radius: 15.5px 15.5px 0 0;
            box-shadow: inset 0 -3px 6px rgba(0, 0, 0, 0.3);
        `;
        
        // Dome lantern (top structure)
        const domeTop = document.createElement('div');
        domeTop.style.cssText = `
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 10px;
            background: linear-gradient(180deg, 
                rgba(180, 170, 150, ${buildingBrightness}) 0%, 
                rgba(140, 130, 110, ${buildingBrightness}) 100%);
            border-radius: 1px;
            box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
        `;
        dome.appendChild(domeTop);
        
        skylineContainer.appendChild(domeBase);
        skylineContainer.appendChild(pediment);
        skylineContainer.appendChild(dome);
        
        // Green Building (tall with texture)
        const greenBuilding = document.createElement('div');
        greenBuilding.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 115px;
            width: 18px;
            height: 50px;
            background: linear-gradient(180deg, 
                rgba(40, 60, 40, ${buildingBrightness}) 0%, 
                rgba(20, 40, 20, ${buildingBrightness}) 100%);
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
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
        
        // Koch Institute (modern glass)
        const kochBuilding = document.createElement('div');
        kochBuilding.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 145px;
            width: 25px;
            height: 30px;
            background: linear-gradient(135deg, 
                rgba(40, 50, 70, ${buildingBrightness}) 0%, 
                rgba(60, 70, 90, ${buildingBrightness}) 50%, 
                rgba(30, 40, 60, ${buildingBrightness}) 100%);
            box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
        `;
        skylineContainer.appendChild(kochBuilding);
        
        // Student Center (lower, wider)
        const studentCenter = document.createElement('div');
        studentCenter.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 180px;
            width: 40px;
            height: 18px;
            background: linear-gradient(180deg, 
                rgba(45, 45, 65, ${buildingBrightness}) 0%, 
                rgba(25, 25, 45, ${buildingBrightness}) 100%);
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        `;
        skylineContainer.appendChild(studentCenter);
        
        // Additional buildings
        const building1 = document.createElement('div');
        building1.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 230px;
            width: 15px;
            height: 22px;
            background: linear-gradient(180deg, 
                rgba(40, 40, 60, ${buildingBrightness}) 0%, 
                rgba(20, 20, 40, ${buildingBrightness}) 100%);
        `;
        skylineContainer.appendChild(building1);
        
        // Add realistic windows to all buildings (excluding dome base which has pillars)
        const buildings = [stata, dome, greenBuilding, kochBuilding, studentCenter, building1];
        buildings.forEach((building, idx) => {
            // Add windows based on building size
            const buildingRect = {
                width: parseInt(building.style.width) || 20,
                height: parseInt(building.style.height) || 20
            };
            
            const windowsX = Math.floor(buildingRect.width / 8);
            const windowsY = Math.floor(buildingRect.height / 10);
            
            for (let x = 0; x < windowsX; x++) {
                for (let y = 0; y < windowsY; y++) {
                    if (Math.random() > 0.4) { // Random window placement
                        const window = document.createElement('div');
                        const isLit = Math.random() > 0.3; // 70% chance of being lit initially
                        
                        window.className = 'building-window';
                        window.dataset.isLit = isLit;
                        window.style.cssText = `
                            position: absolute;
                            left: ${(x + 1) * (buildingRect.width / (windowsX + 1)) - 1}px;
                            top: ${(y + 1) * (buildingRect.height / (windowsY + 1)) - 1}px;
                            width: 2px;
                            height: 3px;
                            background: ${isLit ? `rgba(255, 200, 100, ${windowOpacity})` : 'rgba(40, 40, 50, 0.8)'};
                            border-radius: 0.5px;
                            box-shadow: ${isLit ? `0 0 3px rgba(255, 200, 100, ${windowOpacity * 0.5})` : 'none'};
                            transition: all 0.3s ease;
                        `;
                        building.appendChild(window);
                    }
                }
            }
        });
    }
    
    // Function to randomly toggle window lights
    function toggleRandomWindow() {
        const windows = document.querySelectorAll('.building-window');
        if (windows.length === 0) return;
        
        // Pick a random window
        const randomWindow = windows[Math.floor(Math.random() * windows.length)];
        const isCurrentlyLit = randomWindow.dataset.isLit === 'true';
        const newLitState = !isCurrentlyLit;
        
        // Update the window state
        randomWindow.dataset.isLit = newLitState;
        
        // Get current time-based opacity for lit windows
        const now = new Date();
        const hour = now.getHours();
        const isDaytime = hour >= 6 && hour < 18;
        const windowOpacity = isDaytime ? 0.3 : 0.8;
        
        // Apply new styling with smooth transition
        if (newLitState) {
            randomWindow.style.background = `rgba(255, 200, 100, ${windowOpacity})`;
            randomWindow.style.boxShadow = `0 0 3px rgba(255, 200, 100, ${windowOpacity * 0.5})`;
        } else {
            randomWindow.style.background = 'rgba(40, 40, 50, 0.8)';
            randomWindow.style.boxShadow = 'none';
        }
    }
    
    // Update weather display with time and Fahrenheit
    function updateWeatherDisplay(weather) {
        if (!weather) return;
        
        const condition = weather.weather[0].main;
        const tempCelsius = weather.main.temp;
        const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
        const description = weather.weather[0].description;
        const currentTime = getBostonTime();
        
        weatherInfo.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 6px;">
                <div style="font-weight: bold; font-size: 1rem;">${tempFahrenheit}°F</div>
                <div style="font-size: 0.7rem; opacity: 0.8;">${currentTime}</div>
            </div>
            <div style="font-size: 0.65rem; opacity: 0.8; margin-bottom: 2px; text-align: center;">${description}</div>
        `;
        
        createWeatherAnimation(condition);
        createMITSkyline();
    }
    
    // Update weather
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
        @keyframes sunGlow {
            0% { box-shadow: 0 0 5px #FFD700; }
            100% { box-shadow: 0 0 15px #FFD700, 0 0 25px #FFA500; }
        }
        
        @keyframes sunRays {
            0%, 100% { opacity: 0.6; transform: translateX(-50%) rotate(var(--rotation)) scale(1); }
            50% { opacity: 1; transform: translateX(-50%) rotate(var(--rotation)) scale(1.2); }
        }
        
        @keyframes cloudFloat {
            from { left: -80px; }
            to { left: 270px; }
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
        
        @keyframes starTwinkle {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0.4; transform: scale(1); }
        }
        
        .weather-widget:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        /* Progressive responsive behavior */
        @media (max-width: 1400px) {
            .weather-widget {
                width: 220px !important;
                height: 140px !important;
                font-size: 0.7rem !important;
            }
            .weather-label {
                width: 220px !important;
                font-size: 0.65rem !important;
            }
            .mit-skyline {
                height: 50px !important;
            }
        }
        
        @media (max-width: 1300px) {
            .weather-widget {
                width: 200px !important;
                height: 130px !important;
                font-size: 0.65rem !important;
            }
            .weather-label {
                width: 200px !important;
                font-size: 0.6rem !important;
            }
            .mit-skyline {
                height: 45px !important;
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
            
            // Calculate safe position: weather label top + weather widget height + generous gap
            const labelTop = 175; // Weather label top position
            const weatherHeight = 160; // Weather widget height (updated)
            const safeGap = 40; // Generous gap between widgets
            const quotesTop = labelTop + weatherHeight + safeGap; // 175 + 160 + 40 = 375px
            
            quotesBox.style.top = quotesTop + 'px';
            console.log(`Quotes box positioned at: ${quotesTop}px (transform removed)`);
        }
    }
    
    // Position immediately and on resize
    positionQuotesBox();
    window.addEventListener('resize', positionQuotesBox);
    
    // Initialize
    updateWeather();
    
    // Update every 30 seconds
    setInterval(updateWeather, WEATHER_UPDATE_INTERVAL);
    
    // Toggle random window lights every 45-75 seconds
    setInterval(toggleRandomWindow, 45000 + Math.random() * 30000);
    
    // Update when user returns to tab
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateWeather();
        }
    });
});
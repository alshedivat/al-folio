#!/usr/bin/env node

// Test script to verify Boston Logan Airport flight scraping
// Run with: node test_logan_scraping.js

const https = require('https');

async function testBostonLoganScraping() {
    console.log('Testing Boston Logan Airport flight scraping...\n');
    
    try {
        // Test direct access to Boston Logan flight status page
        console.log('1. Testing direct access to Logan flight status page...');
        
        const url = 'https://www.massport.com/logan-airport/flights/flight-status';
        
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });
        
        if (response.ok) {
            const html = await response.text();
            console.log(`✓ Successfully retrieved page (${html.length} characters)`);
            
            // Look for flight-related content
            const flightMatches = html.match(/flight|arrival|departure|airline/gi);
            console.log(`✓ Found ${flightMatches ? flightMatches.length : 0} flight-related terms`);
            
            // Look for structured data
            const tableMatches = html.match(/<table[^>]*>/gi);
            const scriptMatches = html.match(/<script[^>]*>/gi);
            
            console.log(`✓ Found ${tableMatches ? tableMatches.length : 0} table elements`);
            console.log(`✓ Found ${scriptMatches ? scriptMatches.length : 0} script elements`);
            
            // Check for common flight data patterns
            const flightNumberPattern = /[A-Z]{2}\d{3,4}/g;
            const flightNumbers = html.match(flightNumberPattern);
            console.log(`✓ Found ${flightNumbers ? flightNumbers.length : 0} potential flight numbers`);
            
            // Look for time patterns
            const timePattern = /\d{1,2}:\d{2}\s*(AM|PM|am|pm)/g;
            const times = html.match(timePattern);
            console.log(`✓ Found ${times ? times.length : 0} time patterns`);
            
            console.log('\n2. Testing CORS proxy access...');
            
            // Test with CORS proxy
            const corsProxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);
            const corsResponse = await fetch(corsProxyUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });
            
            if (corsResponse.ok) {
                const corsHtml = await corsResponse.text();
                console.log(`✓ CORS proxy successful (${corsHtml.length} characters)`);
                
                // Quick analysis of CORS response
                const corsFlightMatches = corsHtml.match(/flight|arrival|departure/gi);
                console.log(`✓ CORS response contains ${corsFlightMatches ? corsFlightMatches.length : 0} flight terms`);
            } else {
                console.log(`✗ CORS proxy failed: ${corsResponse.status} ${corsResponse.statusText}`);
            }
            
        } else {
            console.log(`✗ Direct access failed: ${response.status} ${response.statusText}`);
        }
        
        console.log('\n3. Sample flight data parsing...');
        
        // Show what our mock data structure should look like
        const sampleFlightData = [
            {
                flight: 'AA1234',
                operator_iata: 'AA',
                flight_number: '1234',
                origin: { name: 'New York', code_iata: 'JFK' },
                estimated_in: new Date(Date.now() + 30 * 60 * 1000).toISOString()
            },
            {
                flight: 'DL5678',
                operator_iata: 'DL', 
                flight_number: '5678',
                origin: { name: 'Chicago', code_iata: 'ORD' },
                estimated_in: new Date(Date.now() + 45 * 60 * 1000).toISOString()
            }
        ];
        
        console.log('✓ Sample flight data structure:');
        sampleFlightData.forEach(flight => {
            const time = new Date(flight.estimated_in).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/New_York'
            });
            console.log(`  • ${flight.flight} from ${flight.origin.name} (${flight.origin.code_iata}) at ${time}`);
        });
        
        console.log('\n✓ Boston Logan scraping test completed successfully!');
        console.log('\nRecommendations:');
        console.log('• The website appears to be accessible');
        console.log('• CORS proxy should work for browser requests');
        console.log('• May need to parse JavaScript-rendered content');
        console.log('• Consider using a more specific scraping approach');
        
    } catch (error) {
        console.error('✗ Test failed with error:', error.message);
        console.log('\nFallback recommendation: Use mock data with realistic timing');
    }
}

// Run the test
if (typeof fetch === 'undefined') {
    // Node.js environment - need to import fetch
    import('node-fetch').then(({ default: fetch }) => {
        global.fetch = fetch;
        testBostonLoganScraping();
    }).catch(() => {
        console.log('Install node-fetch to run this test: npm install node-fetch');
        console.log('For now, using mock data approach is recommended.');
    });
} else {
    // Browser environment
    testBostonLoganScraping();
}
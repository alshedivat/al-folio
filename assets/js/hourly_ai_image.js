// Hourly AI Image System - Synchronized across the website
// This ensures the same Better Images of AI image is used for the entire hour across all pages

(function() {
    'use strict';
    
    // Complete list of AI images
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
        'Hidden Labour of Internet Browsing.jpg',
        'Humans Do the Heavy Data Lifting.jpg',
        'Isolation Kathryn Conrad 2560x1440.png',
        'Joining the Table Yutong Liu.png',
        'Lovelace GPU Diversity Fund.png',
        'Model Collapse Archival Images.png',
        'Morning View by Elise Recine.jpg',
        'Nadia Piet AI Classification Images.png',
        'Pink Office Jamillah Knowles 2560x1440.png',
        'Stochastic Parrots at Work.png',
        'Telling Tales 3000x2000.png',
        'Textiles and Tech Archival Images.png',
        'Weaving Wires 2.png',
        'Wheel of Progress 3200x1800.png'
    ];
    
    // Seeded random function for consistent results within the same hour
    function seededRandom(seed) {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    }
    
    // Get current hour seed (changes every hour)
    function getCurrentHourSeed() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();
        const hour = now.getHours();
        
        // Create a unique seed for this specific hour
        // This ensures all users get the same image during the same hour
        return year * 1000000 + month * 10000 + day * 100 + hour;
    }
    
    // Get the current hour's AI image
    function getCurrentHourImage() {
        const seed = getCurrentHourSeed();
        const randomValue = seededRandom(seed);
        const imageIndex = Math.floor(randomValue * aiImages.length);
        const selectedImage = aiImages[imageIndex];
        
        return {
            filename: selectedImage,
            path: '/assets/better-ai-imgs/' + encodeURIComponent(selectedImage),
            alt: 'AI image from Better Images of AI'
        };
    }
    
    // Cache the current image to avoid recalculation
    let cachedHour = -1;
    let cachedImage = null;
    
    // Public API
    window.HourlyAIImage = {
        // Get current hour's image (cached for performance)
        getCurrentImage: function() {
            const currentHour = new Date().getHours();
            if (cachedHour !== currentHour || !cachedImage) {
                cachedImage = getCurrentHourImage();
                cachedHour = currentHour;
                console.log(`Selected AI image for hour ${currentHour}: ${cachedImage.filename}`);
            }
            return cachedImage;
        },
        
        // Get just the image path
        getCurrentImagePath: function() {
            return this.getCurrentImage().path;
        },
        
        // Get just the filename
        getCurrentImageFilename: function() {
            return this.getCurrentImage().filename;
        },
        
        // Set an image element to use the current hour's image
        setImageElement: function(imageElement) {
            if (imageElement) {
                const currentImage = this.getCurrentImage();
                imageElement.src = currentImage.path;
                imageElement.alt = currentImage.alt;
            }
        },
        
        // Force refresh the cached image (useful for testing)
        refreshCache: function() {
            cachedHour = -1;
            cachedImage = null;
            return this.getCurrentImage();
        },
        
        // Get all available images (for debugging)
        getAllImages: function() {
            return [...aiImages];
        }
    };
    
    // Log system initialization
    console.log('Hourly AI Image system initialized. Current image:', window.HourlyAIImage.getCurrentImage().filename);
    
})();
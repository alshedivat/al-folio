// Hourly Synchronized AI Image Selector
// Now uses the same image across the entire website for the full hour
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the hourly AI image system to be available
    function waitForHourlySystem(callback) {
        if (window.HourlyAIImage) {
            callback();
        } else {
            setTimeout(() => waitForHourlySystem(callback), 50);
        }
    }
    
    // Function to set hourly synchronized image for any element
    function setHourlyImage(imageElement) {
        if (imageElement && window.HourlyAIImage) {
            window.HourlyAIImage.setImageElement(imageElement);
            console.log('Set hourly AI image for element:', imageElement.id || 'unnamed');
        }
    }

    waitForHourlySystem(() => {
        // Set image for about page
        const randomImageElement = document.getElementById('random-ai-image');
        setHourlyImage(randomImageElement);

        // Set image for fixed left margin box (other pages)
        const fixedImageElement = document.getElementById('fixed-ai-image');
        setHourlyImage(fixedImageElement);
        
        // Set image for 404 page
        const image404Element = document.getElementById('404-ai-image');
        setHourlyImage(image404Element);
        
        console.log('All AI images set to hourly synchronized image:', window.HourlyAIImage.getCurrentImageFilename());
    });
});
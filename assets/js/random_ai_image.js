// Random AI Image Selector
document.addEventListener('DOMContentLoaded', function() {
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

    // Function to set random image for any element
    function setRandomImage(imageElement) {
        if (imageElement) {
            const randomIndex = Math.floor(Math.random() * aiImages.length);
            const selectedImage = aiImages[randomIndex];
            const imagePath = '/assets/better-ai-imgs/' + encodeURIComponent(selectedImage);
            
            imageElement.src = imagePath;
            imageElement.alt = 'Random AI image from Better Images of AI';
        }
    }

    // Set image for about page
    const randomImageElement = document.getElementById('random-ai-image');
    setRandomImage(randomImageElement);

    // Set image for fixed left margin box (other pages)
    const fixedImageElement = document.getElementById('fixed-ai-image');
    setRandomImage(fixedImageElement);
    
    // Set image for 404 page
    const image404Element = document.getElementById('404-ai-image');
    setRandomImage(image404Element);
});
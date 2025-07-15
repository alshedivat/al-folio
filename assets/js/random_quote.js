// Random Quote Selector
document.addEventListener('DOMContentLoaded', function() {
    const randomQuoteElement = document.getElementById('random-quote');
    const randomQuoteAuthorElement = document.getElementById('random-quote-author');
    
    if (randomQuoteElement && randomQuoteAuthorElement) {
        fetch('/assets/json/quotes.json')
            .then(response => response.json())
            .then(quotes => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const selectedQuote = quotes[randomIndex];
                
                randomQuoteElement.innerHTML = `"${selectedQuote.quote}"`;
                randomQuoteAuthorElement.innerHTML = `— ${selectedQuote.author}`;
            })
            .catch(error => {
                console.error('Error loading quotes:', error);
                randomQuoteElement.textContent = '"Philosophy creates concepts, which are neither generalities nor truths. They are more along the lines of the Singular, the Important, the New."';
                randomQuoteAuthorElement.textContent = '— Gilles Deleuze';
            });
    }
});
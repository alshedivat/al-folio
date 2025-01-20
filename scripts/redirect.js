function unlockPage() {
    console.log('Button clicked!'); // Debugging: Ensure this message appears in the browser console
    const code = document.getElementById('code').value;
    const pages = {
        '2445': '/final_challenge.html',
        '4868': '/final_challenge.html',
        '6231': '/final_challenge.html',
        '2123': '/final_challenge.html',
        '1230': '/final_challenge.html',
        'code2': '/lists_for_codes.html',
    };
    if (pages[code]) {
        window.location.href = pages[code];
    } else {
        alert('Invalid code! Please try again.');
    }
}
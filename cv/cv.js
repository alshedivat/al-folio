const divIframe = document.querySelector('.frame');
const url = 'https://api.github.com/repos/tapyu/tapyu/contents/cv/Latex/cv.pdf';

fetch(url)
.then(response => response.json())
.then(data => {
const content = data.content;
const decodedContent = atob(content);
const bytes = new Uint8Array(decodedContent.length);
for (let i = 0; i < decodedContent.length; i++) {
    bytes[i] = decodedContent.charCodeAt(i);
}
const blob = new Blob([bytes], { type: 'application/pdf' });
const blobUrl = URL.createObjectURL(blob);
const iframe = document.createElement('iframe');
iframe.src = blobUrl;
iframe.setAttribute('type', 'application/pdf');
iframe.setAttribute('width', '100%');
iframe.setAttribute('height', '100%');
divIframe.appendChild(iframe);
})
.catch(error => console.error(error));
export const mockWithVideo = (path) => {
  navigator.mediaDevices.getUserMedia = () => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");

      video.oncanplay = () => {
	const startButton = document.createElement("button");
	startButton.innerHTML = "start";
	startButton.style.position = 'fixed';
	startButton.style.zIndex = 10000;
	document.body.appendChild(startButton);

	startButton.addEventListener('click', () => {
	  const stream = video.captureStream();
	  video.play();
	  document.body.removeChild(startButton);
	  resolve(stream);
	});
      };
      video.setAttribute('loop', '');
      video.setAttribute("src", path);
    });
  };
}

export const mockWithImage = (path) => {
  navigator.mediaDevices.getUserMedia = () => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');

      const image = new Image();
      image.onload = () => {
	canvas.width = image.width;
	canvas.height = image.height;
	context.drawImage(image, 0, 0, image.width, image.height);
	const stream = canvas.captureStream();
	resolve(stream);
      }
      image.src = path;
    });
  };
}

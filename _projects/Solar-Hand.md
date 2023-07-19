---
layout: page
title: Solar System in the Hand
description: Touch the solar system :)
img: assets/img/solar.png
importance: 3
category: idyllic
---
Turn on your camera, Posenet will regonize your body.
Red dots indicate the identification of different parts of the human body.
Hold out your hand in front of the camera, and you will touch the solar system :)

<html>
    <head>
      <meta charset="utf-8">
      <!-- Load TensorFlow.js -->
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
      <!-- Load Posenet -->
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet"></script>
      <img id="solar" width="140" height="100" src="/assets/img/solar.png" alt="Solar System">
      <style>

            #videoBox {
                min-width: 640px;
                min-height: 432px;
                position: relative;
                top: 0;
                left: 0;
            }
            #myVideo {
                min-width: 768px;
                min-height: 432px;
                position: absolute;
                transform: scaleX(-1);

            }
            #output {
                position: absolute;
                z-index: 3;
            }

            /* div.intro {
              weight: 50px;
              position:absolute;
              right:0;
            } */
      </style>
    </head>

    <body>

      <p></p>
        <div id="videoBox">
            <video src="" id="myVideo" autoplay="autoplay"></video>
            <canvas id="output" ></canvas>
        </div>


        <h1 id="myTitle">loading model......</h1>
        <p>.</p>
        <p>.</p>
        <p>. </p>
        <p>. </p>



    </body>

    <script>

        const myVideo =  document.querySelector("#myVideo");
        const myCanvas = document.querySelector("#output");
        const ctx = myCanvas.getContext('2d');
        var net = {};
        var imgs = document.getElementById("solar");
        var imgsw=420;
        var imgsh=300;

        posenet.load()
        .then((net1) => {
            document.querySelector("#myTitle").style.display = "none";
            net = net1;
            setupCamera();
        })

        function poseDetectionFrame() {

            net.estimateSinglePose(myVideo, {
                flipHorizontal: true  // 目前单人模式,多人模式的设置 参考官方例程
            })
            .then((pose) => {
                let score = pose.score;
                let keypoints = pose.keypoints;
                //console.log(keypoints[10].position);//显示右手坐标
                if (score >= 0.2) {
                    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

                    for (let i = 0; i < keypoints.length; i++) {
                        const keypoint = keypoints[i];

                        if(keypoint.score > 0.1) {

                            const {y, x} = keypoint.position;
                            drawPoint(ctx, y, x, 6, "red");

                        }
                    }
                    console.log(keypoints[10].position.x);

                    //在右手手腕添加太阳系模型
                    ctx.drawImage(imgs,keypoints[10].position.x-imgsw/2,keypoints[10].position.y-imgsh/2,imgsw,imgsh);

                }
            });

            requestAnimationFrame(poseDetectionFrame);

        }

        function setupCamera() {

            let exArray = [];
            //web rtc 调用摄像头(兼容性写法(谷歌、火狐、ie))
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            //遍历摄像头
            navigator.mediaDevices.enumerateDevices()
            .then(function (sourceInfos) {
                for (var i = 0; i < sourceInfos.length; ++i) {
                    if (sourceInfos[i].kind == 'videoinput') {
                        exArray.push(sourceInfos[i].deviceId);
                    }
                }
            })
            .then(() => {
                // 因为我这里是有三个摄像头,我需要取前置摄像头
                let deviceId = exArray[0];  // 取前置摄像头,(深度,灰度,RGB)

                navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        deviceId: deviceId
                    }
                })
                .then(stream => {  // 参数表示需要同时获取到音频和视频
                    // 获取到优化后的媒体流
                    myVideo.srcObject = stream;
                    myVideo.onloadedmetadata = () => {
                        myVideo.width = myVideo.offsetWidth;
                        myVideo.height = myVideo.offsetHeight;
                        myCanvas.width = myVideo.width;
                        myCanvas.height = myVideo.height;
                        poseDetectionFrame();
                    };

                })
                .catch(err => {
                    // 捕获错误
                    console.log
                });
            });
        }

        function drawPoint(ctx, y, x, r, color) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }


    </script>
    <footer>Acknowledgement: Wynne</footer>
    <footer>Solar System Photo credit: <a href="https://ixintu.com/sucai/7NNUWUqWk.html">ysqmv</a></footer>
    <footer>&copy; Copyright & Stuff 2022. Made By <a href="https://neoluxqq.github.io">Neo</a>. </footer>
    <footer>This work is licensed under the  <a href="http://creativecommons.org/licenses/by-nc/3.0/">CC BY-NC 3.0 Creative Commons License</a>.</footer>
</html>

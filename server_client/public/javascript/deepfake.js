$(document).ready(function () {
    const video = document.getElementById('predict-media');

    Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri('/json'),
        faceapi.nets.tinyFaceDetector.loadFromUri('/json'),
    ]);

    var detectionTimeout;
    video.addEventListener('playing', () => {
        var canvas;
        if ($('canvas').length < 1) {
            canvas = faceapi.createCanvasFromMedia(video);
            canvas.style.top = video.offsetTop + 'px';
            canvas.style.left = video.offsetLeft + 'px';
            document.body.append(canvas);
        }
        /* In order to be able to pause the video */
        const displaySize = {
            width: video.width,
            height: video.height - 60,
        };
        faceapi.matchDimensions(canvas, displaySize);

        detectionTimeout = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video);
            const resizedDetections = faceapi.resizeResults(
                detections,
                displaySize
            );
            canvas
                .getContext('2d')
                .clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.top = video.offsetTop + 'px';
            canvas.style.left = video.offsetLeft + 'px';
            resizedDetections.forEach((result, i) => {
                console.log(resizedDetections[i].box);
                var result = '{{output}}';
                var confidence = '{{confidence}}';
                var drawOptions = {
                    label: result.concat('  ', confidence, '%'),
                };
                if (result == 'REAL') {
                    drawOptions['boxColor'] = '#0f0';
                } else if (result == 'FAKE') {
                    drawOptions['boxColor'] = '#f00';
                }
                var box = {
                    x: resizedDetections[i].box.x,
                    y: resizedDetections[i].box.y,
                    height: 100,
                    width: 100,
                };
                const drawBox = new faceapi.draw.DrawBox(box, drawOptions);
                drawBox.draw(canvas);
            });
        }, 1);
    });

    video.addEventListener('paused', () => {
        clearTimeout(detectionTimeout);
    });
});



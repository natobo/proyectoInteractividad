// Obtiene los elementos de face.html
// Elemento video
const video = document.querySelector(`.webcam`);
// Elementos del canvas
const canvas = document.querySelector(`.video`);
const ctx = canvas.getContext(`2d`);
// Elementos  del canvas especial para la deteccion del video
const faceCanvas = document.querySelector(`.face`);
const faceCtx = faceCanvas.getContext(`2d`);
//Elementos para el text
const textCanvas = document.querySelector(`.text`);
const textCtx = textCanvas.getContext(`2d`);
// Utilizamos libreria FaceDetector
const faceDetector = new window.FaceDetector({
    fastMode: true
});
let quotes;
let boolFrase = true;
let frase = '';
const options = {
    SIZE: 10,
    SCALE: 1.35
};
// Write a fucntion that will populate the users video
async function populateVideo() {
    if (!quotes) {
        quotes = await fetch('https://type.fit/api/quotes').then((res)=>res.json()
        );
        console.log(quotes.length);
    }
    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            width: 1280,
            height: 720
        }
    });
    video.srcObject = stream;
    await video.play();
    // size the canvases to be the same size as the video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    faceCanvas.width = video.videoWidth;
    faceCanvas.height = video.videoHeight;
    textCanvas.width = video.videoWidth;
    textCanvas.height = video.videoHeight;
}
async function detect() {
    const faces = await faceDetector.detect(video);
    // ask the browser when the next animation frame is, and tell it to run detect for us
    faces.forEach(drawFace);
    faces.forEach(censor);
    requestAnimationFrame(detect);
}
function drawFace(face) {
    const { width , height , top , left  } = face.boundingBox;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffc600';
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);
}
function censor({ boundingBox: face  }) {
    faceCtx.imageSmoothingEnabled = false;
    faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    textCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
    textCtx.font = "30px Verdana";
    faceCtx.font = "40px Verdana";
    // Create gradient
    var gradient = textCtx.createLinearGradient(0, 0, video.videoWidth, 0);
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    // Fill with gradient
    textCtx.fillStyle = gradient;
    faceCtx.fillStyle = gradient;
    textCtx.fillText(`Refresca la pag 
    
    
    
    
    
    
    
    
    
    
    
    
    

    para otra frase`, 10, 90);
    let randomNum;
    console.log("Boolean", boolFrase);
    if (boolFrase) {
        randomNum = Math.round(Math.random() * quotes.length);
        boolFrase = false;
        frase = quotes[randomNum].text;
    }
    faceCtx.fillText(frase, face.x - 400, face.y + 100, 1000);
// // draw the small face
// faceCtx.drawImage(
//     // 5 source args
//     video, // where does the source come from?
//     face.x, // where do we start the source pull from?
//     face.y,
//     face.width,
//     face.height,
//     // 4 draw args
//     face.x, // where should we start drawing the x and y?
//     face.y,
//     options.SIZE,
//     options.SIZE
// );
// // draw the small face back on, but scale up
// const width = face.width * options.SCALE;
// const height = face.height * options.SCALE;
// faceCtx.drawImage(
//     faceCanvas, // source
//     face.x, // where do we start the source pull from?
//     face.y,
//     options.SIZE,
//     options.SIZE,
//     // Drawing args
//     face.x - (width - face.width) / 2,
//     face.y - (height - face.height) / 2,
//     width,
//     height
// );
}
populateVideo().then(detect);

//# sourceMappingURL=index.70c85462.js.map

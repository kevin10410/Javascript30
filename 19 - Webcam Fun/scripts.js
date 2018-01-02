const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
 
function getVideo () {
    navigator.mediaDevices.getUserMedia({ video:true, audio:false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.src = window.URL.createObjectURL(localMediaStream);
        video.play();
    })
    .catch(err =>{
        window.alert('No WebCam!!')
    })
};

function paintToCanvas () {
    const width = video.videoWidth;
    const height = video.videoHeight; 

    canvas.width = width;
    canvas.height = height;

    // return setInterval ( () => {
    //     ctx.drawImage(video, 0, 0, width, height);
    // }, 20)

    return setInterval (convert, 20);
    debugger;

};

function convert () {
    const width = video.videoWidth;
    const height = video.videoHeight; 
    ctx.drawImage(video, 0, 0, width, height);
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels.data);
    //mess with them
    // pixels = firstEffect(pixels);
    // pixels = rgbSplit(pixels);
    pixels = funTime(pixels);
    // ctx.globalAlpha = 0.1;
    //
    ctx.putImageData(pixels, 0, 0);
};

function takePhoto () {
    //play the snap sound
    snap.currentTime = 0;
    snap.play();

    //take the data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    // link.textContent = 'download';
    link.innerHTML = `<img src = "${data}" alt = "Handsome Man" >`;
    strip.insertBefore(link, strip.firstChild);
};

function firstEffect(pixels) {
    for(i =0; i < pixels.data.length; i+=4) {
    pixels.data[i] = pixels.data[i] + 200;  //Red
    pixels.data[i+1] = pixels.data[i+1] + 0;  //Green
    pixels.data[i+2] = pixels.data[i+2] + 100;  //Blue
    };
    return pixels;
};

function rgbSplit(pixels) {
    for(i =0; i < pixels.data.length; i+=4) {
    pixels.data[i-150] = pixels.data[i];  //Red
    pixels.data[i+500] = pixels.data[i+1];  //Green
    pixels.data[i-550] = pixels.data[i+2];  //Blue
    };
    return pixels;
};

function funTime (pixels) {
    
    for (i = 0; i < pixels.data.length; i+=4){
        let newEffect = []; 
        // newEffect.unshift(pixels.data[i+3]);
        // newEffect.unshift(pixels.data[i+2]);
        // newEffect.unshift(pixels.data[i+1]);
        // newEffect.unshift(pixels.data[i]);
        pixels.data[i] = pixels.data[(pixels.data.length-1)-(i+3)];
        pixels.data[i+1] = pixels.data[(pixels.data.length-1)-(i+2)];
        pixels.data[i+2] = pixels.data[(pixels.data.length-1)-(i+1)];
        pixels.data[i+3] = pixels.data[(pixels.data.length-1)-i];
    };
    pixels.data = newEffect
    console.log(pixels);
    return pixels;
};

getVideo();
video.addEventListener('canplay', paintToCanvas);
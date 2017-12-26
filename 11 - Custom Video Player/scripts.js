//Get Elements
var selectVideo = document.querySelector('video');
var playButton = document.querySelector('.toggle');
var inputItem = document.querySelectorAll('input');
var skipButton = document.querySelectorAll('.player__button[data-skip]');
var progressBarOut = document.querySelector('.progress');
var progressBarIn = document.querySelector('.progress__filled');

console.log(inputItem);

// Add EventListener
playButton.addEventListener('click', playToggle);
selectVideo.addEventListener('click', playToggle);
// volumeSlide.addEventListener('input', changeVolume);
// rateSlide.addEventListener('input', changeRate);
inputItem.forEach(function(item){
    item.addEventListener('input', changeCondition);
})
skipButton.forEach(function(button){
    button.addEventListener('click', skipVideo)
});
selectVideo.addEventListener('timeupdate', progressing);
progressBarOut.addEventListener('mousedown', addDragProgress);
progressBarOut.addEventListener('mouseup', removeDragProgress);

//Create Functions
function playToggle() {
    if (selectVideo.paused) {
        selectVideo.play();
        playButton.innerHTML = '❚ ❚';
        console.log(selectVideo.paused);
    } else {
        selectVideo.pause();
        playButton.innerHTML = '►';
        console.log(selectVideo.paused);
    }
};

function changeVolume(e) {
    let currentVolume = e.target.value;
    selectVideo.volume = currentVolume;
    // console.log(e.target);
};

function changeRate(e) {
    let currentRate = e.target.value;
    selectVideo.playbackRate = currentRate;
    // console.log(currentRate);
};

function changeCondition (e) {
    //this = e.target
    var conditionName = this.name;
    var conditionValue = this.value;
    selectVideo[conditionName] = conditionValue;
     
}


function skipVideo(e) {
    let changeTime = parseInt(e.target.dataset.skip);
    console.log(changeTime);
    selectVideo.currentTime += changeTime;
}

function progressing() {
    let videoDuration = selectVideo.duration;
    let currentPosition = selectVideo.currentTime;
    currentProgress = currentPosition / videoDuration * 100;
    progressBarIn.style.flexBasis = `${currentProgress}%`;
    // console.log(currentProgress);
};

function addDragProgress (e) {
    console.log(e);
    progressBarOut.addEventListener('click', dragProgressBar);
    progressBarOut.addEventListener('mousemove', dragProgressBar);
};

function removeDragProgress () {
    progressBarOut.removeEventListener('mousemove', dragProgressBar);
};


function dragProgressBar (e) {
    console.log(e);
    let videoDuration = selectVideo.duration;
    let mouseX = e.offsetX;
    let progressBarWidth = progressBarOut.offsetWidth;
    let videoProgress = mouseX / progressBarWidth;
    let newPosition = videoDuration * videoProgress;
    selectVideo.currentTime = newPosition;
    console.log(videoDuration);
    console.log(videoProgress);
    console.log(newPosition);
};


window.addEventListener('keydown', keyboardFunction);


/*===========Add Keyboard Event===========*/

function keyboardFunction(e) {
    e.preventDefault();

    if (e.keyCode === 37) {
        let backButton = document.querySelector('.player__button[data-skip="-10"]');
        console.log(backButton);
        backButton.click();
    };
    if (e.keyCode === 39) {
        let nextBotton = document.querySelector('.player__button[data-skip="25"]');
        console.log(nextBotton);
        nextBotton.click();
        
    };
    if (e.keyCode === 38 && selectVideo.volume <= 1) {
        let volumeSlide = document.querySelector('[name = "volume"]');
        volumeSlide.stepUp();
        selectVideo.volume = volumeSlide.value;
        console.log(volumeSlide.value);
    };
    if (e.keyCode === 40 && selectVideo.volume > 0) {
        let volumeSlide = document.querySelector('[name = "volume"]');
        volumeSlide.stepDown();
        selectVideo.volume = volumeSlide.value;
        console.log(volumeSlide.value);
    };
    if (e.keyCode === 32) {
        playToggle();
    };
}




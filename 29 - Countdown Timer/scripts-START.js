const buttons = document.querySelectorAll('.timer__button');
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const input = document.querySelector('form');

let count;

buttons.forEach(function (button) {
    button.addEventListener('click', setTime);
});

function setTime(event) {
    clearInterval(count);
    let remainTime = parseInt(this.dataset.time);
    let currentTime = new Date();
    countDown(remainTime);
    showRemainTime(remainTime);
    showEndTime(currentTime, remainTime);

};

function countDown(remainTime) {
    count = setInterval(function () {
        if (remainTime > 0) {
            console.log(remainTime);
            remainTime--;
            showRemainTime(remainTime)
        }
        else {
            clearInterval(count);
        }
    }, 1000)
};

function showRemainTime(time) {
    let hour = parseInt(time / 3600);
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let min = parseInt((time - hour * 3600) / 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = time % 60;
    if (sec < 10) {
        sec = `0${sec}`;
    }

    let text = `${hour}:${min}:${sec}`;
    timeLeft.innerHTML = text;
    document.title = text;
};

function showEndTime(currentTime, remainTime) {

    let currentHour = currentTime.getHours();
    let currentMin = currentTime.getMinutes();
    let currentSec = currentTime.getSeconds();
    let predictTime = remainTime + currentHour * 3600 + currentMin * 60 + currentSec;

    let predictHour = parseInt(predictTime / 3600);
    if (predictHour < 10) {
        predictHour = `0${predictHour}`;
    }

    let predictMin = parseInt((predictTime - predictHour * 3600) / 60);
    if (predictMin < 10) {
        predictMin = `0${predictMin}`;
    }
    let predictSec = predictTime % 60;
    if (predictSec < 10) {
        predictSec = `0${predictSec}`;
    }

    endTime.innerHTML = `${predictHour % 24}:${predictMin}:${predictSec}`;
};

input.addEventListener('submit', setInputTime);

function setInputTime(event) {
    event.preventDefault();
    let inputValue = this.querySelector('input').value;
    if (isNaN(inputValue)) {
        window.alert('請輸入數字！！')
    } else {
        clearInterval(count);
        let remainTime = inputValue * 60;
        let currentTime = new Date();
        countDown(remainTime);
        showRemainTime(remainTime);
        showEndTime(currentTime, remainTime);
    }
    this.reset();
};
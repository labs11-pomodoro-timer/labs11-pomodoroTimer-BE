const focusTime = 25 * 60;

let time = focusTime;
let timerRunning = false;
let interval;
let timeLeft;



function countDown() {
    interval = setInterval(function(){
        time--;
        if (time < 0) {
            setStartTime();
        }
        timeLeft = focusTime - time;
    }, 1000);
}

function timerReport() {
    let seconds = time % 60;
    let minutes = ((time / 60) | 0);
    return "The user is in Focus mode for " + minutes + ":" + seconds;
}

function setStartTime() {
    time = focusTime;
}
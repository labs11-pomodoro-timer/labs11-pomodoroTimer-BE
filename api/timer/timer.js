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
    
}

function setStartTime() {
    time = focusTime;
}
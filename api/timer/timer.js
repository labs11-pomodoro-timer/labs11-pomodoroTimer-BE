// Countdown timer function that takes in a time argument and
// sets the timer based on the input of the API endpoint


function countDown(time) {
    let initialTime;
    let timerRunning = true;

    if(time === "short"){
        initialTime = 5*60;
    }else if(time === "long"){
        initialTime = 15*60;
    }else if(time === "focus"){
        initialTime = 25*60;
    }else if(isNaN(time) === false){
        initialTime = parseInt(time);
    }
    
    setInterval(function(){
      if (time === 0) {
        console.log("The timer has finished") 
      }
      if (timerRunning) {
        time--;
        
            if (time > 0) {
                console.log(time)
            } else {
              timerFinished()
               
            }
        } 
        }, 1000);

}
      


function timerReport(time) {
    let seconds = time % 60;
    let minutes = ((time / 60) | 0);
    return "The user is in Focus mode for " + minutes + ":" + seconds;
}

function timerFinished() {
    // Execute once timer reaches 0. User should be taken out of Focus
    // mode on Slack
    
    timerRunning = false;
    
    
}
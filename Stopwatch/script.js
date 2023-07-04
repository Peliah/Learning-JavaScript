//setting the state of the hours, minutes, seconds and miliseconds
let [milliseconds, seconds, minutes, hours] = [0,0,0,0]

//we reference the timer display
let timerRef = document.querySelector(".display_time")

//setting the interval
let int = null

document.getElementById("start_timer").addEventListener("click", ()=>{
    if(int!==null){
        clearInterval(int)
    }
    int=setInterval(displayTimer, 10)
})
function displayTimer() {
    milliseconds +=10;
    seconds = milliseconds ==1000?(seconds+1)%60 : seconds
    minutes = seconds == 0 && milliseconds ==0 ? (minutes+1)%60 : minutes
    hours = minutes == 0 && seconds ==0 && milliseconds==0?(hours+1):hours
    milliseconds = milliseconds ===1000? 0 : milliseconds

    h=String(hours).padStart(2, "0")
    m=String(minutes).padStart(2, "0")
    s=String(seconds).padStart(2, "0")
    ms=String(milliseconds).padStart(3, "0")

    timerRef.innerHTML = `${h} : ${m} : ${s} : ${ms}`
    
}

document.getElementById("pause_timer").addEventListener("click", ()=>{
        clearInterval(int)
})

document.getElementById("reset_timer").addEventListener("click", ()=>{
        clearInterval(int)
        // [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0]
        timerRef.innerHTML = "00 : 00 : 00 : 000"
})
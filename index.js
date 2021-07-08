const videoBackground = document.querySelector('.video-background');
const timerBtn= document.getElementById('timer');
const startBtn= document.getElementById('start');
const countBtn= document.getElementById('count');
const stopwatchBtn = document.getElementById('stopwatch');
const timerDisplay = document.querySelector('.timer-display');
const stopwatchDisplay = document.querySelector('.stopwatch-display');
const hundredthOfSecond=document.getElementById('hundredth-of-second');
const secondDisplayStopwatch = document.getElementById('seconds-stopwatch');
const minutesDisplayStopwatch = document.getElementById('minutes-stopwatch');
const countTimestamps = document.querySelector('.count-timestamps');
const resetBtn = document.getElementById('reset');
const hourInput =document.getElementById('hour');
const minuteInput =document.getElementById('minutes');
const secondInput =document.getElementById('seconds');

const countdownEndsMusic = new Audio('./audio/musical_timer.mp3');
countdownEndsMusic.loop=true;
let count=0;
let minutesId,secondsId,hundredthOfSecondId;
let timerId;
function clearAllIntervals(ids){
ids.forEach((id)=>{
    clearInterval(id);
})
}

function showTimer(){
    resetTimer();
    timerDisplay.classList.remove('hidden');
    stopwatchDisplay.classList.add('hidden');
    countBtn.classList.add('hidden');
    timerBtn.classList.add('active');
    stopwatchBtn.classList.remove('active');
}

function showStopwatch(){
    resetTimer();
    startBtn.textContent="Start";
    timerDisplay.classList.add('hidden');
    stopwatchDisplay.classList.remove('hidden');
    countBtn.classList.remove('hidden');
    timerBtn.classList.remove('active');
    stopwatchBtn.classList.add('active');    
}

function startTimer(){

    if(startBtn.textContent==="Start"){
     startBtn.textContent="Stop";
     // for stopwatch
     if(timerDisplay.classList.contains('hidden')){
        hundredthOfSecondId=setInterval(()=>{
         hundredthOfSecond.value<99?hundredthOfSecond.value++:hundredthOfSecond.value=00;
        },10);
        secondsId=setInterval(()=>{
         secondDisplayStopwatch.value<59?secondDisplayStopwatch.value++:secondDisplayStopwatch.value=00;
        },1000)
        minutesId=setInterval(()=>{
            minutesDisplayStopwatch.value<59?minutesDisplayStopwatch.value++:minutesDisplayStopwatch.value=00;
         },60000)
     }
    //  for timer      
     else if(stopwatchDisplay.classList.contains('hidden')){
        hourInput.readOnly=true;
        minuteInput.readOnly=true;
        secondInput.readOnly=true;
        let hours= parseInt(hourInput.value)*3600;
        let minutes =parseInt(minuteInput.value)*60;
        let seconds =parseInt(secondInput.value);
        timerId=setInterval(updateCountDown,1000); 
        let time= hours+minutes+seconds;
        function updateCountDown(){
            if(time>=0){
                let remainingHours = Math.floor(time/3600);
                let remainingMinutes =Math.floor(time/60)%60;
                let remainingSeconds = time%60;
                hourInput.value=remainingHours;
                minuteInput.value =remainingMinutes;
                secondInput.value=remainingSeconds;
                time--;
                // when countdown ends
                if(remainingHours===0 && remainingMinutes===0 && remainingSeconds===0){
                    document.querySelector('.countdown-ends').classList.remove('hidden');
                    countdownEndsMusic.play();
                }
            }else{
                clearInterval(timerId);
            }
            }
 
     }
    }else{
        startBtn.textContent="Start";
        stopwatchBtn.classList.contains('active')?
        clearAllIntervals([hundredthOfSecondId,secondsId,minutesId]):
        clearAllIntervals([timerId]);
        countdownEndsMusic.pause();        
        document.querySelector('.countdown-ends').classList.add('hidden');
    }

}

function addCount(){
    if(startBtn.textContent==="Stop"){
        count++;
        const countDiv=document.createElement('div');
        const span=document.createElement('span');
        countDiv.setAttribute('class','timestamp');
        span.textContent=`Count ${count}:  ${minutesDisplayStopwatch.value}m ${secondDisplayStopwatch.value}s ${hundredthOfSecond.value}`
        countDiv.appendChild(span);
        countTimestamps.appendChild(countDiv);
    }
}

function resetTimer(){
    countdownEndsMusic.pause();
    document.querySelector('.countdown-ends').classList.add('hidden');
    hourInput.readOnly=false;
    minuteInput.readOnly=false;
    secondInput.readOnly=false;
    count=0;
    // for stopwatch
    if(timerDisplay.classList.contains('hidden')){
        clearAllIntervals([hundredthOfSecondId,secondsId,minutesId]);
        // remove all counts
        document.querySelectorAll('.timestamp').forEach((div)=>{
           countTimestamps.removeChild(div);
        })
    }
    // for countdown timer
    else{
        clearAllIntervals([timerId]);
    }
    document.querySelectorAll('input').forEach((input)=>{
        input.value="00";
    })
    startBtn.textContent="Start";
}



// event listeners

timerBtn.addEventListener('click',showTimer);
stopwatchBtn.addEventListener('click',showStopwatch);
startBtn.addEventListener('click',startTimer);
countBtn.addEventListener('click',addCount);
resetBtn.addEventListener('click',resetTimer);
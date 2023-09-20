let breakLength=5*60;
let sessoinLength=25*60;
let isChangingMod=true;
let sessionTimer;
const defaultMinutes=25*60;
const defaultSeconde=5*60;
let breakTimer;


const breakPlus=document.getElementById("break-plus");
const breakMinus=document.getElementById("break-minus");
const breakNumber=document.getElementById("break-num");
const sessionPlus=document.getElementById("sessoin-plus");
const sessoinMinus=document.getElementById("sessoin-minus");
const sessoinNumber=document.getElementById("sessoin-num");
const timerMinutes=document.getElementById("timer-minutes");
const timerSeconds=document.getElementById("timer-seconds");
const playButton=document.getElementById("play-button");
const pauseButton=document.getElementById("pause-button");
const resetButton=document.getElementById("reset-button");
const title=document.getElementById("title");


function Reset(){
    breakLength=defaultSeconde;
    sessoinLength=defaultMinutes;
    breakNumber.textContent=defaultSeconde/60;
    sessoinNumber.textContent=defaultMinutes/60;
    clearInterval(sessionTimer);
    timerMinutes.textContent=defaultMinutes/60;
    timerSeconds.textContent="00";

}

function startBreak(){
    clearInterval(sessionTimer);
    isChangingMod=false;
    title.textContent="Break";

    breakTimer = setInterval(()=>{
        breakLength -=1;
        updateTimer(breakLength);

        if(breakLength===0){
            sessoinLength=parseInt(sessoinNumber.textContent*60)
            updateTimer(sessoinLength)
            startSessoin();
        }
    },1000);
}

function startSessoin(){
    clearInterval(breakTimer);
    isChangingMod=true;
    title.textContent="Sessoin";
    sessionTimer = setInterval(()=>{
        sessoinLength -=1;
        updateTimer(sessoinLength);

        if(sessoinLength===0){
            breakLength=parseInt(breakNumber.textContent*60)
            updateTimer(breakLength)
            startBreak();
        }
    },1000)
}

function updateTimer(num){
    if(Math.floor(num/60).toString().length===1){
        timerMinutes.textContent="0" + Math.floor(num/60);   
    }else{
        timerMinutes.textContent= Math.floor(num/60);   
    }
    
    if((num%60).toString().length===1){
        timerSeconds.textContent="0" + num%60;
    }else{
        timerSeconds.textContent=num%60;
    }
};

resetButton.addEventListener("click",()=>{
    Reset();
})

playButton.addEventListener("click",()=>{
    if(isChangingMod){
        startSessoin();
    }else{
        startBreak();
    }
});

pauseButton.addEventListener("click",()=>{
    if(isChangingMod)clearInterval(sessionTimer);
    if(!isChangingMod)clearInterval(breakTimer);
});


breakPlus.addEventListener("click",()=>{
    breakLength+=60;
    breakNumber.textContent=breakLength/60;

});

breakMinus.addEventListener("click",()=>{
    if(breakLength - 60 ==0)return;
    breakLength-=60;
    breakNumber.textContent=breakLength/60;
});

sessionPlus.addEventListener("click",()=>{
    sessoinLength+=60;
    sessoinNumber.textContent=sessoinLength/60;
    if(isChangingMod){
        timerMinutes.textContent=sessoinLength/60;
    }
});

sessoinMinus.addEventListener("click",()=>{
    if(sessoinLength - 60 ==0)return;
    sessoinLength-=60;
    sessoinNumber.textContent=sessoinLength/60;
    if(isChangingMod){
        timerMinutes.textContent=sessoinLength/60;
    }
});
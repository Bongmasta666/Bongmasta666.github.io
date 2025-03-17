const startBtn = document.getElementById("start");
const lvlLabel = document.getElementById("stageL");
const ptsLabel = document.getElementById("scoreL");
const cntLabel = document.getElementById("counterL");
const greenBtn = document.getElementById("GREEN");
const blueBtn = document.getElementById("BLUE");
const redBtn = document.getElementById("RED");
const yellowBtn = document.getElementById("YELLOW");

const buttons = [greenBtn, blueBtn, redBtn, yellowBtn];

const colorEnum = {
    GREEN: {colorUp: "lime",  colorDown: "green"},
    RED: {colorUp: "tomato",  colorDown: "darkred"},
    BLUE: {colorUp: "dodgerblue",  colorDown: "darkblue"},
    YELLOW: {colorUp: "yellow",  colorDown: "goldenrod"}
};

let colorSequence = [];
let isRunning = false;
let waitTime = 800;
let counter = 3;
let count = 0;
let score = 0;
let stage = 1;

setButtonStates(false);

async function startGame(){
    if (isRunning === false){
        startBtn.disabled = true;
        updateHUD();
        await doSequence();
        setButtonStates(true);
    }
};

async function doSequence(){
    isRunning = true;
    colorSequence = [];
    for (let i = 0; i<counter; i++){
        let rand = getRandomColor();
        let btn = document.getElementById(rand);
        colorSequence.push(rand);
        await clickButton(btn);
        await delay(waitTime);
    }; isRunning = false;
};

function startNextLvl(){
    startBtn.innerText = "Start";
    count = 0;
    counter++; 
    stage++;
    startGame();
};

async function onPlayerClick(btn){
    let id = await clickButton(btn);
    if (colorSequence[count] === id){
        count++;
        cntLabel.innerText = "Correct: "+count+"/"+counter;
        if (count === counter){
            setButtonStates(false);
            score += count;
            ptsLabel.innerText = "PTS: "+String(score).padStart(2, '0');
            startBtn.innerText = "Next Level";
            startBtn.disabled = false;
            startBtn.onclick = startNextLvl;
        }
    } else {
        setButtonStates(false);
        cntLabel.innerText = "Incorrect!!";
        let finalScore = score;
        counter = 3;
        count = 0;
        stage = 1;
        score = 0;
        updateHUD()
        startBtn.disabled = false;
        startBtn.onclick = startGame;
        console.log("Final: "+finalScore);
    }
};

function setButtonStates(state){
    for (let i = 0; i < buttons.length; i++){buttons[i].disabled = !state;}
};

async function clickButton(button){
    let id = button.id;
    button.style.background = colorEnum[id].colorDown;
    await delay(300);
    button.style.background = colorEnum[id].colorUp;
    return id;
};

function getRandomColor(){
    const keys = Object.keys(colorEnum);
    return keys[Math.floor(Math.random() * keys.length)];
};

function updateHUD(){
    lvlLabel.innerText = "LVL: "+String(stage).padStart(2, '0');
    ptsLabel.innerText = "PTS: "+String(score).padStart(2, '0');
    cntLabel.innerText = "Current: "+count+"/"+counter;
};

function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms));};
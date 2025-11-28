//code variables and constants.
let targetNum=200;
let sqrtTargetNum=parseInt(Math.sqrt(targetNum));
let targetsMax=200;
let colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];
let hitsCounter = 0;


//Buttons
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

//page elements



//eventListeners

startButton.addEventListener('click', () => {
    
    generateTargets();
});


//FUNCTIONS

//generate all targets

function generateTargets() {

    //reset all code variables and constants.
    targetNum=5;
    sqrtTargetNum=parseInt(Math.sqrt(targetNum));
    targetsMax=5;
    colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];
    hitsCounter = 0;
    
    //get all target grid elements
    const targetGrid = document.getElementById("target-grid");
    //clear the grid
    targetGrid.innerHTML = '';
    //generate the number of targets based on the set ammount
    for (let i=0;i<=targetNum;i++) {
        
        targetGrid.innerHTML += `<div id="${i}" class="${i} target  ">target${i}</div>`;
    }
    //set the grid rows using the new number of targets.
    setGrid();
    //show one target
    showTarget(1);
    //bind event listeners to each active target.
    bindActiveTarget();
    //reset the hits counter
    hitsCounter = 0;
    updateHitCounter();

}

//bind target click
function bindActiveTarget() {
    
     document.querySelectorAll('.active').forEach(btn=> {
        btn.addEventListener('click', () => {
            console.log('clicked' + btn.id);
            //updating number of clicks
            hitsCounter++
            updateHitCounter();
            //update the next target;
            updateTargetVars();
            displayNextTarget();
            setGrid();
        //specifying that this event listener dissapears after once click. 
        }, {once: true});
    });
}

//show random target function including even listeners
function displayNextTarget() {
    //getting random number with total targets as a max. 
    showTarget(getRandomInt(targetNum))
    //bing the active target event listener
    bindActiveTarget();   
}

//show target

function showTarget(targetNum) {
    //clear all targets colors
    clearColors();
    //remove all targets class "active"
    document.querySelectorAll('.active').forEach(targ => {
            targ.classList.remove('active');
            console.log('first part of show target');
    });
    //update 1 target class to active
    document.getElementById(targetNum).classList.add('active');
    //set random color for targetsquare
    setTargetRandomColor(targetNum);
    console.log('second part of show section');

}





//random int generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



//setting a targets color randomly
function setTargetRandomColor(targetNum) {
    let numberColours = colourVars.length;
    let colourNumber = getRandomInt(numberColours);
    //update 1 target color
    document.getElementById(targetNum).style["background-color"] = `${colourVars[colourNumber]}`
}

//clearing all targets color:

function clearColors() {
    document.querySelectorAll('.target').forEach(targ => {
            targ.style["background-color"] = 'white';
            console.log('targets cleared')
    });
}

//setting grid rows
function setGrid() {
    //setting variable by editing innerHTML
    document.getElementById("target-grid").style["grid-template-columns"] = `repeat(${sqrtTargetNum}, 1fr)`;
    console.log("generated new grid rows:" + sqrtTargetNum);
    }


//update target variables, 

function updateTargetVars() {
    //set total targets equal to a random ammount of the max, should be for a mode with randome target ammounts.
    //targetNum=getRandomInt(targetsMax);
    //trying to get nice balance of total targets to number used for # of columns in the grid.
    sqrtTargetNum=parseInt(Math.sqrt(targetNum)+4);
    console.log(targetNum);
    console.log(sqrtTargetNum);
}

//update hitcounter element to display the new hit count total
function updateHitCounter() {
    document.getElementById("hits-display").innerText = hitsCounter;
}
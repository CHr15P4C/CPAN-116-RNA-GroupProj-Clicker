

//code variables and constants.
let totalTargets=200;
let sqrttotalTargets=parseInt(Math.sqrt(totalTargets));
let targetsMax=200;
let colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];
let hitsCounter = 0;
let missCounter = 0;
let activeTargetID = 0;
//Buttons
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");

//page elements



//eventListeners

startButton.addEventListener('click', () => {
    
    generateTargets();
    startTime();
});


//FUNCTIONS

//generate all targets

function generateTargets() {

    //reset all code variables and constants.
    totalTargets=5;
    sqrttotalTargets=parseInt(Math.sqrt(totalTargets));
    targetsMax=5;
    colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];
    
    //get all target grid elements
    const targetGrid = document.getElementById("target-grid");
    //clear the grid
    targetGrid.innerHTML = '';
    //generate the number of targets based on the set ammount
    for (let i=0;i<=totalTargets;i++) {
        
        targetGrid.innerHTML += `<div id="${i}" class="${i} target  ">target${i}</div>`;
    }

    //bind event listener inside grid
    targetGridListener();
    //set conditional miss listeners for all targets
   // bindAllTargets();
    //set the grid rows using the new number of targets.
    setGrid();
    //show one target
    showTarget(activeTargetID);
    //bind event listeners to each active target.
   // bindActiveTarget();
    //reset the hits and miss counter
    hitsCounter = 0;
    updateHitCounter();
    missCounter=0;
    updateMissCounter();

}


//grid click listener. one time solution. 
function targetGridListener() {
    document.getElementById('target-grid').addEventListener('click', (btn) => {
        let clickTarget = document.querySelector('.active');
        if(clickTarget.contains(btn.target)) {
            console.log('clicked' + btn.id);
            hitsCounter++
            updateHitCounter();
            //update the next target;
            updateTargetVars();
            displayNextTarget();
            setGrid();
            
        } else {
            missCounter++;
            updateMissCounter();
            console.log('missed ' + btn.id + "target: " + activeTargetID);
        }     

    });
}







//show random target function including even listeners
function displayNextTarget() {
    //setting active target var
    activeTargetID = getRandomInt(totalTargets)
    //getting random number with total targets as a max. 
    showTarget(activeTargetID)
    //bing the active target event listener
    //bindActiveTarget();   
    
}

//show target

function showTarget(totalTargets) {
    //clear all targets colors
    clearColors();
    //remove all targets class "active"
    document.querySelectorAll('.active').forEach(targ => {
            targ.classList.remove('active');
            console.log('first part of show target');
    });
    //update 1 target class to active
    document.getElementById(totalTargets).classList.add('active');
    //set random color for targetsquare
    setTargetRandomColor(totalTargets);
    console.log('second part of show section');

}





//random int generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



//setting a targets color randomly
function setTargetRandomColor(totalTargets) {
    let numberColours = colourVars.length;
    let colourNumber = getRandomInt(numberColours);
    //update 1 target color
    document.getElementById(totalTargets).style["background-color"] = `${colourVars[colourNumber]}`
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
    document.getElementById("target-grid").style["grid-template-columns"] = `repeat(${sqrttotalTargets}, 1fr)`;
    console.log("generated new grid rows:" + sqrttotalTargets);
    }


//update target variables, 

function updateTargetVars() {
    //set total targets equal to a random ammount of the max, should be for a mode with randome target ammounts.
    //totalTargets=getRandomInt(targetsMax);
    //trying to get nice balance of total targets to number used for # of columns in the grid.
    sqrttotalTargets=parseInt(Math.sqrt(totalTargets)+4);
    console.log(totalTargets);
    console.log(sqrttotalTargets);
}

//update hitcounter element to display the new hit count total
function updateHitCounter() {
    document.getElementById("hits-display").innerText = hitsCounter;
}

//update misscounter element
function updateMissCounter() {
    document.getElementById('miss-display').innerText = missCounter;
}

//clock function

function startTime() {
    //get current date time as now
    const start = new Date()
    //set interval for date time function to run at 1 second.
    setInterval(setTime, 10);
    function setTime() {
        var currentTime = new Date();
        var timeDifference = Math.abs(currentTime - start);
        document.getElementById('timer').innerText = timeDifference;
    }
}
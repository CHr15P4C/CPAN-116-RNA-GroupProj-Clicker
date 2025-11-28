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
    targetNum=200;
    sqrtTargetNum=parseInt(Math.sqrt(targetNum));
    targetsMax=200;
    colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];
    hitsCounter = 0;

    //get all target grid elements
    const targetGrid = document.getElementById("target-grid");
    //clear the grid
    targetGrid.innerHTML = '';
    //generate the number of targets based on the set ammount
    for (i=0;i<targetNum;i++) {
        
        targetGrid.innerHTML += `<div id="${i}" class="${i} target  ">target${i}</div>`;
    }
    //set the grid
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
     document.querySelectorAll('.target.active').forEach(btn=> {
        btn.addEventListener('click', () => {
            console.log('clicked');
            //updating number of clicks
            hitsCounter++
            updateHitCounter();
            //update the next target;
            updateTargetVars();
            displayNextTarget();
            setGrid();

        });
    });
}


//show target

function showTarget(targetNum) {
    //clear all targets colors
    clearColors();
    //remove all targets class "active"
    document.querySelectorAll('.target').forEach(targ => {
            targ.classList.remove('active');
            console.log('first part of show target')
    });
    //update 1 target class to active
    document.getElementById(targetNum).classList.add('active');
    //set random color for targetsquare
    setTargetRandomColor(targetNum);
    console.log('second part of show section')

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
    
//show random target
function displayNextTarget() {
    showTarget(getRandomInt(targetNum))
    bindActiveTarget();   
}

//random int generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//style injection from java to html - unnecessary?
/*
function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}
*/

//setting grid rows
function setGrid() {
    //setting grid using a css variable, editing root.
    /*
    addStyle(`
        :root {
            --column-var: ${sqrtTargetNum};
            }
        `);
        */
       //setting variable by editing innerHTML
    document.getElementById("target-grid").style["grid-template-columns"] = `repeat(${sqrtTargetNum}, 1fr)`;
    console.log("generated new grid rows:" + sqrtTargetNum);
    }


//update target variables

function updateTargetVars() {
    targetNum=getRandomInt(targetsMax);
    //trying to get nice balance of total targets to number used for # of columns in the grid.
    sqrtTargetNum=parseInt(Math.sqrt(targetNum)+4);
    console.log(targetNum);
    console.log(sqrtTargetNum);
}

//update hitcounter element to display the new hit count total
function updateHitCounter() {
    document.getElementById("hits-display").innerText = hitsCounter;
}
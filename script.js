//code variables and constants.
let targetNum=200;
let sqrtTargetNum=parseInt(Math.sqrt(targetNum));
let targetsMax=200;
let colourVars = ['Aqua', 'Blue', 'BlueViolet', 'Brown', 'Chartreuse', 'Black', 'Coral', 'Crimson'];

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
    bindTarget();


}

//bind target click
function bindTarget() {
     document.querySelectorAll('.target.active').forEach(btn=> {
        btn.addEventListener('click', () => {
            console.log('clicked');
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
    //clear all targets
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
    bindTarget();   
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
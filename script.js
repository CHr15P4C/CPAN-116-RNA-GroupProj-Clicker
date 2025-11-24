let targetNum=200;
let sqrtTargetNum=parseInt(Math.sqrt(targetNum));
let targetsMax=200;
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

//bing target click
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
    document.querySelectorAll('.target').forEach(targ => {
            targ.classList.remove('active');
            console.log('first part of show target')
    });
    document.getElementById(targetNum).classList.add('active');
    console.log('second part of show section')
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

//style injection from java to html
function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}

//setting grid rows
function setGrid() {
    addStyle(`
        :root {
            --column-var: ${sqrtTargetNum};
            }
        `);
}

//update target variables

function updateTargetVars() {
    targetNum=getRandomInt(targetsMax);
    sqrtTargetNum=parseInt(Math.sqrt(targetNum));
    console.log(targetNum);
    console.log(sqrtTargetNum);
}
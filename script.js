const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const container = document.querySelector(".container");
const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");



const gridToggle = document.querySelector("#grid-toggle");

let squaresPerSides = 16;
let gridVisible = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridCells();
    createGridCells();
}


function setBackgroundColor () {
    this.style.backgroundColor = "black";
}

function createGridCells() {
    const numOfSquares = (squaresPerSides * squaresPerSides);
    
    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");

        if (gridVisible) {
            widthOrHeight = `${(pareseInt(gridWidth) / squaresPerSides) -2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else if (!gridVisible) {
            widthOrHeight = ``
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;
        gridCell.classList.add("cell");

        sketchArea.appendChild(gridCell);

        gridCell.addEventListener("mouseover", setBackgroundColor);
    }
}


function removeGridCells() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}


slider.oninput = function() {
    let txt = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = txt;
    removeGridCells();
    createGridCells(this.value);
}

createGridCells();
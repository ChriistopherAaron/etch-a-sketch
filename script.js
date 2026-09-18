const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");



const gridToggle = document.querySelector("#grid-toggle");

let squaresPerSides = 16;
let gridVisible = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridSquares();
    createGridSquares();
}


function setBackgroundColor () {
    this.style.backgroundColor = "black";
}

function createGridSquares(squaresPerSide = squaresPerSides) {
    squaresPerSides = squaresPerSide;
    const numOfSquares = squaresPerSides * squaresPerSides;

    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");
        let widthOrHeight = 0;

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSides) - 2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSides)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = widthOrHeight;
        gridCell.style.height = widthOrHeight;
        gridCell.addEventListener("mouseover", setBackgroundColor);

        sketchArea.appendChild(gridCell);
    }
}



function removeGridSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}


slider.oninput = function() {
    squaresPerSides = this.value;
   
    sliderValue.textContent = `${this.value} x ${this.value} (Resolution)`;
   
    removeGridSquares();
    createGridSquares();
}

gridToggle.addEventListener("click", toggleGrid);

createGridSquares();
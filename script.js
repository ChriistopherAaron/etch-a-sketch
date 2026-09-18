const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");

const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");
const gridToggle = document.querySelector("#grid-toggle");
const sizeBtn = document.querySelector("#size-btn");

let squaresPerSides = 16;
let gridVisible = false;
let isDrawing = false;

// Global mouse tracking so dragging doesn't break
window.addEventListener("mousedown", () => isDrawing = true);
window.addEventListener("mouseup", () => isDrawing = false);

function toggleGrid() {
    gridVisible = !gridVisible;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridSquares();
    createGridSquares(squaresPerSides);
}

function setBackgroundColor(e) {
    if (e.type === "mousedown" || (e.type === "mouseover" && isDrawing)) {
        e.target.style.backgroundColor = "black";
    }
}

function createGridSquares(squaresPerSide = squaresPerSides) {
    squaresPerSides = squaresPerSide;
    const numOfSquares = squaresPerSides * squaresPerSides;

    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");
        let widthOrHeight;

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSides) - 2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSides)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = widthOrHeight;
        gridCell.style.height = widthOrHeight;

        // Prevent dragging ghost elements
        gridCell.addEventListener("dragstart", (e) => e.preventDefault());

        // Event listeners for drawing
        gridCell.addEventListener("mousedown", setBackgroundColor);
        gridCell.addEventListener("mouseover", setBackgroundColor);

        sketchArea.appendChild(gridCell);
    }
}

function removeGridSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

// Update slider and regenerate grid
slider.oninput = function() {
    squaresPerSides = parseInt(this.value);
    sliderValue.textContent = `${squaresPerSides} x ${squaresPerSides} (Resolution)`;
    removeGridSquares();
    createGridSquares(squaresPerSides);
};

// Odin Project Requirement: Button prompt for grid size
sizeBtn.addEventListener("click", () => {
    let userSize = prompt("Enter number of squares per side (max 100):");
    userSize = parseInt(userSize);

    if (userSize && userSize > 0 && userSize <= 100) {
        squaresPerSides = userSize;
        slider.value = userSize;
        sliderValue.textContent = `${userSize} x ${userSize} (Resolution)`;
        removeGridSquares();
        createGridSquares(userSize);
    } else if (userSize > 100) {
        alert("Maximum allowed size is 100.");
    }
});

gridToggle.addEventListener("click", toggleGrid);

// Initialize initial grid on load
createGridSquares(squaresPerSides);
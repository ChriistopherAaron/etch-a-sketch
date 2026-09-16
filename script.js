const GRIDSIDE = 600;
let rows = 16;
let cols = 16;


const sketchArea = document.querySelector("#sketch-area");
sketchArea.style.width = `${GRIDSIDE}px`;
sketchArea.style.height = `${GRIDSIDE}px`;


function createGridCells() {
    for (let i = 0; i < (row * cols); i++) {
        const gridCell = document.createElement("div");

        gridCell.style.width = `${(GRIDSIDE / cols) -2}px`;
        gridCell.sytle.height = `${(GRIDSIDE / rows) -2}px`;
    }
}
let gridSize = 20;
let x = 0; 
let y = 0;

// Waits until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGrid();
});

function setupGrid() {
    for (let a = 0; a < gridSize; a++) {
        // Create row
        let newRow = document.getElementById('grid').appendChild(document.createElement('tr'));

        // Create cell
        for (let b = 0; b < gridSize; b++) {
            let newCell = newRow.appendChild(document.createElement('td'));
            newCell.classList.add('grid__cell');
            newCell.onclick = selectCell;
            if (x > gridSize - 1) x = 0

            newCell.setAttribute('x', x);
            newCell.setAttribute('y', y);
            x++;
        }
        y++;
    }
}

function selectCell(e) {
    console.log(e.target);
}
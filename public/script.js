let gridSize = 20;
let x = 0; 
let y = 0;

  
document.addEventListener('mousedown',(e) => {
    if (e.which === 3) {
        console.log('delete');
    }
});

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
            newCell.classList.add('grid__cell--empty');
            newCell.onclick = selectCell;
            if (x > gridSize - 1) x = 0

            newCell.setAttribute('x', x);
            newCell.setAttribute('y', y);
            x++;

            // Add event listener
            newCell.addEventListener("dragover", (e) => {
                const draggable = document.querySelector('.token--dragging');
                newCell.appendChild(draggable);
                newCell.classList.remove('grid__cell--empty')
            });
        }
        y++;
    }
}

function selectCell(e) {
    if (e.target.classList.contains('grid__cell--empty')) {
        addToken(e.target, 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg');
    } 
}

function addToken(cell, image) {
    cell.classList.remove('grid__cell--empty');
    // Add token
    const token = cell.appendChild(document.createElement('img'));
    token.setAttribute('src', image);
    token.classList.add('token');

    // Add event listeners
    token.addEventListener("dragstart", (e) => {
        e.target.classList.add('token--dragging');
    });
    token.addEventListener("dragend", (e) => {
        e.target.classList.remove('token--dragging');
    });
}
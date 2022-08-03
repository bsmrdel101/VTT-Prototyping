let gridSize = 20;
let x = 0; 
let y = 0;
let selected = false;
let cells = [];
let tokenDeltaX, tokenDeltaY;


// Waits until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGrid();
});

function setupGrid() {
    document.getElementById('grid').addEventListener("contextmenu", e => e.preventDefault());
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
            
            // Add cell to cells array
            cells.push(newCell);
        }
        y++;
    }
}

function selectCell(e) {
    if (e.target.classList.contains('grid__cell--empty')) {
        addToken(e.target, 'token--medium', 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg');
    } 
}

function addToken(cell, size, image) {
    cell.classList.remove('grid__cell--empty');
    // Add token
    // TODO: make object constructor and class for token
    const token = cell.appendChild(document.createElement('img'));
    token.setAttribute('src', image);
    token.classList.add('token');
    token.classList.add(size);

    // Add event listeners
    token.addEventListener("dragstart", (e) => {
        e.target.classList.add('token--dragging');
    });
    token.addEventListener("dragend", (e) => {
        e.target.classList.remove('token--dragging');
    });
    token.addEventListener('mousedown',(e) => {
        switch (e.which) {
            case 3:
                console.log('delete');
                break;
            default:
                break;
        }
    });
    token.addEventListener('mouseup',(e) => {
        switch (e.which) {
            case 1:
                selectToken(e.target);
                break;
            default:
                break;
        }
    });
    token.addEventListener('wheel', (e) => {
        if (selected) {
            document.querySelector('.grid-container').classList.add('grid-container--no-scroll');
            if (e.wheelDeltaY < 0) {
                // Scale up token
                if (cell.getAttribute('x') > 0) {
                    upscaleToken(token);
                } else {
                    if (token.classList.contains('token--medium')) {
                        tokenDeltaX = 1;
                        tokenDeltaY = 1;
                    } else if (token.classList.contains('token--large')) {
                        tokenDeltaX = 2;
                        tokenDeltaY = 2;
                    }

                    const selectedCell = findCell(parseInt(cell.getAttribute('x')) + tokenDeltaX, parseInt(cell.getAttribute('y')) + tokenDeltaY);
                    console.log(selectedCell);
                }
            } else {
                // Scale down token
                descaleToken(token);
            }
        }
    });
}

function selectToken(token) {
    if (selected) {
        token.classList.remove('token--selected');
        selected = false;
        document.querySelector('.grid-container').classList.remove('grid-container--no-scroll');
    } else {
        token.classList.add('token--selected');
        selected = true;
    }
}

function upscaleToken(token) {
    if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--large');
    }
}

function descaleToken(token) {
    if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--medium');
    }
}

// Will find and return a cell with the parameters given
function findCell(x, y) {
    for (const cell of cells) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
}
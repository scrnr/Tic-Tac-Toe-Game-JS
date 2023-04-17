const gameField = document.querySelector('.game');
const btnStart = document.querySelector('.btn');
const screenOne = document.querySelector('.screen');
const topRow = document.querySelector('.top-row');
const finalBlock = document.querySelector('.final-block');
const repeatBtn = document.querySelector('.repeat-btn');
const finalBlockText = document.querySelector('.final-text');

let currentPlayer = document.querySelector('.current-player');
let scoreCrossField = document.querySelector('.score-cross');
let scoreZeroField = document.querySelector('.score-zero');

let scoreCross = 0;
let scoreZero = 0;
let gameCell;
let isX = true;

btnStart.onclick = startGame;

repeatBtn.onclick = repeatGame;

function startGame() {
    // Creating the field game
    for (let i = 1; i <= 9; i++) {
        let gameItem = document.createElement('div');
        gameItem.classList.add('game-item');
        gameField.append(gameItem);
    }
    // save all cells
    gameCell = gameField.children;

    screenOne.classList.add('top');

    processGame();
}

function processGame() {
    for (const cell of gameCell) {
        // check out is X or O
        cell.onclick = function() {
            cell.classList.add('click');
            if (isX) {
                cell.dataset.elem = 'x';
                cell.textContent = 'X';
                isX = false;
                currentPlayer.textContent = 'O Turn';
            } else {
                cell.dataset.elem = 'o';
                cell.textContent = 'O';
                isX = true;
                currentPlayer.textContent = 'X Turn';
            }

            const checked = checkWin();

            if (Array.isArray(checked)) {
                topRow.classList.add('hide');
                gameCell[checked[1]].classList.add(checked[0]);
                gameCell[checked[1]].classList.add('shown');

                if (checked[2] === 'X') {
                    finalBlockText.textContent = 'X Winner!';
                    scoreCross++;
                    scoreCrossField.textContent = scoreCross;
                } else {
                    finalBlockText.textContent = 'O Winner!';
                    scoreZero++;
                    scoreZeroField.textContent = scoreZero;
                }
                finalBlock.classList.add('view');
            } else if (checked === 'draw') {
                finalBlockText.textContent = 'Draw';
                finalBlock.classList.add('view');
            }
        }
    }
}

function checkWin() {
    let quantityX = 0;
    let quantityO = 0;
    let quantityDraw = 0;

    const arrayCheck = [
        // horizontal cells
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // vertical cells
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // diagonal cells
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < arrayCheck.length; i++) {
        let direction = null;

        // choice of direction
        if (i > 2 && i < 6) {
            direction = 'vertical';
        } else if (i === 6) {
            direction = 'down';
        } else if (i === 7) {
            direction = 'up';
        }
        // check out cells. If there is a winner, then returns
        // [direction, middle cell, how is winner]
        for (const index of arrayCheck[i]) {
            if (gameCell[index].dataset.elem === 'o') {
                quantityO++;
            } else if (gameCell[index].dataset.elem === 'x') {
                quantityX++;
            }
        }

        if (quantityO === 3) {
            return [direction, arrayCheck[i][1], 'O'];
        } else if (quantityX === 3) {
            return [direction, arrayCheck[i][1], 'X'];
        }

        quantityO = 0;
        quantityX = 0;
    }
    // if there is not a winner, then check out for a draw
    for (const cell of gameCell) {
        if (cell.dataset.elem) {
            quantityDraw++;
        }
    }

    if (quantityDraw === 9) {
        return 'draw';
    }
}

function repeatGame() {
    // check out the first player
    if (scoreCross > scoreZero) {
        currentPlayer.textContent = 'O Turn';
        isX = false;
    } else if (scoreCross < scoreZero) {
        currentPlayer.textContent = 'X Turn';
        isX = true;
    }
    // clear the field game
    for (const cell of gameCell) {
        cell.textContent = '';
        cell.removeAttribute('data-elem');
        cell.removeAttribute('class');
        cell.classList.add('game-item');
    }
    // hidden the final block
    finalBlock.classList.remove('view');
    topRow.classList.remove('hide');
}

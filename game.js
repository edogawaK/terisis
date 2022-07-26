const canvas = document.querySelector('canvas');
canvas.width = BROAD_WIDTH;
canvas.height = BROAD_HEIGHT;
const ctx = canvas.getContext('2d');

const coreArea = document.querySelector('.game__core');
const soundOver = document.querySelector('.sound__over');
const soundPlay = document.querySelector('.sound__play');

const button = document.querySelector('.game__button');
button.onclick = () => { play() };

let gameMatrix = [];

let core = 0;

let gameLoop;

let over=false;

let rotating = false;

let block = {
    currentshape: 0,
    shape: 0,
    style: 0,
    x: 18,
    y: 0
}

function renderMatrix(){
    for (let i = 0; i < rows; i++) {
        gameMatrix[i] = [];
        for (let j = 0; j < cols; j++) {
            gameMatrix[i][j] = 0;
        }
    }
}

function handleCore() {
    let count = 0;
    for (let i = 0; i < rows; i++) {
        count = 0;
        for (let j = 0; j < cols; j++) {
            count += gameMatrix[i][j];
        }
        if (count == cols) {
            core++;
            coreArea.innerHTML = core;
            gameMatrix.splice(i, 1);
            gameMatrix.unshift(Array(cols).fill(0));
        }
    }
}

function checkOver() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (gameMatrix[i][j] == 1) {
                if (i == 0) {
                    return true;
                }
                return false;
            }
        }
    }
    return false;
}

function update() {
    let shape = blockShapes[block.shape][block.currentshape];
    for (let i = shape.length - 1; i >= 0; i--) {
        for (let j = shape[i].length - 1; j >= 0; j--) {
            if ((block.y - i) >= 0 && (block.x + j) < cols) {
                gameMatrix[block.y - i][block.x + j] += shape[i][j];
            }
        }
    }
    renderBlock();
}

function move() {
    if (!over) {
        if (!rotating) {
            let shape = blockShapes[block.shape][block.currentshape];
            let ready = check(block.x, block.y + 1, shape);
            if (ready) {
                update();
            }
            else {
                block.y++;
                if (block.y == (rows - 1)) {
                    update();
                }
            }
        }
        handleCore();
    }
}

function handleOver() {
    clearInterval(gameLoop);
    soundOver.play();
    soundPlay.pause();
    alert('lose');
}

function game() {
    over=checkOver();
    if(over){
        handleOver();
    }
    else{
        ctx.clearRect(0, 0, BROAD_WIDTH, BROAD_HEIGHT);
        drawBroad();
        drawBlock();
        window.requestAnimationFrame(game);
    }
}

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        left();
    }
    if (e.keyCode == 39) {
        right();
    }
    if (e.keyCode == 32) {
        rotate();
    }
})

function play() {
    soundPlay.play();
    core=0;
    coreArea.innerHTML=core;
    over=false;
    renderMatrix();
    gameLoop=setInterval(move, speed);
    window.requestAnimationFrame(game);
}
drawBroad();
function drawBlock() {
    ctx.fillStyle = blockStyles[block.style];
    let shape = blockShapes[block.shape][block.currentshape];
    for (let i = shape.length - 1; i >= 0; i--) {
        for (let j = shape[i].length - 1; j >= 0; j--) {
            if (shape[i][j]) {
                ctx.fillRect(block.x * BLOCK_WIDTH + j * BLOCK_WIDTH, block.y * BLOCK_WIDTH - i * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
                ctx.strokeRect(block.x * BLOCK_WIDTH + j * BLOCK_WIDTH, block.y * BLOCK_WIDTH - i * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
            }
        }
    }
}

function rotate() {
    rotating = true;
    let next = block.currentshape + 1;
    if (next >= 4) {
        next = 0;
    }
    let shape = blockShapes[block.shape][next];
    if (!check(block.x, block.y, shape)) {
        block.currentshape = next;
        console.log('rotate');
    }
    else {
        console.log('can not roatte');
    }
    rotating = false;
}

function check(x, y, shape) {
    for (let i = shape.length - 1; i >= 0; i--) {
        for (let j = shape[i].length - 1; j >= 0; j--) {
            if ((y - i) >= 0 && (x + j) < cols) {
                if (gameMatrix[y - i][x + j] + shape[i][j] > 1) {
                    return true;
                }
            }
        }
    }
    return false;
}

function left() {
    let shape = blockShapes[block.shape][block.currentshape];
    let ready = check(block.x - 1, block.y, shape);
    if ((block.x > 0) && !ready) {
        block.x--;
    }
}

function right() {
    let shape = blockShapes[block.shape][block.currentshape];
    let ready = check(block.x + 1, block.y, shape);
    if ((block.x + shape[0].length < cols) && !ready) {
        block.x++;
    }
}

function renderBlock() {
    block.y = 0;
    block.shape = Math.floor(Math.random() * (blockShapes.length));
    block.currentshape = 0;
    block.x = Math.floor(Math.random() * (cols - (blockShapes[block.shape][0].length)));
    console.log('render', block)
}
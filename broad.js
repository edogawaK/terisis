function drawCol() {
    for (let i = 1; i < cols; i++) {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = RC_STYLE;
        ctx.moveTo(i * BLOCK_WIDTH, 0);
        ctx.lineTo(i * BLOCK_WIDTH, BROAD_HEIGHT);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawRow() {
    for (let i = 1; i < rows; i++) {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = RC_STYLE;
        ctx.moveTo(0, i * BLOCK_WIDTH);
        ctx.lineTo(BROAD_WIDTH, i * BLOCK_WIDTH);
        ctx.stroke();
        ctx.closePath();
    }
}

function drawMatrix(){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (gameMatrix[i][j]) {
                ctx.fillStyle = "#876445";
                ctx.fillRect(j * BLOCK_WIDTH, i * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
                ctx.strokeRect(j * BLOCK_WIDTH, i * BLOCK_WIDTH, BLOCK_WIDTH, BLOCK_WIDTH);
            }
        }
    }
}

function drawBroad() {
    ctx.fillStyle = BROAD_STYLE;
    ctx.fillRect(0, 0, BROAD_WIDTH, BROAD_HEIGHT);
    drawCol();
    drawRow();
    drawMatrix();
}
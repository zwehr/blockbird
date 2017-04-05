var canvas;
var canvasContext;

var score = 0;

var birdY = 300;
var wallX = 380;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //re-draw every 10 ms
    setInterval(drawAll, 10);
}
        
function drawAll() {
    //draw initial shapes
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(wallX, 0, 20, 200);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(wallX, 400, 20, 250);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(120, birdY, 20, 20);
    canvasContext.fillStyle = 'green';
    canvasContext.font = '24px serif';
    canvasContext.fillText('Score: ' + score, 10, 30);
    
    //move bird down and wall left at all times
    birdY += 2;
    wallX--;
    
    //reset wall
    if (wallX == -20) {
        wallX = 380;
    }
    
    //increment score if bird passes wall
    if (wallX == 100) {
        score++;
    }
}

//make bird "jump" with click
document.onclick = function() {
    birdY -= 100;
}
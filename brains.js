var canvas;
var canvasContext;

var isPaused = false;

var score = 0;

var birdY = 300;
var wallX = 380;

var topWallY = 0;
var bottomWallY = 400;

var wallWidth = 20;
var birdWidthAndHeight = 20;

var topWallHeight = 200;
var bottomWallHeight = 200;

var birdFallRate = 3;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    //move objects and re-draw every 20 ms
        setInterval(function() {
            if (!isPaused) {
            drawAll();
            moveAll();
            checkForCollision();
        }}, 20);
}
        
function drawAll() {
    //draw initial shapes
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(wallX, topWallY, wallWidth, topWallHeight);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(wallX, bottomWallY, wallWidth, bottomWallHeight);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(120, birdY, birdWidthAndHeight, birdWidthAndHeight);
    canvasContext.fillStyle = 'green';
    canvasContext.font = '24px serif';
    canvasContext.fillText('Score: ' + score, 10, 30);
    
    if (checkForCollision()) {
        console.log("collision");
        isPaused = true;
    }
}

function moveAll() {
    //make bird "jump" with click or Up key
    document.onclick = function() {
        birdY -= 100;
        birdFallRate = 3;
    }
    
    //move bird down and wall left at all times
    birdY += birdFallRate;
    wallX--;
    birdFallRate += .1;
    
    //reset wall
    if (wallX < -20) {
        wallX = 380;
    }
    
    //increment score if bird passes wall
    if (wallX == 100) {
        score++;
    }
}

function checkForCollision() {
    //check to make sure bird is between top and bottom wall
    while (wallX < 140 && wallX > 100) {
        if (birdY < (topWallY + topWallHeight) || birdY > bottomWallY - birdWidthAndHeight ) {
            return true;
        } else {
            return false;
        }
    }
    
    //check to make sure bird is above bottom of canvas
    if (birdY > canvas.height - birdWidthAndHeight) {
        return true;
    } else 
        return false;
    
}
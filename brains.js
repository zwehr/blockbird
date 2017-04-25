var canvas;
var canvasContext;

var gamePaused = false;
var firstGameStarted = false;

var currentScore = 0;
var highScore = 0;

var birdX = 120;
var birdY = 200;
var wallX = 380;

var topWallY = -250;
var bottomWallY = 350;

var wallWidth = 20;
var birdWidthAndHeight = 20;

var wallHeight = 450;

var birdFallRate = 3;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    runGame();
}

function runGame() {
    setInterval(function() {
        if (!gamePaused) {
            drawAll();
            if (!firstGameStarted) {
                gamePaused = true;
            }
            moveAll();
    }}, 20);
}
        
function drawAll() {
    //draw initial shapes
    canvasContext.fillStyle = '#87cefa';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = '#79c000';
    canvasContext.fillRect(wallX, topWallY, wallWidth, wallHeight);
    canvasContext.fillStyle = '#79c000';
    canvasContext.fillRect(wallX, bottomWallY, wallWidth, wallHeight);
    canvasContext.fillStyle = '#fd684a';
    canvasContext.fillRect(birdX, birdY, birdWidthAndHeight, birdWidthAndHeight);
    canvasContext.fillStyle = '#000043';
    canvasContext.font = '20px Arial';
    canvasContext.fillText('Score: ' + currentScore, 20, 20);
    canvasContext.font = '20px Arial';
    canvasContext.fillText('High Score: ' + highScore, 20, 40);
    
    if (checkForCollision()) {
        console.log("collision");
        gamePaused = true;
    }
}

function moveAll() {
    document.onclick = function() {
        console.log("click");
        
        if (gamePaused) {
            resetGame();
            gamePaused = false;
            firstGameStarted = true;
        } 
        else {
            birdY -= 100;
            birdFallRate = 3;
        }
    }
    
    //move bird down and wall left at all times
    birdY += birdFallRate;
    wallX -= 4;
    birdFallRate += .2;
    
    //reset wall
    if (wallX < -20) {
        createNewWalls();
        wallX = 400;
    }
    
    //increment score if bird passes wall, and 
    if (wallX == 100) {
        currentScore++;
        if (currentScore > highScore) {
            highScore = currentScore;
        }
    }
}

function resetGame() {
    currentScore = 0;
    birdX = 120;
    birdY = 200;
    wallX = 400;
    wallWidth = 20;
    birdWidthAndHeight = 20;
    topWallY = -250;
    bottomWallY = 350;
    birdFallRate = 3;
}

function checkForCollision() {
    //check to make sure bird is between top and bottom wall
    while (wallX < 140 && wallX > 100) {
        if (birdY < (topWallY + wallHeight) || birdY > bottomWallY - birdWidthAndHeight ) {
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

function createNewWalls() {
    topWallY = Math.floor(Math.random()*450) - 450;
    bottomWallY = topWallY + 600;
}
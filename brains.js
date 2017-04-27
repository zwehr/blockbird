var canvas;
var canvasContext;

var gamePaused = false;
var firstGameStarted = false;

var currentScore = 0;
var highScore = 0;

var birdY = 200;
var wallX = 380;
var topWallY = -250;
var bottomWallY = 350;

var WALL_WIDTH = 20;
var WALL_HEIGHT = 450;
var BIRD_WIDTH_HEIGHT = 20;

var birdFallRate = 3;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    runGame();
}

// draw and re-draw everything (every 18 ms), based on if game has started or player has died
function runGame() {
    setInterval(function() {
        if (!gamePaused) {
            drawAll();
            if (!firstGameStarted) {
                gamePaused = true;
            }
            moveAll();
        }
    }, 18);
}
        
function drawAll() {
    canvasContext.fillStyle = '#87cefa';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = '#79c000';
    canvasContext.fillRect(wallX, topWallY, WALL_WIDTH, WALL_HEIGHT);
    canvasContext.fillStyle = '#79c000';
    canvasContext.fillRect(wallX, bottomWallY, WALL_WIDTH, WALL_HEIGHT);
    canvasContext.fillStyle = '#fd684a';
    canvasContext.fillRect(120, birdY, BIRD_WIDTH_HEIGHT, BIRD_WIDTH_HEIGHT);
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
    // click starts game or resets game if player has died, otherwise moves bird up
    document.onclick = function() {
        if (gamePaused) {
            resetGame();
            gamePaused = false;
            firstGameStarted = true;
        } 
        else {
            birdY -= 130;
            birdFallRate = 3;
        }
    }
    
    // move bird down and wall left at all times
    birdY += birdFallRate;
    wallX -= 4;
    birdFallRate += .3;
    
    // reset wall
    if (wallX < -20) {
        createNewWalls();
        wallX = 400;
    }
    
    // increment score if bird passes wall, and set highScore if necessary
    if (wallX == 100) {
        currentScore++;
        if (currentScore > highScore) {
            highScore = currentScore;
        }
    }
}

function resetGame() {
    currentScore = 0;
    birdY = 200;
    wallX = 400;
    topWallY = -250;
    bottomWallY = 350;
    birdFallRate = 3;
}

function checkForCollision() {
    //check to make sure bird is between top and bottom wall
    while (wallX < 140 && wallX > 100) {
        if (birdY < (topWallY + WALL_HEIGHT) || birdY > bottomWallY - BIRD_WIDTH_HEIGHT) {
            return true;
        } else {
            return false;
        }
    }
    
    //check to make sure bird is above bottom of canvas
    if (birdY > canvas.height - BIRD_WIDTH_HEIGHT) {
        return true;
    } else 
        return false;
}

// create random y-coordinate for top wall, and place bottom wall 600 below
function createNewWalls() {
    topWallY = Math.floor(Math.random()*450) - 450;
    bottomWallY = topWallY + 600;
}
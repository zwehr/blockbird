var canvas;
var canvasContext;

window.onload = function() {
    console.log("Hello!");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    drawAll();
}
        
function drawAll() {
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(380, 0, 20, 200);
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(380, 400, 20, 250);
    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(120, 300, 20, 20);
    canvasContext.fillStyle = 'green';
    canvasContext.font = '24px serif';
    canvasContext.fillText('Score:', 10, 30);
}
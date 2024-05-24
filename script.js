// Initialize canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up game variables
const grid = 20;
const snake = {
    x: grid * 10,
    y: grid * 10,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
const apple = {
    x: Math.floor(Math.random() * 20) * grid,
    y: Math.floor(Math.random() * 20) * grid
};

// Main game loop
function main() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawApple();

    // Check for collisions
    if (checkCollision()) {
        resetGame();
    }

    // Repeat
    requestAnimationFrame(main);
}

// Event listener for keyboard input
document.addEventListener('keydown', function(event) {
    // Arrow keys
    if (event.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    } else if (event.which === 38 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = -grid;
    } else if (event.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    } else if (event.which === 40 && snake.dy === 0) {
        snake.dx = 0;
        snake.dy = grid;
    }
});

// Function to clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move the snake
function moveSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    } else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    } else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // Add new cell to snake's head
    snake.cells.unshift({ x: snake.x, y: snake.y });

    // Remove cells as snake moves
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
}

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = '#00ff00';
    snake.cells.forEach(function(cell) {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    });
}

// Function to draw the apple
function drawApple() {
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
}

// Function to check for collisions
function checkCollision() {
    // Check collision with apple
    if (snake.x === apple.x && snake.y === apple.y) {
        snake.maxCells++;
        apple.x = Math.floor(Math.random() * 20) * grid;
        apple.y = Math.floor(Math.random() * 20) * grid;
    }

    // Check collision with snake's own body
    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.x === snake.cells[i].x && snake.y === snake.cells[i].y) {
            return true;
        }
    }

    return false;
}

// Function to reset the game
function resetGame() {
    snake.x = grid * 10;
    snake.y = grid * 10;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = Math.floor(Math.random() * 20) * grid;
    apple.y = Math.floor(Math.random() * 20) * grid;
}
// Main game loop with specified frame rate


// Define a variable to track whether the game is over
let gameOver = false;

// Main game loop
function main() {
    if (!gameOver) {
        setTimeout(function() {
            clearCanvas();
            moveSnake();
            drawSnake();
            drawApple();

            // Check for collisions
            if (checkCollision()) {
                gameOver = true; // Set game over flag
                drawGameOver();
                return; // Stop the game loop
            }

            // Repeat
            main();
        }, 1000 / 10); // Adjust the speed by changing the interval (e.g., 1000 / 10 for 10 frames per second)
    }
}
// Function to draw the "Game Over" message
function drawGameOver() {
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    overlay.style.display = 'flex'; // Show overlay
}

// Event listener for the "Try Again" button
tryAgainBtn.addEventListener('click', function() {
    overlay.style.display = 'none'; // Hide overlay
    resetGame();
    gameOver = false; // Reset game over flag
    main(); // Restart the game
});

// Start the game
main();

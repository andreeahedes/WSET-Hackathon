let lastRenderTime = 0;
const gameBoard = document.getElementById('game-board');

let gameOver = false;



const main = (currentTime) => {
    if(gameOver){
        alert("GAME OVER. Your score is: " + counter);
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime)/1000;
    if(secondsSinceLastRender < SNAKE_SPEED){
        return;
    }
    lastRenderTime = currentTime;
    update();
    draw();
}

window.requestAnimationFrame(main);

const update = () => {
    gameOver = isGameOver();
    updateSnake();
    updateFood();
}

const draw = () => {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}
// Game setup, Snake, Respond to Inputs, Food, Snake eat food, Snake die
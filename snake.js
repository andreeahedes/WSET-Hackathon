const SNAKE_SPEED = 1 / 5;
const snakeBody = [

    { x: 11, y: 11 },
    { x: 11, y: 10 },
    { x: 11, y: 9 },

];

const updateSnake = () => {
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        //this stores the previous value to the next value

        snakeBody[i + 1] = {...snakeBody[i] };
    }
    //now we need to move the head
    const snakeDirection = getInputDirection();
    snakeBody[0].x += snakeDirection.x;
    snakeBody[0].y += snakeDirection.y;
}

const drawSnake = (gameBoard) => {
    for (let i = 0; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake");
        gameBoard.appendChild(snakeElement);
    }
}

const equalPositions = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

const onSnake = (foodPosition) => {
    for (let i = 0; i < snakeBody.length; i++) {
        if (equalPositions(snakeBody[i], foodPosition)) {
            return true;
        }
    }
    return false;
}

/*const onSnake = (foodPosition) => {
    snakeBody.forEach(snakePosition => {
        if(equalPositions(snakePosition,foodPosition)){
            return true;
        }
    })
    return false;
}*/
const expandSnake = (amount) => {
    for (let i = 0; i < amount; i++) {
        snakeBody.push({...snakeBody[snakeBody.length - 1] });
    }
}



const isSnakeOutOfBounds = () => {
    return isOutOfBounds(snakeBody[0]);
}

const isSnakeIntersecSelf = () => {
    let snakeHead = snakeBody[0];
    for (let i = 1; i < snakeBody.length; i++) {
        if (equalPositions(snakeBody[i], snakeHead)) {
            return true;
        }
    }
    return false;
}

const isGameOver = () => {
    return isSnakeOutOfBounds() || isSnakeIntersecSelf();
}
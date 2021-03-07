let foodPosition = { x: getRandomInt(GRID_SIZE), y: getRandomInt(GRID_SIZE) };
const EXPANSION_RATE = 1;
let counter = 0;



const getRandomFoodPosition = () => {
    let newFoodPosition = randomGridPosition();
    while (onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}

const updateFood = () => {
    if (onSnake(foodPosition)) {
        counter += 1;
        expandSnake(EXPANSION_RATE);
        foodPosition = getRandomFoodPosition();
    }
}
const drawFood = (gameBoard) => {
    const foodElement = document.createElement("div");
    //foodElement.style.backgroundImage = url('flower.png')
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);

}
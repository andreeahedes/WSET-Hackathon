const GRID_SIZE = 21;

function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)) + 1);
}

const randomGridPosition = () => {
    let position = {x:getRandomInt(GRID_SIZE),y:getRandomInt(GRID_SIZE)};
    return position;
}

const isOutOfBounds = (position) => {
    return position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE;
}

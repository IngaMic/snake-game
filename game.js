//Arrow keys
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_RIGHT = "ArrowRight";
const ARROW_LEFT = "ArrowLeft";

//Directions
const UP = "Up";
const RIGHT = "Right";
const DOWN = "Down";
const LEFT = "Left";
//

// size of square tiles of canvas in pixels
const SQUARE_SIZE = 15;

// Informations about the game status
const game = {
    status: "playing",
    score: 0,
    lives: 3,
    speed: 100,
};

const boardWidth = 40;
const boardHeight = 30;
const boardColor = "#010d14";

const snake = {
    head: { x: boardWidth / 2, y: boardHeight / 2 },
    positionX: boardWidth / 2,
    positionY: boardHeight / 2,
    bodyColor: "#135b7c",
    headColor: "orange",
    bodyLength: 3,
    hasEaten: false,
    direction: RIGHT,
    body: [
        { x: boardWidth / 2, y: boardHeight / 2 },
        { x: boardWidth / 2 - 1, y: boardHeight / 2 },
        { x: boardWidth / 2 - 2, y: boardHeight / 2 },
    ],
};

const fruit = {
    position: {
        x: getRandomNumber(0, boardWidth - 1),
        y: getRandomNumber(0, boardHeight - 1),
    },
    color: "purple",
};
//
// Functions
//

function resetSnake() {
    snake.head = { x: boardWidth / 2, y: boardHeight / 2 };
    snake.direction = RIGHT;
    snake.bodyLength = 3;
    snake.body = [
        { x: boardWidth / 2, y: boardHeight / 2 },
        { x: boardWidth / 2 - 1, y: boardHeight / 2 },
        { x: boardWidth / 2 - 2, y: boardHeight / 2 },
    ];
}

function snakeMovement() {
    //console.log("rom snakeMovement");
    if (snake.direction === LEFT) {
        //console.log("rom snakeMovement LEFT head.x", snake.head.x);
        if (snake.head.x === 0) {
            snake.head.x = boardWidth - 1;
        } else {
            snake.head.x = snake.head.x - 1;
        }
    } else if (snake.direction === RIGHT) {
        //console.log("rom snakeMovement RIGHT", snake.head.x);
        if (snake.head.x === boardWidth - 1) {
            snake.head.x = 0;
        } else {
            snake.head.x = snake.head.x + 1;
        }
    } else if (snake.direction === UP) {
        if (snake.head.y === 0) {
            snake.head.y = boardHeight - 1;
        } else {
            snake.head.y = snake.head.y - 1;
        }
    } else if (snake.direction === DOWN) {
        if (snake.head.y === boardHeight - 1) {
            snake.head.y = 0;
        } else {
            snake.head.y = snake.head.y + 1;
        }
    }
    snakeBodyMovement(snake.body, snake.bodyLength, snake.head, snake.hasEaten);
    snake.hasEaten = false;
}

function eatFruit() {
    if (
        snake.head.x === fruit.position.x &&
        snake.head.y === fruit.position.y
    ) {
        snake.hasEaten = true;
        snake.bodyLength = snake.bodyLength + 1;
        game.score = game.score + 1;
        fruit.position.x = getRandomNumber(0, boardWidth - 1);
        fruit.position.y = getRandomNumber(0, boardHeight - 1);
    }
}

function loop() {
    //console.log("fromLoop");
    if (game.status === "playing") {
        eatFruit();
        snakeMovement();
    }
}

function draw() {
    //console.log("from draw");
    drawBoard(boardWidth, boardHeight, "black");

    drawSnakeBody(snake.body, snake.bodyColor, snake.bodyLength);
    drawSquare(snake.head.x, snake.head.y, "orange");
    drawSquare(fruit.position.x, fruit.position.y, fruit.color);
    drawScore(game.score);
    drawLives(game.lives);
}

function onKeyDown(keyCode) {
    //console.log("keyCode", keyCode);

    if (keyCode === "ArrowLeft" && snake.direction != RIGHT) {
        snake.direction = LEFT;
        // var f = document.querySelector(".front");
        // var m = document.querySelector(".middle");
        // console.log("front.style", f.style.top);
        // f.style.marginTop += 15 + "px";
        // m.style.left += 10 + "px";
    } else if (keyCode === "ArrowRight" && snake.direction != LEFT) {
        snake.direction = RIGHT;
    } else if (keyCode === "ArrowUp" && snake.direction != DOWN) {
        snake.direction = UP;
    } else if (keyCode === "ArrowDown" && snake.direction != UP) {
        snake.direction = DOWN;
    }
}

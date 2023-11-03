//!               <-------Variables------->
// let gameBoard = document.querySelector('#gameBoard');
let inputDirection = { x: 0, y: 0 };
const gameOverSound = new Audio("gameover.mp3");
const eatingSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3");
let gameScore = document.querySelector(".score");
let HighScore = document.querySelector(".highScore");
let speed = 0.08;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
  {
    x: Math.round(0 + (32 - 0) * Math.random()),
    y: Math.round(0 + (32 - 0) * Math.random()),
  },
];
let food = {
  x: Math.round(0 + (32 - 0) * Math.random()),
  y: Math.round(0 + (32 - 0) * Math.random()),
};

//!               <-----main function-------->

main = (cTime) => {
  requestAnimationFrame(main);
  if ((cTime - lastPaintTime) / 900 < speed) return;
  lastPaintTime = cTime;

  gameEngine();
};

isCollide = (sarr) => {
  //! if head touch body
  for (let i = 1; i < snakeArr.length; i++) {
    if (sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y) {
      return true;
    }
  }
  //! if head touch wall
  if (sarr[0].x > 32 || sarr[0].x < 0 || sarr[0].y > 32 || sarr[0].y < 0) {
    return true;
  }
};

gameEngine = () => {
  //! gameover logic
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDirection = { x: 0, y: 0 };
    alert("press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
    gameScore.innerText = `score:0`;
    food = {
        x: Math.round(0 + (32 - 0) * Math.random()),
        y: Math.round(0 + (32 - 0) * Math.random()),
      };
  }
  //! when snake eat food
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    eatingSound.play();
    ++score;
    if (score > highScoreVal) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      HighScore.innerHTML = "Highest Score:" + highScoreVal;
    }
    gameScore.innerText = `score:${score}`;
    let a = 0;
    let b = 32;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDirection.x,
      y: snakeArr[0].y + inputDirection.y,
    });
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }
  //! moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDirection.x;
  snakeArr[0].y += inputDirection.y;

  gameBoard.innerHTML = "";

  //! displaying snake

  snakeArr.forEach((e, index) => {
    snakeElem = document.createElement("div");
    snakeElem.style.gridRowStart = e.y;
    snakeElem.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElem.classList.add("snakeHead");
    } else {
      snakeElem.classList.add("snakeBody");
    }
    gameBoard.appendChild(snakeElem);
  });

  //! displaying food

  foodElem = document.createElement("div");
  foodElem.style.gridRowStart = food.y;
  foodElem.style.gridColumnStart = food.x;
  foodElem.classList.add("snakeFood");
  gameBoard.appendChild(foodElem);
};
//!                     <---- main logic ------->

let highScore = localStorage.getItem("highScore");
if (highScore === null) {
  var highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  HighScore.innerHTML = "Highest Score:" + highScore;
}

window.addEventListener("keydown", (e) => {
  if (
    e.key === "ArrowUp" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft"
  ) {
    inputDirection = { x: 0, y: 1 }; //* game started
    moveSound.play();
    switch (e.key) {
      case "ArrowUp":
        inputDirection.x = 0;
        inputDirection.y = -1;
        break;

      case "ArrowDown":
        inputDirection.x = 0;
        inputDirection.y = 1;
        break;

      case "ArrowRight":
        inputDirection.x = 1;
        inputDirection.y = 0;
        break;

      case "ArrowLeft":
        inputDirection.x = -1;
        inputDirection.y = 0;
        break;

      default:
        console.log("wrong key");
    }
  }
});
//!                     <---- calling function ----->
main();
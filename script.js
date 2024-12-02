//Game constants

let inputDir = { x: 0, y: 0 };
const moveSound = new Audio("move.mp3");
const gameOverSound = new Audio("game over.mp3");
const foodSound = new Audio("food.mp3");
const bgm = new Audio("music.mp3");
bgm.volume = 0.3;
let lastPaintTime = 0;
let speed = 15;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 17, y: 11 };
let score=0;
let hiscoreval=0;

//Game functions
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  //console.log(ctime);
  gameEngine();
}



function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    bgm.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again");
    snakeArr = [{ x: 13, y: 15 }];
    bgm.play();
    score = 0;
    document.getElementById("score").innerHTML="SCORE:"+score;
  }
  

  //if eaten the food, increment score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play()
    score+=1;
    document.getElementById("score").innerHTML="SCORE:"+score;

    //elongating snake
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random(0)),
      y: Math.round(a + (b - a) * Math.random(0)),
    };
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //DISPLAYING SNAKE
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //displaying food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

//main logic starts
bgm.play()
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 0 };
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      moveSound.play();
      inputDir.y = -1;
      inputDir.x = 0;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      moveSound.play();
      inputDir.y = 1;
      inputDir.x = 0;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      moveSound.play();
      inputDir.y = 0;
      inputDir.x = -1;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      moveSound.play();
      inputDir.y = 0;
      inputDir.x = 1;
      break;
    default:
      break;
  }
});

function isCollide(sarr) {
  //when snake collides with wall
  if (sarr[0].x >= 18 || sarr[0].x <=0 || sarr[0].y >= 18 || sarr[0].y <= 0) {
    return true;
  }

  //when snake collides with itself
  for (let i = 1; i < sarr.length; i += 1) {
    if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y) {
      return true;
    }
  }
  return false;
}



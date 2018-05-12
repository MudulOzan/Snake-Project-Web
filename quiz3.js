/*
 * Known bugs:
 * Don't know why but sometimes it does not eat the apple.
 */
window.addEventListener("load", function(event) {
  var T = {}
  var mainDiv = document.getElementById("mainDiv");
  var coordLeft = 500;
  var coordTop = 500;
  var apple;
  var snake = [];
  var game = [];
  const LEFT=37;
  const UP=38;
  const RIGHT=39;
  const DOWN=40;
  var SPEED = 200;
  var DIRECTION = 0;
  const minY = 1;
  const maxY = 60;
  const minX = 36;
  const maxX = 95;
  var SCORE = 0;
  var fixTimer = setInterval(move, SPEED);
  function doItForTheSnake() {
    for (var i = 0; i < 6; i++) {
      snake[i] = document.createElement("DIV");
      snake[i].style.position = "absolute";
      snake[i].style.border = "1px solid black";
      snake[i].style.backgroundColor = "black";
      snake[i].style.height = "10px";
      snake[i].style.width = "10px";
      mainDiv.appendChild(snake[i]);
      snake[i].style.left = coordLeft + "px";
      snake[i].style.top = coordTop + "px";
      coordLeft += 10;
    }
  }
  
  function createApple() {
    var row = (Math.floor(Math.random() * (maxY - minY + 1)) + minY) * 10;
    var col = (Math.floor(Math.random() * (maxX - minX + 1)) + minX) * 10;

    apple = document.createElement("DIV");
    apple.style.width = "10px";
    apple.style.height = "10px";
    apple.style.position = "absolute";
    apple.style.border = "1px solid black";
    apple.style.backgroundColor = "red";
    apple.style.left = col + "px";
    apple.style.top = row + "px";
    mainDiv.appendChild(apple);
  }
  
  function move(){   
    var coordLeft = parseInt(snake[0].style.left);
    var coordTop = parseInt(snake[0].style.top);
    if(DIRECTION == 0){
      snake[0].style.left = (coordLeft-10) + "px";
      isLeft();
      followMyLead(coordLeft, coordTop);
      eatIt();
      fixTimer;
      biteMySelf();
    }
    else if(DIRECTION == 1){
      snake[0].style.top = (coordTop-10) + "px";
      isTop();
      followMyLead(coordLeft, coordTop);
      eatIt();
      fixTimer;
      biteMySelf();
    }
    else if(DIRECTION == 2){
      snake[0].style.left = (coordLeft+10) + "px";
      isRight();
      followMyLead(coordLeft, coordTop);
      eatIt();
      fixTimer;
      biteMySelf();
       
    }
    else if(DIRECTION == 3){
      snake[0].style.top = (coordTop+10) +"px";
      isBottom();
      followMyLead(coordLeft, coordTop);
      eatIt();
      fixTimer;
      biteMySelf();
    }
  }
  document.addEventListener("keyup",
    function (key) {
     if(key.which == LEFT && DIRECTION != 2 && DIRECTION != 0){
       DIRECTION = 0;
       move();
     }
     else if(key.which == UP && DIRECTION != 3 && DIRECTION != 1){
        DIRECTION = 1;
        move();
      }
     else if(key.which == RIGHT && DIRECTION != 0 && DIRECTION != 2){
       DIRECTION = 2;
       move();
     }
     else if(key.which == DOWN && DIRECTION != 1 && DIRECTION != 3) {
       DIRECTION = 3;
       move();
     }
  
  });
  function biteMySelf() {
    var snakeLeft = parseInt(snake[0].style.left) + "px";
    var snakeTop = parseInt(snake[0].style.top) + "px";
    for (var i = 1; i < snake.length; i++) {
      if (snakeLeft == snake[i].style.left && snakeTop == snake[i].style.top) {
        clearInterval(fixTimer);
        var gameOver = document.getElementById("gameOver");
        var button = document.getElementById("start");
        gameOver.style.opacity = 1;
        button.disabled = false;
        button.style.opacity = 1;
      }
    }
  } 
  
  function followMyLead(coordLeft, coordTop) {
    for (var i = snake.length-1; i > 1; i--) {
      snake[i].style.left = snake[i-1].style.left;
      snake[i].style.top = snake[i-1].style.top;
    }
    snake[1].style.left = coordLeft + "px";
    snake[1].style.top = coordTop + "px";
  }
  
  function isLeft() {
    var coordLeft = parseInt(snake[0].style.left);
    if(coordLeft == 350) snake[0].style.left = 950 + "px";
  }
  function isRight() {
    var coordLeft = parseInt(snake[0].style.left);
    if(coordLeft == 960) snake[0].style.left = 360 + "px";
  }
  function isBottom() {
    var coordTop = parseInt(snake[0].style.top);
    if(coordTop == 610) snake[0].style.top = 10 + "px";
  }
  function isTop() {
    var coordTop = parseInt(snake[0].style.top);
    if(coordTop == 0) snake[0].style.top = 600 + "px";
  }
  
  function eatIt() {
    var snakeLeft = parseInt(snake[1].style.left);
    var snakeTop = parseInt(snake[1].style.top);
    var appleTop = parseInt(apple.style.top);
    var appleLeft = parseInt(apple.style.left);
    if(snakeLeft == appleLeft && snakeTop == appleTop) {
      mainDiv.removeChild(apple);
      createApple();
      snake.push(document.createElement("DIV"));
      snake[snake.length-1].style.position = "absolute";
      snake[snake.length-1].style.border = "1px solid black";
      snake[snake.length-1].style.backgroundColor = "black";
      snake[snake.length-1].style.width = "10px";
      snake[snake.length-1].style.height = "10px";
      mainDiv.appendChild(snake[snake.length-1]);
      snake[snake.length-1].style.left = "-50px";
      snake[snake.length-1].style.top = "-50px";     
      SCORE += 10;
      var sc = document.getElementById("score").innerHTML = "Score: " + SCORE;
    }
  }

  document.getElementById("start").addEventListener("click", disable);

  function disable() {
      var button = document.getElementById("start");
      button.disabled = true;
      button.style.opacity = 0;
      doItForTheSnake();
      createApple();
      move();
  }
});
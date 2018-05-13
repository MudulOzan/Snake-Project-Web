/*
 * Known bugs:
 * Don't know why but sometimes it does not eat the apple.
 */



window.addEventListener("load", function(event) {
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }  
    this.muted = function(){
        this.sound.muted();
    }   
    this.loop = function(){
        this.sound.loop();
    }
    
    
  }
  var myMusic, mySound, fin, achievment1, achievment2;
  
  function startGame() {
    achievment1 = new sound("sounds/achievment1.wav");
    achievment2 = new sound("sounds/achievment2.wav");
    mySound = new sound("sounds/eat.wav");
    myMusic = new sound("sounds/game.mp3");
    fin = new sound("sounds/gameover.wav");
    myMusic.play();
    myMusic.loop();
  }

  startGame(); 
  
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
  var SPEED = 150;
  var DIRECTION = 0;
  const minY = 1;
  const maxY = 60;
  const minX = 36;
  const maxX = 95;
  var parts = 6;
  var SCORE = 0;
  
  function timer() {
    setInterval(move, SPEED);
  }
  
  function doItForTheSnake() {
    for (var i = 0; i < 6; i++) {
      snake[i] = document.createElement("DIV");
      snake[i].setAttribute("class", "snake");
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

    apple = document.createElement("IMG");
    apple.setAttribute("class", "snake");
    apple.style.width = "10px";
    apple.style.height = "10px";
    apple.style.position = "absolute";
    apple.src = "images/apple.png";
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
      biteMySelf();
    }
    else if(DIRECTION == 1){
      snake[0].style.top = (coordTop-10) + "px";
      isTop();
      followMyLead(coordLeft, coordTop);
      eatIt();
      biteMySelf();
    }
    else if(DIRECTION == 2){
      snake[0].style.left = (coordLeft+10) + "px";
      isRight();
      followMyLead(coordLeft, coordTop);
      eatIt();
      biteMySelf();
       
    }
    else if(DIRECTION == 3){
      snake[0].style.top = (coordTop+10) +"px";
      isBottom();
      followMyLead(coordLeft, coordTop);
      eatIt();
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
    var del = 0;
    var snakeLeft = parseInt(snake[0].style.left) + "px";
    var snakeTop = parseInt(snake[0].style.top) + "px";
    for (var i = 1; i < snake.length; i++) {
      if (snakeLeft == snake[i].style.left && snakeTop == snake[i].style.top) {
        clearInterval(timer());
        var gameOver = document.getElementById("gameOver");
        var button = document.getElementById("start");
        button.setAttribute("class", "button");
        gameOver.style.opacity = 1;
        button.disabled = false;
        button.style.opacity = 1;
        del = 1;
        myMusic.muted();
        myMusic.play();
        fin.play();
      }
    }
    if (del == 1) {
      deleteDivs();
    }
  } 
  
  function deleteDivs() {
    var mainDiv = document.getElementById("mainDiv");
    for (var i = 0; i < parts; i++) {
      mainDiv.removeChild(snake[i]);
    }
    mainDiv.removeChild(apple);
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
      snake[snake.length-1].setAttribute("class", "apple");
      snake[snake.length-1].style.position = "absolute";
      snake[snake.length-1].style.border = "1px solid black";
      snake[snake.length-1].style.backgroundColor = "black";
      snake[snake.length-1].style.width = "10px";
      snake[snake.length-1].style.height = "10px";
      mainDiv.appendChild(snake[snake.length-1]);
      snake[snake.length-1].style.left = "-50px";
      snake[snake.length-1].style.top = "-50px";     
      SCORE += 10;
      parts++;
      if (sound == 1) mySound.play();
      
      if (SCORE == 100) achievment1.play();
      else if (SCORE == 250) achievment2.play();
      var sc = document.getElementById("score").innerHTML = "Score: " + SCORE;
    }
  }

  document.getElementById("start").addEventListener("click", disable);

  function disable() {
      var button = document.getElementById("start");
      button.disabled = true;
      button.setAttribute("class", "none");
      button.style.opacity = 0;
      doItForTheSnake();
      createApple();
      timer();
      mySound.play();
  }
  
  var sElement = document.getElementById("sound");
  sElement.addEventListener("click", muteSound);
  var mElement = document.getElementById("music");
  mElement.addEventListener("click", muteMusic);
  
  var sound = 1;
  var music = 1;
  
  function muteSound(){
    if (sound == 1) { sound = 0; sElement.src = "images/mute.png"; }
    else { sound = 1; sElement.src = "images/unmute.png";  }
  }
  function muteMusic() {
    if (music == 1) { myMusic.stop(); music = 0; mElement.src = "images/mute.png";  }
    else { myMusic.play(); music = 1; mElement.src = "images/unmute.png";  }
  }

});
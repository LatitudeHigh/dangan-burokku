// ~~ keyBinds ~~
// left = LEFT
// right = RIGHT
// shoot = SPACE

var mode = "equal";
var pause = false;
var song = new Audio("music.mp3");
var oof = new Audio("lol_ded.mp3");
var homeScreen = 1;
var restart;
var player;
var FALL;
var RADIUS = 10;
var box1;
var box2;
var BOX_SIZE;
var direction = 0;
var color;
var boxX;
var bullet1;
var BULLET_SIZE = 10;
var shotFired = 0;
var dead;
var score = 0;
var answer;
var UI_SIZE = 100;
var UI;
var num;
var txt;
var txt2;
var txt3;
var TEXT_OFF_SET = 10;
var fraction1;
var fraction2;
var topNum1;
var topNum2;
var middleNum1;
var middleNum2;
var bottomNum1;
var bottomNum2;
var goal = 5;
var side = 1;
var level = 1;
var gameOver;
var songLoad = 1;
var FONT_SIZE;
function start(){
  FONT_SIZE = getWidth()/60;
  setTimer(giveInstructions, 20);
  mouseClickMethod(setUp);
}

function giveInstructions(){
  var intro = new WebImage("https://codehs.com/uploads/183c8284322e3de9d29169bf69bf587c");
  intro.setSize(getWidth(), getHeight());
  intro.setPosition(0,0);
  add(intro);
  txt = new Text("click to start", FONT_SIZE*2+"pt Arial");
  txt.setPosition(getWidth() - txt.getWidth(), getHeight()/2);
  txt.setColor(Color.cyan);
  add(txt);
}

function setUp(){
  if(homeScreen == 1){
    stopTimer(giveInstructions);
    homeScreen = 0;
    BOX_SIZE = getWidth()/15;
    FALL = BOX_SIZE/15; 
    var background = new WebImage("https://codehs.com/uploads/46239d407269305eb3eeff62f3c8b323");
    background.setPosition(0,0);
    background.setSize(getWidth(),getHeight()*1.3);
    add(background)
    song.load();
    fraction1 = Randomizer.nextInt(1,10);
    fraction2 = Randomizer.nextInt(1,10);
    makeUI();
    // creates all boxes
    initBoxes();
    //changes box position and color
    newBox(box1);
    newBox(box2);
    //set up keybinds
    keyDownMethod(keyDown);
    keyUpMethod(keyUp);
    //creates player with radius RADIUS
    player = new WebImage("https://codehs.com/uploads/9dc9a090d521d8afff50048f5c7923a4");
    player.setSize(BOX_SIZE,BOX_SIZE);
    player.setPosition(getWidth()/2-BOX_SIZE, getHeight()/8*7);
    player.setColor(Color.blue);
    add(player);
    // creates bullets
    initBullets();
    //starts game loop
    setTimer(game, 20);
  }
}

function makeUI(){
    //creates the ui
    UI = new Rectangle(UI_SIZE, getHeight());
    UI.setColor(Color.black);
    UI.setPosition(getWidth()-UI_SIZE,0);
    add(UI);
    //makes the "score" header
    var txt1 = new Text("score:", FONT_SIZE + "pt Arial");
    txt1.setPosition(getWidth()-UI_SIZE+TEXT_OFF_SET, getHeight()*0.0625);
    txt1.setColor(Color.white);
    add(txt1);
    //creates the actual score on screen
    txt2 = new Text(score, FONT_SIZE+"pt Arial");
    txt2.setPosition(getWidth()-UI_SIZE+TEXT_OFF_SET, getHeight()*0.125);
    txt2.setColor(Color.white);
    add(txt2);
    
    //makes the fraction
    txt3 = new Text(fraction1 + "/"+ fraction2, FONT_SIZE+"pt Arial");
    txt3.setPosition(getWidth()-UI_SIZE+TEXT_OFF_SET, getHeight()/2);
    txt3.setColor(Color.white);
    add(txt3);
    
    //shows the target amount of points you want
    var txt4 = new Text("goal:", FONT_SIZE+"pt Arial");
    txt4.setPosition(getWidth()-UI_SIZE+TEXT_OFF_SET, getHeight()-getHeight()*0.125);
    txt4.setColor(Color.white);
    add(txt4);
    var txt5 = new Text(goal, FONT_SIZE+"pt Arial");
    txt5.setPosition(getWidth()-UI_SIZE+TEXT_OFF_SET, getHeight()-getHeight()*0.0625);
    txt5.setColor(Color.white);
    add(txt5);
    
}

function initBullets(){
    //creates bullet1 to be brought back later
    bullet1 = new WebImage("https://codehs.com/uploads/4aeb4fc5e68ee1d5530692ad87b81f3f");
    bullet1.setSize(BOX_SIZE, BOX_SIZE);
    bullet1.setPosition(-1000,-1000);
    add(bullet1);
}

function initBoxes(){
    // creates all boxes so they can be moved later
    box1 = new WebImage("https://codehs.com/uploads/46106fbdc812ccf8a2ae6c08d4233200");
    box2 = new WebImage("https://codehs.com/uploads/46106fbdc812ccf8a2ae6c08d4233200");
    box1.setSize(BOX_SIZE, BOX_SIZE);
    box2.setSize(BOX_SIZE, BOX_SIZE)
    box1.setPosition(1000,1000);
    box2.setPosition(1000,1000);
    add(box1);
    add(box2);
    var multiplier = Randomizer.nextInt(2,4);
    var fakeFraction1 =Randomizer.nextInt(0,9);
    var fakeFraction2 = Randomizer.nextInt(0,9);
    if(fraction1 - fakeFraction1 < 0){
      fakeFraction1 = fakeFraction1*-1;
    }
    if(fraction2 - fakeFraction2 < 0){
      fakeFraction2 = fakeFraction2*-1;
    }
    //creates an equivalent fraction
    topNum1 = new Text(fraction1 * multiplier, FONT_SIZE+"pt Arial");
    topNum1.setPosition(box1.getX()+BOX_SIZE/2-7.5, box1.getY()+BOX_SIZE/3);
    topNum1.setColor(Color.cyan);
    add(topNum1);
    middleNum1 = new Text("-", FONT_SIZE+"pt Arial");
    middleNum1.setPosition(box1.getX()+BOX_SIZE/2-7.5, box1.getY()+BOX_SIZE/3*2);
    middleNum1.setColor(Color.cyan);
    add(middleNum1);
    bottomNum1 = new Text(fraction2*multiplier, FONT_SIZE+"pt Arial");
    bottomNum1.setPosition(box1.getX()+BOX_SIZE/2-7.5, box1.getY()+BOX_SIZE);
    bottomNum1.setColor(Color.cyan);
    add(bottomNum1);
    //creates a non-equivalent fraction
    topNum2 = new Text(fraction1 -fakeFraction1, FONT_SIZE+"pt Arial");
    topNum2.setPosition(box2.getX()+BOX_SIZE/2-7.5, box2.getY()+BOX_SIZE/3);
    topNum2.setColor(Color.cyan);
    add(topNum2);
    middleNum2 = new Text("-", FONT_SIZE+"pt Arial");
    middleNum2.setPosition(box2.getX()+BOX_SIZE/2-7.5, box2.getY()+BOX_SIZE/2);
    middleNum2.setColor(Color.cyan);
    add(middleNum2);
    bottomNum2 = new Text(fraction2 - fakeFraction2, FONT_SIZE+"pt Arial");
    bottomNum2.setPosition(box2.getX()+BOX_SIZE/2-7.5, box2.getY()+BOX_SIZE);
    bottomNum2.setColor(Color.cyan);
    add(bottomNum2);
}

function newBox(spawn){
    //creates a fake fraction and a multiplier to get an equivalent fraction to the one on the left
    var fakeFraction1 = Randomizer.nextInt(1,9);
    var fakeFraction2 = Randomizer.nextInt(1,9);
    var multiplier = Randomizer.nextInt(1,5);
    //sets the box position to "boxX"
    if(spawn == box1){
        if(side == 1){
            boxX = Randomizer.nextInt((getWidth()-BOX_SIZE-UI_SIZE)/2, getWidth()-BOX_SIZE*2-UI_SIZE);
        }else if(side == 0){
            boxX = Randomizer.nextInt(0,(getWidth()-BOX_SIZE*2-UI_SIZE)/2);
        }
        spawn.setPosition(boxX, 0- BOX_SIZE*2);
        // makes the real fraction
        topNum1.setText(fraction1 * multiplier);
        bottomNum1.setText(fraction2 * multiplier);
        topNum1.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/3);
        middleNum1.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/3*2);
        bottomNum1.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/5*4);
    }
    if(spawn == box2){
        if(side == 0){
            boxX = Randomizer.nextInt((getWidth()-BOX_SIZE-UI_SIZE)/2, getWidth()-BOX_SIZE*2-UI_SIZE);
        }else if(side == 1){
            boxX = Randomizer.nextInt(0,(getWidth()-BOX_SIZE*2-UI_SIZE)/2);
        }
        spawn.setPosition(boxX, 0- BOX_SIZE*2);
        //makes the fake fraction
      if(fraction1*multiplier - fakeFraction1 < 0){
        fakeFraction1 = fakeFraction1*-1;
      }
      if(fraction2*multiplier - fakeFraction2 < 0){
        fakeFraction2 = fakeFraction2*-1;
      }
      if(fraction1*multiplier - fakeFraction1 == 0){
        fakeFraction1 = fakeFraction1*2;
      }
      if(fraction2*multiplier - fakeFraction2 == 0){
        fakeFraction2 = fakeFraction2*2;
      }
        topNum2.setText(fraction1 * multiplier - fakeFraction1);
        bottomNum2.setText(fraction2 * multiplier - fakeFraction2);
        topNum2.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/3);
        middleNum2.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/3*2);
        bottomNum2.setPosition(spawn.getX()+BOX_SIZE/2-7.5, spawn.getY()+BOX_SIZE/5*4);
    }
    boxX = 0;
}

function game(){
  if(pause == false){
    if(mode == "equal"){
      loadSong();
      updateUI();
      if(player.getX() < getWidth()-BOX_SIZE-UI_SIZE && direction == 1){
          //while direction = 1 player moves right unless it would hit the UI
          player.move(FALL*2,0);
      }
      if(player.getX() > 0 && direction == 2){
          //while direction = 2 player moves left unless it would hit a wall 
          player.move(-FALL*2,0);
      }
      if(box1.getY() > getHeight()){
          //when box gets off screen teleport it up
          newBox(box1);
      }
      if(box2.getY() > getHeight()){
          //when box gets off screen teleport it up
          newBox(box2);
      }
      //makes boxes FALL
      box1.move(0,FALL);
      box2.move(0,FALL);
      fractionFALL(topNum1, middleNum1, bottomNum1);
      fractionFALL(topNum2, middleNum2, bottomNum2);
      // when a shot is fired make bullet move up
      if(shotFired > 0){
          bullet1.move(0,-FALL * 3);
      }
      //collision for both boxes 
      if(collision(box1, "box", player, "box") != null){
          dead = 1;
      }else if(collision(box2, "box", player, "box") != null){
          dead = 1;
      }
      if(collision(bullet1, "box", box2, "box") != null){
        var hit = 2;
      }else if (collision(bullet1, "box", box1, "box") != null){
        var hit = 1;
      }
      if(hit == 1){
        hit = 0;
        score++;
        shotFired = 0;
        side = Randomizer.nextInt(0,1);
        newBox(box1);
        newBox(box2);
        bullet1.setPosition(-1000,-1000);
      }else if(hit == 2){
        hit = 0;
        score-=2;
        shotFired = 0;
        side = Randomizer.nextInt(0,1);
        newBox(box1);
        newBox(box2);
        bullet1.setPosition(-1000,- 1000);
      }
      //if bullet goes off screen let you shoot again
      returnShots();
      // if score is equal to the target score win game
      if(score == goal){
          dead = 0;
      }
      //if score becomes negative end game
      if(score < 0){
          dead = 1;
      }
      if(dead == 1){
          stopTimer(game);
          // if you hit a box set screen to black
          gameOver = new WebImage("https://codehs.com/uploads/6e303381508704a95ba88ae1c4cd3fb0");
          gameOver.setSize(getWidth(),getHeight());
          gameOver.setPosition(0,0);
          add(gameOver);
          //creates the game over text
          txt = new Text("Enter to restart", FONT_SIZE*2+"pt Arial");
          txt.setPosition(getWidth()/2-BOX_SIZE*2, getHeight()/2);
          txt.setColor(Color.white);
          add(txt);
          oof.play()
          level = 1;
          song.pause();
      }
      if (dead == 0){
          stopTimer(game);
          // if you goal set screen to green
          gameOver = new Rectangle(getWidth(), getHeight());
          gameOver.setColor(Color.green);
          gameOver.setPosition(0,0);
          add(gameOver);
          //creates the game completion text
          txt = new Text("Level "+ level + " complete!", FONT_SIZE+"pt Arial");
          txt.setPosition(getWidth()/4, getHeight()/7);
          txt.setColor(Color.black);
          add(txt);
          txt2 = new Text("Enter to continue", FONT_SIZE*2+"pt Arial");
          txt2.setPosition(getWidth()/2-BOX_SIZE*2, getHeight()/2);
          txt2.setColor(Color.black);
          add(txt2);
          level++;
          FALL+=0.5;
          song.pause();
      }
    }else if (mode == "larger"){
      console.log("test");
    }
  }
}    

function loadSong(){
  song.play();
  song.loop = true;
}

function fractionFALL(top,middle,bottom){
    //makes all parts of a fraction FALL
    top.move(0,FALL);
    middle.move(0,FALL);
    bottom.move(0,FALL);
}

function updateUI(){
    //updates the UI score
    txt2.setText(score);
}

function returnShots(){
    //when the bullet goes off-screen return the abilty to shoot
    if(bullet1.getY() + BOX_SIZE< 0){
        shotFired = 0;
    }
}

function keyUp(e){
    if (e.keyCode == Keyboard.LEFT && direction == 2) {
        //when the left key is released AND player is not moving right the player will cease to move
	    direction = 0;
	}else if (e.keyCode == Keyboard.RIGHT && direction == 1) {
        //when the right key is released AND player is not moving left the player will cease to move
        direction = 0;
	}
}
// for furture referance the way to call this function is: 
//             collision( name of object1, "shape of object1 in quotes", name of object2, "shape of object2 in quotes")
// accepted shapes are "box", "bullet", and "circle"
function collision(object1,object1Shape,object2,object2Shape){
    //if the shapes are a box and a circle check if they are touching
    if(object1Shape == "box" && object2Shape == "circle"){
        if(object2.getX() - object2.getRadius() >= object1.getX() && object2.getX() - object2.getRadius() <= object1.getX()+BOX_SIZE && object2.getY() - object2.getRadius() >= object1.getY() && object2.getY() - object2.getRadius() <= object1.getY()+BOX_SIZE){
            return 1;
        }else if(object2.getY() - object2.getRadius() >= object1.getY() && object2.getY() - object2.getRadius() <= object1.getY()+BOX_SIZE && object2.getX() + object2.getRadius() >= object1.getX() && object2.getX() + object2.getRadius() <= object1.getX()+BOX_SIZE){
            return 1;
        }else if(object2.getX() - object2.getRadius() >= object1.getX() && object2.getX() - object2.getRadius() <= object1.getX()+BOX_SIZE && object2.getY() + object2.getRadius() >= object1.getY() && object2.getY() - object2.getRadius() <= object1.getY()+BOX_SIZE){
            return 1;
        }else if(object2.getY() + object2.getRadius() >= object1.getY() && object2.getY() - object2.getRadius() <= object1.getY()+BOX_SIZE && object2.getX() + object2.getRadius() >= object1.getX() && object2.getX() + object2.getRadius() <= object1.getX()+BOX_SIZE){
            return 1;
        }
    }
    //if the shapes are a box and a circle check if they are touching 
    if(object2Shape == "box" && object1Shape == "circle"){
        if(object1.getX() - object1.getRadius() >= object2.getX() && object1.getX() - object1.getRadius() <= object2.getX()+BOX_SIZE && object1.getY() - object1.getRadius() >= object2.getY() && object1.getY() - object1.getRadius() <= object2.getY()+BOX_SIZE){
            return 1;
        }else if(object1.getY() - object1.getRadius() >= object2.getY() && object1.getY() - object1.getRadius() <= object2.getY()+BOX_SIZE && object1.getX() + object1.getRadius() >= object2.getX() && object1.getX() + object1.getRadius() <= object2.getX()+BOX_SIZE){
            return 1;
        }else if(object1.getX() - object1.getRadius() >= object2.getX() && object1.getX() - object1.getRadius() <= object2.getX()+BOX_SIZE && object1.getY() + object1.getRadius() >= object2.getY() && object1.getY() - object1.getRadius() <= object2.getY()+BOX_SIZE){
            return 1;
        }else if(object1.getY() + object1.getRadius() >= object2.getY() && object1.getY() - object1.getRadius() <= object2.getY()+BOX_SIZE && object1.getX() + object1.getRadius() >= object2.getX() && object1.getX() + object1.getRadius() <= object2.getX()+BOX_SIZE){
            return 1;
        }
    }
    if(object1Shape == "box" && object2Shape == "box"){
      if(object1.getX() >= object2.getX() && object1.getX() <= object2.getX()+BOX_SIZE && object1.getY() <= object2.getY() + BOX_SIZE && object1.getY() >= object2.getY()){
        return 1;
      }else if(object1.getX()+BOX_SIZE <= object2.getX()+BOX_SIZE && object1.getX()+BOX_SIZE >= object2.getX() && object1.getY() <= object2.getY() + BOX_SIZE && object1.getY() >= object2.getY()){
         return 1;
      }
      
    }
}

function shoot(){
    if(shotFired == 0){
        //moves the bullet into the canvas
        bullet1.setPosition(player.getX(),player.getY());
        //makes it so the game knows a bullet was shot 
        shotFired = 1;
    }
}

function keyDown(e) {
	if (e.keyCode == Keyboard.LEFT) {
	    //if left is pressed the player will move left
	    direction = 2;
	}else if (e.keyCode == Keyboard.RIGHT) {
	    // if right is pressed player will move right
        direction = 1;
	}
	if(e.keyCode == Keyboard.SPACE){
	    //if the space bar is pressed the game will make a bullet
	    shoot();
	}
  if(e.keyCode == 27){ 
    if(pause == false){
      pause = true;
    }else if(pause == true){
    pause = false;
    }
  }
  if(e.keyCode == Keyboard.ENTER){
    if(dead == 1 || dead == 0){
      dead = 2;
      stopTimer(game);
      remove(txt3);
      if(dead !== null){
        remove(txt);
        remove(gameOver);
      }
      song.play();
      remove(player);
      remove(box1);
      remove(box2);
      remove(topNum1);
      remove(topNum2);
      remove(middleNum1);
      remove(middleNum2);
      remove(bottomNum1);
      remove(bottomNum2);
      remove(restart);
      remove(bullet1);
      direction = 0;
      BULLET_SIZE = 10;
      shotFired = 0;
      dead = 2;
      score = 0;
      TEXT_OFF_SET = 10;
      goal = level*5;
      side = 1;
      fraction1 = Randomizer.nextInt(1,10);
      fraction2 = Randomizer.nextInt(1,10);
      makeUI();
      // creates all boxes
      initBoxes();
      //changes box position and color
      newBox(box1);
      newBox(box2);
      add(player);
      // creates bullets
      initBullets();
      homeScreen = 1;
      setUp();
    }
  }
}
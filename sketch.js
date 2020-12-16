var mario,marioImage,marioCollided;
var ground , groundImage;
var invisibleGround , invisibleGroundImage;
var bricks,bricksImage,bricksGroup;
var obstacles,obstaclesImage,obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var Score=0;
var gameOver, gameOverImage;
var restart ,restartImage;
var jumpSound,dieSound,checkpointSound;
function preload (){
  marioImage=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  groundImage=loadImage("bg.png");
  invisibleGroundImage=loadImage("ground2.png");
  bricksImage=loadImage("brick.png");
  obstaclesImage=loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png","obstacle4.png");
  marioCollided=loadImage("collided.png");
  gameOverImage=loadImage("gameOver.png");
    restartImage=loadImage("restart.png");
  jumpSound=loadSound("jump.mp3");
  dieSound=loadSound("die.mp3");
  checkpointSound=loadSound("checkPoint.mp3");
  
}


function setup(){
  createCanvas(600,360);
  //creating ground
  ground=createSprite(300,170,10,10);
  ground.addImage("groundimg",groundImage);
 
  //invisble ground
   invisibleGround=createSprite(50,340,600,10);
  invisibleGround.addImage("move",invisibleGroundImage);
  invisibleGround.velocityX=-5;
  
  
  
  //creating mario
  mario=createSprite(50,265,10,10);
  mario.addAnimation("mariorunning",marioImage);
  mario.addAnimation("mariocollided",marioCollided);
  mario.scale=1.5;

  gameOver = createSprite(300,100);
  gameOver.addImage("gameend",gameOverImage);
  gameOver.scale=0.7;
  gameOver.visible=false;
  
  restart = createSprite(300,140);
  restart.addImage("restarting",restartImage);
  restart.scale=0.7;
  restart.visible=false;
  
  
  
  bricksGroup=new Group();
  obstaclesGroup=new Group();
  
  
}

function draw(){
  background("white");
  
  if (gameState===PLAY){
    spawnBricks();
    spawnObstacles();
  if(invisibleGround.x<0){
    invisibleGround.x=invisibleGround.width/2;
  }
  if(keyDown("space")&&mario.y>=180){
    mario.velocityY=-10
    jumpSound.play();
  }
  mario.velocityY=mario.velocityY+1;
    
    
    
    if(obstaclesGroup.isTouching(mario)){
        gameState = END;
      dieSound.play();
    }
  
    
    
    
  }
  else if (gameState === END) {
     gameOver.visible = true;
    restart.visible = true;
    invisibleGround.velocityX = 0;
    mario.velocityY = 0;
    bricksGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    
    mario.changeAnimation("mariocollided",marioCollided);
    
    obstaclesGroup.setLifetimeEach(-1);
    bricksGroup.setLifetimeEach(-1);
    
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    
    
  }
  
  
  
  
  
  
  
  
  mario.collide(invisibleGround);
  
  drawSprites();
  fill("black");
  textSize(16);
  text("SCORE : "+Score,500,60)
}


function spawnBricks(){
  if(frameCount % 60 === 0){
  
    bricks = createSprite(600,150,40,10);
    bricks.addImage("brickimg",bricksImage);
    bricks.scale=1.2;
    bricks.y = Math.round(random(120,150));
    bricks.velocityX = -3;
    
    bricks.depth = mario.depth;
    mario.depth = mario.depth + 1;
    
    bricks.lifetime=300;
    
    bricksGroup.add(bricks);
    
    for(i=0;i<bricksGroup.length;i++){
      
      if(mario.isTouching(bricksGroup.get(i))){
        Score=Score+1;
        checkpointSound.play();
        bricksGroup.get(i).destroy();
      }
    }
    
    
    
 
  }
  
}

function spawnObstacles(){
  if(frameCount % 200 === 0){
  obstacles= createSprite(600,274,20,20);
  obstacles.addAnimation("obstacleimage",obstaclesImage);
    obstacles.velocityX=-3
    obstacles.lifetime=300;
    obstaclesGroup.add(obstacles);
    
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bricksGroup.destroyEach();
  
  mario.changeAnimation("mariorunning",marioImage);
  Score = 0;
  
}






var bananaImage, banana, obstacle_img, player, player_running, stone;
var obstaclesGroup, foodGroup;
var background, backImage, score, invisibleGround;

function preload(){
  backImage = loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png");
}

function setup(){
  createCanvas(800,400);
  
  background = createSprite(200,200);
  background.addImage("setting",backImage);
  background.velocityX = -4;
  background.x = background.width /2;
  
  player = createSprite(50,330,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.2;
  
  invisibleGround = createSprite(200,400,800,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  foodGroup = new Group();
  
  stroke("white");
  textSize(20);
  fill("white");
  score = 0;
}

function draw(){
  if(background.x < 300){
    background.x = background.width/2;
  }
  
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score = score+2;
  }
  
  switch(score){
    case 10: player.scale = 0.12;
        break;
    case 20: player.scale = 0.14;
        break;
    case 30: player.scale = 0.16;
        break;
    case 40: player.scale = 0.18;
        break;
    default: break;
  }
  
  if(obstaclesGroup.isTouching(player)){
     player.scale = 0.2;
  }
  
  if(keyDown("space") && player.y >= 330){
    player.velocityY = -17 ;
  }
  
  player.velocityY = player.velocityY + 0.8;
  
  food();
  obstacles();
  
  player.collide(invisibleGround);
  
  drawSprites();
  
  text("Score: "+ score, 500,50);
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(800,320,40,10);
    banana.y = random(80,120);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    banana.scale = 0.05;
    
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    var stone = createSprite(800,350,10,40);
    stone.addImage(obstacle_img);
    stone.velocityX = -6;
  
    stone.lifetime = 300;
    stone.scale = 0.15;
  
    obstaclesGroup.add(stone);
  }
}
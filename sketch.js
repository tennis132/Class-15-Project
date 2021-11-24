var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var bombimg;
var coinimg;
var energyDrinkImg;
var treasuregroup;
var bombgroup;
var energydrinkgroup;
var gamestate = "play";
var score = 0;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  bombimg = loadImage("bomb.png")
  coinimg = loadImage("coin.png")
  energyDrinkImg = loadImage("energyDrink.png")
}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2

//creating boy running
boy = createSprite(180,340,30,30);
boy.scale=0.08;
boy.addAnimation("JakeRunning",boyImg);
  

leftBoundary=createSprite(0,0,100,800);

// leftBoundary.invisible = false;
// leftBoundary.visible = true;
// leftBoundary.invisible = true;
leftBoundary.visible = false;


rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;

treasuregroup = new Group ()
bombgroup = new Group ()
energydrinkgroup = new Group ()
}

function draw() {
  background(0);
  drawSprites();
  text("score = " + score, 50, 80)
  if(gamestate=="play")
  {
    path.velocityY = 4;
    boy.x = World.mouseX;
    if(path.y > 400 ){
      path.y = height/2;
    }
    bomb()
  coin()
  energyDrink()
  if(treasuregroup.isTouching(boy))
  {
score = score + 10
treasuregroup.destroyEach()
  }

  if(energydrinkgroup.isTouching(boy))
  {
score = score + 5
energydrinkgroup.destroyEach()
  }

  if(bombgroup.isTouching(boy))
  {
gamestate = "end"
  }
  }

  if(gamestate=="end")
  {
path.velocityY = 0
boy.destroy()
treasuregroup.destroyEach()
energydrinkgroup.destroyEach()
bombgroup.destroyEach()
text ("Game Over", 200,200)
  }

 
  
  
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //code to reset the background

  

  
  

}

function bomb()
{
  if(frameCount%80==0)
  {
    var bomb = createSprite(random(0, 400), 0)
    bomb.velocityY = 4
    bomb.addImage("bomb", bombimg)
    bomb.scale = 0.1
    bomb.depth = boy.depth
    boy.depth = boy.depth + 1
    bombgroup.add(bomb)
  }
}

function coin()
{
  if(frameCount%100==0)
  {
    var coin = createSprite(random(20, 350), 0)
    coin.velocityY = 4
    coin.addImage("coin", coinimg)
    coin.scale = 0.5
    coin.depth = boy.depth
    boy.depth = boy.depth + 1
    treasuregroup.add(coin)
  }
}

function energyDrink()
{
  if(frameCount%120==0)
  {
    var energyDrink = createSprite(random(50,380), 0)
    energyDrink.velocityY = 4
    energyDrink.addImage("energy_drink", energyDrinkImg)
    energyDrink.scale = 0.15
    energyDrink.depth = boy.depth
    boy.depth = boy.depth + 1
    energydrinkgroup.add(energyDrink)
  }
}






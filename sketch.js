var bg, bgImg
var spaceship, spaceshipImg
var obstacleImg
var gemstoneImg
var gamestate = "play"
var score = 0
var gameOverImg
var restartImg
var dieSound
var restart, gameOver



function preload() {
  bgImg = loadImage("space.png")
  spaceshipImg = loadImage("spaceship.png")
  obstacleImg = loadImage("asteroid.png")
  gemstoneImg = loadImage("gemstone.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  dieSound = loadSound("die.mp3")

}


function setup() {
  createCanvas(windowWidth, windowHeight);


  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg)
  bg.scale = 1.5

  spaceship = createSprite(400, 400, 30, 50);
  spaceship.addImage(spaceshipImg)
  spaceship.scale = 0.3
  spaceship.debug=true

  restart = createSprite(width / 2, height / 2 + 50, 30, 30)
  restart.addImage(restartImg)
  restart.visible = false

  gameOver = createSprite(width / 2, height / 2, 50, 10)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false

  obstaclesGroup = createGroup()
  gemstonesGroup = createGroup()
}

function draw() {
  bg.velocityX = -2
  if (bg.x < 0) {
    bg.x = width / 2
  }

  if (keyDown(RIGHT_ARROW)) {
    spaceship.x = spaceship.x + 2
  }

  if (keyDown(UP_ARROW)) {
    spaceship.y = spaceship.y - 2
  }

  if (keyDown(DOWN_ARROW)) {
    spaceship.y = spaceship.y + 2
  }

  if (gamestate == "end") {
    restart.visible = true
    gameOver.visible = true
    obstaclesGroup.destroyEach()
    gemstonesGroup.destroyEach()
    bg.velocityX = 0
  }

  if (spaceship.isTouching(obstaclesGroup)) {
    gamestate = "end"
  }

  if (spaceship.isTouching(gemstonesGroup)) {
    score = score+ 1;

  }

  console.log(score)

  if (gamestate == "play") {
    spawnObstacles()
    spawnGemstones()
  }

  if(mousePressedOver(restart)){
    reset()
  }

  spaceship.collide(gemstonesGroup,gemstoneHit)

  console.log("working")
  drawSprites();

  textSize(50)
  fill("red")
  text("Score: " + score, 200, 40)


}


function spawnObstacles() {
  if (frameCount % 100 == 0) {
    var obstacle = createSprite(850, random(height / 2 - 50, height / 2 + 80), 20, 50)
    obstacle.velocityX = -2
    obstacle.addImage(obstacleImg)
    obstacle.scale = 0.2
    obstaclesGroup.add(obstacle)


  }
}


function spawnGemstones() {
  if (frameCount % 100 == 0) {
    var gemstone = createSprite(650, random(height / 2 - 50, height / 2 + 80), 20, 50)
    gemstone.velocityX = -2
    gemstone.addImage(gemstoneImg)
    gemstone.scale = 0.2
    console.log(gemstone.velocityX)
    gemstonesGroup.add(gemstone)
  }
}

function reset(){
  restart.visible=false
  gameOver.visible=false
  score=0
  gamestate="play"
  console.log(gamestate)
  
  

}

function gemstoneHit(spaceship,gemstone){
gemstone.remove()
}



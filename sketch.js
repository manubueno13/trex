
var trex ,trex_running;
var edges;
var solo, soloimg
var solo2
var nuvemimg
var c1, c2, c3, c4, c5, c6
var estadodojogo="JOGAR"
var gnuvem, gcactos
var trex_collided 
var gameover, gameoverimg
var restart, restartimg
var somdopulo 
var somcolisao
var somdapontuacao
var pontuacao=0
var velocidade=0
function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
soloimg= loadImage("ground2.png")
nuvemimg=loadImage("cloud.png")
c1=loadImage("obstacle1.png")
c2=loadImage("obstacle2.png")
c3=loadImage("obstacle3.png")
c4=loadImage("obstacle4.png")
c5=loadImage("obstacle5.png")
c6=loadImage("obstacle6.png")
trex_collided=loadAnimation("trex_collided.png")
gameoverimg= loadImage("gameOver.png")
restartimg= loadImage("restart.png")
somdopulo= loadSound("jump.mp3")
somdapontuacao= loadSound("checkPoint.mp3")
somdacolisao= loadSound("die.mp3")
}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;

  edges = createEdgeSprites();
     
  solo = createSprite(300,190,600,20);
  solo.addImage(soloimg)
  solo2= createSprite (300,200,600,10)
  solo2.visible= false 
  gnuvem=new Group ()
  gcactos= new Group ()
  gameover= createSprite(300, 80, 20, 20)
  gameover.addImage(gameoverimg)
  gameover.visible= false 

  restart= createSprite(300, 110, 15,15)
  restart.addImage(restartimg)
  restart.scale= 0.5;
  restart.visible= false
} 

function draw(){
  background("white");
  if(estadodojogo==="JOGAR"){
    if(keyDown("space")&&trex.y>170){
      trex.velocityY = -12;
      somdopulo.play()
    }
    text("Pontuação " +pontuacao,500,15)
    pontuacao=pontuacao+1
    if (pontuacao%100===0){
      somdapontuacao.play()
      velocidade=velocidade+1
    }
    solo.velocityX=-(5+velocidade)
    if (solo.x<0){
      solo.x=300
    }
    gerarnuvem ()
 gerarcacto()
if (trex.isTouching(gcactos)){
  estadodojogo="encerrar"
  somdacolisao.play()
}
  } else if (estadodojogo==="encerrar"){
    solo.velocityX=0
    gcactos.setVelocityXEach(0)
    gnuvem.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    gcactos.setLifetimeEach(-1)
    gnuvem.setLifetimeEach(-1)
    gameover.visible= true
    restart.visible= true 

    if (mousePressedOver(restart)){
      estadodojogo="JOGAR"
      gcactos.destroyEach()
      gnuvem.destroyEach()
      gameover.visible=false
      restart.visible=false
      trex.changeAnimation("running",trex_running)
      pontuacao=0
      
    }
  }
 
  trex.velocityY = trex.velocityY + 0.5; // gravidade

  trex.collide(solo2)


  drawSprites();
 
}
function gerarcacto(){
  if(frameCount%60===0) {
  var cacto= createSprite(600, 176, 15, 40)
  cacto.scale= 0.5
  cacto.velocityX=-(5+velocidade)
  var va= Math.round(random(1, 6))
  cacto.lifetime=210
  gcactos.add(cacto)
  switch(va){
case 1: cacto.addImage(c1)
break
case 2: cacto.addImage(c2)
break
case 3: cacto.addImage(c3)
break
case 4: cacto.addImage(c4)
break
case 5: cacto.addImage(c5)
break
case 6: cacto.addImage(c6)
break
  }
  }
}
function gerarnuvem(){
  if(frameCount%60===0) {
    var nuvem = createSprite(600, 50, 30, 20
      ) 
      nuvem.velocityX= -3
      nuvem.y= Math.round(random(40, 100))
      nuvem.addImage(nuvemimg)
      nuvem.lifetime=215
      gnuvem.add(nuvem)
      nuvem.depth=trex.depth-1
  }
 
}
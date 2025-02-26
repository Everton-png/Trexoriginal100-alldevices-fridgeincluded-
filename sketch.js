var dinex
var dinexrunning
var ground
var groundImage
var chaoinvisivel
var obstaculo
var obstaculoimagem1
var obstaculoimagem2
var  obstaculoimagem3
var obstaculoimagem4
var obstaculoimagem5
var obstaculoimagem6
var grupoobstaculo



var gameoverimagem

var restartimagem

var cactoescolher

var dinexcolidiu

var pontos 

var nuvem

var nuvemimagem

var nuvemgrupo

var restart

var gamestate 

var audio

var gameover

var audiocollide

function preload(){
    dinexrunning = loadAnimation("trex1.png","trex4.png","trex3.png")
    groundImage = loadImage("ground2.png")
    obstaculoimagem1 = loadImage("obstacle1.png")
    obstaculoimagem2 = loadImage("obstacle2.png")
    obstaculoimagem3 = loadImage("obstacle3.png")
    obstaculoimagem4 = loadImage("obstacle4.png")
    obstaculoimagem5 = loadImage("obstacle5.png")
    obstaculoimagem6 = loadImage("obstacle6.png")
    dinexcolidiu = loadImage("trex_collided.png")
    gameoverimagem = loadImage("gameOver.png")
    restartimagem = loadImage("restart.png")
    nuvemimagem = loadImage("cloud.png")
    audiocollide = loadSound("die.mp3")

}

function setup(){
    createCanvas(windowWidth,windowHeight)
    dinex = createSprite(width/600*50,height/200*160,width/600*20,height/200*50)
    dinex.addAnimation("running",dinexrunning)
    dinex.scale = 0.4
    
    ground = createSprite(width/600*200, height/200*190, width/600*400, height/200*20);
    ground.addImage("ground2.png", groundImage);
    ground.x = ground.width / 2;
    
   
    

    
 

    chaoinvisivel = createSprite (width/600*200,height/200*197,width/600*400,height/200*20)
    chaoinvisivel.visible = false

        grupoobstaculo = createGroup();
        nuvemgrupo = createGroup();
        pontos = 0
        
           gamestate = "play"



           restart = createSprite(width/600*300,height/200*140)
           restart .addImage("restart.png", restartimagem)
           restart.scale = 0.5

           gameover = createSprite (width/600*300,height/200*100)
           gameover.addImage("gameOver.png", gameoverimagem)
           gameover.scale = 0.5

          
           dinex.setCollider ("circle", 0,0,20)
}

function draw(){
    background ("#A9A9A9")
    fill("white")
    text("pontos:"+pontos,width/600*500,height/600*50)
    

  
    
  
    //criando gravidade
if (gamestate == "play"){
    play();
}
    

    if (gamestate == "end"){
        end();
    }
    
    drawSprites();








}

function obstaculocriar(){
if (frameCount%60==0)  {
    obstaculo = createSprite (width/600*600,height/600*565,width/600*10,height/600*40)
    obstaculo.velocityX = -4 -((pontos*3)/100)
    obstaculo.scale = 0.4

    cactoescolher= Math.round(random(1,6))
    switch (cactoescolher) {
        case 1:  
        obstaculo.addImage(obstaculoimagem1)
        break ;

        case 2:
            obstaculo.addImage(obstaculoimagem2)
            break;

            case 3:
                obstaculo.addImage(obstaculoimagem3)
                break;

                case 4:
                    obstaculo.addImage(obstaculoimagem4)
                    break;

                    case 5:
                        obstaculo.addImage(obstaculoimagem5)
                        break;

                        case 6:
                            obstaculo.addImage(obstaculoimagem6)
                            break;

                            default:
                                break

        
    }

    obstaculo.scale = 0.5
    obstaculo.lifetime = 300

    grupoobstaculo.add(obstaculo)

}



}



function nuvemcriar(){
if (frameCount%100 ==0){
nuvem = createSprite (width/600*600,random(height/600*80,height/600*120),width/600*40,height/600*10)
nuvem.addImage("cloud.png",nuvemimagem)
nuvem.velocityX = nuvem.velocityX -2 -((pontos*3)/100)
nuvem.scale = random(0.2,0.7)
nuvem.depth = dinex.depth
dinex.depth = dinex.depth +1
nuvem.lifetime = 400
nuvemgrupo.add(nuvem)
}
}


function play(){
restart.visible = false
gameover.visible = false

if (ground.x < 0) {
    ground.x = ground.width / 2;
    }
    ground.velocityX = -4 -((pontos*3)/100)

    pontos = pontos +Math.round(getFrameRate()/60)

    if ((keyDown("w") ||touches.length> 0) && dinex.collide(ground)){

        dinex.velocityY = -8 
        
            }

            dinex.velocityY = dinex.velocityY + 0.5 
    dinex.collide(ground)

    nuvemcriar();
    obstaculocriar();
    if (grupoobstaculo.isTouching(dinex)) {

    
        gamestate = "end";
    }
}


function end(){
gameover.visible = true
restart.visible = true

dinex.changeAnimation("trex_collided.png", dinexcolidiu)
ground.velocityX = 0
dinex.velocityX = 0
dinex.velocityY = 0

nuvemgrupo.setLifetimeEach(-1)
grupoobstaculo.setLifetimeEach(-1)

nuvemgrupo.setVelocityXEach(0)
grupoobstaculo.setVelocityXEach(0)

if   (mousePressedOver(restart)||touches.length> 0  ){
    restart2 ();
}

}


function restart2 (){
    gamestate = "play"
    restart.visible = false
    gameover.visible = false

    grupoobstaculo.destroyEach()
    nuvemgrupo.destroyEach()

    dinex.changeAnimation ("trex1.png,trex4.png,trex3.png", dinexrunning)

    pontos = 0

}

function touchStarted() {
    return false;}
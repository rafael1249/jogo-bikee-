var caminho,imgCaminho;
var jogador1,jogador2,jogador3;
var imgCaminho,img1CiclistaPrincipal,img2CiclistaPrincipal;
var ciclistaPrincipal

var opRosaimg1,opRosaimg2;
var opAmareloimg1,opAmareloimg2;
var opVermelhoimg1,opVermelhoimg2;
var imgFimJogo,sinoBicicleta;

var CGRosa, CGAmarelo,CGVermelho; 

var ENCERRAMENTO =0;
var JOGAR =1;
var estadoJogo = JOGAR;

var distancia=0;
var fimdeJogo, recomecar;

function preload(){
  imgCaminho = loadImage("Road.png");
  img1CiclistaPrincipal = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  img2CiclistaPrincipal= loadAnimation("mainPlayer3.png");
  
  opRosaimg1 = loadAnimation("opponent1.png","opponent2.png");
  opRosaimg2 = loadAnimation("opponent3.png");
  
  opAmareloimg1 = loadAnimation("opponent4.png","opponent5.png");
  opAmareloimg2 = loadAnimation("opponent6.png");
  
  opVermelhoimg1 = loadAnimation("opponent7.png","opponent8.png");
  opVermelhoimg2 = loadAnimation("opponent9.png");
  
  sinoBicicleta = loadSound("bell.mp3");
  imgFimJogo = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
  
// movendo o plano de fundo
caminho=createSprite(100,150);
caminho.addImage(imgCaminho);
caminho.velocityX = -5;

//criando o ciclista correndo de bicicleta
ciclistaPrincipal  = createSprite(70,150);
ciclistaPrincipal.addAnimation("SahilRunning",img1CiclistaPrincipal);
ciclistaPrincipal.scale=0.07;
  
//definir collider para o ciclista

  
fimdeJogo = createSprite(650,150);
fimdeJogo.addImage(imgFimJogo);
fimdeJogo.scale = 0.8;
fimdeJogo.visible = false;  
  
CGRosa = new Group();
CGAmarelo = new Group();
CGVermelho = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distancia,900,30);
  
  if(estadoJogo===JOGAR){
    
   distancia = distancia + Math.round(getFrameRate()/50);
   caminho.velocityX = -(6 + 2*distancia/150);
  
   ciclistaPrincipal.y = World.mouseY;
  
   edges= createEdgeSprites();
   ciclistaPrincipal .collide(edges);
  
  //código para resetar o plano de fundo
  if(caminho.x < 0 ){
    caminho.x = width/2;
  }
  
    //código para tocar o som do sino da bicicleta
  if(keyDown("space")) {
    sinoBicicleta.play();
  }
  
  //criando oponentes continuos
  var selecionar_jogadorOP = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (selecionar_jogadorOP == 1) {
      ciclistaRosa();
    } else if (selecionar_jogadorOP == 2) {
      ciclistaAmarelo();
    } else {
      ciclistaVermelho();
    }
  }
  
   if(CGRosa.isTouching(ciclistaPrincipal)){
     estadoJogo = ENCERRAMENTO;
     jogador1.velocityY = 0;
     jogador1.addAnimation("opponentPlayer1",opRosaimg2);
    }
    
    if(CGAmarelo.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador2.velocityY = 0;
      jogador2.addAnimation("opponentPlayer2",opAmareloimg2);
    }
    
    if(CGVermelho.isTouching(ciclistaPrincipal)){
      estadoJogo = ENCERRAMENTO;
      jogador3.velocityY = 0;
      jogador3.addAnimation("opponentPlayer3",opVermelhoimg2);
    }
    
}else if (estadoJogo === ENCERRAMENTO) {
    fimdeJogo.visible = true;
    //Adicione o código para mostrar instruções de reinicialização do jogo em texto aqui
  
  
    recomecar = text("Clique no game over para   recomeçar",490,200)
  
  
    caminho.velocityX = 0;
    imgCaminho.velocityY = 0;
 ciclistaPrincipal.addAnimation("SahilRunning",img2CiclistaPrincipal);
  
    CGRosa.setVelocityXEach(0);
    CGRosa.setLifetimeEach(-1);
  
    CGAmarelo.setVelocityXEach(0);
    CGAmarelo.setLifetimeEach(-1);
  
    CGVermelho.setVelocityXEach(0);
    CGVermelho.setLifetimeEach(-1);

    //condição de gravação para chamada de reset()
  reset();
}
}

function ciclistaRosa(){
        jogador1 =createSprite(1100,Math.round(random(50, 250)));
        jogador1.scale =0.06;
        jogador1.velocityX = -(6 + 2*distancia/150);
        jogador1.addAnimation("opponentPlayer1",opRosaimg1);
        jogador1.setLifetime=170;
        CGRosa.add(jogador1);
}

function ciclistaAmarelo(){
        jogador2 =createSprite(1100,Math.round(random(50, 250)));
        jogador2.scale =0.06;
        jogador2.velocityX = -(6 + 2*distancia/150);
        jogador2.addAnimation("opponentPlayer2",opAmareloimg1);
        jogador2.setLifetime=170;
        CGAmarelo.add(jogador2);
}

function ciclistaVermelho(){
        jogador3 =createSprite(1100,Math.round(random(50, 250)));
        jogador3.scale =0.06;
        jogador3.velocityX = -(6 + 2*distancia/150);
        jogador3.addAnimation("opponentPlayer3",opVermelhoimg1);
        jogador3.setLifetime=170;
        CGVermelho.add(jogador3);
}

// criar função de redefinição aqui

function reset(){
  if (mousePressedOver(fimdeJogo)){
      
     
    
      CGVermelho.destroyEach();
      CGRosa.destroyEach();
      CGAmarelod.destroyEach();
     ciclistaPrincipal.changeAnimation("SahilRunning",img1CiclistaPrincipal);
    distancia=0;
    
    fimdeJogo.visible = false;
      estadoJogo = JOGAR;
     
  
   
       
       }
}


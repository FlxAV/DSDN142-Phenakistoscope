
var frameMath = 0;


function setup_pScope(pScope) {
  //STATIC_FRAME ANIMATED_FRAME STATIC_DISK ANIMATED_DISK OUTPUT_GIF(500)
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.draw_slits(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(20);
  pScope.load_image_sequence("goutte" , "png",20);


}

function setup_layers(pScope) {
  //lets us draw the whole circle background, ignoring the boundaries
   new PLayer(null,225);


//obnoxious gradient
  var P_LayerBackground = new PLayer(backgroundLayer);
  P_LayerBackground.mode(RING);
  P_LayerBackground.set_boundary(0,1000);
//light bubbles
  var P_LayerBubble = new PLayer(bubble);
  P_LayerBubble.mode(SWIRL(5));
  P_LayerBubble.set_boundary(350,1000);
//little boat
  var P_LayerBoat = new PLayer(boatBorder);
  P_LayerBoat.mode(RING);
  P_LayerBoat.set_boundary(0, 1000);
//penguin
 var P_LayerPenguin = new PLayer( penguin);
  P_LayerPenguin.mode(RING);
  P_LayerPenguin.set_boundary(0, 1000);
//central gradient
  var P_LayerRadar = new PLayer( radarBackground);
  P_LayerRadar.mode(RING);
  P_LayerRadar.set_boundary(0, 480);
//darker bubbles
  var P_LayerBubbleDark = new PLayer(bubbleDark);
  P_LayerBubbleDark.mode(SWIRL(5));
  P_LayerBubbleDark.set_boundary(0,370);
//outer waves
  var P_LayerOuter = new PLayer( outerBorder);
  P_LayerOuter.mode(RING);
  P_LayerOuter.set_boundary(950, 1000);
//drop
  var P_LayerGoutte = new PLayer( goutte);
  P_LayerGoutte.mode(RING);
  P_LayerGoutte.set_boundary(950, 1000);
//center wheel
  var P_LayerWheel = new PLayer( wheel);
  P_LayerWheel.mode(RING);
  P_LayerWheel.set_boundary(950, 1000);


 }//************end of SETUP *****************





// //osciallating circle
function layer2(x, y, animation, pScope) {
noStroke();
fill("#839eaa");
ellipse(0, 500, 100, 100 + animation.wave() * 500);

}
// //obnoxious gradient
 var c1, c2;
function backgroundLayer(x, y, animation, pScope) {
  // Define colors
  c2 = color("#e4e4e4");
  c1 = color("#839eaa");
  setGradient(c1, c2);
}
 function setGradient(c1, c2) {
  // noprotect
  noFill();
  for (var y = -2000; y < 0; y+=40) {

    var inter = map(y, -2000, -1, 0, 1);
    var c = lerpColor(c1, c2, inter);
strokeWeight(40);
    stroke(c);
    //line(-100, y, 100, y);
    arc(0,0,y,y,-(90+9),-(90-9));
  }
}

function radarBackground(x,y,animation, pScope) {

if(animation.frame<0.5){
  frameMath = animation.frame;
}else if(animation.frame>=0.5){
frameMath = 1-animation.frame;

}


  var r = color("#283747");
  var b = color("#3498DB");
  var l = lerpColor(r,b,frameMath);

pScope.fill_background(l);
}

function penguin(x,y,animation, pScope) {
  scale(1.2);
  translate(0,-40);
  push();
fill(0);
ellipse(0,-400,130,200);
noStroke();
fill(255);
ellipse(20,-450,50,50);
ellipse(-20,-450,50,50);
ellipse(0,-390,100, 150);

//eyes
//makes the eyes close when drop falls
if(animation.frame<0.4 || animation.frame>0.8){
  fill(0);
  ellipse(10,-450,13,13);
  ellipse(-10,-450,13,13);
  fill(255);
  ellipse(11,-452,4,4);
  ellipse(-9,-452,4,4);
}
else if(animation.frame>=0.4 && animation.frame<=0.8){
  stroke(0);
  strokeWeight(5);
  line(15,-456,9,-451);
  line(15,-446,9,-451);
  line(-15,-456,-9,-451);
  line(-15,-446,-9,-451);
  noStroke();
}


//beak
fill("#E67E22")
beginShape();
vertex(0,-446);
vertex(-17,-437);
vertex(0,-427);
vertex(17,-437);
endShape(CLOSE);
pop();

}

function goutte(x, y, animation, pScope) {
   scale(1.5);
pScope.draw_image_from_sequence("goutte", 0,-400,animation.frame);

 }

function bubble(x, y, animation, pScope) {
noStroke();
fill("#85C1E9");
var move =animation.frame*70;
if(animation.frame>0.5){
  move=(1-animation.frame)*70
}
ellipse(-50+move,-200,30,30);
ellipse(-80+move,-140,10,10);
ellipse(0+move,0,40,40);
ellipse(55+move,-100,10,10);
}
function bubbleDark(x, y, animation, pScope) {
noStroke();
fill("#283747");
var move =animation.frame*70;
if(animation.frame<0.5){
  move=(1-animation.frame)*70
}
//ellipse(-50+move,-100,30,30);
ellipse(-80+move,-80,10,10);
ellipse(0+move,-80,20,20);
ellipse(-70+move,-60,10,10);
}

function outerBorder(x, y, animation, pScope) {

  if(animation.frame<0.5){
    frameMath = animation.frame;
  }else if(animation.frame>=0.5){
  frameMath = 1-animation.frame;
  }
    var r = color("#283747");
    var b = color("#154360");
    var l = lerpColor(r,b,frameMath);
  pScope.fill_background(l);

push()
scale(5);
fill(l);
var y = 188.2;
  drawWave(0,y);
  fill(l);

  drawWave(-25,y);
  fill(l);
pop();


 }
function boatBorder(x, y, animation, pScope){
  push();
  rotate(animation.frame*19);
  drawBoat();
  pop();
}
function drawBoat(){
var Xpos=500;
var Ypos=2000;


  push();
  scale(0.4);
  noStroke();
fill("#334760");
//coque
beginShape();
  vertex(Xpos+50, Ypos+210);
  quadraticVertex(Xpos+70, Ypos+310, Xpos+50, Ypos+510);
  bezierVertex(Xpos+100, Ypos+260, Xpos+100, Ypos+265, Xpos+250, Ypos+260);
  bezierVertex(Xpos+280, Ypos+235, Xpos+250, Ypos+210, Xpos+250, Ypos+210);
endShape(CLOSE);
//mat
rect(Xpos+160,Ypos+40,3,170);
//voile1
beginShape();
vertex(Xpos+155, Ypos+50);
vertex(Xpos+155,Ypos+205);
bezierVertex(Xpos+140, Ypos+185, Xpos+110, Ypos+175, Xpos+60, Ypos+205);
bezierVertex(Xpos+50, Ypos+150, Xpos+60, Ypos+105, Xpos+155, Ypos+55);
endShape();
//voile2
beginShape();
vertex(Xpos+167, Ypos+60);
vertex(Xpos+167,Ypos+205);
bezierVertex(Xpos+167, Ypos+200, Xpos+190, Ypos+185, Xpos+245, Ypos+205);
vertex( Xpos+245, Ypos+205);
endShape();
//drapeau
beginShape();
vertex(Xpos+167, Ypos+41);
vertex(Xpos+167,Ypos+55);
vertex( Xpos+200,Ypos+48 );
endShape();

pop();
}
function drawWave(X,Y){

  noStroke();
  beginShape();
    vertex(X-1,Y+1);
    vertex(X+12,Y-3);
    vertex(X+14,Y+0);
    vertex(X+26,Y+0);
    vertex(X+26,Y+3);
    vertex(X-1,Y+3);

    endShape(CLOSE);

 stroke(0);
 noFill();
   bezier(X+26,Y,X+16,Y,X+11,Y,X+13,Y-3);
   bezier(X+13,Y-3,X+10,Y-3,X+5,Y,X,Y);

}

function wheel(x, y, animation, pScope){
let Xpos = -150;
let Ypos = -150;
let circles = 6;
scale(3);
  push();

//noStroke();
if( animation.frame==0.4 ){  //0.4
push();
translate(Xpos+150,Ypos+150);

    for(let i=0; i<circles;i++){
      fill("#915A24");
    ellipse(0,-80,15,25);
    rectMode(CENTER);
    rect(0,-60,10,30);
    rotate(360/circles);
  }
  pop();
}

fill("#915A24");
ellipse(Xpos+150,Ypos+150,115,115);
fill(255);
ellipse(Xpos+150,Ypos+150,109,109);
fill("#915A24");
ellipse(Xpos+150,Ypos+150,105,105);
fill(255);
ellipse(Xpos+150,Ypos+150,75,75);
fill("#334760");
ellipse(Xpos+150,Ypos+150,70,70);

// if(patternWheelCheck){
// fill("#88d2d5");
// }else{  fill("#FFEFA6");}
ellipse(Xpos+150,Ypos+150,63,63);


push();
translate(Xpos+150,Ypos+150);
    for(let i=0; i<circles;i++){
      fill("#915A24");
    rectMode(CENTER);
    rect(0,-20,5,30);
    rotate(360/circles);
  }
  pop();

  fill("#915A24");
  ellipse(Xpos+150,Ypos+150,25,25);
  fill(255);
  ellipse(Xpos+150,Ypos+150,17,17);
  fill("#915A24");
  ellipse(Xpos+150,Ypos+150,15,15);
  fill(255);
  ellipse(Xpos+150,Ypos+150,10,10);

pop();
}

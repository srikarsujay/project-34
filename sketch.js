//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg,happyDogImg
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250,50,50)
  dog.addImage(dogImg)
  database=firebase.database()
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  dog.scale=0.3
}


function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDogImg)
  }
  drawSprites();
  //add styles here
  textSize(20)
  fill("white")
  //stroke()
  text("Note : Press the Up arrow Key To Feed The Dog",50,50)
  text("Food remaining : "+foodS,50,75)

}
function readStock(data){
  foodS=data.val()
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1
  }
  database.ref("/").update({Food:x})
}



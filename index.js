var header = document.querySelector("#header");
var newColors = document.querySelector("#newcolors");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var title = document.querySelector("h1");
var body = document.querySelector("body");
var counter = document.querySelector("#score");
var score =  0;
var guessing = true;
var correctBox = -1;
var canPlay = true;

var boxes = {};

initBoxes();

function initBoxes() {
  var boxNames = ["box0","box1","box2","box3","box4","box5"];
  boxNames.forEach(function(boxName) {
    boxes[boxName] = {
      space: document.querySelector("#"+boxName),
      check: function() {check(parseInt(boxName.charAt(3)));}
    };
  });
}

changeColors();

newColors.addEventListener("click", function(){
  changeColors();
});

for(var box in boxes) {
  boxes[box].space.addEventListener("click", boxes[box].check);
}

function changeColors() {
  for(var box in boxes) {
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    boxes[box].space.style.background = "rgb("+red+", "+green+", "+blue+")";
    boxes[box].space.style.cursor = "pointer";
  }
  if(canPlay) {
    score = 0;
    counter.textContent = "";
  }
  correctBox = chooseCorrect();
  changeTitle("box"+correctBox);
  canPlay = true;
}

function changeTitle(box) {
  title.textContent = boxes[box].space.style.background.toString().toUpperCase();
}

function chooseCorrect() {
  return Math.floor(Math.random()*6);
}

function check(index) {
  if(canPlay) {
    if(index == correctBox) {
      var finalColor = boxes["box"+index].space.style.background;
      header.style.background = finalColor;
      newColors.style.color =  finalColor;
      for(var box in boxes) {
        boxes[box].space.style.background = finalColor;
      }
      score++;
      counter.style.textShadow = "6px 6px "+finalColor;
      if(score >= 10) {
        var fire = "<span class='noshadow'>🔥</span>";
        counter.innerHTML = fire+" "+score+" "+fire;
      }
      else {
        counter.textContent = score;
      }
      canPlay = false;
      guessing = false;
    }
    else {
      boxes["box"+index].space.style.background = "rgb(29, 30, 31)";
      score = 0;
      counter.textContent = "";
    }
  }
  else {
    changeColors();
  }
}

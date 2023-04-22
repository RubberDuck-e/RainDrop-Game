let man = document.getElementById("man");
//let drops = document.getElementById("drops");
let umbrella = document.getElementById("umbrella");
let umbrellaOpen = true;
let moveRate = 200;

let manPos = {
    x : 300,
    y : 500
}
function refreshPosition(UmbrellaXOffsetting) {
    let x = manPos.x;
    let y = manPos.y;
   console.log("x"+ x);
   man.style.transform = "translate(" + x + "px," + y +"px)";
   //umbrella offset
    x+=UmbrellaXOffsetting;
    y-=110;
    console.log("brellax"+ x);
   umbrella.style.transform = "translate(" + x + "px," + y + "px)";
  }

  // Update x-axis position.
function UpdateXPos(distance) {
    manPos.x = manPos.x + distance;
    // Update x-axis position at the edge.
   
    if (manPos.x <= 0) {
      manPos.x = 1;

    } else if (manPos.x >= 1101) {
      manPos.x = 1100;
    }

  }

window.addEventListener("keydown", function (event) {
let UmbrellaXOffset = 163;
    if(event.defaultPrevented){
        return;
    }
    if(event.code === "ArrowRight"){
        //going right
            document.getElementById("man").src = "img/businessmanRight.png";
            UpdateXPos(moveRate);
            UmbrellaXOffset= -223;
            refreshPosition(UmbrellaXOffset);
    } else if(event.code === "ArrowLeft"){
        //going Left
            document.getElementById("man").src = "img/businessmanLeft.png";
            UpdateXPos(-moveRate); 
            UmbrellaXOffset = UmbrellaXOffset*-1;
            refreshPosition(UmbrellaXOffset);
    }else if(event.code=== "Space"){
      //Opening and Closing umbrella
        if(umbrellaOpen){
            document.getElementById("umbrella").src = "img/UmbrellaClose.png";
            umbrellaOpen= false;
        }else{
            document.getElementById("umbrella").src = "img/UmbrellaOpen.png";
            umbrellaOpen = true;
        }
    }
  }, true);

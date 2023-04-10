let man = document.getElementById("man");
//let drops = document.getElementById("drops");
//let umbrella = document.getElementById("umbrella")

let moveRate = 80;

let manPos = {
    x : 250,
    y : 300
}
function refreshPosition() {
    let x = manPos.x;
    let y = manPos.y;
   console.log("x"+ x);
   man.style.transform = "translate(" + x + "px," + y +"px)";
  }

  // Update x-axis position.
function UpdateXPos(distance) {
    manPos.x = manPos.x + distance;
    // Update x-axis position at the edge.
   
    if (manPos.x < 0) {
      manPos.x = 0;
    } else if (manPos.x > 499) {
      manPos.x = 499;
    }

  }

window.addEventListener("keydown", function (event) {
    if(event.defaultPrevented){
        return;
    }
    if(event.code === "ArrowRight"){
        //going right
        
            UpdateXPos(moveRate);
    } else if(event.code === "ArrowLeft"){
        //going Left
            UpdateXPos(-moveRate);
    }
    refreshPosition();
  }, true);
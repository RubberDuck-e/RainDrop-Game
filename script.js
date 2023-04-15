let man = document.getElementById("man");
//let drops = document.getElementById("drops");
//let umbrella = document.getElementById("umbrella")

let moveRate = 200;

let manPos = {
    x : 300,
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
   
    if (manPos.x < 100) {
      manPos.x = 100;
    } else if (manPos.x > 500) {
      manPos.x = 500;
    }

  }

window.addEventListener("keydown", function (event) {
    if(event.defaultPrevented){
        return;
    }
    if(event.code === "ArrowRight"){
        //going right
            document.getElementById("man").src = "img/businessmanRight.png";
            UpdateXPos(moveRate);

    } else if(event.code === "ArrowLeft"){
        //going Left
            document.getElementById("man").src = "img/businessmanLeft.png";
            UpdateXPos(-moveRate); 
            
    }
    refreshPosition();
  }, true);

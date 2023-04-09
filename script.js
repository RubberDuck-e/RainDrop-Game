let man = document.getElementById("man");
//let drops = document.getElementById("drops");
//let umbrella = document.getElementById("umbrella")

let moveRate = 40;

let manPos = {
    x : 250,
    y : 300
}
function refreshPosition() {
    let x = manPos.x;
    let y = manPos.y;
    let transform = "translate(" + x + " " + y + ")";
  
    object1.setAttribute("transform", transform);
  }

  // Update x-axis position.
function updateXPos(distance) {
    manPos.x = manPos.x + distance;
    // Update x-axis position at the edge.
    if (manPos.x < 0) {
      manPos.x = 499;
    } else if (manPos.x > 499) {
      manPos.x = 0;
    }
  }

document.addEventListener("keydown", function (event) {
    if(event.defaultPrevented){
        return;
    }
    if(event.code === "ArrowRIght"){
        //going right
            UpdateXPos(moveRate);
    } else if(event.code === "ArrowLeft"){
        //going Left
            UpdateXPos(-moveRate);
    }

  });
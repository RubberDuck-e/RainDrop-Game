let man = document.getElementById("man");
//let drops = document.getElementById("drops");
let umbrella = document.getElementById("umbrella");
let items = document.getElementById("items");
let umbrellaOpen = true;
let moveRate = 225;
let gameIsOn = true;
let numItems = 4;
let manPos = {
    x : 550,
    y : 500
}

  for (let i = 0; i < numItems; i++) {
    const drop = document.createElement("img");
    drop.className = "droplet";
    drop.src = "img/DropletGame.png";
    let z = Math.random() * 775;
    console.log("z: " + z);
    drop.style.transform =   "translate(" + z + "px," + 20 + "px)";
    console.log(drop.style.transform);
    drop.style.display = "none";
    items.appendChild(drop);
    const money = document.createElement("img");
    money.className = "cash";
    money.src = "img/CashGame.png";
    let p = Math.random() * 775;
    console.log("p: " + p);
    money.style.transform = "translate(" + p + "px," + 20 + "px)";
    money.style.display = "none";
    items.appendChild(money);
  }
  updateItems();

function updateItems(){
  const drops = document.getElementsByClassName("droplet");
  const cashs = document.getElementsByClassName("cash");

  for (let i = 0; i < drops.length; i++) {
    const droplet = drops[i];
    const displayStyle = window.getComputedStyle(droplet).getPropertyValue("display");
console.log(displayStyle);
      if(displayStyle == "none" ){

      }else{
    console.log("before translate y" + droplet.style.transform);
    const x = parseFloat(droplet.style.transform.substring(droplet.style.transform.indexOf("(")+1,droplet.style.transform.indexOf("px")));
    const y = parseFloat(droplet.style.transform.substring(droplet.style.transform.indexOf(",")+1,droplet.style.transform.indexOf("px)")));
    droplet.style.transform = "translate(" + x + "px," + (y+5) + "px)";
    console.log("after translate y" + droplet.style.transform);
      }
  }
  for (let i = 0; i < cashs.length; i++) {
    const cash = cashs[i];
    const displayStyle = window.getComputedStyle(cash).getPropertyValue("display");
console.log(displayStyle);
      if(displayStyle == "none" ){

      }else{
    const x = parseFloat(cash.style.transform.substring(cash.style.transform.indexOf("(")+1,cash.style.transform.indexOf("px")));
    const y = parseFloat(cash.style.transform.substring(cash.style.transform.indexOf(",")+1,cash.style.transform.indexOf("px)")));
    cash.style.transform = "translate(" + x + "px," + (y+5) + "px)";
  }
}
 requestAnimationFrame(updateItems);
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
   
    if (manPos.x <= 99) {
      manPos.x = 100;

    } else if (manPos.x >= 1001) {
      manPos.x = 1000;
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

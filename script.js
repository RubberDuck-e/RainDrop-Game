let man = document.getElementById("man");
//let drops = document.getElementById("drops");
let umbrella = document.getElementById("umbrella");
let items = document.getElementById("items");
let umbrellaOpen = true;
let moveRate = 225;
let gameIsOn = true;
let numItems = 3;
let manPos = {
    x : 550,
    y : 500
}

  for (let i = 0; i < numItems; i++) {
    const drop = document.createElement("img");
    drop.className = "droplet";
    let z = Math.random() * 1000;
    console.log("z: " + z);
    drop.style.transform = `translate(${z}px, ${20}px)`;
    items.appendChild(drop);
    const money = document.createElement("img");
    money.className = "cash";
    let p = Math.random() * 1000;
    console.log("p: " + p);
    money.style.transform = `translate(${p}px, ${20}px)`;
    items.appendChild(money);
  }
  updateItems();

function updateItems(){
  const drops = document.getElementsByClassName("droplet");
  const cashs = document.getElementsByClassName("cash");

  for (let i = 0; i < drops.length; i++) {
    const droplet = drops[i];

  const y = parseFloat(droplet.style.transform.replace(/.*translateY\((.*)\).*/, "$1")) || 0;
  droplet.style.transform = `translateY(${y + 5}px)`;
 
}
for (let i = 0; i < cashs.length; i++) {
  const cash = cashs[i];
  const y = parseFloat(cash.style.transform.replace(/.*translateY\((.*)\).*/, "$1")) || 0;
  cash.style.transform = `translateY(${y + 5}px)`;
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

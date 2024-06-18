let man = document.getElementById("man");
let umbrella = document.getElementById("umbrella");
let items = document.getElementById("items");
let umbrellaOpen = true;
let moveRate = 110;
let gameIsOn = true;
let numItems = 4;
let UmbrellaXOffset = 62;
let manPos = {
    x : 550,
    y : 500
}
let umbPos = {
  x :592,
  y : 410
}

let itemList = []; // Array to hold drop and cash items

// Function to create and drop a single item at random intervals
function spawnItem() {
    const isDrop = Math.random() < 0.5; // Randomly choose between drop and cash
    const item = document.createElement("img");
    item.className = isDrop ? "droplet" : "cash";
    item.src = isDrop ? "img/DropletGame.png" : "img/CashGame.png";
    item.style.transform = `translate(${RandomXPos()}px, 20px)`;
    items.appendChild(item);
    itemList.push(item); // Add item to the array

    setTimeout(spawnItem, getRandomInterval());
}

function getRandomInterval() {
    return Math.random() * 1000; // Random interval between 0 and 1 second
}

// Function to update the position of items and remove them if they hit the bottom
function updateItems() {
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const [x, y] = item.style.transform.match(/-?\d+\.?\d*/g).map(Number);
        item.style.transform = `translate(${x}px, ${y + 5}px)`;

        if (y > 550) {
            item.remove();
            itemList.splice(i, 1); // Remove item from the array
            i--; // Adjust index after removal
        }
    }

    requestAnimationFrame(updateItems);
}
function refreshPosition(UmbrellaXOffsetting) {
   let x = manPos.x;
   let y = manPos.y;
   man.style.transform = "translate(" + x + "px," + y +"px)";
   //umbrella offset
   umbPos.x = umbPos.x + UmbrellaXOffsetting;
   //umbrella range limit
    if (umbPos.x <= 41) {
      umbPos.x = 42;
    } else if (umbPos.x >= 1083) {
      umbPos.x = 1082;
    }
   umbrella.style.transform = "translate(" + umbPos.x + "px," + umbPos.y + "px)";
  }

  // Update x-axis position.
function UpdateXPos(distance) {
    manPos.x = manPos.x + distance;
    // Update x-axis position at the edge.
    if (manPos.x <= -1) {
      manPos.x = 0;
    } else if (manPos.x >= 1101) {
      manPos.x = 1100;
    }
  }

function RandomXPos(){
  let value = 0;
  while((99> value)||(value >1001)){
    value = Math.random() * 1000;
  }
return value;
}

window.addEventListener("keydown", function (event) {

    if(event.defaultPrevented){
        return;
    }
    if(event.code === "ArrowRight"){
        //going right from facing left
        if(!(man.src.includes( "img/businessmanRight.png"))){
            document.getElementById("man").src = "img/businessmanRight.png";
            UpdateXPos(moveRate);
            refreshPosition(moveRate-60);
        }else{
            //just going right again
            document.getElementById("man").src = "img/businessmanRight.png";
            UpdateXPos(moveRate);
            refreshPosition(moveRate);
        }
    } else if(event.code === "ArrowLeft"){
        //going Left from facing right 
        if(!(man.src.includes( "img/businessmanLeft.png"))){
            document.getElementById("man").src = "img/businessmanLeft.png";
            UpdateXPos(-moveRate);
            refreshPosition(-moveRate+60);
        }else{
          //just going left again
            document.getElementById("man").src = "img/businessmanLeft.png";
            UpdateXPos(-moveRate);
            refreshPosition(-moveRate);
        }
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

  spawnItem();
updateItems();

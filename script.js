let man = document.getElementById("man");
let umbrella = document.getElementById("umbrella");
let items = document.getElementById("items");
let umbrellaOpen = true;
let moveRate = 100;
let gameIsOn = true;
let numItems = 4;
let UmbrellaXOffset = 62;
let score = 0;
let manPos = {
  x: 650, // Centered initial x position
  y: 600  // Centered initial y position
};
let umbPos = {
  x: 682, // Centered initial x position
  y: 500  // Centered initial y position
};

let itemList = []; // Array to hold drop and cash items

// Function to create and drop a single item at random intervals
function spawnItem() {
    const isDrop = Math.random() < 0.5; // Randomly choose between drop and cash
    const item = document.createElement("img");
    item.className = isDrop ? "droplet" : "cash";
    item.src = isDrop ? "img/DropletGame.png" : "img/CashGame.png";
    item.style.transform = `translate(${RandomXPos()}px, 20px) translate(-50%, -50%)`;
    items.appendChild(item);
    itemList.push(item); // Add item to the array

    setTimeout(spawnItem, getRandomInterval());
}
// Random interval between 0 and 1 second
function getRandomInterval() {
    return Math.random() * 1000; 
}

// Function to update the position of items after creation and remove them if they hit the bottom
function updateItems() {
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const [x, y] = item.style.transform.match(/-?\d+\.?\d*/g).map(Number);
        let halfHeight = 0.5*item.clientWidth;
        item.style.transform = `translate(${x}px, ${y + 5}px) translate(-50%, -50%)`;

        if (y > 700-halfHeight) {//removal at bottom
            item.remove();
            itemList.splice(i, 1); // Remove item from the array
            i--; // Adjust index after removal
        }else if((x>(manPos.x-halfHeight)) &&(x<(manPos.x+halfHeight))&&(y>(manPos.y-halfHeight-40))){//removal at man collision
          item.remove();
          itemList.splice(i, 1); // Remove item from the array
          i--; // Adjust index after removal
          if(item.src.includes("img/CashGame.png")){//points increase
            score++;
            console.log(score);
          }else{//game ends
            console.log("game over");
          }
        }else if((x>umbPos.x-90)&&(x<(umbPos.x+90))&&(y>umbPos.y-45)&&umbrellaOpen){//removal at umbrella collision
          item.remove();
          itemList.splice(i, 1); // Remove item from the array
          i--; // Adjust index after removal
        }
    }

    requestAnimationFrame(updateItems);
}
//refreshes the position of the umbrella according to the man's movement
function refreshPosition(UmbrellaXOffsetting) {
   //umbrella offset
   umbPos.x = umbPos.x + UmbrellaXOffsetting;
   //umbrella range limit
    if (umbPos.x < 182) {
      umbPos.x = 182;
    } else if (umbPos.x > 1122) {
      umbPos.x = 1122;
    }
    umbrella.style.transform = `translate(${umbPos.x}px, ${umbPos.y}px) translate(-50%, -50%)`;
  }

  // Update x-axis position of the man 
function UpdateXPos(distance) {
    manPos.x = manPos.x + distance;
    // Update x-axis position at the edge.
    if (manPos.x < 150) {
      manPos.x = 150;
    } else if (manPos.x > 1150) {
      manPos.x = 1150;
    }
    let x = manPos.x;
   let y = manPos.y;
   man.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  }

//generates the random x pos for falling items
function RandomXPos(){
  let value = 0;
  while((99> value)||(value >1001)){
    value = Math.random() * 1000;
  }
return value;
}



//player inputs
window.addEventListener("keydown", function (event) {
  

    if(event.defaultPrevented){
        return;
    }
    event.preventDefault(); // Prevent the default action for arrow keys
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
//sets the initial position and centering of the man and umbrella
  function setInitialPositions() {
    man.style.transform = `translate(${manPos.x}px, ${manPos.y}px) translate(-50%, -50%)`;
    umbrella.style.transform = `translate(${umbPos.x}px, ${umbPos.y}px) translate(-50%, -50%)`;
}

// Run the game setup after the DOM has fully loaded
window.onload = function() {
    setInitialPositions();
    spawnItem();
    updateItems();
};
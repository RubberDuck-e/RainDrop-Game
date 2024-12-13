let gameIsOn = true;  //varraible to track game status
let startTime = Date.now(); // Track the start time of the game
const minInterval = 400; // Minimum interval in milliseconds
const maxInterval = 1000; // Maximum initial interval in milliseconds
let intervalDecreaseRate = 0.01; // Rate at which the interval decreases
let man = document.getElementById("man");
let umbrella = document.getElementById("umbrella");
let items = document.getElementById("items");
let umbrellaOpen = true; //status of umbbrella
let moveRate = 100; //the difference in movement for the man
let UmbrellaXOffset = 62; //difference between the man and umbrellas position
let score = -1; //score placeholder
const maxItems = 70; // Maximum number of items to be handled at once
let dropRate = 5;
let manPos = {
  x: 650, // Centered initial x position
  y: 600  // Centered initial y position
};
let umbPos = {
  x: 682, // Centered initial x position
  y: 500  // Centered initial y position
};

let itemList = []; // Array to hold drop and cash items

function promptMenu(){
   // Show the main menu
   document.getElementById('mainMenu').style.display = 'flex';

   // Hide the game container
   document.getElementById('gameContainer').style.display = 'none';

    // Hide the dynamic text container
    document.getElementById('dynamicTextContainer').style.display = 'none';

    // clears the array of items again
    clearItems();

   // Display the last game's score
   let scoreElement = document.getElementById('lastGameScore');
   if (score >= 0) {
     scoreElement.textContent = 'Game Over! Your score was: ' + score;
   } else {
     scoreElement.textContent = ''; // Clear the text if no score
   }

    // Reset score to -1 after displaying it
    score = -1;
  }

  // Function to start the game
function startGame() {
  gameIsOn = true;
  // Hide the main menu
  document.getElementById('mainMenu').style.display = 'none';

  // Show the game container
  document.getElementById('gameContainer').style.display = 'flex';

   // Show the dynamic text container
   document.getElementById('dynamicTextContainer').style.display = 'block';

  // Reset the score and update the text
  score = 0;

  //call necesary functions
    setInitialStatus();
    spawnItem();
    updateItems();
    updateText();
}

// Function to create and drop a single item at random intervals
function spawnItem() {
  if (gameIsOn && itemList.length < maxItems) {
    const isDrop = Math.random() < 0.5; // Randomly choose between drop and cash
    const item = document.createElement("img");
    item.className = isDrop ? "droplet" : "cash";
    item.src = isDrop ? "img/DropletGame.png" : "img/CashGame.png";
    item.style.transform = `translate(${RandomXPos()}px, 20px) translate(-50%, -50%)`;
    document.getElementById('items').appendChild(item);
    itemList.push(item); // Add item to the array

     // Calculate the current interval based on elapsed time
     setTimeout(spawnItem, getRandomInterval());
  }
}

//
function increaseDropRate(){
  if(dropRate<25){
    dropRate++;
    intervalDecreaseRate+=0.075;
  }
}
// Random interval between 0 and adjusted maxInterval
function getRandomInterval() {
  const elapsedTime = Date.now() - startTime;
  if(elapsedTime> 15000){
      intervalDecreaseRate = 0.125;
  }
  let adjustedInterval = Math.max(minInterval, maxInterval - (elapsedTime * intervalDecreaseRate));
  return adjustedInterval;
}

// Function to update the position of items after creation and remove them if they hit the bottom
function updateItems() {
    for (let i = 0; i < itemList.length; i++) {
        const item = itemList[i];
        const [x, y] = item.style.transform.match(/-?\d+\.?\d*/g).map(Number);
        let halfHeight = 0.5*item.clientWidth;
        item.style.transform = `translate(${x}px, ${y + dropRate}px) translate(-50%, -50%)`;

        if (y > 700-halfHeight) {//removal at bottom
            item.remove();
            itemList.splice(i, 1); // Remove item from the array
            i--; // Adjust index after removal
        }else if((x>(manPos.x-halfHeight)) &&(x<(manPos.x+halfHeight))&&(y>(manPos.y-halfHeight-20))&&!umbrellaOpen){//removal at man collision
          item.remove();
          itemList.splice(i, 1); // Remove item from the array
          i--; // Adjust index after removal
          if(item.src.includes("img/CashGame.png")){//points increase
            score++;
            if((score%10)==0){
              increaseDropRate();
            }
            updateText();
          }else{//game ends
            gameIsOn = false;
            promptMenu();
          }
        }else if((x>umbPos.x-90)&&(x<(umbPos.x+90))&&(y>umbPos.y-45)&&umbrellaOpen){//removal at umbrella collision
          item.remove();
          itemList.splice(i, 1); // Remove item from the array
          i--; // Adjust index after removal
        }
    }
    //stops animation of gamescreen
    if(gameIsOn){
    requestAnimationFrame(updateItems);
    }
  }

// Function to update the text content of the element
function updateText() {
  // Get the HTML element by its id
  let textElement = document.getElementById('dynamicText');

   // Only display the score if it's not -1
   if (score >= 0) {
    textElement.textContent = "Money: " + score;
} else {
    textElement.textContent = ''; // Clear the text if the score is -1
}
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

//clears the list array just in case
function clearItems() {
  itemList.forEach(item => item.remove());
  itemList = [];
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
  function setInitialStatus() {
    man.style.transform = `translate(${650}px, ${600}px) translate(-50%, -50%)`;
    umbrella.style.transform = `translate(${682}px, ${500}px) translate(-50%, -50%)`;
    umbrellaOpen =  true;
    dropRate = 5;
    intervalDecreaseRate = 0.01;
    document.getElementById("umbrella").src = "img/UmbrellaOpen.png";
    document.getElementById("man").src = "img/businessmanLeft.png";
    updatePos();
}

//function to update the position variabblles when they are being initialized to their original positions
function updatePos(){
  manPos.x = 650;
  manPos.y = 600;
  umbPos.x = 682;
  umbPos.y = 500;
}
// Run the game setup after the DOM has fully loaded
window.onload = function() {
    promptMenu();
};
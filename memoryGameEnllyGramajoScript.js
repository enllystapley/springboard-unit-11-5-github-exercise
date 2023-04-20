const gameContainer = document.getElementById("game");
let firstItemBlock = null;
let secondItemBlock = null;
let viewItemColor = 0;
let itemNotClicked = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it. ok so it swaps the current
    //element with the random index here
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
//calls the shuffle array in order to 
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    //create ne div here
    const newDiv = document.createElement("div");
    //add the color name to the class list attribute of new div created
    newDiv.classList.add(color);
    //make a click listener to handle what happens when new div is clicked
    newDiv.addEventListener("click", handleCardClick);
    //add the new created div within the game container div html element
    //on the body of the html
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  if (itemNotClicked) return;
  if (e.target.classList.contains("flipped")) return;

  let currentItem = e.target;
  currentItem.style.backgroundColor = currentItem.classList[0];

  if (!firstItemBlock || !secondItemBlock) {
    currentItem.classList.add("flipped");
    firstItemBlock = firstItemBlock || currentItem;
    secondItemBlock = currentItem === firstItemBlock ? null : currentItem;
  }

  if (firstItemBlock && secondItemBlock) {
    itemNotClicked = true;
    // debugger
    let pickOne = firstItemBlock.className;
    let pickTwo = secondItemBlock.className;

    if (pickOne === pickTwo) {
      viewItemColor += 2;
      firstItemBlock.removeEventListener("click", handleCardClick);
      secondItemBlock.removeEventListener("click", handleCardClick);
      firstItemBlock = null;
      secondItemBlock = null;
      itemNotClicked = false;
    } else {
      setTimeout(function() {
        firstItemBlock.style.backgroundColor = "";
        secondItemBlock.style.backgroundColor = "";
        firstItemBlock.classList.remove("flipped");
        secondItemBlock.classList.remove("flipped");
        firstItemBlock = null;
        secondItemBlock = null;
        itemNotClicked = false;
      }, 1000);
    }
  }

  if (viewItemColor === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
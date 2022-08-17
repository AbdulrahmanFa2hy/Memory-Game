let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];

document
  .querySelector(".control-buttons span")
  .addEventListener("click", function () {
    let yourName = prompt("What's Your Name");
    if (yourName == null || yourName == "") {
      document.querySelector(".name span").innerHTML = "Unkown";
    } else {
      document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
    document.getElementById("start").play();
    blocks.forEach((block) => {
      setTimeout(() => {
        block.classList.add("is-flipped");
      }, 1000);
      setTimeout(() => {
        block.classList.remove("is-flipped");
      }, 3000);
    });
  });

// Run the shuffle fucntion on order
shuffle(orderRange);

// Set Order for blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flibBlock(block);
  });
});

// Flip function
function flibBlock(e) {
  e.classList.add("is-flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocks.filter((e) =>
    e.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking function
    stopClicking();
    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  // Remove no-clicking after the duration
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
// Check Matched Blocks
function checkMatchedBlocks(firstElement, secondElement) {
  let treisElement = document.querySelector(".tries span");

  if (firstElement.dataset.technology === secondElement.dataset.technology) {
    // remove flip classes
    firstElement.classList.remove("is-flipped");
    secondElement.classList.remove("is-flipped");
    // add match classes
    firstElement.classList.add("is-match");
    secondElement.classList.add("is-match");
    // get success sound
    document.getElementById("success").play();
  } else {
    treisElement.innerHTML = parseInt(treisElement.innerHTML) + 1;
    setTimeout(() => {
      firstElement.classList.remove("is-flipped");
      secondElement.classList.remove("is-flipped");
    }, duration);
    document.getElementById("fail").play();
  }
}
// Shuffle function
function shuffle(array) {
  let current = array.length,
    random,
    temp;
  while (current > 0) {
    // Get Random Number
    random = Math.floor(Math.random() * current);
    // Decrease length By Element
    current--;

    // [1] Save current Element in Stash
    temp = array[current];
    // [2] current Element = Random Element
    array[current] = array[random];
    // [3] Random Element = temp
    array[random] = temp;
  }
  return array;
}

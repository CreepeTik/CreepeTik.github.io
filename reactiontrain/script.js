const colors = ["green","red","orange","blue","purple","yellow","pink","gray"];
let timer = document.createElement("h1");
let colorDisplay = document.createElement("div");
let comboText = document.createElement("h1");
let buttonsGroup = document.createElement("div");
timer.id = "timer";
colorDisplay.id = "colorDisplay";
comboText.id = "comboText";
comboText.style.visibility = "hidden";
comboText.innerHTML = "Combo: 0"
buttonsGroup.id = "buttonsGroup";
document.body.appendChild(comboText);
document.body.appendChild(timer);
document.body.appendChild(colorDisplay);
document.body.appendChild(buttonsGroup);
let combo = 0;
const timerSeconds = 5;
const lastButton = [];




function pickRandom(array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  const element = array[randomNumber];
  array.splice(randomNumber,1);
  return element;
}
function createButtons() {
  const clonedArray = colors.slice();
  const colorButtons = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);
    const randomColor = clonedArray[randomIndex];
  
    const newButton = document.createElement("button");
   newButton.classList.add("colorButton");
    newButton.innerHTML = randomColor.charAt(0).toUpperCase() + randomColor.slice(1);
    newButton.style.color = randomColor;
   buttonsGroup.appendChild(newButton);
   colorButtons.push(newButton);
   clonedArray.splice(randomIndex,1)
  }
  const correctButtonIndex = Math.floor(Math.random() * 6);
  const correctButton = colorButtons[correctButtonIndex];
  colorButtons.splice(correctButtonIndex,1);
  const correctColor = correctButton.style.color;
  const index = colors.indexOf(correctColor);
  lastButton.push(colors.splice(index,1)[0]);
  if (lastButton.length > 1) {
    colors.push(lastButton.splice(0,1)[0]);
  }
  correctButton.addEventListener("click", function() {
    removeButtons();
    
    createButtons();
    console.log(colors);
    remainingTime = 5 * 1000;
    combo++;
    comboText.innerHTML = "Combo: "+combo;
    if (combo >= 2) {
      comboText.style.visibility = "visible";
    }
    comboText.style.fontSize = "35px";
      setTimeout(function() {
        comboText.style.fontSize = "30px";
      }, 100);
  });
  colorDisplay.style.backgroundColor = correctButton.style.color;
  

  
  for (let i = 0; i < colorButtons.length; i++) {
    colorButtons[i].addEventListener("click",function() {
      gameOver("wrong button");
    });
  }
}
createButtons()

function removeButtons() {
  const buttons = document.querySelectorAll(".colorButton");
  if (buttons.length <= 0) {
    return
  }
  for (let i = 0; i < buttons.length; i++) {
      buttons[i].remove();
  }
}
function gameOver(reason) {
  clearInterval(timerInterval);
  removeButtons();
  
  colorDisplay.remove();
  timer.remove();
  remainingTime = timerSeconds * 1000;
  const gameOverText = document.createElement("h1");
  const restartButton = document.createElement("button");
  gameOverText.id = "gameOverText";
  gameOverText.innerHTML = `Game Over!<br><span id="gameOverReason">${reason}</span>`;
  restartButton.id = "restartButton";
  restartButton.innerHTML = "Restart";
  restartButton.addEventListener("click",function() {
    gameOverText.remove();
    restartButton.remove();
    combo = 0;
    comboText.innerHTML = "Combo: 0";
    comboText.style.visibility = "hidden";
    const newTimer = document.createElement("h1");
    newTimer.id = "timer";
    newTimer.innerHTML = remainingTime / 1000;
    const newColorDisplay = document.createElement("div");
    newColorDisplay.id = "colorDisplay";
    timer = newTimer;
    colorDisplay = newColorDisplay;
    document.body.appendChild(newTimer);
    document.body.appendChild(newColorDisplay);
    if (lastButton.length > 1) {
      colors.push(lastButton.splice(0,1)[0]);
    l}
    createButtons();
    startTimer();
  });
  document.body.appendChild(gameOverText);
  setTimeout(function() {
    (fullscreenCheckbox.checked) ? restartButton.classList.add("upper") : null;
    document.body.appendChild(restartButton);
  },2500);
}

let remainingTime = timerSeconds * 1000;
let timerInterval;

function startTimer() {
  updateTimer();
  timerInterval = setInterval(updateTimer,100);
}

function updateTimer() {
  if (remainingTime <= 0) {
    gameOver("Time is over!");
    return;
  }
  if (!Number.isInteger(remainingTime / 1000)) {
    timer.innerHTML = remainingTime / 1000;
  } else {
    timer.innerHTML = (remainingTime / 1000).toString() + ".0";
  }
  remainingTime -= 0.1 * 1000;
}
startTimer()

const fullscreenCheckbox = document.querySelector("input");

fullscreenCheckbox.addEventListener("input",function() {
  if (fullscreenCheckbox.checked) {
    document.documentElement.requestFullscreen();
    buttonsGroup.classList.add("upper");
    const restartButton = document.getElementById("restartButton");
    if (restartButton !== null) {
      restartButton.classList.add("upper");
    }
  } else {
    document.exitFullscreen();
    buttonsGroup.classList.remove("upper");
    const restartButton = document.getElementById("restartButton");
    if (restartButton !== null) {
      restartButton.classList.remove("upper");
      restartButton.classList.remove("upper");
    }
  }
});
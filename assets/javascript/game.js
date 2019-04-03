
// Getting html elements

var attemptsElement = document.getElementById("attempts");
var answerLettersElement = document.getElementById("answerLetters");
var guessedLettersElement = document.getElementById("guessedLetters");
var message = document.getElementById("message");
var message2 = document.getElementById("message2");
var winCount = document.getElementById("win");
var loseCount = document.getElementById("lose");
var audio = document.getElementById("audio");
var image = document.getElementById("image");
var difficultyButtons = document.getElementById("difficulties").querySelectorAll("button");


// Initializing variables

var answer
var attempts
var answerArray = [];
var guessArray = [];
var guessedLetters = [];
var numWins = 0;
var numLoses = 0;
var difficulties = 1;
var gameStates = {
    idle: 0,
    running: 1,
    ended: 2
}
var gameState;

idle();

document.onkeypress = function (key) {
    switch (gameState) {
        case gameStates.idle:
            console.log("Message - 900");
            console.log(key);
            if (key.keyCode == 13) {
                runGame();
            }
            break;
        case gameStates.running:
            console.log("Message - 901");
            if (key.keyCode >= 97 && key.keyCode <= 122) {
                checkKey(key);
            }
            break;
        case gameStates.ended:
            break;
    }
};

function idle() {
    gameState = gameStates.idle;
    message.textContent = "Press Enter/Return Key to Start";
    message.classList.add("blink");
}

function runGame() {
    gameState = gameStates.running;
    message.classList.remove("blink");
    message.textContent = "Good Luck!";
    setup();
    updateUI();
}

function checkKey(key) {
    letter = key.key.toUpperCase();

    // compare user input with answer array,
    // if matching letter, update guessed array

    // -- attempt counter
    if (!letterExist(letter)) {
        // console.log("executing");
        guessedLetters.push(letter);
        if (!checkLetter(letter)) { attempts--; }
        updateUI();

        // check win/lose condition
        if (checkWinCondition()) {
            win();
        } else if (attempts <= 0) {
            lose();
        }
    }
}


function setup() {
    // Setup:
    // Reset number of attempts
    // Random an answer
    // clear guessed letter and answer
    // Create answer array to match answer
    // create number of underlines equal to number of letters
    console.log("Starting New Game");
    if (difficulties === 2) {
        attempts = 4;
    } else {
        attempts = 8;
    }
    answerChosen = answerList[Math.floor(Math.random() * answerList.length)];
    answer = answerChosen.name;
    var audioFile = answerChosen.audioSrc;
    var imageFile = answerChosen.pictureSrc;
    audio.src = "./assets/mp3/" + audioFile;
    image.src = "./assets/pic/" + imageFile;
    answerArray = [];
    guessArray = [];
    guessedLetters = [];
    console.log("Answer: " + answer);

    answer = answer.toUpperCase();
    answerArray = answer.split("");
    answerArray.forEach(e => {
        if (e === " " || e === "'") {
            guessArray.push(e);
        } else {
            guessArray.push("_");
        }
    });
}

function updateUI() {
    // Display guessed answer progress
    attemptsElement.textContent = +attempts;
    answerLettersElement.textContent = "";
    guessArray.forEach(element => {
        answerLettersElement.append(element);
    });
    // display letters guessed
    guessedLettersElement.textContent = ""
    guessedLetters.forEach(e => {
        guessedLettersElement.append(e);
    });
    var blurPixel;
    switch (difficulties) {
        case 0:
            blurPixel = attempts;
            break;
        case 1:
            blurPixel = attempts * 3;
            break;
        case 2:
            blurPixel = attempts * 10;
    }
    image.style.filter = "blur(" + blurPixel + "px)";

    winCount.textContent = +numWins;
    loseCount.textContent = +numLoses;
}

function checkLetter(letter) {
    var match = false;
    for (var i = 0; i < answerArray.length; i++) {
        if (answerArray[i] === letter) {
            guessArray[i] = letter;
            match = true;
        }
    }
    return match;
}
function letterExist(letter) {
    var match = false;
    guessedLetters.forEach(element => {
        if (element === letter) {
            match = true;
        }
    });
    return match;
}

function checkWinCondition() {
    var match = true;
    for (var i = 0; i < answerArray.length; i++) {
        if (answerArray[i] !== guessArray[i]) {
            match = false;
        }
    }
    return match;
}

function win() {
    console.log("You Win!");
    message2.textContent = "You Win!";
    numWins++;
    endGame();
}
function lose() {
    console.log("You Lost!");
    message2.textContent = "You Lost!";
    numLoses++;
    endGame();
}

function endGame() {
    gameState = gameStates.ended;
    updateUI();
    setTimeout(function () { idle() }, 3000);
}



// Helper functions
function testResources(index = 0, testTime = 10000) {
    var test = answerList[index];
    console.log("Testing " + test.name);
    var audio = new Audio();
    audio.src = "./assets/mp3/" + test.audioSrc;
    image.src = "./assets/pic/" + test.pictureSrc;
    audio.play();

    setTimeout(function () {
        audio.pause();
        if (++index < answerList.length) {
            testResources(index, testTime);
        }
    }, testTime);
}

// Other functions
function changeDifficulty(difficulty) {
    this.difficulties = difficulty;
    difficultyButtons.forEach(button => {
        button.classList.remove("active");
    });
    difficultyButtons[difficulty].classList.add("active");
    idle();
}


// TODOLIST
// eliminate correct answers from answer list
// fix when selecting difficulty, has to click document body to work.
// Add more content
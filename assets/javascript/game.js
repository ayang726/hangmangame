// Model:
// Create ansewr object which include string of answer and it's associated character array, and stores the length of the array.

// Game object keeps track of what character has previously been typed in.
// Houses an answer object taken from answer object library
// Keeps track of how many attempts are left.

// Create ansewr object library, a list of names of popular modern games


// Controller:
// Show how many letters or spaces are in the answer
// Game controller keeps a loop of games

// View:
// index.html
// style.css

// initial setup

var attemptsElement = document.getElementById("attempts");
var answerLettersElement = document.getElementById("answerLetters");
var guessedLettersElement = document.getElementById("guessedLetters");
var message = document.getElementById("message");
var winCount = document.getElementById("win");
var loseCount = document.getElementById("lose");
var audio = document.getElementById("audio");
var image = document.getElementById("image");

// initialize new game
function initializeGameWindow() {
    message.textContent = "Press Enter/Return Key to Start";
    message.classList.add("blink");
    document.onkeypress = function (key) {
        if (key.keyCode === 13) {
            message.textContent = "Good Luck!";
            message.classList.remove("blink");
            gameLoop();
        }
    };
}
initializeGameWindow();

// Initializing variables

var answer
var attempts
var answerArray = [];
var guessArray = [];
var guessedLetters = [];
var numWins = 0;
var numLoses = 0;

// main game loop
function gameLoop() {

    // game starts
    setup();
    updateUI();
    // Receive a user input
    var input = "";

    // add user input to guessed letters
    document.onkeypress = function (key) {
        // console.log(key);
        if (key.keyCode >= 97 && key.keyCode <= 122) {
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
    }
}


function setup() {
    // Setup:
    // Reset number of attempts
    // Random an answer
    // clear guessed letter and answer
    // Create answer array to match answer
    // create number of underlines equal to number of letters
    attempts = 8;
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
    var blurPixel = attempts;
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
    message.textContent = "You Win!";
    numWins++;
    endGame();
}
function lose() {
    console.log("You Lost!");
    message.textContent = "You Lost!";
    numLoses++;
    endGame();
}

function endGame() {
    document.onkeypress = null;
    updateUI();
    setTimeout(initializeGameWindow, 3000);
}

// TODOLIST
// create list of answers
// End game animation
// Add to win lose counter
// restart game
// game loop
// more difficulties
// user images, create image blur animation


// List of games:
// Stardew Valley
// Witcher
// Super Mario
// Cities Skylines
// Darkest Dungeon
// Dirt
// Don't Starve
// Civilization
// Counter Strike
// Portal
// Plants vs zombies    


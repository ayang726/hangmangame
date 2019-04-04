
// Getting html elements

var attemptsElement = document.getElementById("attempts");
var answerLettersElement = document.getElementById("answerLetters");
var guessedLettersElement = document.getElementById("guessedLetters");
var message = document.getElementById("message");
var message2 = document.getElementById("message2");
var winCount = document.getElementById("win");
var loseCount = document.getElementById("lose");
var audio = document.getElementById("audio");
// var image = document.getElementById("image");
var imageContainer = document.getElementsByClassName("image-container")[0];
var difficultyButtons = document.getElementById("difficulties").querySelectorAll("li");


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
var timeout;

idle();

document.onkeypress = function (key) {
    // console.log(key);
    switch (gameState) {
        case gameStates.idle:
            // console.log("Message - 900");

            if (key.keyCode == 13) {
                runGame();
            }
            break;
        case gameStates.running:
            // console.log("Message - 901");
            if (key.keyCode >= 97 && key.keyCode <= 122) {
                checkKey(key);
            }
            break;
        case gameStates.ended:
            clearTimeout(timeout);
            idle();
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
    message2.textContent = "";
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
    var indexChosen = Math.floor(Math.random() * answerList.length);
    answerChosen = answerList.splice(indexChosen, 1)[0];
    answer = answerChosen.name;
    var audioFile = answerChosen.audioSrc;
    var imageFile = answerChosen.pictureSrc;
    audio.src = "./assets/mp3/" + audioFile;
    imageContainer.classList.add("show-image");
    imageContainer.style.backgroundImage = "url(./assets/pic/" + imageFile + ")";
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
    imageContainer.style.filter = "blur(" + blurPixel + "px)";

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
    console.log("You Guess It!");
    message2.textContent = "You Guess It!";
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
    imageContainer.style.filter = "blur()";
    if (answerList.length > 0) {
        timeout = setTimeout(function () { idle() }, 3000);
    } else {
        message.textContent = "The Game Has Ended";
        message2.textContent = "Refresh to play again."
    }
}



// Test functions
function testResources(testTime = 500, index = 0) {
    var test = answerList[index];
    console.log("Testing " + test.name);
    var audio = new Audio();
    audio.src = "./assets/mp3/" + test.audioSrc;
    imageContainer.classList.add("show-image");
    imageContainer.style.backgroundImage = "url(./assets/pic/" + test.pictureSrc + ")";
    audio.play();

    setTimeout(function () {
        audio.pause();
        if (++index < answerList.length) {
            testResources(testTime, index);
        }
    }, testTime);
}
function playMeSomeMusic() {
    var i = Math.floor(Math.random() * answerList.length);
    audio.addEventListener("ended", function () {
        if (answerList.length > 0) {
            i = Math.floor(Math.random(answerList.length));
            var audioObject = answerList.splice(i, 1)[0];
            message2.textContent = audioObject.name
            audioSrc = audioObject.audioSrc;
            audio.src = "./assets/mp3/" + audioSrc;

            audio.play();
        }
        else {
            document.onkeypress = null;
            endGame();
        }
    });
    message2.textContent = answerList[i].name
    audioSrc = answerList[i].audioSrc;
    audio.src = "./assets/mp3/" + audioSrc;
    answerList.splice(i, 1);
    audio.play();
    message.textContent = "";
    document.onkeypress = function (e) {
        if (e.keyCode == 13) {
            console.log("Message - 902");
            audio.currentTime = audio.duration - 0.1;
        }
    };
}

// Other functions
function changeDifficulty(difficulty) {
    this.difficulties = difficulty;
    difficultyButtons.forEach(button => {
        button.classList.remove("active");
    });
    difficultyButtons[difficulty].classList.add("active");
    difficultyButtons[difficulty].blur();
    idle();
}


// TODOLIST
// eliminate correct answers from answer list
// fix when selecting difficulty, has to click document body to work.
// Add more content
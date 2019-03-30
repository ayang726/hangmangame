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
document.onkeypress = function (key) {
    if (key.keyCode === 13) {
        var message = document.getElementById("message");
        message.textContent = "Good Luck!";
        message.classList.remove("blink");
        gameLoop();
    }
};

var attempts = 20;
var answer = "STARDEW VALLEY";
var attemptsElement = document.getElementById("attempts");
var answerLettersElement = document.getElementById("answerLetters");
var guessedLettersElement = document.getElementById("guessedLetters");

var answerArray = [];
var guessArray = [];
var guessedLetters = [];

function setup() {
    // Setup:
    // Reset number of attempts
    // Random an answer
    // clear guessed letter and answer
    // Create answer array to match answer
    // create number of underlines equal to number of letters
    attempts = 20;
    answer = "STARDEW VALLEY"
    answerArray = [];
    guessArray = [];
    guessedLetters = [];

    for (var i = 0; i < answer.length; i++) {
        answerArray[i] = answer[i];
        if (answerArray[i] === " ") {
            guessArray[i] = " ";
        } else {
            guessArray[i] = "_";
        }
    }
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
}

function gameLoop() {

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
    endGame();
}
function lose() {
    console.log("You Lost!");
    endGame();
}

function endGame() {
    document.onkeypress = null;
}

// TODOLIST
// create list of answers
// End game animation
// Add to win lose counter
// restart game
// game loop
// more difficulties
// user images, create image blur animation
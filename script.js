let ranum = Math.floor(Math.random() * 100) + 1;
console.log(ranum);

let input = document.getElementById("guessField")
let button = document.getElementById("submit");
let guesses = document.getElementById("guesses");
let remaining = document.getElementById("remaining");
let lowOrHigh = document.getElementById("lowOrHigh")
let alertMsg = document.getElementById("alert");
let restart = document.getElementById("restart");
let main = document.getElementById("main");

let remainingAttempts = 6;
let playGame = true;
input.focus();

if (playGame) {
    button.addEventListener("click", (event) => {
        input.focus();
        event.preventDefault();
        let inputNum = Number(input.value);
        validateInput(inputNum);
    });
}

function validateInput(guess) {
    if (guess <= 0 || isNaN(guess) || guess > 100) {
        alertMsg.style.display = "inline";
    } else {
        remainingAttempts--;
        alertMsg.style.display = "none";
        if (!remainingAttempts) {
            displayGuess(guess);
            if (acknowledgeGuess(guess) === false) {
                input.placeholder = "ゲームオーバー";
                lowOrHigh.style.color = "rgb(211, 0, 74)";
                displayMessage(`L bruh, the number was ${ranum}`);
            }
            endGame();

        } else {
            displayGuess(guess);
            acknowledgeGuess(guess);
        }
    }
}

function acknowledgeGuess(guess) {
    if (guess == ranum) {
        input.placeholder = "ウィナー !!!";
        lowOrHigh.style.color = "cyan";
        displayMessage("You guessed it right !");
        endGame();
    } else if (guess < ranum) {
        displayMessage("You guessed it too low");
        return false;
    } else {
        displayMessage("Your guess is higher");
        return false;
    }
}

function displayGuess(guess) {
    //clear the input box
    input.value = '';
    // update the previous guesses
    guesses.innerHTML += `${guess}   `;
    remaining.innerHTML = remainingAttempts;
}

function displayMessage(message) {
    //display all messages including ...
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    playGame = false;
    input.value = '';
    input.setAttribute('disabled', '');
    restart.style.display = "inline";
}

restart.addEventListener('click', (event) => {
    event.preventDefault();
    newGame();

})

function newGame() {
    lowOrHigh.style.color = "white";
    ranum = Math.floor(Math.random() * 100) + 1;
    console.log(ranum);
    remainingAttempts = 6;
    remaining.innerHTML = remainingAttempts;
    guesses.innerHTML = "";
    restart.style.display = "none";
    lowOrHigh.innerHTML = "";
    input.placeholder = "enter a number"
    input.removeAttribute('disabled');
    input.focus();
    playGame = true;

}

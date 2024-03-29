// Letters
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Contaniner
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {
    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter)

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = 'letter-box';

    // Append Span To Letter Container
    lettersContainer.appendChild(span)
});

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "dart", "less", "mysql", "python", "sql"],
    movies: ["Queen's Gambit", "Harry Poter", "Spider Man", "Batman", "Coco", "Up"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Japan", "Germeny", "Saudi Arabia", "Sweden"]
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {
    // Create Empty Span
    let emptySpan = document.createElement("span");

    // If Letter Is Space
    if (letter === ' ') {
        // Add Class To The Span
        emptySpan.className = 'with-space';
    }

    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Span
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handel Clicking On Letters
document.addEventListener("click", (e) => {
    // Set The Choose Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");

        // Get Cliked Letter
        let theClikedLetter = e.target.innerHTML.toLowerCase();

        // The Chosen Word
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        // The Spans Word
        let spansWord = "";
        
        theChosenWord.forEach((wordLetter, wordIndex) => {
            // If The Clicked Letter Equal To One Of The Chosen Word Letter
            if (wordLetter == theClikedLetter) {
                // Set Status To True
                theStatus = true;

                // Loop On All Guess Spans
                guessSpans.forEach((span, spanIndex) => {
                    if (wordIndex === spanIndex) {
                        span.innerHTML = theClikedLetter;
                    }

                                        spansWord += span.innerHTML;
                    
                    console.log(spansWord);

                    if (spansWord.length == randomValueValue.length) {
                        setTimeout(() => {
                            location.reload();
                        }, 1100);
                    }
                });
            }
        });

        // If Letter Is Wrong
        if (theStatus !== true) {
            // Increase The Wrong Atempts
            wrongAttempts++;

            // Add Class Wrong On The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            // Play Fail Sound
            document.getElementById("fail").play();

            if (wrongAttempts === 8) {
                endGame();

                lettersContainer.classList.add("finished");
            }

        } else {
            // Play Sucess Sound
            document.getElementById("success").play();
        }
    }
});

// End Game Function

function endGame() {
    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = "popup";

    // Append To The Body
    document.body.appendChild(div);
    
    setTimeout(() => {
        location.reload();
    }, 1500);
}

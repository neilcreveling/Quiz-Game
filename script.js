// create global variables
var timeLeft; // time left
var timeInterval; // timer interval
var quizCurrent; // current question
var answerChoice; // the 4 answer choices
var finalScore; // score at the end of the game
var currentLeaderboard; // current leaderboard
var initials; // name entry value

// questions and answers added as an array, so they can be handled easily using js methods later on
var quizQuestionsAnswers = [
    {
        question: "<h2 data-state='correct'>About how many breeds of cats are there?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>15</button>",
            "<button type='button' data-value='1' data-state='incorrect'>35</button>",
            "<button type='button' data-value='2' data-state='correct'>70</button>",
            "<button type='button' data-value='3' data-state='incorrect'>100</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>Are cats the first, second, third, or fourth most popular pet in the U.S.?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>first</button>",
            "<button type='button' data-value='1' data-state='correct'>second</button>",
            "<button type='button' data-value='2' data-state='incorrect'>third</button>",
            "<button type='button' data-value='3' data-state='incorrect'>fourth</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>About how many cats are alive on earth?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>100 - 200 million</button>",
            "<button type='button' data-value='1' data-state='incorrect'>200 - 300 million</button>",
            "<button type='button' data-value='2' data-state='correct'>300 - 400 million</button>",
            "<button type='button' data-value='3' data-state='incorrect'>over 400 million</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>When were the first instances of domesticated cats?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='correct'>7,500 BC</button>",
            "<button type='button' data-value='1' data-state='incorrect'>5,000 BC</button>",
            "<button type='button' data-value='2' data-state='incorrect'>2,500 BC</button>",
            "<button type='button' data-value='3' data-state='incorrect'>1,000 BC</button>"
        ]
    },
    {
        question: "<h2 data-state='correct'>How heavy was the heaviest known cat?</h2>",
        answers: [
            "<button type='button' data-value='0' data-state='incorrect'>25 pounds</button>",
            "<button type='button' data-value='1' data-state='incorrect'>40 pounds</button>",
            "<button type='button' data-value='2' data-state='correct'>50 pounds</button>",
            "<button type='button' data-value='3' data-state='incorrect'>65 pounds</button>"
        ]
    }
]

// add query selectors for elements on page
var mainBody = document.querySelector(".main");
var highScoresBtn = document.querySelector(".high-scores");
var timerEl = document.querySelector(".time-left");
var quizQuestionEl = document.querySelector(".quiz-question");
var quizChoiceEl = document.querySelector(".quiz-choice");
var startBtnEl = document.querySelector(".start-button");
var correctIncorrectEl = document.querySelector(".correct-incorrect");

// create function to initialize quiz
function quizInit() {
    quizCurrent = 0; // starts at first question (0)
    startTimer(); // starts the timer function
    removeButtons(); // initialize start button
    clearQuestionsChoices(); // removes question and answer choices
    buildQuestionsChoices(quizCurrent); // build question and answers based on current question
}

// timer function
function startTimer() {
    timeLeft = 60;
    timeInterval = setInterval(() => {
        if (timeLeft > 0){
            timeLeft--;
            timerEl.textContent = timeLeft;
        } else {
            clearInterval(timeInterval);
            timerEl.textContent = timeLeft;
            quizEnd();
        }
    }, 1000);
}

// check if quiz is finished
function quizEnd(){
    // time runs out
    if (timeLeft <= 0){
        finalScore = timeLeft;
        gameOver();
    // all questions answered
    } else if (quizCurrent === quizQuestionsAnswers.length){
        clearInterval(timeInterval);
        finalScore = timeRemaining;
        gameOver();
    }
}

// Function to remove the questions and answers
function clearQuestionsChoice(){
    // remove question element children
    quizQuestionEl.firstElementChild.remove();
    // loop that removes all children elements of quiz-choice class, if they exist
    for (var i = 0; i < quizChoiceEl.length; i++){
        if (quizChoiceEl[i].firstElementChild !== null){
            quizChoiceEl[i].firstElementChild.removeEventListener("click", selectAnswer);
            quizChoiceEl[i].firstElementChild.remove();
        }
    }
}

// build question and answer choices, adds click event listeners for answer selection
function buildQuestionsChoices(questionNum){
    // pulls question element with a question from quizQuestionsAnswers
    quizQuestionEl.innerHTML = quizQuestionsAnswers[questionNum].question;
    // loop that adds the questions as children to the quiz-choice class
    for (var i = 0; i < quizChoiceEl.length; i++){
        quizChoiceEl[i].innerHTML = quizQuestionsAnswers[questionNum].answers[i];
        quizChoiceEl[i].firstElementChild.addEventListener("click", selectAnswer);
    }
}

// removes button capability
function removeButtons(){
    if (startBtnEl.firstElementChild !== null){
        for (var i = 0; i <= startButtonEl.childElementCount; i++){
            startButtonEl.firstElementChild.remove();
        }
    }
}

// builds button element with class, text, function
function buildButton(cla, txt, func){
    cla = document.createElement("button");
    cla.setAttribute("class", cla);
    txt = document.createTextNode(txt);
    cla.appendChild(txt);
    startBtnEl.appendChild(cla);
    cla.addEventListener("click", func);
}

// select an answer upon click
function selectAnswer(event){
    event.stopPropagation();
    event.preventDefault();
    // "data-value" attribute of that button
    answerChoice = event.target.getAttribute("data-value");
    correctIncorrect(answerChoice);
    quizCurrent++;
    quizEnd();
    // if quiz is not over, build next question
    if (quizCurrent !== quizQuestionsAnswers.length){
        buildQuestionsChoices(quizCurrent);
    }
}

// displays if answer is correct or incorrect
function correctIncorrect(choice){
    // declare variables for qestion and answers, "data-states" for correct and incorrect
    var questionState = quizQuestionEl.firstElementChild.getAttribute("data-state");
    var answerState = quizChoiceEl[choice].firstElementChild.getAttribute("data-state");
    compareAnswer(questionState, answerState);
}

// works with previous function, compares the "data-state" correct and incorrect attributes between question and answer
function compareAnswer(q, a){
    if (q === a){
        quickMessage("Correct!");
    } else {
        quickMessage("Incorrect!");
        timeRemaining -= 5; // subtract time if answer was wrong
    }
}

 // works with previous function, creates quick message during game
 function quickMessage(message){
    var quickTimer = 4;
    var quickInterval = setInterval(() => {
        if (quickTimer !== 0){
            quickTimer--;
            answerValidityEl.textContent = message;
        } else {
            clearInterval(quickInterval);
            answerValidityEl.textContent = " ";
        }
    }, 250);
}

// end of game page
function gameOver(){
    clearQuestionsChoices();
    // HTML elements for end screen
    quizQuestionEl.innerHTML = "<h2>Your final score is " + finalScore + ".</h>";
    quizChoiceEl[0].innerHTML = "<label for='highscore'>Enter your name or initials to submit your score:</label>";
    quizChoiceEl[1].innerHTML = "<input type='text' class='initials'>";
    quizChoiceEl[2].innerHTML = " ";
    quizChoiceEl[3].innerHTML = " ";
    quizChoiceEl[1].firstElementChild.focus();
    buildButton("submit", "Submit Score!", submitScore);
    correctIncorrectEl.textContent = " ";
    initials = document.querySelector(".initials");
    // set currentLeaderboard variable to localStorage's values, and turns it from a JSON string to an array
    currentLeaderboard = JSON.parse(localStorage.getItem("scoreArray")) || []; 
}

// submit a score
function submitScore() {
    var newScore = {
        score: finalScore,
        name: initials.value
    }
    currentLeaderboard.push(newScore); // pushes newScore onto leaderboard
    currentLeaderboard.sort(compareHighScore); // only the top 4 scores show
    localStorage.setItem("scoreArray", JSON.stringify(currentLeaderboard)); // turns the currentLeaderboard back into a JSON string
    buildHighScores(); 
}

// organizes scores in leaderboard by comparing them with sort
function compareHighScore(a, b) {
    var playerA = a.score;
    var playerB = b.score;
    var comparison = 0;
    if (playerA > playerB){
        comparison = 1;
    } else if (playerA < playerB){
        comparison = -1;
    }
    return comparison * -1;
}
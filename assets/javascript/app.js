//Variables =====================
var qPointer = 1; //points to the number of the current question
var QPointer = "q" + qPointer; //points to the full name of the question
var guess = ""; //answer choice the user clicks
var score = 0; //total number of correct guess by the user
var intervalID; //holds the interval for the questions
var timer = 30; //seconds left on the question timer

var quiz = {
    q1: {
        question: "What is the collective name for a group of lions?",
        ansA: "Band",
        ansB: "Pod",
        ansC: "Pride",
        ansD: "Pack",
        correctLetter: "C",
        correctAns: "Pride",
    },

    q2: {
        question: "Which mammal lays eggs?",
        ansA: "Sumatran Rhinoceros",
        ansB: "Long-beaked Echnidna",
        ansC: "Mountain Pygmy Possum",
        ansD: "Duck Billed Platypus",
        correctLetter: "D",
        correctAns: "Duck Billed Platypus",
    },

    q3: {
        question: "Which modern bird has the largest wingspan of any living bird?",
        ansA: "Albatross",
        ansB: "Bald Eagle",
        ansC: "Andean Condor",
        ansD: "Great White Pelican",
        correctLetter: "A",
        correctAns: "Albatross",
    },

    q4: {
        question: "How many legs does a lobster have?",
        ansA: "8",
        ansB: "10",
        ansC: "12",
        ansD: "6",
        correctLetter: "B",
        correctAns: "10",
    },

    q5: {
        question: "A 'Murder' is the collective noun for a group of which animal?",
        ansA: "Ravens",
        ansB: "Crows",
        ansC: "Sharks",
        ansD: "Bears",
        correctLetter: "B",
        correctAns: "Crows",
    },

    q6: {
        question: "Which is NOT a characteristic of reptiles?",
        ansA: "Most Lay Eggs",
        ansB: "They have thick, scaly skin",
        ansC: "They are warmblooded",
        ansD: "They breathe with lungs",
        correctLetter: "C",
        correctAns: "They are warmblooded",
    },

    q7: {
        question: "What animal produces gossamer?",
        ansA: "Spiders",
        ansB: "Worms",
        ansC: "Caterpillars",
        ansD: "Goats",
        correctLetter: "A",
        correctAns: "Spiders",
    },

    q8: {
        question: "What animal has the longest lifespan'?",
        ansA: "Elephant",
        ansB: "Blue Whale",
        ansC: "Giant Tortoise",
        ansD: "Locust",
        correctLetter: "C",
        correctAns: "Giant Tortoise",
    },

    q9: {
        question: "What is the fastest flying bird in the world?",
        ansA: "Spine-Tailed Swift",
        ansB: "Horned Sungem",
        ansC: "Harpy Eagle",
        ansD: "Peregrine Falcon",
        correctLetter: "D",
        correctAns: "Peregrine Falcon",
    },

    q10: {
        question: "Which animal has the highest blood pressure?",
        ansA: "Blue Whale",
        ansB: "Giraffe",
        ansC: "Elephant",
        ansD: "Flea",
        correctLetter: "B",
        correctAns: "Giraffe",
    }
};

var objArray = Object.keys(quiz); //puts object properties into an array
var quizLen = objArray.length; //length of array (aka number of questions in quiz)

//Functions =====================
function guessChecker(){  //Checks for right or wrong answers
    if (guess === quiz[QPointer].correctLetter){ //correct guess will display yes! screen
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div  class="text-success">
            <div class="timer">
                Time Left:
                </div>
                <br>
                <div id="question">You Got it Right!</div>
            </div>
            `
        );
        score++
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
    else{ //wrong guess will display the correct answer
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="text-danger">
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">You Got it Wrong.</div>
            <br>
            <div class="answers">
                <div class="result">The correct answer was: ${quiz[QPointer].correctAns}</div>
            </div>
            </div>
            `
        );
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
};

function loadNext(){  //brings up the next question in the quiz object
    var questionStr = quiz[QPointer].question;
    stop();
    $(".questionArea").empty();
    $(".questionArea").html(
        `
        <div class="card col-10 col-md-6 mx-auto bg-info text-white">
        <div class="card-header">
        <div id="question"><h4>${questionStr}</h4></div>
        <div class="timer">
            Time Left:
        </div>
        </div>
        <div class="card-body">
            <div class="answers">
                <div class="answer my-2" id="choiceA">A. ${quiz[QPointer].ansA}</div>
                <div class="answer my-2" id="choiceB">B. ${quiz[QPointer].ansB}</div>
                <div class="answer my-2" id="choiceC">C. ${quiz[QPointer].ansC}</div>
                <div class="answer my-2" id="choiceD">D. ${quiz[QPointer].ansD}</div>
            </div>
        </div>
        </div>
        `
    );

    //click events store which answer the user guesses and checks to see if it's right
    $("#choiceA").click(function(){
        guess = "A";
        guessChecker();
    });
    $("#choiceB").click(function(){
        guess = "B";
        guessChecker();
    });
    $("#choiceC").click(function(){
        guess = "C";
        guessChecker();
    });
    $("#choiceD").click(function(){
        guess = "D";
        guessChecker();
    });

    run();    
};

function run(){  //resets the countdown to 30, starts counting down every second
    clearInterval(intervalID);
    timer = 30;
    intervalID = setInterval(decrement, 1000);
};

function decrement(){ //keeps the time and prints out remaining time to the page
    timer--;
    $(".timer").text("Time Left: " + timer);

    if (timer === 0){ //if timer reaches 0, time's up! will display before loading the next question
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">Your Time is Up!</div>
            <br>
            <div class="answers">
                <div class="result">The correct answer was: ${quiz[QPointer].correctAns}</div>
            </div>
            `
        );
        qPointer++;
        QPointer = "q" + qPointer;
        stop();
        endCheck();
    }
}

function endCheck(){ //checks to see if the last question has been reached
    if (qPointer>quizLen){ //if all the questions have been displayed, final score is shown
        $(".questionArea").empty();
        $(".questionArea").html(
            `
            <div class="timer">
                Time Left:
            </div>
            <br>
            <div id="question">You have answered all the questions!</div>
            <br>
            <div class="answers">
                <div class="result">Score: ${score}/10</div>
            </div>
            `
        );
    } else{ //if there are questions left, the next question is loaded
        setTimeout(loadNext, 3000);
    }
}

function stop(){ //clears the interval
    clearInterval(intervalID);
};

//Main Process ==================
//Page initializes with first question chosen from question object
$(".questionArea").html(
    `
    <button class="start btn btn-lg bg-success">Start</button>
    `
);
$(".start").click(function(){
    loadNext();
});

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("timer");
const timeRemainingElement = document.getElementById("time-remaining");
const endScreen = document.getElementById("end-screen");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit-button");

const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Highly Textured Modern Language", "Hyper Transfer Markup Language"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which HTML tag is used for creating an ordered list?",
        choices: ["<ol>", "<ul>", "<li>"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which CSS property is used to change the color of text?",
        choices: ["color", "font-color", "text-color"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "In JavaScript, what does the 'DOM' stand for?",
        choices: ["Document Object Model", "Dynamic Object Mechanism", "Data Object Management"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        choices: ["<a>", "<link>", "<hlink>"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which CSS property is used to set the font size of text?",
        choices: ["font-size", "text-size", "font-style"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "In JavaScript, what keyword is used to declare a variable?",
        choices: ["var", "let", "const"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which HTML tag is used for creating an unordered list?",
        choices: ["<ul>", "<ol>", "<li>"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "Which CSS property is used to control the spacing between lines of text?",
        choices: ["line-height", "letter-spacing", "word-spacing"],
        correctChoice: 0,
        score: 10
    },
    {
        question: "In JavaScript, what is the correct syntax to create a function?",
        choices: ["function myFunction() {}", "function = myFunction() {}", "myFunction() = function() {}"],
        correctChoice: 0,
        score: 10
    }
];
let currentQuestionIndex = -1;
let timeRemaining = 60;
let timerInterval;
let score = 0; 

function startQuiz() {
    startScreen.style.display = "none";
    questionContainer.style.display = "block";
    showNextQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeRemaining--;
        timeRemainingElement.textContent = timeRemaining;
        if (timeRemaining <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        choicesElement.innerHTML = "";

        currentQuestion.choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", () => checkAnswer(index));
            choicesElement.appendChild(choiceButton);
        });
    }
}

function checkAnswer(selectedChoice) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedChoice === currentQuestion.correctChoice) {
        score += currentQuestion.score; 
        showNextQuestion();
    } else {
        timeRemaining -= 10; 
        showNextQuestion();
    }
}

function endQuiz() {
    questionContainer.style.display = "none";
    endScreen.style.display = "block";
    finalScoreElement.textContent = "Your final score is " + score; 
    submitButton.style.display = "block";
}

function saveScore() {
    const initials = initialsInput.value;
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({ initials, score });
    localStorage.setItem("scores", JSON.stringify(scores));

    window.location.href = "highscores.html";
}



startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveScore);
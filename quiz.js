function updateText(currentQuestionId, totalQuestions, currentQuestion) {
    const questionCountElement = document.getElementById("questionCount");
    const questionElement = document.getElementById("question");

    //+ 1 because the computer start counting at 0
    questionCountElement.innerText = (currentQuestionId+1) + " von " + (totalQuestions+1) + " Fragen";
    questionElement.innerText = currentQuestion;
}

function updateProgressBar(currentProgress, totalItems) {
    const progressBarElement = document.getElementById("progressBar");
    const progressPercentage = (currentProgress / totalItems) * 100;
    progressBarElement.style.width = String(progressPercentage) + "%";
}

let data;
var currentQuestionId = 0;
var correctAnswers = 0;
var totalQuestions = 0;
var timeLimit = 20;
var secondLeft = 0;

const input = document.getElementById("answerInput");

var validateButton = document.getElementById("validateButton");

validateButton.addEventListener("click", validate);
input.addEventListener("keypress", function(event) {
    if(event.key === "Enter") validate();
})

function startTimer() {
    if(timeLimit == 0) return;
    var timer = setInterval(function() {
        secondLeft--;
        document.getElementById("countdown").innerText = secondLeft + "s";
        if(secondLeft <= 0) {
            validate();
            secondLeft = timeLimit;
        }
    },1000)
}

async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/retrieve');
        data = await response.json();
    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromServer().then(() => {
        totalQuestions = data.length -1;
        updateQuestion();
        secondLeft = timeLimit;
        startTimer();
    });
});

function updateQuestion() {
    if(currentQuestionId > totalQuestions) {
        return
    }
    //clear input field
    input.value = "";

    newQuestion = data[currentQuestionId].question;
    updateText(currentQuestionId, totalQuestions, newQuestion);
    updateProgressBar(currentQuestionId, totalQuestions);
}

function validate() {
    const answer = input.value;

    if(String(data[currentQuestionId].solution) == String(answer)) {
        correctAnswers++;
    }
    console.debug(correctAnswers);
    currentQuestionId++;
    if(timeLimit != 0) secondLeft = timeLimit;
    
    if(currentQuestionId > totalQuestions) {
        const queryString = "result.html" + "?correct=" + encodeURIComponent(correctAnswers) + "&total=" + encodeURIComponent(totalQuestions+1);
        window.location.href = queryString;
    }
    updateQuestion();
}
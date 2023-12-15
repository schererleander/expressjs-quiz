let data;
let numberOfQuestion = 0;
let rightAnswers = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromServer().then(() => {
        updateText(numberOfQuestion, data.length, data[numberOfQuestion].question);
    });
    setupEventListeners();
});

async function fetchDataFromServer() {
    try {
        const response = await fetch('http://localhost:3000/database');
        data = await response.json();
    } catch (error) {
        console.error('Error fetching data from server:', error);
    }
}

function setupEventListeners() {
    const nextButton = document.getElementById('next');
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            validate();
        });
    } else {
        console.error('Next button not found.');
    }
}

function updateText(counter, quantity, question) {
    document.getElementById("questionCount").innerText = counter + " von " + quantity + " Fragen";
    document.getElementById("question").innerText = question;
}

function updateProgessBar(counter, quantity) {
    document.getElementById("progressBar").setAttribute("width", String((counter/quantity)/100) + "px");
}

function validate() {
    let answer = document.getElementById("answerInput").value;
    if(String(answer) == String(data[numberOfQuestion].solution)) {
        rightAnswers++;
        console.debug("Richtig");
    } else { console.debug("Falsch") }
    numberOfQuestion++;
    document.getElementById("answerInput").value = "";
    updateText(numberOfQuestion, data.length, data[numberOfQuestion].question);
}

console.log(data);

//nextAnwser();
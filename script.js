// Selectors
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

const elements = {
  startButton: select("#start"),
  questionSpace: select(".question"),
  answers: selectAll(".answers button"),
  scoreLocation: select(".score"),
  retryButton: select(".retry"),
  timeLeft: select(".time"),
  finalDisplay: select(".score"),
  submitButton: select(".enter"),
  outOfTime: select(".OOT"),
  input: select(".name"),
};

var score = 0;
var secondsLeft = 60; // corrected variable name

const questions = [
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answers: [
      "To check if a variable is defined",
      "To determine the type of a variable",
      "To convert a string to a number",
      "To concatenate strings",
    ],
    answer: 1, // Index of the correct answer in the choices array (0-based index)
  },
  {
    question: "What does the 'NaN' value represent in JavaScript?",
    answers: ["'Not a Number'", "Null", "Undefined", "Negative"],
    answer: 0,
  },
  {
    question: "What is the result of 5 + '5' in JavaScript?",
    answers: ["10", "'55'", "5", "Error"],
    answer: 1,
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: ["Array", "Object", "List", "String"],
    answer: 2,
  },
  {
    question: "What does the '&&' operator do in JavaScript?",
    answers: ["Logical AND", "Logical OR", "Logical NOT", "Bitwise AND"],
    answer: 0,
  },
];

// Event listeners
elements.startButton.addEventListener("click", startQuiz);
elements.answers.forEach((button) =>
  button.addEventListener("click", answerQuestion)
);
elements.retryButton.addEventListener("click", resetQuiz);

// Timer
var timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    secondsLeft--;
    elements.timeLeft.textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      timesUp();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Quiz
let currentQuestionIndex = 0;

function startQuiz() {
  elements.questionSpace.style.display = "block"; // corrected element reference
  elements.answers.forEach((button) => (button.style.display = "block"));
  startTimer();
  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  const question = questions[index];
  elements.questionSpace.textContent = question.question;
  question.answers.forEach((answer, i) => {
    elements.answers[i].textContent = answer;
  });
}

function answerQuestion(event) {
  const clickedElement = event.target;
  const selectedAnswer = clickedElement.textContent;
  const correctIndex = questions[currentQuestionIndex].answer; // corrected variable name

  if (
    selectedAnswer === questions[currentQuestionIndex].answers[correctIndex]
  ) {
    score++;
    elements.finalDisplay.textContent = "Correct: " + score;
  } else {
    secondsLeft -= 10;
    elements.finalDisplay.textContent = "Wrong: " + score;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  stopTimer();
  elements.questionSpace.style.display = "none";
  elements.answers.forEach((button) => (button.style.display = "none"));
  elements.submitButton.style.display = "block";
  elements.finalDisplay.textContent = "Score: " + score;
}

// Retry
function resetQuiz() {
  elements.scoreLocation.style.display = "none";
  elements.outOfTime.style.display = "none";
  elements.questionSpace.style.display = "block";
  elements.finalDisplay.textContent = "";
  score = 0;
  secondsLeft = 60;
  currentQuestionIndex = 0;
  startQuiz();
}

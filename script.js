// Constants for querySelectors
const selectors = {
  header: ".header",
  startButton: "#start",
  questionSpace: ".questionText",
  answers: ".answers",
  scoreLocation: ".score",
  retryButton: ".retry",
  timeLeft: ".timer",
  message: ".message",
  submit: ".submit",
  finalScoreDisplay: "p",
  submitButton: ".enter",
  TimeIsUP: ".TIU",
  Scores: "ul",
  input: ".name",
  retryButton: ".retry",
};

// Destructuring assignment to get selectors
const {
  header,
  startButton,
  questionSpace,
  answers,
  scoreLocation,
  retryButton,
  timeLeft,
  message,
  submit,
  finalScoreDisplay,
  submitButton,
  TimeIsUP,
  Scores,
  input,
} = selectors;

// User input variables
let score = 0;
let scores = JSON.parse(localStorage.getItem("scores")) || [];

const questions = [
  {
    question: "What is the purpose of the 'typeof' operator in JavaScript?",
    answers: [
      "To check if a variable is defined",
      "To determine the type of a variable",
      "To convert a string to a number",
      "To concatenate strings",
    ],
    correct: 1, // Index of the correct answer in the choices array (0-based index)
  },
  {
    question: "What does the 'NaN' value represent in JavaScript?",
    answers: ["'Not a Number'", "Null", "Undefined", "Negative"],
    correct: 0,
  },
  {
    question: "What is the result of 5 + '5' in JavaScript?",
    answers: ["10", "'55'", "5", "Error"],
    correct: 1,
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    answers: ["Array", "Object", "List", "String"],
    correct: 2,
  },
  {
    question: "What does the '&&' operator do in JavaScript?",
    answers: ["Logical AND", "Logical OR", "Logical NOT", "Bitwise AND"],
    correct: 0,
  },
];

// Timer variables
let timeStop = 0;
let secondsLeft = 60;
let timerInterval;

// Event listeners
document.querySelector(startButton).addEventListener("click", startQuiz);
document.querySelector(answers).addEventListener("click", changeQuestion);
document.querySelector(submitButton).addEventListener("click", displayScore);
document.querySelector(retryButton).addEventListener("click", resetQuiz);

// Functions for timer
function startTimer() {
  timerInterval = setInterval(() => {
    secondsLeft--;
    document.querySelector(timeLeft).textContent = secondsLeft;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  if (timeStop === 0) {
    timesUp();
  }
}

function timesUp() {
  document.querySelector(TimeIsUP).textContent = "Time's Up!";
  document.querySelector(TimeIsUP).style.display = "flex";
  document.querySelector(questionSpace).style.display = "none";
  document.querySelector(answers).style.display = "none";
  document.querySelector(scoreLocation).style.display = "block";
}

// Functions for quiz
function startQuiz() {
  document.querySelector(header).style.display = "none";
  document.querySelector(questionSpace).parentNode.style.display = "flex";
  document.querySelector(answers).style.display = "block";
  startTimer();
  displayQuestion(questions[0]);
}

function changeQuestion(event) {
  const target = event.target;
  const currentQuestionIndex = questions.findIndex(
    (question) =>
      question.question === document.querySelector(questionSpace).textContent
  );
  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect =
    target.textContent === currentQuestion.answers[currentQuestion.correct];

  if (isCorrect) {
    score++;
    document.querySelector(message).textContent = `Correct: ${score}`;
  } else {
    secondsLeft -= 10;
    document.querySelector(message).textContent = `Wrong: ${score}`;
  }

  if (currentQuestionIndex < questions.length - 1) {
    const nextQuestion = questions[currentQuestionIndex + 1];
    displayQuestion(nextQuestion);
  } else {
    finishQuiz();
  }
}

function displayQuestion(question) {
  document.querySelector(questionSpace).textContent = question.question;
  question.answers.forEach((answer, index) => {
    document.querySelector(`${answers} .answer-${index}`).textContent = answer;
  });
}

function finishQuiz() {
  document.querySelector(questionSpace).parentNode.style.display = "none";
  document.querySelector(answers).style.display = "none";
  document.querySelector(submit).style.display = "block";
  document.querySelector(retryButton).style.display = "block";
  timeStop++;

  document.querySelector(finalScoreDisplay).textContent = `Score: ${score}`;
}

// Function for scoring
function displayScore(event) {
  event.preventDefault();
  const quizzerName = document.querySelector(input).value.trim();

  if (quizzerName.length > 0) {
    scores.push({ qName: quizzerName, score: score.toString() });
    document.querySelector(submit).style.display = "none";
    document.querySelector(scoreLocation).style.display = "block";
    renderScoreBoard();
    saveScores();
  }
}

function renderScoreBoard() {
  const scoresList = document.querySelector(Scores);
  scoresList.innerHTML = "";

  scores.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = `Name: ${entry.qName}, Score: ${entry.score}`;
    li.setAttribute("data-index", index);
    scoresList.appendChild(li);
  });
}

function saveScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Function to reset quiz
function resetQuiz() {
  document.querySelector(scoreLocation).style.display = "none";
  document.querySelector(TimeIsUP).style.display = "none";
  document.querySelector(header).style.display = "block";
  document.querySelector(finalScoreDisplay).textContent = "";
  document.querySelector(input).value = "";
  doncument.querySelector(retryButton).style.display = "none";
  score = 0;
  secondsLeft = 60;
  timeStop = 0;
  document.querySelector(questionSpace).textContent = questions[0].question;
  questions[0].answers.forEach((answer, index) => {
    document.querySelector(`${answers} .answer-${index}`).textContent = answer;
  });
}

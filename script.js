const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");

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

import { getNamesFromStorage } from "../utils/misc.js";
import { questions } from "../questions.js";
import { QuestionManager } from '../utils/questionManager.js';

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const questionDisplay = document.querySelector(".question")
const counter = document.querySelector("#counter")

const names = getNamesFromStorage();

if(!names || names.length < 1){
    location.pathname = '/names/names.html'
}

let question = null;
const questionManager = new QuestionManager(questions, names)

function updateDisplay(){
    questionDisplay.textContent = question;
    counter.textContent = questionManager.getQuestionNumber();
};

nextBtn.addEventListener("click", () => {
    question = questionManager.getNextQuestion();
    updateDisplay();
});

prevBtn.addEventListener("click", () => {
    question = questionManager.getPreviousQuestion();
    updateDisplay();
});

question = questionManager.getNextQuestion();
updateDisplay()
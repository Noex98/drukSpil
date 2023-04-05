import { getNamesFromStorage } from "../utils.js";
import { questions as questionRaw } from "../questions.js";

const namesFromStorage = getNamesFromStorage();

if(!namesFromStorage || namesFromStorage.length < 1){
    location.pathname = '/names/names.html'
}

const questions = questionRaw.filter(question => {
    return (
        question.minPlayers <= namesFromStorage.length &&
        question.maxPlayers >= namesFromStorage.length
    )
})

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");
const questionDisplay = document.querySelector(".question")
let prevQuestion = null;
let currentQuestion = null;

function updateQuestionDisplay(){
    questionDisplay.textContent = currentQuestion.text;
};

function getNewQuestion(){
    prevQuestion = currentQuestion
    let qIndex = Math.floor(Math.random() * questions.length);
    while (currentQuestion == questions[qIndex]){
        qIndex = Math.floor(Math.random() * questions.length);
    }
    currentQuestion = {
        ...questions[qIndex],
        text: replacePersonNames(questions[qIndex])
    };
};

function replacePersonNames(question) {
    let usedNames = [];
    return question.text.replace(/&person&/g, () => {
      let newName;
      do {
        newName = namesFromStorage[Math.floor(Math.random() * namesFromStorage.length)];
      } while (usedNames.includes(newName));
      usedNames.push(newName);
      return newName;
    });
  }

nextBtn.addEventListener("click", () => {
    getNewQuestion();
    updateQuestionDisplay();
});

prevBtn.addEventListener("click", () => {
    currentQuestion = prevQuestion;
    updateQuestionDisplay();
});

getNewQuestion()
updateQuestionDisplay()
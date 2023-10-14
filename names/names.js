import { getNamesFromStorage } from "../utils/misc.js";

const addNameBtn = document.querySelector("#addNameBtn");
const personContainer = document.querySelector(".names");
const nextBtn = document.querySelector("#nextBtn");

const namesFromStorage = getNamesFromStorage();

window.saveNameState = () => {
    const inputs = personContainer.querySelectorAll("input");
    const names = [...inputs].map((input) => {
        return input.value;
    }).filter(name => {
        return !!name
    });

    localStorage.setItem("names", JSON.stringify(names));
};

window.addNameInput = (value) => {
    let element = document.createElement("div");
    element.innerHTML = /*html*/ `
        <span>
            <input 
                ${!!value ? "value='" + value + "'" : null} 
                type="text"
                oninput="saveNameState()"
            />
            <img
                class="removeNameBtn" 
                src="../icons/trashcan.svg" 
                alt="Remove name" 
                onclick="(() => {
                    this.parentNode.parentNode.remove();
                    window.saveNameState();
                })()"
            />
      </span>
    `;

    personContainer.appendChild(element);
    window.saveNameState();
};

addNameBtn.addEventListener("click", () => addNameInput(""));

nextBtn.addEventListener("click", () => {
    if(getNamesFromStorage().length < 2){
        alert("Tilføj mindst 2 spillere");
    } else {
        location.pathname = "game/game.html"
    }
})

if (namesFromStorage) {
    namesFromStorage.forEach((name) => {
        addNameInput(name);
    });
}


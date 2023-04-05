export function getNamesFromStorage(){
    return JSON.parse(localStorage.getItem("names"));
}
const quote = document.getElementById('quote');
const input = document.getElementById('typed-value');
const start = document.getElementById('start');

let targetWord;

function startGame() {
    console.log("Game started!");

    targetWord = "typeme";
    quote.innerHTML=`<span>${targetWord}</span>`
}
function checkInput() {
    const currentWord = targetWord;
    const typedValue = input.value.trim();
    if(currentWord != typedValue) {
        input.className = currentWord.startsWith(typedValue) ? "" : "error"
    }
    console.log("Checking, input.value")
}

start.addEventListener('click', startGame);
input.addEventListener('input', checkInput)

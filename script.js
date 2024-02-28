
let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH']
const guess_word = document.getElementById("guess-input")
const button = document.getElementById("guess-button");
const dictionary_word = diccionario[Math.floor(Math.random() * diccionario.length)];
button.addEventListener("click", checkGuess);
function checkGuess() {
    let word = guess_word.value.toUpperCase()
    if (diccionario.includes(word)) {
        console.log("¡Correcto!");
    } else {
        console.log("¡Incorrecto!");
    }
}


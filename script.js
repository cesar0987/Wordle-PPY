const apiUrl = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase';
let wordAPI = 0;

// Realizar la solicitud GET a la API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`La solicitud falló con el código de estado ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    wordAPI = data[0];
    console.log('Palabra generada:', wordAPI);
    console.log(wordAPI)
  })
  .catch(error => {
    console.error('Error al obtener la palabra:', error);
  });
let intentos = 6;
const guess_word = document.getElementById("guess-input")
const button = document.getElementById("guess-button");
const letterContainers = document.getElementById("correct-letters");
const buttonReset = document.getElementById("reset-button");
const buttonGiveUp = document.getElementById("give-up-button");
buttonReset.addEventListener("click", () => {
    location.reload();
});
buttonGiveUp.addEventListener("click", () => { 
    alert("La palabra era: " + wordAPI);
});
button.addEventListener("click", checkGuess);
function checkGuess() {
    if (intentos === 0) {
        alert("Perdiste");
        return;
    }
    let word = guess_word.value.toUpperCase();
    let arrayWord = word.split('');
    let arrayDictionaryWord = (wordAPI).split('');
    let resultado=[]
    if (word.length !== 5) {
        alert("La palabra debe tener 5 letras");
        return;
    }
console.log(arrayWord);
    for (let i=0; i<arrayDictionaryWord.length; i++) {
        const letterContainer = document.createElement("div");
        letterContainer.classList.add("letter-container");
        if (arrayWord[i]===arrayDictionaryWord[i]) {
            letterContainer.classList.add("correct");
        } else {
            letterContainer.classList.add("incorrect");
        }
        letterContainer.innerHTML = arrayWord[i];
        letterContainers.appendChild(letterContainer);
    }
    letterContainers.innerHTML += "<br>";
    intentos--;
    console.log(resultado);
}

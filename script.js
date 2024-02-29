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
const winningMessage = document.getElementById("winning-message");
const losingMessage = document.getElementById("losing-message");
const highScoreDisplay = document.getElementById("boardScore"); 
let correctLetters = 0;
let saveScore = JSON.parse(localStorage.getItem("highScore"));
let highScore = JSON.parse(localStorage.getItem("highScore"));
if (highScore === null) {
    if (saveScore > highScore) {
        localStorage.setItem("highScore", saveScore);
    }
}
else {
    localStorage.setItem("highScore",saveScore);
}
console.log(highScore);
highScoreDisplay.innerHTML = "Puntaje: " + saveScore ;

button.addEventListener("click", checkGuess);
guess_word.addEventListener("keypress",(e)=>{
    if (e.key === "Enter") {
        checkGuess();
    }
}    
    )
buttonReset.addEventListener("click", () => {
    location.reload();
});
buttonGiveUp.addEventListener("click", () => { 
    alert("La palabra era: " + wordAPI);
});
button.addEventListener("click", checkGuess);
function checkGuess() {
    if (intentos === 0) {
        losingMessage.style.display = "block";
        return;
    }
    verification(correctLetters);
    let word = guess_word.value.toUpperCase();
    let arrayWord = word.split('');
    let arrayDictionaryWord = (wordAPI).split('');
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
            correctLetters++;
        }
        else if(arrayDictionaryWord.includes(arrayWord[i])){
            letterContainer.classList.add("parcialCorrect");

        }
        else {
            letterContainer.classList.add("incorrect");
        }
        letterContainer.innerHTML = arrayWord[i];
        letterContainers.appendChild(letterContainer);
    }
    letterContainers.innerHTML += "<br>";
    intentos--;
    verification(correctLetters);
}
function verification(correctLetters){
    if (correctLetters === 5) {
        saveScore++;
        console.log(saveScore)
        localStorage.setItem("highScore",saveScore);
        winningMessage.style.display = "block";
        return;
    }
}

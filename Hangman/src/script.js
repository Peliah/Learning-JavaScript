document.addEventListener('DOMContentLoaded', function () {
    const wordDisplay = document.querySelector('.word-display');
    const keyboardDiv = document.querySelector('.keyboard-space');
    const bar = document.querySelector('.bar');
    const gameModal = document.querySelector('.game-modal');
    const playAgain = document.querySelector('.play-again');

    let currentWord,correctLetters=[], wrongGuessCount = 0;

    const resetgame =()=>{
        correctLetters =[];
        wrongGuessCount = 0;
        getWordRandomly();
        bar.style.height = wrongGuessCount + '%';
        const butn = keyboardDiv.querySelectorAll("button");
        butn.forEach(btn=>btn.disabled=false);
        butn.forEach(btn=>btn.style.cursor = 'pointer');
        butn.forEach(btn=>btn.style.opacity = 1);
        console.log(wrongGuessCount);
        gameModal.style.display ="none"
    }

    const gameOver = (won)=>{
        setTimeout(()=>{
            const modalText = won ? `Yaay!!! You found the word: `:`Awww!!! the correct word was `;
            gameModal.querySelector("img").src =`../assets/images/${won ? 'victory.png' : 'loss.png'}`;
            gameModal.querySelector("h4").innerText =`${won ? 'Congratulations!' : 'Game Over!'}`;
            gameModal.querySelector("p").innerHTML =`${modalText} <b>${currentWord}</b>`;
            
            gameModal.style.display ="flex"
        })
    }

    const getWordRandomly = () => {

        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
        console.log(word, hint);
        currentWord = word;
        document.querySelector(".hints").innerText = `Hint: ${hint}`;
        wordDisplay.innerHTML = word.split("").map(() => `<li class="word-letter"></li>`).join("")
    }

    const pickLetter = (button, letter) => {
        console.log(button, letter);
        button.disabled = true;
        button.style.opacity = 0.6;
        button.style.cursor = 'none';
        if (currentWord.includes(letter)) {
            console.log(letter, " exists in ", currentWord);
            [...currentWord].forEach((wordLetter, index) => {
                if (wordLetter === letter) {
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll('li')[index].innerText = wordLetter;
                    wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
                }
            })
        } else {
            console.log(letter, " doesn't exist in", currentWord);
            if (wrongGuessCount !== 100) {
                wrongGuessCount = wrongGuessCount + 20;
                bar.style.height = wrongGuessCount + '%';
            } else {
                return gameOver(false)
            }
            console.log(wrongGuessCount);

        }

        if (wrongGuessCount === 100) return gameOver(false)

        if (correctLetters.length === currentWord.length) return gameOver(true)

    }
    //Creating keyboard dynamically
    for (let index = 97; index < 123; index++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(index);
        keyboardDiv.appendChild(button);
        button.addEventListener("click", e => pickLetter(e.target, String.fromCharCode(index)));
    }

    getWordRandomly()
    playAgain.addEventListener("click", resetgame)
});

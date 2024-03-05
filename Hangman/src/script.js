document.addEventListener('DOMContentLoaded', function () {
    const wordDisplay = document.querySelector('.word-display');
    const keyboardDiv = document.querySelector('.keyboard-space');

    const getWordRandomly = () => {
        const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]
        console.log(word, hint);
        document.querySelector(".hints").innerText = hint;
        wordDisplay.innerHTML = word.split("").map(() => `<li class="word-letter"></li>`).join("")
    }

    //Creating keyboard dynamically
    for (let index = 97; index < 123; index++) {
        const button = document.createElement("button");
        button.innerText = String.fromCharCode(index);
        keyboardDiv.appendChild(button);
    }

    getWordRandomly()
});

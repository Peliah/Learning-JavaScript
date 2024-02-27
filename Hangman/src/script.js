const wordDisplay = document.querySelector(".word-display");
const keyboardDiv = document.getElementsByClassName('.keyboard-space')[0];
const keyboard = document.getElementById('keyboard');
// const getRandomWord = () =>{
//     const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)];
//     console.log(word, hint);
//     document.querySelector(".hints h4").innerText = "Hint: "+hint;
//     wordDisplay.innerHTML = word.split("").map(()=>``).join("");
// }

//Creating keyboard dynamically
for (let index = 97; index < 123; index++) {
    // console.log(String.fromCharCode(index));
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    // keyboardDiv.appendChild(button);
    // console.log(keyboardDiv);
    // keyboardDiv.getElementsByClassName()
    document.getElementById('keyboard').appendChild(button)
    
}
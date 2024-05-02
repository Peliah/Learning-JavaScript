document.addEventListener('DOMContentLoaded', function () {
    // Variable declaration
    const tiles = document.querySelector('.tiles-container')
    const keyboardDiv = document.querySelector('.keyboard-container');
    const gameModal = document.querySelector('.game-modal');
    const playAgain = document.querySelector('.play-again');
    const qwerty = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
    ]
    const width = 5;
    const height = 6;

    let xAxis = 0;
    let yAxis = 0;

    let correctLetters=[];
    let word = "";

    //get random word
    const getWordRandomly = () => {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        word = wordList[randomIndex].toUpperCase()
        console.log(word);

    }

    const gameOVer = (won)=>{
        // if (won === true){
        //     alert("You won")
        // }else{
        //     alert("You lost, the correct word is "+ word)
        // }
        setTimeout(()=>{
            const modalText = won ? `Yaay!!! You found the word: `:`Awww!!! the correct word was `;
            gameModal.querySelector("img").src =`./src/assets/${won ? 'victory.png' : 'loss.png'}`;
            gameModal.querySelector("h4").innerText =`${won ? 'Congratulations!' : 'Game Over!'}`;
            gameModal.querySelector("p").innerHTML =`${modalText} <b>${word}</b>`;
            
            gameModal.style.display ="flex"
        },500)
    }

    const resetgame =()=>{
        correctLetters = [];
        xAxis = 0;
        yAxis = 0;
        getWordRandomly();
        gameModal.style.display = "none";
      
        // Loop through all tiles and clear their text content
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            const tile = document.getElementById(i.toString() + '-' + j.toString());
            tile.innerText = "";
          }
        }

        // Additionally, remove any class names added for highlighting (optional)
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => tile.classList.remove('correct', 'present', 'absent'));

    }



    // create the tiles
    for (let index = 0; index < 6; index++) {
        for (let j = 0; j < 5; j++) {
            const tile = tiles.appendChild(document.createElement('div'));
            tile.id = index.toString() + '-' + j.toString();
            tile.classList.add("tile");
            tile.innerText = "";
        }
    }

    // Keyboarding
    for (let row = 0; row < qwerty.length; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let col = 0; col < qwerty[row].length; col++) {
            const button = document.createElement("button");
            button.classList.add('key-btns');


            //For the bakspae
            if (qwerty[row][col] === 'Backspace') {
                button.innerHTML = `<img src="./src/assets/delete.png" width ="30">`
                button.addEventListener("click", function () {
                    if (0 < yAxis && yAxis <= width) {
                        --yAxis;
                    }
                    let currentTile = document.getElementById(xAxis.toString() + '-' + yAxis.toString());
                    currentTile.innerText = "";
                });

            }


            //The enter button
            else if (qwerty[row][col] === 'Enter') {
                button.innerHTML = `<img src="./src/assets/enter.png" width ="30">`
                button.addEventListener("click", function () {
                    console.log(yAxis);
                    if (yAxis === 5) {



                        // check value of each cell
                        for (let c = 0; c < width; c++) {
                            let currentTile = document.getElementById(xAxis.toString() + '-' + c.toString());
                            let cell = currentTile.innerText;

                            // if the word letter is correct
                            if (cell == word[c]) {
                                currentTile.classList.add("correct");
                                console.log(cell + " is correctly placed");
                                // correctLetters++
                                correctLetters[c]= cell;
                                if (correctLetters.join("") === word) return gameOVer(true)

                            }

                            // if the word letter is wrongly placed
                            else
                            if (word.includes(cell)) {
                                currentTile.classList.add("present");
                                console.log(cell + " is worngly placed");
                            }
                            else
                            // if the word letter is completely wrong
                            {
                                currentTile.classList.add("absent");
                                console.log(cell + " is worng");
                            }
                        }

                        // game is over
                        xAxis += 1;
                        yAxis = 0;
                        if (xAxis === 6) return gameOVer(false) 
                    } else {
                        alert(`Complete the word`)
                    }


                })

            }


            //Every other letter
            else {
                button.innerText = qwerty[row][col].toUpperCase();

                button.addEventListener("click", function () {
                    let currentTile = document.getElementById(xAxis.toString() + '-' + yAxis.toString());
                    if (currentTile.innerText === "") {
                        console.log('Letter clicked:', qwerty[row][col]);
                        currentTile.innerText = qwerty[row][col].toUpperCase();
                        yAxis += 1;
                    }
                });

            }

            rowDiv.appendChild(button);
        }

        keyboardDiv.appendChild(rowDiv);
    }


    getWordRandomly()
    playAgain.addEventListener("click", resetgame)


})
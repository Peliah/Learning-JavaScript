document.addEventListener('DOMContentLoaded', function () {
    // Variable declaration
    const tiles = document.querySelector('.tiles-container')
    const keyboardDiv = document.querySelector('.keyboard-container');
    const qwerty = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace']
    ]
    const width = 5;
    const height = 6;

    let xAxis = 0;
    let yAxis = 0;

    let gameOVer = false;

    let word = "APPLE"





    // create the tiles
    for (let index = 0; index < 6; index++) {
        for (let j = 0; j < 5; j++) {
            const tile = tiles.appendChild(document.createElement('div'));
            // console.log("index ",index);
            // console.log("j ",j);
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

                            // if the word lwtter is correct
                            if (cell == word[c]) {
                                currentTile.classList.add("correct");
                                console.log(cell + " is correctly placed");
                                
                            }
                            else
                            // if the word letter is wrongly placed
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
                            // game is over
                        }

                        xAxis += 1;
                        yAxis = 0;
                    } else {
                        alert(`No finished the word`)
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



})
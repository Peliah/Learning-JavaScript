document.addEventListener('DOMContentLoaded', function () {
    // variable declarations
    let turn = 0;
    let id = 1;
    let xArray = [];
    let oArray = [];
    let correctCombination = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [3, 5, 7], [1, 5, 9]
    ]
    // create tags
    const header = document.createElement('div');
    header.classList.add('header');

    const main = document.createElement('div');
    main.classList.add('main');

    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = `<img src="../assets/logoLight.png" height="40" width="40" alt="logo"/>
    <h4>&copy;Peliah</h4>`

    const tiles = document.createElement('div');
    tiles.classList.add('tiles');


    const container = document.querySelector('.container');
    container.appendChild(header)
    container.appendChild(main)
    container.appendChild(footer)

    main.appendChild(tiles);

    // create the tiles
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const tile = document.createElement('button');
            tile.id = id
            tile.classList.add('tile');
            // tile.innerText="X"
            tile.addEventListener("click", () => playGame(tile.id))

            tiles.appendChild(tile);
            id++;
        }

    }

    const checkWinner=(array)=>{
        console.log("hi");
        for (const correctArray of correctCombination) {
            if (correctArray.every(e =>array.includes(e))){
                console.log("You win");
            }
        }
    }


    const playGame = (tileId) => {
        const tile = document.getElementById(tileId);
        console.log(turn % 2);
        if (turn % 2) {
            console.log("it's x's turn");
            tile.innerText = "X";
            tile.disabled = true;
            xArray.push(parseInt(tileId));
            xArray.sort();
            console.log(xArray);
            checkWinner(xArray);
        } else {
            console.log("It's o's turn");
            tile.innerText = "O";
            tile.disabled = true;
            oArray.push(parseInt(tileId));
            oArray.sort();
            console.log(oArray);
            checkWinner(oArray);
        }
        turn++;
    }

});
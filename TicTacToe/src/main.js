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
    footer.innerHTML = `<img src="./assets/logoLight.png" height="40" width="40" alt="logo"/>
    <h4>&copy;Peliah</h4>`

    const tiles = document.createElement('div');
    tiles.classList.add('tiles');

    const players = document.createElement('div');
    players.classList.add('players');
    players.innerHTML = `
        <div class="player-div">
            <h4>
                Player 1:
            </h4>
            <div>
                <img class="card-face image-back" style="background:#000;" src="./assets/apple.png" alt="card" />
            </div>
        </div>
        <div class="player-div">
            <h4>
                Player 2:
            </h4>
            <div>
                <img class="card-face image-back" src="./assets/face.png" alt="card" />
            </div>
        </div>
    `;

    const gameModal = document.createElement('div');
    gameModal.classList.add('game-modal');
    gameModal.innerHTML = `
        <div class="modal-content">
            <img src="" alt="" srcset="">
            <h4>Game Over !</h4>
            <p>The correct word was</p>
            <button class="play-again">Play Again</button>
        </div>
    `;
    // const playAgain = document.querySelector('.play-again');

    const container = document.querySelector('.container');
    container.appendChild(header)
    container.appendChild(main)
    container.appendChild(footer)

    main.appendChild(tiles);
    main.appendChild(players);
    main.appendChild(gameModal);

    // create the tiles
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const tile = document.createElement('button');
            tile.id = id
            tile.classList.add('tile');
            tile.addEventListener("click", () => playGame(tile.id))

            tiles.appendChild(tile);
            id++;
        }

    }

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const gameOver = (won) => {
        const modalText = won % 2 ? `Ha ha ha ha!!!\n I eat you for Breakfast ` : `Haaaa!!! In your face. Your ugly anyway `;
        gameModal.querySelector("img").src = `./assets//${won % 2 ? 'face.png' : 'apple.png'}`;
        gameModal.querySelector("h4").innerText = `${won % 2 ? 'Face Wins!' : 'Apple wins!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText}`;
        gameModal.style.display = "flex"
    }

    const confeti = () => {
        const duration = 1 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
    }

    const checkWinner = async (array, turn) => {
        const tiles = document.querySelectorAll('.tile');
        console.log("hi");
        for (const correctArray of correctCombination) {
            if (correctArray.every(e => array.includes(e))) {
                tiles.forEach(btn => btn.disabled = true);
                confeti()
                if (turn % 2) {
                    console.log("face win");
                    await sleep(2000)
                    gameOver(turn)
                } else {
                    console.log("apple win");
                    await sleep(2000)
                    gameOver(turn)

                }
                return true
            }
        }
        return
    }


    const playGame = (tileId) => {
        const tile = document.getElementById(tileId);
        console.log(turn % 2);
        if (turn % 2) {
            console.log("it's x's turn");
            tile.innerHTML = `<img class="card-face image-back" src="./assets/face.png" alt="card" />`;
            tile.disabled = true;
            xArray.push(parseInt(tileId));
            xArray.sort();
            console.log(xArray);
            checkWinner(xArray, turn);
        } else {
            console.log("It's o's turn");
            tile.innerHTML = `<img class="card-face image-back" src="./assets/apple.png" alt="card" />`;
            tile.disabled = true;
            oArray.push(parseInt(tileId));
            oArray.sort();
            console.log(oArray);
            checkWinner(oArray, turn);
        }
        turn++;
    }

    const reset = () => {
        console.log("heyyo");
        const tile = tiles.querySelectorAll("button");
        tile.forEach(btn => btn.innerHTML = ``)
        tile.forEach(btn => btn.disabled = false);
        turn = 0;
        id = 1;
        xArray = [];
        oArray = [];
        gameModal.style.display = "none"
    }

    gameModal.querySelector("button").addEventListener("click", reset)

});

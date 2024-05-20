document.addEventListener('DOMContentLoaded', function () {
    // Variables cariables
    const cardList = [
        'construction-white',
        'logo-black',
        'logo-black',
        'logo-light',
        'open-box',
        'open-box',
        'pelz-face',
        'pelz-face',
        'pelz-no-face',
        'red-apple',
        'shoe-front',
        'table-dark',
        'table-dark',
        'winning',
        'Memory-card-front',
        'Memory-card-front',
    ]
    const TOTAL_FLIPS = 16;
    let CORRECT_FLIPS = 0
    //make a double of everything and shuffle
    let fullCard = cardList.concat(cardList).map((val) => ({ val, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ val }) => val);

    let selectedCards = [];

    // cononents variables 
    const container = document.createElement('div');
    container.classList.add('container');

    const header = document.createElement('div');
    header.classList.add('header');
    header.innerText = "Memory Game"

    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.innerHTML = `<img src="../assets/image/logoDark.png" height="40" width="40" alt="logo"/>
    <a href="https://pelayah-portfolio.vercel.app" target="_blank" style="text-decoration:none; color:inherit"><h4>&copy;Peliah</h4></a>`

    const main = document.createElement('div');
    main.classList.add('main');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');

    document.body.appendChild(container);
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);

    main.appendChild(cardContainer)

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    const gameWon = () => {
        const duration = 15 * 1000,
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

    const showCards = () => {

        console.log(fullCard);

        for (let i = 0; i < fullCard.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card')
            card.id = i;
            // card.innerText = "Hello World"
            card.innerHTML = `<img class="card-face image-front" src="../assets/image/Memory-card-back.png" alt="card${i}" /> <img class="card-face image-back" src="../assets/image/${fullCard[i]}.png" alt="card${i}" />`
            cardContainer.appendChild(card);
            card.addEventListener("click", async () => {
                card.classList.toggle('flip-card');
                if (selectedCards.includes(i)) {
                    selectedCards.pop()
                } else {
                    selectedCards.push(i)
                    console.log(selectedCards);
                    if (selectedCards.length === 2) {
                        await sleep(700);
                        compare()
                    }
                }

            });
        }

    }

    const compare = () => {
        const card1 = document.getElementById(selectedCards[0]);
        const card2 = document.getElementById(selectedCards[1]);
        if (selectedCards != 0) {
            if (fullCard[selectedCards[0]] === fullCard[selectedCards[1]]) {
                console.log("theyre the same");
                card1.classList.add("okay");
                card2.classList.add("okay");
                selectedCards = []
                CORRECT_FLIPS++;
                if (CORRECT_FLIPS === TOTAL_FLIPS) {
                    gameWon()
                }
            } else {
                console.log("nope, not the same");
                card1.classList.toggle('flip-card')
                card2.classList.toggle('flip-card')
                selectedCards = []
            }
        }
    }



    // compare();
    console.log(window.innerWidth);
    showCards()

});
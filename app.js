const cells = document.querySelectorAll('.cell')
const playOneP = document.querySelector('.playerOne')
const playTwoP = document.querySelector('.playerTwo')
const playOneMarkP = document.querySelector('.oneMark')
const playTwoMarkP = document.querySelector('.twoMark')
const resetBtn = document.querySelector('.reset')
const playerInfo = document.querySelector('form');


const CreatePlayer = (title,mark,status,turn = 0) => {
    return {
        title: title,
        mark: mark,
        status: status,
        turn: turn,
    }
}


// create player with create pLayer object
let  playerOne;
let  playerTwo;



playerInfo.addEventListener('submit', (e) => {
    e.preventDefault();

    const playerOneName = document.getElementById('oneName').value;
    const playerTwoName = document.getElementById('twoName').value;
    const playerOneMark = document.getElementById('oneMarker').value;
    const playerTwoMark = document.getElementById('twoMarker').value;

    playOneMarkP.textContent = playerOneMark;
    playTwoMarkP.textContent = playerTwoMark;
    playOneP.textContent = playerOneName;
    playTwoP.textContent = playerTwoName;

    playerOne = CreatePlayer(playerOneName, playerOneMark, 'active');
    playerTwo = CreatePlayer(playerTwoName, playerTwoMark, 'rest');

})


const gameEngine = () => {
    const clearGame = ()=>{
        cells.forEach((cell) => {
            cell.textContent = ''
        })
        playerOne.status = 'active'
        playerTwo.status = 'rest'
        playerOne.turn = 0;
        playerTwo.turn = 0;
        cells.forEach((cell) => cell.disabled = false);

        playOneMarkP.textContent = "";
    playTwoMarkP.textContent = "";
    playOneP.textContent = "";
        playTwoP.textContent = "";

        const playerOneName = "";
    const playerTwoName = "";
    const playerOneMark = "";
    const playerTwoMark = "";
        
    }
    const reset = () => {
        clearGame();
        playerInfo.reset();

    }

    const checkButtons = (player) => {
        return true ? (cells[0].textContent === player.mark && cells[1].textContent === player.mark && cells[2].textContent === player.mark
            || cells[0].textContent === player.mark && cells[3].textContent === player.mark && cells[6].textContent === player.mark
            || cells[0].textContent === player.mark && cells[4].textContent === player.mark && cells[8].textContent === player.mark
            || cells[2].textContent === player.mark && cells[4].textContent === player.mark && cells[6].textContent === player.mark
            || cells[3].textContent === player.mark && cells[4].textContent === player.mark && cells[5].textContent === player.mark
            || cells[6].textContent === player.mark && cells[7].textContent === player.mark && cells[8].textContent === player.mark
            && player.turn === 3 ): false;
    }

    return {
        check: function () {
            if (checkButtons(playerOne)) {
                alert(`${playerOne.title} WON`)
                reset()
            }
            else if (checkButtons(playerTwo)) {
                alert(`${playerTwo.title} WON`)
                reset()
            }
            else if (playerOne.turn === 4 || playerTwo.turn === 4) {
                alert('draw')
                reset()
            }
                
        },
        reset
    }
}

const game = gameEngine()



cells.forEach((cell) => {
    cell.addEventListener('click',(e) => {
        if (playerOne.status === 'active') {
            e.target.textContent = playerOne.mark;
            e.target.disabled = true;
            playerOne.turn = playerOne.turn + 1;
            playerOne.status = 'rest'
            playerTwo.status = 'active'
            game.check()
            
        } else {
            e.target.textContent = playerTwo.mark;
            playerTwo.status = 'rest'
            e.target.disabled = true;
            playerTwo.turn = playerTwo.turn + 1;
            playerOne.status = 'active'
            game.check()
        }
    })
})



resetBtn.addEventListener('click', () => {
    game.reset()
})

game.reset()
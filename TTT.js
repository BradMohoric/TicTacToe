//event listener containing the game
window.addEventListener('DOMContentLoaded', () => {
    //variables for the main components of the game
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //new game variables. empty array, player X starts, game is set to active
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //variables for win/tie announcement later on. 
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';



    //array of win conditions, each set acts as a line 
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //function that handles each game round, decides if there are turns left or if the game has ended
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    //game ends here and uses the announcer below 
    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
    //game announcer function that calls a bootstrap alert to announce a winner or a tie. Color of alert changes depending on outcome
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = '<div class="alert alert-danger" id="end" role="alert">Player O won! Reset to play again!</div>';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = '<div class="alert alert-primary" id="end" role="alert">Player X won! Reset to play again!</div>';
                break;
            case TIE:
                announcer.innerHTML = '<div class="alert alert-light" id="end" role="alert">Tie! Reset to play again!</div>';
        }
        announcer.classList.remove('hide');
    };
    //function that prevents spaces being written over. Decides if click is valid action or not
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }
    //function to change between player X and player O. Changes the display above game
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }
    //This is where each turn takes place. Above game logic functions all put together
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    //Board reset function when clicking reset. Hides the announcer and clears the board.
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
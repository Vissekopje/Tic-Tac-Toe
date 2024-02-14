const Board = (function () {
    const domBoard = document.querySelector(".board")
    // create 9 cells
    for (let j = 0; j < 9; j++){
            const cells = document.createElement("div")
            cells.classList.add("cell")
            domBoard.appendChild(cells)
        }
    
    const getGameBoard = () => domBoard.children;

    const putSign = (index, player) => {
        if(domBoard.children[index].innerText === ""){
        domBoard.children[index].innerText = player
    }
}
    const clearBoard = () => {
        while(domBoard.firstChild){
            domBoard.removeChild(domBoard.lastChild)
        }
        for (let i = 0; i < 9; i++){
            const cells = document.createElement("div")
            cells.classList.add("cell")
            domBoard.appendChild(cells)
        }
        events.initializeCells()
        game.resetPlays()
    }
     return { 
        getGameBoard,
        putSign,
        clearBoard
     }

})();

const game = (function () {
    const gameBoard = Board.getGameBoard();
    let amountOfPlays = 0
    let playerOne
    let playerTwo
    let currentPlayer

    function Player(name, sign){
        this.name = name;
        this.sign = sign;
      }
    
    function submitNames() {
        const namePlayerOne = document.querySelector(".name1").value;
        const namePlayerTwo = document.querySelector(".name2").value;
        playerOne = new Player(namePlayerOne, "X")
        playerTwo = new Player(namePlayerTwo, "O")
        currentPlayer = playerOne
        events.initializeCells()
        newRound()
        return [playerOne, playerTwo]
    }

    const resetPlays = () => amountOfPlays = 0

    const newRound = () => {
        const messageText = document.querySelector(".message")
        messageText.innerText = `${getCurrentPlayer().name}'s turn`
    };

    function switchPlayers() {
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;
    const getAmountOfPlays = () => amountOfPlays;
   
    const playRound = (index) => {
        Board.putSign(index, getCurrentPlayer().sign);
        amountOfPlays++
        checkWin()
        switchPlayers();
        newRound();
        console.log(amountOfPlays)
    };

    function checkWin() {
        const WINNINGCOMBINATIONS = 
        [[0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
        ]

        for (const winCondition of WINNINGCOMBINATIONS) {
            let [a, b, c] = winCondition;
            if (gameBoard[a].innerText !== "" && gameBoard[a].innerText == gameBoard[b].innerText && gameBoard[a].innerText== gameBoard[c].innerText) {
                return alert(`${getCurrentPlayer().name} wins!`)
            }
        }
        if (amountOfPlays === 9){
            return alert(`Its a draw`)
        }
        else {
            return
        }
    }

    return {
        checkWin,
        playRound,
        getAmountOfPlays,
        submitNames,
        resetPlays
    };
})();

const events = (function () {
    const nameSubmit = document.querySelector(".submit")
    const nameSubmissionForm = document.querySelector(".namesubmission")

    nameSubmit.addEventListener("click", function () {
        nameSubmissionForm.classList.add("hidden")
        game.submitNames()
    })
    function initializeCells(){
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell, index) => cell.addEventListener("click", () => game.playRound(index), {once: true}))
    }
    const restartButton = document.querySelector(".restart")
    restartButton.addEventListener("click", Board.clearBoard)

    return {
        initializeCells
    }
})();

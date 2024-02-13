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
    else {
        console.log("Cell is full")
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
        const cells = document.querySelectorAll(".cell")
        cells.forEach((cell, index) => cell.addEventListener("click", () => game.playRound(index), {once: true}))
    }

     return { 
        getGameBoard,
        putSign,
        clearBoard
     }

})();




 //   function addPlayers(player1, player2) {
   //     const signPlayerOne = "O"
     //   const signPlayerTwo = (signPlayerOne == "O") ? "X" : "O"
     //   const playerOne = new Player (player1, signPlayerOne)
     //   const playerTwo = new Player (player2, signPlayerTwo)
     //   Board.printBoard()
     //   return console.log({playerOne, playerTwo})
   //  }
  

   const game = (function () {
    const gameBoard = Board.getGameBoard();
    let amountOfPlays = 0
    function Player(name, sign){
        this.name = name;
        this.sign = sign;
    }

    let playerOne = new Player("Player 1", "O");
    let playerTwo = new Player("Player 2", "X");
    let currentPlayer = playerOne

    function switchPlayers() {
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    }

    const getCurrentPlayer = () => currentPlayer;
    let getAmountOfPlays = () => amountOfPlays;
    const newRound = () => {
        const messageText = document.querySelector(".message")
        messageText.innerText = `${getCurrentPlayer().name}'s turn`
    };

    const playRound = (index) => {
        console.log(
            `Putting ${getCurrentPlayer().name}'s sign into cell ${index}`
        );
        Board.putSign(index, getCurrentPlayer().sign);
        amountOfPlays++
        checkWin()
        switchPlayers();
        newRound();
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
                Board.clearBoard()
                amountOfPlays = 0
                return alert(`${getCurrentPlayer().name} wins!`);
            }
        }

        if (amountOfPlays === 9){
            Board.clearBoard()
            amountOfPlays = 0
            return alert(`Its a draw`)
        }
        else {
            return alert(`No winner yet`)
        }
    }
    return {
        checkWin,
        playRound,
        getAmountOfPlays
    };
})();

const cells = document.querySelectorAll(".cell")
cells.forEach((cell, index) => cell.addEventListener("click", () => game.playRound(index), {once: true}))
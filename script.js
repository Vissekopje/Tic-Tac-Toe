

function Cell() {
    let value = ""

    const addSign = (currentPlayer) => {
        value = currentPlayer
    };

    const getValue = () => value

    return{
        addSign,
        getValue
    };
}
const Board = (function () {
    let gameBoard = []
    // create 3 by 3 grid
    for (let i = 0; i < 3; i++){
        gameBoard[i] = []
        for (let j = 0; j < 3; j++){
            gameBoard[i].push(Cell())
        }
    }
    const getGameBoard = () => gameBoard;

    const putSign = (row, column, player) => {
        if(gameBoard[row][column].getValue() === ""){
        gameBoard[row][column].addSign(player)
        game.checkWin()
    }
    else {
        console.log("Cell is full")
    }
}
    const printBoard = () => {
        const boardWithCellValues = gameBoard.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
      }

    const clearBoard = () => {
        for (let i = 0; i < 3; i++){
            gameBoard[i] = []
            for (let j = 0; j < 3; j++){
                gameBoard[i][j] = Cell()
            }
        }
        printBoard()
    }

     return { 
        getGameBoard,
        putSign,
        printBoard,
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

    const newRound = () => {
        Board.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(
            `Putting ${getCurrentPlayer().name}'s sign into row ${row} and column ${column}`
        );
        Board.putSign(row, column, getCurrentPlayer().sign);

        switchPlayers();
        newRound();
    };

    function checkWin() {
        const WINNINGCOMBINATIONS = [
        [[0,0],[1,1],[2,2]], 
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]], 
        [[0,0],[0,1],[0,2]], 
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]], 
        [[0,2],[1,1],[2,0]]
    ];
        for (const win of WINNINGCOMBINATIONS) {
            let [[a, b],[c, d],[e, f]] = win;
            if (gameBoard[a][b].getValue() !== "" 
            && gameBoard[a][b].getValue() === gameBoard[c][d].getValue() 
            && gameBoard[a][b].getValue() === gameBoard[e][f].getValue()) {
                Board.clearBoard()
                return alert(`${getCurrentPlayer().name} wins!`);
            }
        }
        return alert("No winner yet!");
    }

    return {
        checkWin,
        playRound
    };
})();

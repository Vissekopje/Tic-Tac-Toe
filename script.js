const game = (function () {
    let gameBoard = ["", "", "", "", "", "", "", "", ""]

// function Player (name, sign){
 //   this.name = name
//    this.sign = sign
// }


function addPlayers(player1, player2) {
    const signPlayerOne = "O"
    const signPlayerTwo = (signPlayerOne == "O") ? "X" : "O"
    const playerOneName = player1
    const playerTwoName = player2
    return console.log({playerOneName, signPlayerOne, playerTwoName, signPlayerTwo})
}

function checkWin(){
    const WINNINGCOMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                 [0, 3, 6], [1, 4, 7] [2, 5, 8],
                                 [0, 4, 8], [2, 4, 6]]
        for (const win of WINNINGCOMBINATIONS){
            let [a, b, c] = win
            if (gameBoard[a] && gameBoard[a] == gameBoard[b] && gameBoard[b] == gameBoard[c])
                return alert(`${gameBoard[a]}`)
        }
        return alert("false")
    }
    return {
        addPlayers
    }
})();
game.addPlayers("Player 1", "Player 2");

// gameBoard
// addSign()
// updateBoard()
// checkWin()

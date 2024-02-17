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
        const messageText = document.querySelector(".message")
        messageText.innerText = `${game.getCurrentPlayer().name}'s turn`
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
        const iconPlayerOne = document.querySelector(`input[name="iconp1"]:checked`).value
        const iconPlayerTwo = (iconPlayerOne === "X") ? "O" : "X"
        playerOne = new Player(namePlayerOne, iconPlayerOne)
        playerTwo = new Player(namePlayerTwo, iconPlayerTwo)
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
        if(!checkWin()){
        switchPlayers();
        newRound();
        }
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
                const messageText = document.querySelector(".message")
                events.disableCells()
                return messageText.innerText = (`${getCurrentPlayer().name} wins!`)
            }
        }
        if (amountOfPlays === 9){
            const messageText = document.querySelector(".message")
            return messageText.innerText = `Its a draw`
        }
        else {
            return false
        }
    }

    return {
        checkWin,
        playRound,
        getAmountOfPlays,
        submitNames,
        resetPlays,
        getCurrentPlayer
    };
})();

const events = (function () {
    const nameSubmit = document.querySelector(".submit")
    const nameSubmissionForm = document.querySelector(".namesubmission")
    nameSubmit.addEventListener("click", function () {
        nameSubmissionForm.classList.add("hidden")
        game.submitNames()
    })
 
    const radioIconsPlayers = document.getElementsByName("iconp1")
    radioIconsPlayers.forEach(function(radioIcon){
        radioIcon.addEventListener('click', function(){
            const iconPlayerOne = document.querySelector(`input[name="iconp1"]:checked`).value
            console.log(iconPlayerOne)
            const iconPlayerTwoFill = document.querySelector(".iconp2")
            iconPlayerTwoFill.innerText = (iconPlayerOne === "X") ? "Circles" : "Crosses"
            console.log(iconPlayerTwoFill.innerText)
            })
        })
     
    function cellClicked(index){
        game.playRound(index)
    }

    function initializeCells(){
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell, index) => cell.addEventListener("click", () => cellClicked(index), {once: true}))
    }
    function disableCells(){
        // Removing eventlistener by cloning as .removeEventListener did not suffice
    const cells = document.querySelectorAll(".cell")
    cells.forEach((cell) => {const clonedCell = cell.cloneNode(true); cell.parentNode.replaceChild(clonedCell, cell);});
    }
    const restartButton = document.querySelector(".restart")
    restartButton.addEventListener("click", Board.clearBoard)

    return {
        initializeCells,
        disableCells
    }
})();

let gameState = [];
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
const player1 = "O";
const player2 = "X";

let activePlayer = player1;
let activeGame = true;
let gameDrawCounter = 1;

let player1name = "";
let player2name = "";

function handleSubmitPlayerNames(){

    // Get player names
    player1name = document.getElementById("player1").value;
    player2name = document.getElementById("player2").value;

    // Show game and hide text fields
    document.getElementById("game").style.visibility = "visible";
    document.getElementById("playerNames").style.visibility = "hidden";

    // Update game state; Player 1 always starts first
    document.getElementById("gameState").innerHTML = "Turn: " + player1name;
}

function handleCellClick(clickedCellEvent){

    // Check if game is still active
    if (activeGame == true) {

        const clickedCell = clickedCellEvent.target;
        const cellNumber = parseInt(clickedCell.getAttribute('data-cell-index')); // Get index of cell

        // Check if clicked cell has been clicked before
        if (gameState[cellNumber] == undefined) {

            // Log game progess via an array
            gameState[cellNumber] = activePlayer;

            clickedCell.innerHTML = activePlayer;

            // Switch active player
            if (activePlayer == player1) {
                activePlayer = player2;
                document.getElementById("gameState").innerHTML = "Turn: " + player2name;

            } else {
                activePlayer = player1;
                document.getElementById("gameState").innerHTML = "Turn: " + player1name;
            }

            // Check game state
            checkGameState();
        }
    }
}

function checkGameState() {

    // Check if game is a draw
    if(gameDrawCounter == 9) {
        document.getElementById("gameState").innerHTML = "Draw!";
        activeGame = false;
    }

    // Check if a player has won
    winConditions.forEach(function (row) {
        let a = row[0];
        let b = row[1];
        let c = row[2];

        if (gameState[a] == player1 && gameState[b] == player1 && gameState[c] == player1 ){
            document.getElementById("gameState").innerHTML = player1name + " wins!";
            activeGame = false;

        } else if(gameState[a] == player2 && gameState[b] == player2 && gameState[c] == player2) {
            document.getElementById("gameState").innerHTML = player2name + " wins!";
            activeGame = false;
        }
    });

    gameDrawCounter++;
}

function handleRestartGame() {

    // Set game variables back to default
    activeGame = true;
    gameDrawCounter = 1;
    gameState = [];
    activePlayer = player1;
    document.getElementById("gameState").innerHTML = "Turn: " + player1name;

    // Remove content of cells
    let elements = document.querySelectorAll(".cell");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = "";
    }
}

// Event listeners ---------------------------------------------------------

//document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelectorAll(".cell").forEach(function(cell) { cell.addEventListener('click', handleCellClick)});
document.querySelector(".resetButton").addEventListener('click', handleRestartGame);
document.querySelector(".submitPlayerNames").addEventListener('click', handleSubmitPlayerNames);




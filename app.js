// --- Gameboard ---//
// Create and update the state of the board
const gameboard = (() => {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]; // Tic tac toe have a fixed size board

  const getBoard = () => board;

  // Updates the board with the current move
  const updateBoard = (row, column, playerMark) => {
    board[row][column] = playerMark;
  };

  return { getBoard, updateBoard };
})();

// --- Players ---//
// Manage the data of the Players
function player(name, mark) {
  let wins = 0;
  let matchesPlayed = 0;
  const score = [wins, matchesPlayed];

  // Track the player`s score
  const updateScore = (win) => {
    //Match result: win = 1, loose = 0
    matchesPlayed++;
    wins += win;
  };

  const getScore = () => score;

  return { name, mark, updateScore, getScore };
}

// --- Game controler ---//
// Manage game assets and control the flow
const game = (() => {
  // Creating game assets
  const board = gameboard.getBoard();
  let nextPlayerTurn = 1;

  const getPlayerTurn = () => nextPlayerTurn;

  // Control of game actions
  const takePlayerTurn = (row, column) => {
    // Updates the board according to the active player
    if (nextPlayerTurn === 1) {
      nextPlayerTurn = 2;
      gameboard.updateBoard(row, column, playerOne.mark);
    } else {
      nextPlayerTurn = 1;
      gameboard.updateBoard(row, column, playerTwo.mark);
    }
  };

  const checkForWinner = () => {
    for (let i = 0; i < 3; i++) {
      // Check the rows
      if (
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2] &&
        board[i][0] != ""
      ) {
        return board[i][0];
      }
      // Check the colunms
      if (
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i] &&
        board[0][i] != ""
      ) {
        return board[0][i];
      }
    }
    // Check the diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] != ""
    ) {
      return board[0][0];
    } else if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] != ""
    ) {
      return board[0][2];
    }
    // Check for draw condition
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          return;
        }
      }
    }
    return "draw";
  };
  return {
    getPlayerTurn,
    takePlayerTurn,
    checkForWinner,
  };
})();

//--- DOM manipulation ---//
function addMarkImg(playerMark, markSrc, cellId) {
  const mark = document.createElement("img");
  mark.alt = playerMark;
  mark.classList.add(playerMark);
  mark.src = markSrc;
  document.getElementById(cellId).appendChild(mark);
}

//Intialize the game
const startBtn = document.getElementById("btn-start");
const boardContainer = document.querySelector(".board-container");
let playerOne = null;
let playerTwo = null;

startBtn.addEventListener("click", () => {
  const playerOneName = prompt("Enter player One name:");
  const playerTwoName = prompt("Enter player Two name:");

  // Create players and defines their marks
  // Player One = x (cross)
  // Player Two = o (circle)
  playerOne = player(playerOneName, "x");
  playerTwo = player(playerTwoName, "o");

  startBtn.style.display = "none";
  boardContainer.style.display = "block";
});

// Game flow feedback
const board = document.querySelector(".board");

board.addEventListener("click", (event) => {
  const target = event.target;

  // Ensure that the clicked cell is unmarked.
  if (target.tagName === "IMG" || target.childElementCount != 0) {
    return;
  }

  const coordinates = target.id.split("");
  let winner = "";

  if (game.getPlayerTurn() === 1) {
    addMarkImg("cross", "img/cross.svg", target.id);
  } else if (game.getPlayerTurn() === 2) {
    addMarkImg("circle", "img/circle.svg", target.id);
  }
  game.takePlayerTurn(coordinates[1], coordinates[3]);
  winner = game.checkForWinner();
  setTimeout(() => {
    if (winner === "x") {
      alert("Winner is: " + playerOne.name);
    } else if (winner === "o") {
      alert("Winner is: " + playerTwo.name);
    } else if (winner === "draw") {
      alert("Draw");
    }
  }, 100);
});

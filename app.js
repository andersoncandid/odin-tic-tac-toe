// --- Gameboard ---
// Create and update the state of the board
const gameboard = (() => {
  let board = [];
  let columns = 3;
  let rows = 3;

  // Creating two-dimensional board array
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = "";
    }
  }

  const getBoard = () => board;

  // Updates the board with the current move
  const updateBoard = (row, column, playerMark) => {
    board[row][column] = playerMark;
  };

  return { getBoard, updateBoard };
})();

// --- Players ---
// Manage the data of the Players
function player(name, mark) {
  let wins = 0;
  let matchesPlayed = 0;
  let score = [wins, matchesPlayed];

  // Track the player`s score
  const updateScore = (win) => {
    //Match result: win = 1, loose = 0
    matchesPlayed++;
    wins += win;
  };

  const getScore = () => score;

  return { name, mark, updateScore, getScore };
}

// --- Game ---
// Manage game assets and control the flow

// const game = ((playerOneName, playerTwoName) => {
// // Initialize the game, and create game resources
//
// })();

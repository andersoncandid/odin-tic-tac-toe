// --- Gameboard ---
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

// --- Players ---
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

// --- Game controler ---
// Manage game assets and control the flow
const game = ((playerOneName, playerTwoName) => {
  const playerOne = player(playerOneName, "x");
  const playerTwo = player(playerTwoName, "o");
  let nextPlayerTurn = 1;

  const getNextPlayer = () => nextPlayerTurn;

  // Control of game actions
  const takePlayerTurn = (row, column, player) => {
    gameboard.updateBoard(row, column, player.mark);

    // Change the active player order
    if (nextPlayerTurn === 1) {
      nextPlayerTurn = 2;
    } else {
      nextPlayerTurn = 1;
    }
  };

  // Check if win condition is fulfilled
  const checkForWinner = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        let cell = board[row][col];
        let completeRow = true;
        let completeCol = true;
        let completeDiag1 = true;
        let completeDiag2 = true;

        // check for any complete diagonals
        if (row === col && cell != bord[0][0]) {
          completeDiag = false;
        }

        // check for any complete row
        if (cell != board[row][0]) {
          completeRow = false;
        }
        // check for any complete column
        if (cell != board[0][col]) {
          completeCol = false;
        }
        return cell;
      }
    }
  };
})();

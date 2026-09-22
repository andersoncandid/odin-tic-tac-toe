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
function game(playerOneName, playerTwoName) {
  // Creating game assets
  const playerOne = player(playerOneName, "x");
  const playerTwo = player(playerTwoName, "o");
  const board = gameboard.getBoard();
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
  };
  return {
    playerOne,
    playerTwo,
    getNextPlayer,
    takePlayerTurn,
    checkForWinner,
  };
}

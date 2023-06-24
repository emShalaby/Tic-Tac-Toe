const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = ["", "", ""];
  }

  let players = [
    { playerName: "player1", value: "x" },
    { playerName: "player2", value: "o" },
  ];

  let activePlayer = players[0];
  let turnCount = 0;

  function updateBoard(cell) {
    if (cell > 9 || cell<0) {
      console.log(
        "please enter a valid number between 1 and 9 (including 1 and 9)"
      );
      return;
    }
    if (cell <= 3) {
      if (board[0][cell - 1] != "") {
        return;
      }

      board[0][cell-1] = activePlayer.value;
    } else if (cell <= 6) {
      if (board[1][cell - 4] != "") {
        return;
      }
      board[1][cell-4] = activePlayer.value;
    } else {
      if (board[2][cell - 7] != "") return;
      board[2][cell - 7] = activePlayer.value;
    }
    turnCount++;
    activePlayer = players[turnCount % 2];
    console.table(board);
  }
  return { updateBoard };
})();

const GameBoard = function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = ["", "", ""];
  }

  let players = [
    { playerName: "player1", value: "x" },
    { playerName: "player1", value: "x" },
  ];

  let activePlayer = players[0];
};

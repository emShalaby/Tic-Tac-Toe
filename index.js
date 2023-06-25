const GameBoard = function () {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  let players = [
    { playerName: "player1", value: "x" },
    { playerName: "player2", value: "o" },
  ];

  let activePlayer = players[0];
  let turnCount = 0;

  function updateBoard(cell) {
    if (cell > 8 || cell < 0) {
      console.log(
        "please enter a valid number between 1 and 9 (including 1 and 9)"
      );
      return;
    }
    if (board[cell] != "") return;
    board[cell] = activePlayer.value;
    _checkResult();
    turnCount++;
    activePlayer = players[turnCount % 2];
    console.table(board);
    _displayBoard();
  }
  function _displayBoard() {
    if (document.querySelector(".board")) {
      document.querySelector(".board").remove();
    }

    const body = document.querySelector("body");
    const boardDiv = document.createElement("div");
    const colBorder1 = document.createElement("div");
    const colBorder2 = document.createElement("div");
    const rowBorder1 = document.createElement("div");
    const rowBorder2 = document.createElement("div");

    boardDiv.classList.add("board");
    colBorder1.classList.add("col-border1");
    colBorder2.classList.add("col-border2");
    rowBorder1.classList.add("row-border1");
    rowBorder2.classList.add("row-border2");

    body.appendChild(boardDiv);
    boardDiv.append(colBorder1);
    boardDiv.append(colBorder2);
    boardDiv.append(rowBorder1);
    boardDiv.append(rowBorder2);

    for (let i = 0; i < 9; i++) {
      let cell = document.createElement("div");
      let value = document.createElement("p");
      cell.appendChild(value);
      cell.classList.add("cell");
      boardDiv.appendChild(cell);
      value.innerText = board[i];
      cell.addEventListener(
        "click",
        () => {
          updateBoard(i);
        },
        { once: true }
      );
    }
  }
  function _checkResult() {
    if (board[0] == board[4] && board[0] == board[8] && board[0] != "") {
      console.log(activePlayer);
      return activePlayer;
    }
    if (board[2] == board[4] && board[2] == board[6] && board[2] != "") {
      console.log(activePlayer);
      return activePlayer;
    }

    for (let i = 0; i < 9; i = i + 3) {
      if (
        board[i] == board[i + 1] &&
        board[i] == board[i + 2] &&
        board[i] != ""
      ) {
        console.log(activePlayer);
        return activePlayer;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board[i] == board[i + 3] &&
        board[i] == board[i + 6] &&
        board[i] != ""
      ) {
        console.log(activePlayer);
        return activePlayer;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") return false;
      console.log(players);
      return players;
    }
  }
  _displayBoard();
  return { updateBoard };
};

const Origin = function () {
  const newGameBtn = document.querySelector(".new-game");
  newGameBtn.addEventListener("click", () => {
    let game = GameBoard();
    newGameBtn.remove();
    this.game = game;
  });
};
Origin();

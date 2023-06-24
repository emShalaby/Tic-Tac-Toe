const GameBoard = function () {
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
    if (cell > 9 || cell < 0) {
      console.log(
        "please enter a valid number between 1 and 9 (including 1 and 9)"
      );
      return;
    }
    if (cell <= 3) {
      if (board[0][cell - 1] != "") {
        return;
      }

      board[0][cell - 1] = activePlayer.value;
    } else if (cell <= 6) {
      if (board[1][cell - 4] != "") {
        return;
      }
      board[1][cell - 4] = activePlayer.value;
    } else {
      if (board[2][cell - 7] != "") return;
      board[2][cell - 7] = activePlayer.value;
    }
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
      let cell = document.createElement("p");
      cell.classList.add("cell");
      boardDiv.appendChild(cell);
    }
    let cells = document.querySelectorAll(".cell");
    for (let i = 0; i < 9; i++) {
      cells[i].innerText = board.flat()[i];
    }
  }
  _displayBoard();
  return { updateBoard };
};



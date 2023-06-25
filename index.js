const GameBoard = function (player1obj, player2obj) {
  let board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  let players = [player1obj, player2obj];

  let activePlayer = players[0];
  let turnCount = 0;

  function updateBoard(cell) {
    if (board[cell] != "") return;
    board[cell] = activePlayer.value;
    _displayBoard();
    _displayResult(_checkResult(board));
    if (_checkResult(board)) return activePlayer;
    turnCount++;
    activePlayer = players[turnCount % 2];
    if (activePlayer.playerName == "CPU") {
      _easyCPU();
    }
    if (activePlayer.playerName == "unbeatable") {
      let move = _unbeatable(board);
      updateBoard(move);
    }
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
  function _checkResult(someBoard) {
    if (
      someBoard[0] == someBoard[4] &&
      someBoard[0] == someBoard[8] &&
      someBoard[0] != ""
    ) {
      if (someBoard[0] == "x") return player1obj;
      else return player2obj;
    }
    if (
      someBoard[2] == someBoard[4] &&
      someBoard[2] == someBoard[6] &&
      someBoard[2] != ""
    ) {
      if (someBoard[2] == "x") return player1obj;
      else return player2obj;
    }

    for (let i = 0; i < 9; i = i + 3) {
      if (
        someBoard[i] == someBoard[i + 1] &&
        someBoard[i] == someBoard[i + 2] &&
        someBoard[i] != ""
      ) {
        if (someBoard[i] == "x") return player1obj;
        else return player2obj;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        someBoard[i] == someBoard[i + 3] &&
        someBoard[i] == someBoard[i + 6] &&
        someBoard[i] != ""
      ) {
        if (someBoard[i] == "x") return player1obj;
        else return player2obj;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (someBoard[i] == "") return false;
    }
    return { playerName: "emShalaby", value: "tie" };
  }
  function _displayResult(winner) {
    if (winner === false) return false;

    const modal = document.querySelector("#modal");
    if (modal.firstChild) modal.firstChild.remove();
    const msg = document.createElement("p");
    modal.prepend(msg);
    modal.close();
    modal.showModal();
    if (winner.value == "tie") {
      msg.innerText = "TIE !";
      return;
    } else msg.innerText = winner.playerName + " WINS !";
  }
  function _easyCPU() {
    if (!board.includes("")) return;
    if (activePlayer.playerName != "CPU") return;
    while (true) {
      let i = Math.round(8 * Math.random());
      if (board[i] == "") {
        updateBoard(i);
        break;
      }
    }
  }
  let scores = { x: -1, o: 1, tie: 0 };

  function _unbeatable(someBoard) {
    let bestMove;
    let bestScore = -1000;
    for (let i = 0; i < someBoard.length; i++) {
      if (someBoard[i] == "") {
        someBoard[i] = player2obj.value;

        let score = minimax(someBoard, 0, false);

        someBoard[i] = "";

        if (score > bestScore) {
          bestScore = score;

          bestMove = i;
        }
      }
    }

    return bestMove;
  }
  function minimax(someBoard, depth, isMaximizing) {
    let result = _checkResult(someBoard);
    if (result != false) {
      return scores[result.value];
    }
    if (isMaximizing) {
      let bestScore = -1000;
      for (let i = 0; i < someBoard.length; i++) {
        if (someBoard[i] == "") {
          someBoard[i] = player2obj.value;
          let score = minimax(someBoard, depth + 1, false);
          someBoard[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = 1000;
      for (let i = 0; i < someBoard.length; i++) {
        if (someBoard[i] == "") {
          someBoard[i] = player1obj.value;
          let score = minimax(someBoard, depth + 1, true);
          someBoard[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }
  _displayBoard();
  this.board = board;
  return { updateBoard };
};

const Origin = function () {
  if (document.querySelector(".board"))
    document.querySelector(".board").remove();
  const newGameBtn = document.createElement("button");
  const vsCpuBtn = document.createElement("button");
  const boardContainer = document.querySelector(".board-container");
  const closeModalBtn = document.querySelector("#close");
  const modal = document.querySelector("#modal");
  const unbeatableBtn = document.createElement("button");
  const buttonContainer = document.createElement("div");

  vsCpuBtn.innerText = "VS CPU";
  newGameBtn.innerText = "NEW GAME";
  unbeatableBtn.innerHTML = "UNBEATABLE MODE";
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(newGameBtn);
  buttonContainer.appendChild(vsCpuBtn);
  buttonContainer.appendChild(unbeatableBtn);
  boardContainer.appendChild(buttonContainer);

  newGameBtn.addEventListener("click", () => {
    GameBoard(
      { playerName: "player1", value: "x" },
      { playerName: "player2", value: "o" }
    );
    buttonContainer.remove();
  });
  closeModalBtn.addEventListener(
    "click",
    () => {
      modal.close();
      Origin();
    },
    { once: true }
  );
  vsCpuBtn.addEventListener("click", () => {
    GameBoard(
      { playerName: "player1", value: "x" },
      { playerName: "CPU", value: "o" }
    );
    buttonContainer.remove();
  });
  unbeatableBtn.addEventListener("click", () => {
    GameBoard(
      { playerName: "player1", value: "x" },
      { playerName: "unbeatable", value: "o" }
    );
    buttonContainer.remove();
  });
};
Origin();

const GameBoard = function (player1obj, player2obj) {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  let players = [player1obj, player2obj];

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
    _displayResult(_checkResult());
    turnCount++;
    activePlayer = players[turnCount % 2];
    console.table(board);
    _displayBoard();
    _easyCPU();
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
    }
    console.log(players);
    return players;
  }
  function _displayResult(winner) {
    console.log(winner.playerName);
    if (winner === false) return;

    const modal = document.querySelector("#modal");
    if (modal.firstChild) modal.firstChild.remove();
    const msg = document.createElement("p");
    modal.prepend(msg);
    modal.close();
    modal.showModal();
    if (winner.length) {
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
  _displayBoard();
  return { updateBoard };
};

const Origin = function () {
  if (document.querySelector(".board"))
    document.querySelector(".board").remove();
  const newGameBtn = document.createElement("button");
  const vsCpuBtn = document.createElement("button");
  const body = document.querySelector("body");
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
  body.appendChild(buttonContainer);

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

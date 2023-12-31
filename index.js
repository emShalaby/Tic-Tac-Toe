const GameBoard = function (player1obj, player2obj) {
  let board = [];
  let sym1 = player1obj.value;
  let sym2 = player2obj.value;
  let scores = { [sym1]: -1, [sym2]: 1, tie: 0 };

  //{o:-1 x:1 tie:0}

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  let players = [player1obj, player2obj];

  let activePlayer = player1obj.value == "x" ? player1obj : player2obj;
  if (activePlayer.systemEntity == "CPU") {
    _easyCPU();
  }
  if (activePlayer.systemEntity == "UNBEATABLE") {
    let move = _unbeatable(board);
    updateBoard(move);
  }

  function updateBoard(cell) {
    if (board[cell] != "") return;
    board[cell] = activePlayer.value;

    if (activePlayer == player1obj) activePlayer = player2obj;
    else if (activePlayer == player2obj) activePlayer = player1obj;
    _displayBoard();
    _displayResult(_checkResult(board));
    if (_checkResult(board)) return;

    if (activePlayer.systemEntity == "CPU") {
      _easyCPU();
    }
    if (activePlayer.systemEntity == "UNBEATABLE") {
      let move = _unbeatable(board);
      updateBoard(move);
    }
  }
  function _displayBoard() {
    if (document.querySelector(".board")) {
      document.querySelector(".board").remove();
    }
    _showActivePlayer();
    const boardContainer = document.querySelector(".board-container");
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

    boardContainer.appendChild(boardDiv);
    boardDiv.append(colBorder1);
    boardDiv.append(colBorder2);
    boardDiv.append(rowBorder1);
    boardDiv.append(rowBorder2);

    for (let i = 0; i < 9; i++) {
      let cell = document.createElement("div");
      let value = document.createElement("h1");
      cell.appendChild(value);
      cell.classList.add("cell");
      boardDiv.appendChild(cell);
      value.innerText = board[i];
      if (board[i] == "x") value.style.color = "black";
      else value.style.color = "#fb923c";
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
      if (someBoard[0] == sym1) return player1obj;
      else return player2obj;
    }
    if (
      someBoard[2] == someBoard[4] &&
      someBoard[2] == someBoard[6] &&
      someBoard[2] != ""
    ) {
      if (someBoard[2] == sym1) return player1obj;
      else return player2obj;
    }

    for (let i = 0; i < 9; i = i + 3) {
      if (
        someBoard[i] == someBoard[i + 1] &&
        someBoard[i] == someBoard[i + 2] &&
        someBoard[i] != ""
      ) {
        if (someBoard[i] == sym1) return player1obj;
        else return player2obj;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        someBoard[i] == someBoard[i + 3] &&
        someBoard[i] == someBoard[i + 6] &&
        someBoard[i] != ""
      ) {
        if (someBoard[i] == sym1) return player1obj;
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
    let winCombo = _showWinCombo(board);
    console.log(winCombo);
    const cells = document.querySelectorAll(".cell");
    if (winCombo != board) {
      for (let i = 0; i < 3; i++) {
        cells[winCombo[i]].style.backgroundColor = "green";
      }
    } else {
      for (let i = 0; i < 9; i++) {
        cells[i].style.backgroundColor = "red";
      }
    }
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

  function _showActivePlayer() {
    if (document.querySelector(".active-player"))
      document.querySelector(".active-player").remove();
    let activePlayerDiv = document.createElement("div");
    let body = document.querySelector("body");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    h2.innerText = activePlayer.playerName;
    p.innerText = "to move";
    activePlayerDiv.classList.add("active-player");
    body.prepend(activePlayerDiv);
    activePlayerDiv.append(h2);
    activePlayerDiv.append(p);
  }
  function _showWinCombo(someBoard) {
    if (
      someBoard[0] == someBoard[4] &&
      someBoard[0] == someBoard[8] &&
      someBoard[0] != ""
    ) {
      return [0, 4, 8];
    }
    if (
      someBoard[2] == someBoard[4] &&
      someBoard[2] == someBoard[6] &&
      someBoard[2] != ""
    ) {
      return [2, 4, 6];
    }

    for (let i = 0; i < 9; i = i + 3) {
      if (
        someBoard[i] == someBoard[i + 1] &&
        someBoard[i] == someBoard[i + 2] &&
        someBoard[i] != ""
      ) {
        return [i, i + 1, i + 2];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        someBoard[i] == someBoard[i + 3] &&
        someBoard[i] == someBoard[i + 6] &&
        someBoard[i] != ""
      ) {
        return [i, i + 3, i + 6];
      }
    }
    return someBoard;
  }

  _displayBoard();
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
  const cardsContainer = document.querySelector(".cards-container");
  const player1Card = document.querySelector("#player1");
  const player2Card = document.querySelector("#player2");
  const body = document.querySelector("body");
  const header = document.querySelector(".header");
  const activePlayerDiv = document.querySelector(".active-player");
  if (activePlayerDiv) activePlayerDiv.remove();
  cardsContainer.style.display = "flex";
  header.style.display = "flex";
  function _collectNames() {
    const name1 = document.querySelector("#player1-name").value;
    const name2 = document.querySelector("#player2-name").value;
    return [name1, name2];
  }
  function _hideBackground() {
    cardsContainer.style.display = "none";
    buttonContainer.remove();
    header.style.display = "none";
  }

  vsCpuBtn.innerText = "VS CPU";
  newGameBtn.innerText = "NEW GAME";
  unbeatableBtn.innerHTML = "UNBEATABLE MODE";
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(newGameBtn);
  buttonContainer.appendChild(vsCpuBtn);
  buttonContainer.appendChild(unbeatableBtn);
  body.appendChild(buttonContainer);

  newGameBtn.addEventListener("click", () => {
    let names = _collectNames();
    _hideBackground();
    GameBoard(
      { playerName: names[0], value: "x" },
      { playerName: names[1], value: "o" }
    );
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
    let names = _collectNames();
    _hideBackground();

    if (player1Card.classList.contains("on")) {
      GameBoard(
        { playerName: names[0], value: "x" },
        { playerName: "CPU", value: "o", systemEntity: "CPU" }
      );
    } else
      GameBoard(
        { playerName: "CPU", value: "x", systemEntity: "CPU" },
        { playerName: names[1], value: "o" }
      );
  });
  unbeatableBtn.addEventListener("click", () => {
    let names = _collectNames();
    _hideBackground();
    if (player1Card.classList.contains("on")) {
      GameBoard(
        { playerName: names[0], value: "x" },
        { playerName: "UNBEATABLE", value: "o", systemEntity: "UNBEATABLE" }
      );
    } else
      GameBoard(
        { playerName: names[1], value: "o" },
        { playerName: "UNBEATABLE", value: "x", systemEntity: "UNBEATABLE" }
      );
  });
  player1Card.addEventListener("click", () => {
    if (player2Card.classList.contains("on")) {
      player1Card.classList.toggle("on");
      player2Card.classList.toggle("on");
    }
  });
  player2Card.addEventListener("click", () => {
    if (player1Card.classList.contains("on")) {
      player2Card.classList.toggle("on");
      player1Card.classList.toggle("on");
    }
  });
};
Origin();

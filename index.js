const GameBoard = function (player1obj, player2obj) {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = "";
  }

  let players = [player1obj, player2obj];

  let activePlayer = players[0];
  let turnCount = 0;

  function updateBoard(cell) {
    if (board[cell] != "") return;
    board[cell] = activePlayer.value;
    _displayResult(_checkResult(board, activePlayer));
    if (_checkResult(board, activePlayer)) return;
    turnCount++;
    activePlayer = players[turnCount % 2];
    _displayBoard();
    if (activePlayer.playerName == "CPU") {
      _easyCPU();
    }
    if (activePlayer.playerName == "unbeatable") {
      updateBoard(_unbeatable(board, activePlayer));
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
  function _checkResult(arr, player) {
    if (arr[0] == arr[4] && arr[0] == arr[8] && arr[0] != "") {
      return player;
    }
    if (arr[2] == arr[4] && arr[2] == arr[6] && arr[2] != "") {
      return player;
    }

    for (let i = 0; i < 9; i = i + 3) {
      if (arr[i] == arr[i + 1] && arr[i] == arr[i + 2] && arr[i] != "") {
        return player;
      }
    }
    for (let i = 0; i < 3; i++) {
      if (arr[i] == arr[i + 3] && arr[i] == arr[i + 6] && arr[i] != "") {
        return player;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (arr[i] == "") return false;
    }
    return "tie";
  }
  function _displayResult(winner) {
    if (winner === false) return false;

    const modal = document.querySelector("#modal");
    if (modal.firstChild) modal.firstChild.remove();
    const msg = document.createElement("p");
    modal.prepend(msg);
    modal.close();
    modal.showModal();
    if (winner == "tie") {
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
  function _unbeatable(newBoard, player) {
    if (
      !Object.values(players[0]).includes("unbeatable") &&
      !Object.values(players[1]).includes("unbeatable")
    )
      return;
    const avalSpots = [];
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] == "") avalSpots.push(i);
    }
    if (_checkResult(newBoard, player)) {
      if (_checkResult(newBoard, player) === "tie") return { score: 0 };
      else if (_checkResult(newBoard, player).playerName == "unbeatable")
        return { score: 10 };
      else return { score: -10 };
    }
    let moves = [];
    for (let i = 0; i < avalSpots.length; i++) {
      let move = {};
      move.index = avalSpots[i];
      newBoard[avalSpots[i]] = player.value;
      if (player == players[0]) {
        move.score = _unbeatable(newBoard, players[1]).score;
      } else {
        move.score = _unbeatable(newBoard, players[0]).score;
      }
      newBoard[avalSpots[i]] = "";
      moves.push(move);
    }
    let bestMove = 0;
    if (player.playerName == "unbeatable") {
      let bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    console.log(moves[bestMove].index);
    return moves[bestMove].index;
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

const turnSeconds = document.querySelector(".seconds");
const gameTime = document.querySelector(".timer");
const playButton = document.querySelector(".play-game");
const endGameButton = document.querySelector(".end-game");
const playAgainButton = document.querySelector(".play-again");
const colorTurn = document.querySelector(".circle-turn");
const player = document.querySelector(".player-playing");
const winnerPlayer = document.querySelector(".winner-text");

player.textContent = "";
winnerPlayer.textContent = "";
turnSeconds.textContent = 5;
gameTime.textContent = 60;

let timer;
let timerTurn;
let tableCircles;
let player1 = "Player 1";
let player2 = "Player 2";
let counterTurns = 0;

let gameOver = false;
let board = [];

const rows = 6;
const columns = 7;
let getColumn;
let getRow;
let getColumnAndRow;

const setBoard = () => {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let y = 0; y < columns; y++) {
      let circle = document.createElement("div");
      circle.id = `${i.toString()}-${y.toString()}`;
      circle.classList.add("circle");
      circle.classList.add("not-pressed");
      document.querySelector(".board-composition").append(circle);
      tableCircles = document.querySelectorAll(".circle");
      row.push(circle);
    }
    board.push(row);
  }
};

const playGameButton = () => {
  playButton.onclick = () => {
    endGameButton.className = "end-game";
    playButton.className = "play-game hidden";
    player.textContent = player1;
    turnColor();
    gameTimer();
    turnTimer();
  };
};

const endGame = () => {
  endGameButton.onclick = () => {
    clearInterval(timer);
    clearInterval(timerTurn);
    playAgain();
    endGameButton.className = "end-game hidden";
    playAgainButton.className = "play-again";
    winnerPlayer.textContent = "It's a tie noobs";
  };
};

const playAgain = () => {
  playAgainButton.onclick = () => {
    gameTime.textContent = 60;
    playButton.className = "play-game";
    playAgainButton.className = "play-again hidden";
    player.textContent = "";
    winnerPlayer.textContent = "";
    gameOver = false;
    colorTurn.className = "circle-turn not-pressed";
    turnSeconds.textContent = 5;
    for (let i in tableCircles) {
      tableCircles[i].className = "circle not-pressed";
    }
  };
};

const turnColor = () => {
  if (player.textContent === player1)
    colorTurn.className = "circle-turn player1";
  if (player.textContent === player2)
    colorTurn.className = "circle-turn player2";
};

const gameTimer = () => {
  let setTimer = 60;
  timer = setInterval(() => {
    gameTime.textContent = setTimer;
    if (setTimer === 0) {
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      winnerPlayer.textContent = "It's a tie noobs";
    }
    setTimer--;
  }, 1000);
  return timer;
};

const turnTimer = () => {
  let setTimer = 5;
  timerTurn = setInterval(() => {
    turnSeconds.textContent = setTimer;
    if (setTimer === 0) {
      if (player.textContent === player1) {
        player.textContent = player2;
        turnColor();
      } else if (player.textContent === player2) {
        player.textContent = player1;
        turnColor();
      }
      clearInterval(timerTurn);
      turnTimer();
    }
    setTimer--;
  }, 1000);
  return timerTurn;
};

const playerVsPlayer = () => {
  for (let i in tableCircles) {
    tableCircles[i].onclick = () => {
      if (gameOver) return;
      const coordinates = tableCircles[i].id.split("-");
      getRow = parseInt(coordinates[0]);
      getColumn = parseInt(coordinates[1]);

      getColumnAndRow = Array.from(tableCircles);
      const buttonsManagerColumn = getColumnAndRow.filter(
        (circle) =>
          circle.id.includes(`-${getColumn}`) &&
          circle.className === "circle not-pressed"
      );

      if (
        tableCircles[i].className === "circle player1" ||
        tableCircles[i].className === "circle player2"
      )
        return;
      if (player.textContent === "Player 1") {
        buttonsManagerColumn[buttonsManagerColumn.length - 1].className =
          "circle player1";
        const newCoordinates =
          buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
        getRow = parseInt(newCoordinates[0]);
        player.textContent = "Player 2";
        clearInterval(timerTurn);
        turnSeconds.textContent = 5;
        turnColor();
        turnTimer();
        verticalCheck();
        horizontalCheck();
        diagonalUpToDownCheck();
        diagonalDownToUpCheck();
        counterTurns++;
        return;
      }
      if (player.textContent === "Player 2") {
        buttonsManagerColumn[buttonsManagerColumn.length - 1].className =
          "circle player2";
        const newCoordinates =
          buttonsManagerColumn[buttonsManagerColumn.length - 1].id.split("-");
        getRow = parseInt(newCoordinates[0]);
        player.textContent = "Player 1";
        clearInterval(timerTurn);
        turnSeconds.textContent = 5;
        turnColor();
        turnTimer();
        verticalCheck();
        horizontalCheck();
        diagonalUpToDownCheck();
        diagonalDownToUpCheck();
        counterTurns++;
        return;
      }
      if (counterTurns === 42) {
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        winnerPlayer.textContent = "It's a tie noobs";
      }
    };
  }
};

const verticalCheck = () => {
  const checkColumn = getColumnAndRow.filter((circle) =>
    circle.id.includes(`-${getColumn}`)
  );

  for (let i in checkColumn) {
    if (
      checkColumn[i].className === "circle player1" &&
      checkColumn[Number(i) + 1] &&
      checkColumn[Number(i) + 1].className === "circle player1" &&
      checkColumn[Number(i) + 2] &&
      checkColumn[Number(i) + 2].className === "circle player1" &&
      checkColumn[Number(i) + 3] &&
      checkColumn[Number(i) + 3].className === "circle player1"
    ) {
      gameOver = true;
      winnerPlayer.textContent = "Player 1 wins";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
  for (let i in checkColumn) {
    if (
      checkColumn[i].className === "circle player2" &&
      checkColumn[Number(i) + 1] &&
      checkColumn[Number(i) + 1].className === "circle player2" &&
      checkColumn[Number(i) + 2] &&
      checkColumn[Number(i) + 2].className === "circle player2" &&
      checkColumn[Number(i) + 3] &&
      checkColumn[Number(i) + 3].className === "circle player2"
    ) {
      gameOver = true;
      winnerPlayer.textContent = "Player 2 wins";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
};

const horizontalCheck = () => {
  const checkRow = getColumnAndRow.filter((circle) =>
    circle.id.includes(`${getRow}-`)
  );

  for (let i in checkRow) {
    if (
      checkRow[i].className === "circle player1" &&
      checkRow[Number(i) + 1] &&
      checkRow[Number(i) + 1].className === "circle player1" &&
      checkRow[Number(i) + 2] &&
      checkRow[Number(i) + 2].className === "circle player1" &&
      checkRow[Number(i) + 3] &&
      checkRow[Number(i) + 3].className === "circle player1"
    ) {
      gameOver = true;
      winnerPlayer.textContent = "Player 1 wins";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
  for (let i in checkRow) {
    if (
      checkRow[i].className === "circle player2" &&
      checkRow[Number(i) + 1] &&
      checkRow[Number(i) + 1].className === "circle player2" &&
      checkRow[Number(i) + 2] &&
      checkRow[Number(i) + 2].className === "circle player2" &&
      checkRow[Number(i) + 3] &&
      checkRow[Number(i) + 3].className === "circle player2"
    ) {
      gameOver = true;
      winnerPlayer.textContent = "Player 2 wins";
      clearInterval(timer);
      clearInterval(timerTurn);
      endGameButton.className = "end-game hidden";
      playAgainButton.className = "play-again";
      player.textContent = "";
      colorTurn.className = "circle-turn not-pressed";
    }
  }
};

const diagonalUpToDownCheck = () => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        board[i][j].className === "circle player1" &&
        board[i + 1] &&
        board[i + 1][j + 1] &&
        board[i + 1][j + 1].className === "circle player1" &&
        board[i + 2] &&
        board[i + 2][j + 2] &&
        board[i + 2][j + 2].className === "circle player1" &&
        board[i + 3] &&
        board[i + 3][j + 3] &&
        board[i + 3][j + 3].className === "circle player1"
      ) {
        gameOver = true;
        winnerPlayer.textContent = "Player 1 wins";
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        board[i][j].className === "circle player2" &&
        board[i + 1] &&
        board[i + 1][j + 1] &&
        board[i + 1][j + 1].className === "circle player2" &&
        board[i + 2] &&
        board[i + 2][j + 2] &&
        board[i + 2][j + 2].className === "circle player2" &&
        board[i + 3] &&
        board[i + 3][j + 3] &&
        board[i + 3][j + 3].className === "circle player2"
      ) {
        gameOver = true;
        winnerPlayer.textContent = "Player 2 wins";
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
};

const diagonalDownToUpCheck = () => {
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        board[i][j].className === "circle player1" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player1" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player1" &&
        board[i - 3] &&
        board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player1"
      ) {
        gameOver = true;
        winnerPlayer.textContent = "Player 1 wins";
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
  for (let i = board.length - 1; i >= 0; i--) {
    for (let j = 0; j < board[i].length; j++) {
      if (
        board[i][j].className === "circle player2" &&
        board[i - 1] &&
        board[i - 1][j + 1] &&
        board[i - 1][j + 1].className === "circle player2" &&
        board[i - 2] &&
        board[i - 2][j + 2] &&
        board[i - 2][j + 2].className === "circle player2" &&
        board[i - 3] &&
        board[i - 3][j + 3] &&
        board[i - 3][j + 3].className === "circle player2"
      ) {
        gameOver = true;
        winnerPlayer.textContent = "Player 2 wins";
        clearInterval(timer);
        clearInterval(timerTurn);
        endGameButton.className = "end-game hidden";
        playAgainButton.className = "play-again";
        player.textContent = "";
        colorTurn.className = "circle-turn not-pressed";
      }
    }
  }
};

const conecta4Game = () => {
  setBoard();
  playGameButton();
  endGame();
  turnColor();
  playerVsPlayer();
  playAgain();
};

conecta4Game();
// Dimensiones del tablero
const rows = 6;
const cols = 7;
const squareSize = 80;

// Colores
const backgroundColor = '#FFFFFF';
const darkSquareColor = '#B58863';
const lightSquareColor = '#F0D9B5';
const player1Color = '#00FF00';
const player2Color = '#FFFF00';
const emptyColor = '#CCCCCC';
const lineColor = '#000000';

// Estado del juego
let board = [];
let currentPlayer = 1;
let gameOver = false;
let winner = null;

// Configuración inicial
function setup() {
  createCanvas(cols * squareSize, (rows + 1) * squareSize);
  resetBoard();
}

// Dibuja el tablero y las fichas
function draw() {
  background(backgroundColor);
  drawBoard();
  drawPieces();
  checkGameOver();
}

// Dibuja el tablero
function drawBoard() {
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const squareColor = (col + row) % 2 === 0 ? lightSquareColor : darkSquareColor;
      fill(squareColor);
      stroke(lineColor);
      rect(col * squareSize, (row + 1) * squareSize, squareSize, squareSize);
    }
  }
}

// Dibuja las fichas en el tablero
function drawPieces() {
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const player = board[col][row];
      if (player === 1) {
        fill(player1Color);
      } else if (player === 2) {
        fill(player2Color);
      } else {
        continue;
      }
      ellipse(
        col * squareSize + squareSize / 2,
        (row + 1) * squareSize + squareSize / 2,
        squareSize * 0.8,
        squareSize * 0.8
      );
    }
  }
}

// Actualiza el estado del juego al hacer clic
function mouseClicked() {
  if (gameOver) {
    resetBoard();
    return;
  }
  
  const col = floor(mouseX / squareSize);
  if (col < 0 || col >= cols) {
    return;
  }

  for (let row = rows - 1; row >= 0; row--) {
    if (board[col][row] === 0) {
      board[col][row] = currentPlayer;
      switchPlayer();
      break;
    }
  }
}

// Cambia el turno del jugador
function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

// Verifica si hay un ganador o empate
function checkGameOver() {
  // Verifica si hay un ganador en las filas
  for (let col = 0; col < cols - 4; col++) {
    for (let row = 0; row < rows; row++) {
      const player = board[col][row];
      if (
        player !== 0 &&
        player === board[col + 1][row] &&
        player === board[col + 2][row] &&
        player === board[col + 3][row] &&
        player === board[col + 4][row]
      ) {
        gameOver = true;
        winner = player;
        congratulateWinner();
        return;
      }
    }
  }

  // Verifica si hay un ganador en las columnas
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows - 4; row++) {
      const player = board[col][row];
      if (
        player !== 0 &&
        player === board[col][row + 1] &&
        player === board[col][row + 2] &&
        player === board[col][row + 3] &&
        player === board[col][row + 4]
      ) {
        gameOver = true;
        winner = player;
        congratulateWinner();
        return;
      }
    }
  }

  // Verifica si hay un ganador en las diagonales hacia arriba
  for (let col = 0; col < cols - 4; col++) {
    for (let row = 4; row < rows; row++) {
      const player = board[col][row];
      if (
        player !== 0 &&
        player === board[col + 1][row - 1] &&
        player === board[col + 2][row - 2] &&
        player === board[col + 3][row - 3] &&
        player === board[col + 4][row - 4]
      ) {
        gameOver = true;
        winner = player;
        congratulateWinner();
        return;
      }
    }
  }

  // Verifica si hay un ganador en las diagonales hacia abajo
  for (let col = 0; col < cols - 4; col++) {
    for (let row = 0; row < rows - 4; row++) {
      const player = board[col][row];
      if (
        player !== 0 &&
        player === board[col + 1][row + 1] &&
        player === board[col + 2][row + 2] &&
        player === board[col + 3][row + 3] &&
        player === board[col + 4][row + 4]
      ) {
        gameOver = true;
        winner = player;
        congratulateWinner();
        return;
      }
    }
  }

  // Verifica si hay un empate
  let isBoardFull = true;
  for (let col = 0; col < cols; col++) {
    if (board[col].includes(0)) {
      isBoardFull = false;
      break;
    }
  }
  if (isBoardFull) {
    gameOver = true;
    winner = 0;
    congratulateWinner();
  }
}

// Felicita al ganador
function congratulateWinner() {
  if (winner !== null) {
    textSize(30);
    fill(0);
    textAlign(CENTER);
    text("CONGRATULATIONS!", width / 2, height - squareSize);
    noLoop();
  } else {
    console.log("It's a tie!");
  }
}

// Reinicia el tablero y el estado del juego
function resetBoard() {
  board = [];
  for (let col = 0; col < cols; col++) {
    board[col] = [];
    for (let row = 0; row < rows; row++) {
      board[col][row] = 0;
    }
  }
  currentPlayer = 1;
  gameOver = false;
  winner = null;
}




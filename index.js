const initBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

let board = initBoard();

let currentPlayer = 1;

let nextMove = true;

const verify = list => {
  if(list.every(el => el === 1)) { return 1; }
  else if(list.every(el => el === 2)) { return 2; }
  else { return 0; }
};

const isBoardFull = () => board.flat().every(el => el);

const checkBoard = () => {
  // Filas
  const row1 = board[0];
  const row2 = board[1];
  const row3 = board[2];

  // Columnas
  const col1 = board.map(row => row[0]);
  const col2 = board.map(row => row[1]);
  const col3 = board.map(row => row[2]);

  // Diagonales
  const diagL2R = [board[0][0], board[1][1], board[2][2]]; 
  const diagR2L = [board[0][2], board[1][1], board[2][0]];

  const itemsToCheck = [
    row1, row2, row3,
    col1, col2, col3,
    diagL2R, diagR2L
  ];
  
  for(let i = 0; i < itemsToCheck.length; i++) {
    const check = verify(itemsToCheck[i]);
    if(check !== 0) { return check; }
  }

  return -1;
};

const makeMove = (row, col) => {
  if(!board[row][col]) {
    board[row][col] = currentPlayer;
    const boardChecked = checkBoard();

    if(boardChecked === -1) {
      if(isBoardFull()) {
        nextMove = false;
        alert("empate");
      } else {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
      }
    } else {
      nextMove = false;
      alert(`Ganó el jugador ${boardChecked}`);
    }
  }

  drawBoard();
};

const drawBoard = () => {
  const htmlBoard = document.getElementsByClassName("board")[0];
  htmlBoard.innerHTML = "";

  board.forEach((row, i) => {
    row.forEach((col, j) => {
      const div = document.createElement("div");
      div.classList.add("board__cell");
      div.addEventListener("click", e => makeMove(i, j));
      div.innerHTML = board[i][j];
      htmlBoard.appendChild(div);
    });
  });
};

(function (){
  drawBoard();
})();

// Creando una función que retorne una matriz de dos dimensiones
//¿Por qué se crea en una función?
const initBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

let board = initBoard();

// Variable que indica el jugador que está jugando actualmente
let currentPlayer = "O";

// Para qué sirve?
let nextMove = true;
let isCircleOrEx = confirm("Primer player, confirm = círculo, cancel = equis");

const circleOrEx = () => {
  if(isCircleOrEx) {
    currentPlayer = "O"
  } else {
    currentPlayer = "X"
  }

  return currentPlayer;
}

// Función que verifica si hay un ganador
const verify = list => {
  if(list.every(el => el === "O")) { return 1; }
  else if(list.every(el => el === "X")) { return 2; }
  else { return 0; }
};

// Función que comprueba si el tablero está lleno
const isBoardFull = () => board.flat().every(el => el);

// Función que comprueba el estado del tablero
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

  // Array que contiene todas las posibles condiciones de victoria
  const itemsToCheck = [
    row1, row2, row3,
    col1, col2, col3,
    diagL2R, diagR2L
  ];
  
  // Bucle que verifica cada condición de victoria
  for(let i = 0; i < itemsToCheck.length; i++) {
    const check = verify(itemsToCheck[i]);
    if(check !== 0) { return check; }
  }

  return -1;
};

// Función manejadora que, en caso de ser null, le otorga a la posición el número del jugador actual y en el caso de no haber ni ganador ni empate cambia al jugador actual, también anuncia que hay un ganador para que así el juego termine y al final invoca a la función que dibuja el tablero en el dom. 
const makeMove = (row, col) => {
  if(!board[row][col]) {
    board[row][col] = circleOrEx();
    const boardChecked = checkBoard();

    if(boardChecked === -1) {
      if(isBoardFull()) {
        nextMove = false;
        alert("empate"); //fix: enunciar el empate de mejor manera.
      } else {
        isCircleOrEx = (isCircleOrEx) ? false : true;
      }
    } else {
      nextMove = false;
      alert(`Ganó el jugador ${boardChecked}`); //fix: enunciar al ganador de mejor manera
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
      div.addEventListener("click", e => makeMove(i, j)); //Qué hace exactamente esto? crea un escucha para cada div?
      div.innerHTML = board[i][j]; //Cambiar el número por una X o una O dependiendo del jugador actual.
      htmlBoard.appendChild(div);
    });
  });
};

//Función autoejecutable que se ejecuta a cada cambio
(function (){
  drawBoard();
})();

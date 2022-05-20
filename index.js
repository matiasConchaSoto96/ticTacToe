// Creando una función que retorne una matriz de dos dimensiones
//¿Por qué se crea en una función?
const initBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const htmlFigureContainer = document.getElementById("figure__container");
const htmlEndGame = document.getElementById("end-game");
let board = initBoard();

// Variable que indica la figura del jugador actual
let currentPlayerFigure = "O";

// Variable que indica el jugador que está jugando actualmente
let currentPlayerNumber = 1;

// Para qué sirve?
let nextMove = true;
let isCircleOrEx;

// Función que asigna la figura correcta al jugador actual.
const circleOrEx = () => {
  if(isCircleOrEx) {
    currentPlayerFigure = "O"
  } else {
    currentPlayerFigure = "X"
  }

  return currentPlayerFigure;
}

// Función manejadora que inicializa la variable isCircleOrEx.
const setInitialFigure = (e) => {
  if(e.target.matches("#figure__circle")) {
    isCircleOrEx = true;
    document.getElementById("figure").classList.add("none");
  } else if (e.target.matches("#figure__ex")) {
    isCircleOrEx = false;
    document.getElementById("figure").classList.add("none");
  }
};


htmlFigureContainer.addEventListener("click", setInitialFigure);

// Función manejadora que anuncia al ganador y pregunta si quieres jugar de nuevo
const playAgain = (e) => {
  if(e.target.matches("#end-game__play")) {
    htmlEndGame.classList.add("none");
    document.getElementById("figure").classList.remove("none");
    cleanBoard();
    drawBoard();
  }
};

htmlEndGame.addEventListener("click", playAgain);

// Función que verifica si hay un ganador
const verify = list => {
  if(list.every(el => el === "O")) { return 1; }
  else if(list.every(el => el === "X")) { return 2; }
  else { return 0; }
};

// Función que comprueba si el tablero está lleno
const isBoardFull = () => board.flat().every(el => el);

// Función que limpia el tablero
const cleanBoard = () => {
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      board[i][j] = null;
    });
  });
}

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

// Función manejadora que, en caso de ser null, le otorga a la posición la figura del jugador actual y en el caso de no haber ni ganador ni empate cambia la figura y le toca al siguiente jugador, también anuncia que hay un ganador para que así el juego termine y al final invoca a la función que dibuja el tablero en el dom. 
const makeMove = (row, col) => {
  if(!board[row][col]) {
    board[row][col] = circleOrEx();
    const boardChecked = checkBoard();

    if(boardChecked === -1) {
      if(isBoardFull()) {
        nextMove = false;
        document.getElementById("end-game__text").innerHTML = "Empate";
        currentPlayerNumber = 1;
        htmlEndGame.classList.remove("none");
      } else {
        isCircleOrEx = (isCircleOrEx) ? false : true;
        currentPlayerNumber = (currentPlayerNumber === 1) ? currentPlayerNumber = 2 : currentPlayerNumber = 1;
      }
    } else {
      nextMove = false;
      document.getElementById("end-game__text").innerHTML = `Felicidades jugador ${currentPlayerNumber} has ganado!!!`;
      currentPlayerNumber = 1;
      htmlEndGame.classList.remove("none");
    }
  }

  drawBoard();
};


const drawBoard = () => {
  const htmlBoard = document.getElementsByClassName("board__container")[0];
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

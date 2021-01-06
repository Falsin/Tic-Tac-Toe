const board = document.getElementById('gameBoard');
const cells = [...board.children];

const player = (() => {
  let rows = [];
  let columns = [];
  let diagonals = [];


  return function(number, color) {
    const playerNumber = number;
    let playerColor = color;
    return {playerNumber, playerColor};
  }
})()

const player1 = (name) => {
  const {playerNumber, playerColor} = player(1, 'blue');
  
  return {playerNumber, playerColor};
}

const player2 = (name) => {
  const {playerNumber, playerColor} = player(2, 'red');
  
  return {playerNumber, playerColor};
}

let gameBoard = (prop, player) => {
  prop.background = player.playerColor;
}

let obj;

let gameControl = (() => {
  let currentPlayer = player1();

  return function(item) {
    gameBoard(item.style, currentPlayer)
    currentPlayer = (currentPlayer.playerNumber == 1) ? player2() : player1();



    /* for (let i = 0; i < item.classList.length; i++) {
      let className = item.classList[i];
      if(className.includes('row')) {
        let rows1 = board.querySelectorAll(`.${className}`);
        rows.push(rows1);
      } else if(className.includes('column')) {
        let columns1 = board.querySelectorAll(`.${className}`);
        columns.push(columns1);
      } else {
        let diagonals1 = board.querySelectorAll(`.${className}`);
        diagonals.push(diagonals1);
      }
    }

    obj = {rows, columns, diagonals} */
  }
})()

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})


/* let gameBoard = (() => {
  const board = document.getElementById('gameBoard');
  let cells = [...board.children];

  let rows = [];
  let columns = [];
  let diagonals = [];

  cells.forEach(item => {
    item.addEventListener('mousedown', () => {
      console.dir(item);
      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];
        if(className.includes('row')) {
          let rows1 = board.querySelectorAll(`.${className}`);
          rows.push([...rows1]);
        } else if(className.includes('column')) {
          let columns1 = board.querySelectorAll(`.${className}`);
          columns.push([...columns1]);
        } else {
          let diagonals1 = board.querySelectorAll(`.${className}`);
          diagonals.push([...diagonals1]);
        }
      }
    })
  })

  return {
    rows,
    columns,
    diagonals
  }
})();

let artem = player1('Artem');


function changeBackground() {
  let array = gameBoard.rows[0].concat(gameBoard.columns[0], gameBoard.diagonals[0]);
  array.forEach(item => {
    item.style.background = "red";
  })
} */


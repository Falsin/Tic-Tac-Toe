const board = document.getElementById('gameBoard');
const cells = [...board.children];

const player = (number, color) => {
  const playerNumber = number;
  let playerColor = color;
  return {playerNumber, playerColor};
}

const player1 = (() => {
  let fields = []

  return function(name) {
    const {playerNumber, playerColor} = player(1, 'blue');
    return {playerNumber, playerColor, fields}
  }
})()

const player2 = (() => {
  let fields = [];

  return function(name) {
    const {playerNumber, playerColor} = player(2, 'red');
    return {playerNumber, playerColor, fields}
  }

})()

let gameBoard = (prop, player) => {
  prop.background = player.playerColor;
}

/* let obj; */

let gameControl = (() => {
  let currentPlayer = player1();
  let selectedCells = [];

  return function(item) {
    if(!selectedCells.includes(item)) {
      gameBoard(item.style, currentPlayer)
      currentPlayer = (currentPlayer.playerNumber == 1) ? player2() : player1();
      selectedCells.push(item);

      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];
        if(className.includes('row')) {
          let rows = board.querySelectorAll(`.${className}`);
          currentPlayer.fields.push(rows)
        } else if(className.includes('column')) {
          let columns = board.querySelectorAll(`.${className}`);
          currentPlayer.fields.push(columns);
        } else {
          let diagonals = board.querySelectorAll(`.${className}`);
          currentPlayer.fields.push(diagonals);
        }
      }



      
    }
    /* obj = currentPlayer.fields; */
  }

})()

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})

/* function showValidFields() {
  for (let i = 0; i < obj.length; i++) {
    for (let j = 0; j < obj[i].length; j++) {
      obj[i][j].style.background = "yellow";
    }
  }
} */


   /*  for (let i = 0; i < item.classList.length; i++) {
      let className = item.classList[i];
      if(className.includes('row')) {
        let rows = board.querySelectorAll(`.${className}`);
        currentPlayer.validField.push(rows)
        rows.push(rows1);
      } else if(className.includes('column')) {
        let columns = board.querySelectorAll(`.${className}`);
        columns.push(columns1);
      } else {
        let diagonals = board.querySelectorAll(`.${className}`);
        diagonals.push(diagonals1);
      }
    } */

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


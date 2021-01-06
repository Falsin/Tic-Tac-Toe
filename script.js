const board = document.getElementById('gameBoard');
const cells = [...board.children];

const player = (number, color) => {
  const playerNumber = number;
  let playerColor = color;
  return {playerNumber, playerColor};
}

const player1 = (() => {
  let fields = {};

  return function(name) {
    const {playerNumber, playerColor} = player(1, 'blue');
    return {playerNumber, playerColor, fields}
  }
})()

const player2 = (() => {
  let fields = {};

  return function(name) {
    const {playerNumber, playerColor} = player(2, 'red');
    return {playerNumber, playerColor, fields}
  }

})()

let gameBoard = (prop, player) => {
  prop.background = player.playerColor;
}

let obj;

let gameControl = (() => {
  let player = player1();
  let selectedCells = [];

  return function(item) {
    if(!selectedCells.includes(item)) {
      gameBoard(item.style, player)
      selectedCells.push(item);

      for (let i = 0; i < item.classList.length; i++) {
        let className = item.classList[i];

        if(player.fields[className] === undefined) {
          player.fields[className] = 0;
        }

        player.fields[className]++;

        if(player.fields[className] == 3) {
          alert(`${player.playerNumber} win!`);
        }
      }

      obj = player.fields;
      player = (player.playerNumber == 1) ? player2() : player1();

    }
  }

})()

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})
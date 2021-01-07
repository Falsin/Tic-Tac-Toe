const greetingBlock = document.getElementById('greetingBlock');
const choosePlayer = document.getElementById('choosePlayer');
const buttons = choosePlayer.querySelectorAll('button');
const startButton = document.getElementById('start');
const names = document.querySelectorAll('input');

const container = document.getElementById('container');
const board = document.getElementById('gameBoard');
const cells = [...board.children];


/* buttons.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    const parentNode = item.parentNode.parentNode;
    const selectedPlayer = parentNode.classList[0];
    console.log(selectedPlayer);
  })
}) */



startButton.addEventListener('mousedown', () => {
  greetingBlock.style.display = 'none';
  container.style.display = 'grid';

  for (let i = 0; i < names.length; i++) {
    const parentNode = names[i].parentNode.parentNode;
    const player = parentNode.classList[0];
    console.log(names[i].value);
    if(player == 'player1' && names[i].value != '') {
      player1(names[i].value);
    } else if(player == 'player2' && names[i].value != '') {
      player2(names[i].value);
    }
  }
})

let player1 = (() => {
  let defaultName = 'player 1';
  let color = 'blue';
  let fields = {};
  const number = 1;

  return function (name = defaultName) {
    return {fields, name, color, number}
  }
})()

let player2 = (() => {
  let defaultName = 'player 2';
  let color = 'red';
  let fields = {};
  const number = 2;

  return function (name = defaultName) {
    return {fields, name, color, number}
  }
})()

let gameBoard = (prop, player) => {
  prop.background = player.color;
}

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
          alert(`${player.name} win!`);
        }
      }

      player = (player.number == 1) ? player2() : player1();

    }
  }

})()

cells.forEach(item => {
  item.addEventListener('mousedown', () => gameControl(item))
})
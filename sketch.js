let grid;
let cols = 16;
let rows = 16;
let w = 32;

let game;

let totalMines = 30;
let gameEnd = false;
let gameWin = false;

let sprite;
let totalCells = 16*16-30;
console.log(totalCells)

function setup() {
  gameEnd = false;
  createCanvas(32*16, 32*18);
  game = new Game(frameCount);
  sprite = loadImage('minesweeper.png')
  grid = new Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // mines spots
  let options = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n < totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    // Deletes that spot so it's no longer an option
    options.splice(index, 1);
    grid[i][j].mine = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}

function gameOver() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].mine) {
        grid[i][j].revealed = true;
      }
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    // if you want to restart the game
    if (mouseX > width/2 -24 && mouseX < width/2 + 24 && mouseY > 8 && mouseY < 8+48) {
      setup();
      return;
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (!gameEnd) {
          if (grid[i][j].contains(mouseX, mouseY)) {
            grid[i][j].reveal();

            if (grid[i][j].mine) {
              gameOver();
              gameEnd = true;
            }
          }
        }
      }
    }
  }
  else if (mouseButton === RIGHT) {
    for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!gameEnd) {
        if (grid[i][j].contains(mouseX, mouseY)) {
          grid[i][j].trigger();
        }
      }
    }
  }
  }
}

function draw() {
  background(125);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  game.show();
  if (game.minutes  <= 0) {
    gameOver();
    gameEnd = false;
  }
  if (totalCells <= 0) {
    gameWin = true;
    gameEnd = true;
  }
}

class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w + 64;
    this.w = w;
    this.neighborCount = 0;
    this.mine = false;
    this.revealed = false;
    this.flagged = false;
    this.flaggedTimes = 0;
  }

  show() {
    image(sprite, this.x, this.y, this.w, this.w, 0, 50, 17, 17);
    if (this.revealed) {
      if (this.mine) {
        image(sprite, this.x, this.y, this.w, this.w, 5*17, 50, 17, 17);
      } else {
        image(sprite, this.x, this.y, this.w, this.w, 17, 50, 17, 17);
        if (this.neighborCount > 0) {
          image(sprite, this.x, this.y, this.w, this.w, 17 * (this.neighborCount - 1), 67, 17, 17);
        }
      }
    }
    else if (this.flagged) {
      if (this.flaggedTimes == 1)
        image(sprite, this.x, this.y, this.w,this.w, 17 * 2, 50, 17,17);
      else {
        image(sprite, this.x, this.y, this.w,this.w, 17 * 3, 50, 17,17);
      }
    }
  }

  countMines() {
    const dirs = [-1,0,-1,-1,1,0,1,1,-1];
    if (this.mine) {
      this.neighborCount = -1;
      return;
    }
    let total = 0;
    let check_x, check_y;
    for (let i = 0; i < 8; i++) {
      check_x = this.i + dirs[i];
      check_y = this.j + dirs[i + 1];
      if (check_x < 0 || check_x >= cols || check_y < 0 || check_y >= rows) {
        continue;
      }
      let neighbor = grid[check_x][check_y];
      if (neighbor.mine) {
        total++;
      }
    }
    this.neighborCount = total;
  }

  contains(x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  }

  reveal() {
    totalCells--;
    this.revealed = true;
    if (this.neighborCount == 0) {
      // flood fill time
      this.flood();
    }
  }
  
  trigger() {
    if (this.flaggedTimes == 0) {
      this.flagged = !this.flagged;
      this.flaggedTimes = 1
    } else if (this.flaggedTimes == 1){
      this.flaggedTimes = 2
    } else {
      this.flagged = !this.flagged;
      this.flaggedTimes = 0;
    }
  }

  flood() {
    const dirs = [-1,0,-1,-1,1,0,1,1,-1];
    let check_x, check_y;
    for (let i = 0; i < 8; i++) {
      check_x = this.i + dirs[i];
      check_y = this.j + dirs[i + 1];
      if (check_x < 0 || check_x >= cols || check_y < 0 || check_y >= rows) {
        continue;
      }
      let neighbor = grid[check_x][check_y];
      // opening the cells that are not mines and are near you
      if (!neighbor.revealed && !neighbor.mine && !neighbor.flagged) {
        neighbor.reveal();
      }
    }
  }
}

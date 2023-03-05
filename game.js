class Game {
  constructor(start) {
    this.time = start;
    this.minutes = 40;
    this.seconds = 0;
  }
  
  show() {
    this.showTime()
    this.showFace()
    this.showSeconds()
  }
  
  showTime() {
    // counting the minutes passed
    this.minutes = 40 - floor((frameCount - this.time) / 3600)
    let right = this.minutes % 10;
    let left = floor(this.minutes / 10);
    if (left == 0) left = 10;
    if (right == 0) right = 10;
    image(sprite, 16, 8, 24, 48, 9 * 14,0, 13, 24);
    image(sprite, 16 + 24 * 1, 8, 24, 48, (left - 1) * 14,0, 13, 24);
    image(sprite, 16 + 24 * 2, 8 , 24, 48, (right - 1) * 14,0, 13, 24);
  }
  
  showFace() {
    if (gameWin) {
      image(sprite, width/2 -24, 8 , 48, 48, 3 * 27, 24, 26, 26);
    }
    else if (gameEnd) {
      image(sprite, width/2 -24, 8 , 48, 48, 4 * 27, 24, 26, 26);
    }
    else {
    //showing the face based on the action
      image(sprite, width/2 -24, 8 , 48, 48, 2 * 27, 24, 26, 26);}
  }
  
  showSeconds() {
    // counting the seconds passed
    if (!gameEnd) {
      this.seconds = (floor((frameCount - this.time) / 60))
    }
      let hundred = floor(this.seconds / 100)
      let right = this.seconds % 10;
      let left = floor((this.seconds % 100)/10);
      if (hundred == 0) hundred = 10;
      if (left == 0) left = 10;
      if (right == 0) right = 10;
      image(sprite, width - (16 + 24 * 1), 8, 24, 48, (right-1) * 14,0, 13, 24);
      image(sprite, width - (16 + 24 * 2), 8, 24, 48, (left-1) * 14,0, 13, 24);
      image(sprite, width - (16 + 24 * 3), 8, 24, 48, (hundred - 1) * 14,0, 13, 24);
    
  }
}
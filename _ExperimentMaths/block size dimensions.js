class shapingDesign {
  constructor(rows, difference) {
    this.rows = rows;
    this.blockSize = 2 * Math.floor(rows / difference / 2);
    this.remainingRows = rows - this.block;
  }
}

class shapingSubsections {
  constructor(rows, shapingRows) {
    this.rows = rows;
    this.shapingRows = shapingRows;

    //How will the majority of this shaping be distributed across the piece?
    this.standardBlockSize = 2 * Math.floor(rows / shapingRows / 2);
    if (this.standardBlockSize < 2) {
      this.standardBlockSize = 2;
    }
    this.totalShapingBlocks = Math.floor(rows / this.standardBlockSize);
    if (this.totalShapingBlocks > shapingRows) {
      this.totalShapingBlocks = shapingRows;
    }

    //What's left over?
    this.blocksWithExtraPlainRow =
      (rows - this.standardBlockSize * this.totalShapingBlocks) / 2;
    this.blocksWithExtraShapingRow = shapingRows - this.totalShapingBlocks; // IS THIS IDENTICAL TO WS SHAPING ROWS BELOW?

    // Where should the leftovers go?
    if (this.standardBlockSize == 2) {
      this.rowsWithWSShaping = this.blocksWithExtraShapingRow;
    } else if (
      this.standardBlockSize > 2 &&
      this.blocksWithExtraShapingRow > 0
    ) {
      this.additionalShapingingOnRSRow =
        2 * Math.floor(this.ShapeRSEvery / 2 / 2);
    }
  }
}

// for (let rows = 2; rows < 40; rows += 2) {
//   console.log(`*********** ROWS = ${rows} `);
//   for (let shapingRows = 1; shapingRows < rows; shapingRows++) {
//     let output = new shapingSubsections(rows, shapingRows);
//     console.log(output);
//   }
// }

// let example = new shapingSubsections(18, 6);
// console.log(example);

module.exports = shapingSubsections;

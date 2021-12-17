class shapingDesign {
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
    this.blocksWithExtraShapingRow = shapingRows - this.totalShapingBlocks;

    // Where should the remaining shaping be put within their block
    if (this.standardBlockSize == 2) {
      this.rowsWithWSShaping = this.blocksWithExtraShaping;
    } else if (
      this.standardBlockSize > 2 &&
      this.blocksWithExtraShapingRow > 0
    ) {
      this.additionalShapingingOnRSRow =
        2 * Math.floor(this.ShapeRSEvery / 2 / 2);
    }
  }
}

for (let rows = 10; rows < 70; rows += 2) {
  console.log(`*********** ROWS = ${rows} `);
  for (let shapingRows = 1; shapingRows < rows; shapingRows++) {
    let output = new shapingDesign(rows, shapingRows);
    if (output.blocksWithExtraShapingRow < 0) {
      console.log(output);
    }
  }
}

// let example = new shapingDesign(18, 6);
// console.log(example);

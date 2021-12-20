// given a shapingSubsections object, returns a pattern of divs that shows placement of shaping rows.

//define shaping subsection logic as class
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

// functions that make divs
const getRowOfDivs = (length) => {
  let rowDiv = document.createElement("div");
  rowDiv.className = "rowDiv";
  for (let i = 0; i < length; i++) {
    let stDiv = document.createElement("div");
    stDiv.className = "stDiv";
    rowDiv.append(stDiv);
  }
  return rowDiv;
};

const getBlockofRows = (rows, sts) => {
  let block = document.createElement("div");
  block.className = "block";
  for (let i = 0; i < rows; i++) {
    let row = getRowOfDivs(sts);
    if (i == 0) {
      row.classList.add("shapingRow");
    }
    block.append(row);
  }
  console.log("success");
  return block;
};

const getBlocksFromSubsectionObject = (object, sts) => {
  let container = document.createElement("div");
  for (let blocks = 0; blocks < object.totalShapingBlocks; blocks++) {
    let blocksize = 0;
    if (blocks < object.blocksWithExtraPlainRow) {
      blocksize = object.standardBlockSize + 2;
    } else {
      blocksize = object.standardBlockSize;
    }
    let block = getBlockofRows(blocksize, sts);
    sts--;
    container.append(block);
  }
  return container;
};

//slider interface
let slider = document.getElementById("myRange");
let output = document.getElementById("output");
slider.oninput = function () {
  refreshScreen(this.value);
  output.innerHTML = slider.value;
};

//instance of subsection shaping
function refreshScreen(shapingRows) {
  let example = new shapingSubsections(40, shapingRows);
  let startSts = 26;

  const container = document.getElementById("container");

  let diagram = getBlocksFromSubsectionObject(example, startSts);
  container.innerHTML = "";
  container.append(diagram);
}

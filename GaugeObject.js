class GaugeObject {
  constructor(sts, rows, pattern = [1, 0]) {
    // A pattern requiring "multiple of 6 + 2" would be described [6,2]
    // The default values describe a pattern repeat of 1 st with no border,
    // ie, no specified pattern stitch, stockinette, or garter
    // sts + rows describe how many of each must be knitted to create 10cm
    // of fabric
    this.sts = sts;
    this.rows = rows;
    this.pattern = pattern;
  }

  //Translations between gauge and measurements
  stsFromLen = (cm) => {
    return Math.floor((this.sts / 10) * cm);
  };

  rowsFromLen = (cm) => {
    return Math.floor((this.rows / 10) * cm);
  };

  //Basic geometric units
  rectangle = (sts, length) => {
    let rows = this.rowsFromLen(length);
    let object = {
      type: "rectangle",
      startSts: sts,
      endSts: sts,
      rows: rows,
      totalSts: rows * sts,
    };
    return object;
  };

  stsFromShape = (
    startSts,
    difference,
    shapeEveryNRows,
    rows,
    stChangeInRow
  ) => {
    //Are we increasing or decreasing?
    let shaping;
    if (difference < 0) {
      shaping = 0 - stChangeInRow;
    } else {
      shaping = stChangeInRow;
    }

    let totalSts = 0;
    let sts = startSts;
    for (let i = 0; i < rows; i++) {
      // It's assumed inc/dec happen at start of each n rows.
      // This means that shaping isn't lost in cast-offs.
      if (i % shapeEveryNRows == 0 && startSts + difference != sts) {
        sts += shaping;
      }
      totalSts += sts;
    }
    return totalSts;
  };

  shaping = (sts, length, endWidth, stChangeInRow) => {
    let endSts = this.stsFromLen(endWidth);
    let rows = this.rowsFromLen(length);
    let difference = endSts - sts;
    let shapeEveryNRows = Math.floor(
      rows / Math.abs(difference / stChangeInRow)
    );
    let object = {
      type: "shaping",
      startSts: sts,
      endSts: endSts,
      stChangeInRow: stChangeInRow,
      rows: rows,
      shapeEveryNRows: shapeEveryNRows,
      totalSts: this.stsFromShape(
        sts,
        difference,
        shapeEveryNRows,
        rows,
        stChangeInRow
      ),
    };
    return object;
  };
}

module.exports = GaugeObject;

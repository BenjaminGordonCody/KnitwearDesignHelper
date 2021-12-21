const getShapingSubsections = require("./shapingSubsections");
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

  lenFromRows = (rows) => {
    return Math.round((rows / this.rows) * 10);
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

  shaping = (startSts, length, endWidth, stChangeInRow) => {
    // Guestimate values
    let endSts = this.stsFromLen(endWidth);
    let rows = this.rowsFromLen(length);
    let difference = endSts - startSts;

    //Corral guestimates into actual numbers
    let shapingRows = Math.abs(Math.round(difference / stChangeInRow));
    difference = shapingRows * stChangeInRow;
    //endSts = startSts + difference;

    //Where will shaping go?
    let shapingSubsections = new getShapingSubsections(rows, shapingRows);

    let object = {
      type: "shaping",
      startSts: startSts,
      endSts: endSts,
      stChangeInRow: stChangeInRow,
      rows: rows,
      shapingSubsections: shapingSubsections,
    };
    return object;
  };

  crown = (sts, wedges) => {
    //Row that removes stitches that wont fit into crown shaping
    let initDecRow = {
      stsToRemove: sts % wedges,
    };
    initDecRow.spaceBetweenDecs = Math.floor(sts / initDecRow.stsToRemove) - 2;
    initDecRow.stsOutsideOfDecreaseRepeats =
      sts % (initDecRow.spaceBetweenDecs + 2);
    initDecRow.remainingSts = Math.floor(sts / wedges) * wedges;

    //Wedges decreases
    let object = {
      initDecRow: initDecRow,
      stsPerWedge: initDecRow.remainingSts / wedges,
    };
    return object;
  };
}

module.exports = GaugeObject;

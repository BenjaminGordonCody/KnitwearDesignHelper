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
}

console.log(new GaugeObject(21, 22));
module.exports = GaugeObject;

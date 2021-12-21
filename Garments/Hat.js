class Hat {
  constructor(
    GaugeObject,
    crownWedges,
    hatLength,
    ribbingLength,
    circumference,
    rowsPerCrownDecrease
  ) {
    //Cast on & ribbing
    let sts = GaugeObject.stsFromLen(circumference);
    let ribbingRows = GaugeObject.rowsFromLen(ribbingLength);

    //Crown shaping
    let crown = GaugeObject.crown(sts, crownWedges);
    let crownLength =
      GaugeObject.lenFromRows(crown.stsPerWedge) * rowsPerCrownDecrease;

    //Main body of hat
    let workStraightLen = hatLength - (ribbingLength + crownLength);
    let workStraighRows = GaugeObject.rowsFromLen(workStraightLen);

    //Pattern Object
    this.castOn = sts;
    this.ribbingRows = ribbingRows;
    this.workStraightRows = workStraighRows;
    this.crown = crown;
  }
}

module.exports = Hat;

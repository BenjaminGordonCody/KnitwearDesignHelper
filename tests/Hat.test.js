const Hat = require("../Garments/Hat.js");
const GaugeObject = require("../GaugeObject.js");

describe("DK Hat examples", () => {
  let swatch = new GaugeObject(22, 28);

  test("Adult mans hat", () => {
    expect(new Hat(swatch, 6, 30, 5, 55, 2)).toEqual({
      castOn: 122,
      ribbingRows: 14,
      workStraightRows: 30,
      crown: {
        initDecRow: {
          remainingSts: 120,
          spaceBetweenDecs: 59,
          stsOutsideOfDecreaseRepeats: 0,
          stsToRemove: 2,
        },
        stsPerWedge: 20,
      },
    });
  });
});

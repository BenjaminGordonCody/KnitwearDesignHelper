const app = require("../GaugeObject");
const shapingSubsections = require("../shapingSubsections");

let swatch = new app(22, 28);

describe("Gauge Object Basic Functions", () => {
  test("Object exists", () => {
    expect(swatch.sts).toBe(22);
  });

  test("Gauge knows 20cm of DK stocking stitch is 44 sts", () => {
    expect(swatch.stsFromLen(20)).toBe(44);
  });

  test("Gauge knows 20cm of DK stocking stitch is 56 rows", () => {
    expect(swatch.rowsFromLen(20)).toBe(56);
  });
});

describe("Gauge Object Geometric Shapes", () => {
  test("Gauge knows how to knit a 10cm^2 patch", () => {
    expect(swatch.rectangle(22, 10)).toEqual({
      type: "rectangle",
      startSts: 22,
      endSts: 22,
      rows: 28,
      totalSts: 616,
    });
  });

  test("...can knit DK trapezoid tapering from 10sts to 1cm over 10cm", () => {
    expect(swatch.shaping(10, 10, 1, -2)).toEqual({
      type: "shaping",
      startSts: 10,
      endSts: 2,
      rows: 28,
      stChangeInRow: -2,
      shapingSubsections: new shapingSubsections(28, 4),
    });
  });

  test("Gauge can knit a DK trapezoid that tapers from 2sts to 10cm over 10cm", () => {
    expect(swatch.shaping(2, 10, 10, 2)).toEqual({
      type: "shaping",
      startSts: 2,
      endSts: 22,
      rows: 28,
      stChangeInRow: 2,
      shapingSubsections: new shapingSubsections(28, 10),
    });
  });

  test("... can knit a crown of 100sts in 6 wedges", () => {
    expect(swatch.crown(100, 6)).toEqual({
      initDecRow: {
        stsToRemove: 4,
        spaceBetweenDecs: 23,
        stsOutsideOfDecreaseRepeats: 0,
        remainingSts: 96,
      },
      stsPerWedge: 16,
    });
  });

  test("... can knit a crown of 99sts in 4 wedges", () => {
    expect(swatch.crown(95, 4)).toEqual({
      initDecRow: {
        stsToRemove: 3,
        spaceBetweenDecs: 29,
        stsOutsideOfDecreaseRepeats: 2,
        remainingSts: 92,
      },
      stsPerWedge: 23,
    });
  });

  test("... can knit a crown of 100sts in 7 wedges", () => {
    expect(swatch.crown(100, 7)).toEqual({
      initDecRow: {
        stsToRemove: 2,
        spaceBetweenDecs: 48,
        stsOutsideOfDecreaseRepeats: 0,
        remainingSts: 98,
      },
      stsPerWedge: 14,
    });
  });
});

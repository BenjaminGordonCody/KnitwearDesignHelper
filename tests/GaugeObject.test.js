const app = require("../GaugeObject");

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

  test("Gauge can count stitches in an increasing shape with single increases", () => {
    expect(swatch.stsFromShape(10, 5, 5, 28, 1)).toBe(370);
  });

  test("Gauge can counts sts in decreasing shape with single decreases", () => {
    expect(swatch.stsFromShape(10, -5, 5, 28, 1)).toBe(190);
  });

  test("Gauge can count sts in increasing shape with double increases", () => {
    expect(swatch.stsFromShape(10, 6, 5, 16, 2)).toBe(226);
  });

  test("Gauge can count sts in decreasing shape with double decreases", () => {
    expect(swatch.stsFromShape(10, -6, 5, 16, 2)).toBe(94);
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

  test("Gauge can knit a DK trapezoid that tapers from 10sts to 1cm over 10cm", () => {
    expect(swatch.shaping(10, 10, 1, 2)).toEqual({
      type: "shaping",
      startSts: 10,
      endSts: 2,
      rows: 28,
      totalSts: 140,
      stChangeInRow: 2,
      shapeEveryNRows: 7,
    });
  });
});

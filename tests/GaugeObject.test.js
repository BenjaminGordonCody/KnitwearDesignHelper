const app = require("../GaugeObject");

describe("Gauge Object Basic Functions", () => {
  let swatch = new app(22, 28);

  test("Object exists", () => {
    expect(swatch.sts).toBe(22);
  });

  test("Gauge knows 20cm of DK stocking stitch is 44 sts", () => {
    expect(swatch.stsFromLen(20)).toBe(44);
  });

  test("Gauge knows 20cm of DK stocking stitch is 56 rows", () => {
    expect(swatch.rowsFromLen(20)).toBe(56);
  });

  test("Gauge knows how to knit a 10cm^2 patch", () => {
    expect(swatch.rectangle(22, 10)).toEqual({
      type: "rectangle",
      startSts: 22,
      endSts: 22,
      rows: 28,
      totalSts: 616,
    });
  });
  test("Gauge can count stitches in an increasing shape with single increases", () => {
    expect(swatch.stsFromShape(10, 5, 5, 28, 1)).toBe(370);
  });
});

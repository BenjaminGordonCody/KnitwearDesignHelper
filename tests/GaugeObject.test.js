const GaugeObject = require("../GaugeObject");

console.log(GaugeObject);
describe("Gauge exists!", () => {
  test("Gauge Object", () => {
    let swatch = new GaugeObject(22, 28);
    expect(swatch.sts).toBe(22);
  });
});

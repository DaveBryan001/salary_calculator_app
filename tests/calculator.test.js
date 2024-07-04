// calculator.test.js
const { calculateTax, calculateGrossSalary } = require('./calculator');

test('calculateTax should return the correct tax for given taxable income', () => {
    expect(calculateTax(200)).toBeCloseTo(0); 
    expect(calculateTax(400)).toBeCloseTo(1.75);
    expect(calculateTax(500)).toBeCloseTo(8); //
    expect(calculateTax(1000)).toBeCloseTo(87.625);
    expect(calculateTax(3000)).toBeCloseTo(473.625);
    expect(calculateTax(10000)).toBeCloseTo(2142.25);
    expect(calculateTax(15000)).toBeCloseTo(3392.25);
    expect(calculateTax(18000)).toBeCloseTo(4142.25);
    expect(calculateTax(35000)).toBeCloseTo(9142.25);
});

test('calculateGrossSalary should estimate the correct gross salary for given net salary and allowances', () => {
    let netSalary = 3040;
    let allowances = 1000;

    let grossSalary = calculateGrossSalary(netSalary, allowances);
    expect(grossSalary).toBeGreaterThan(3900);
    expect(grossSalary).toBeLessThan(4200);

    netSalary = 1790;
    allowances = 5000;
    grossSalary = calculateGrossSalary(netSalary, allowances);
    expect(grossSalary).toBeGreaterThan(1950);
    expect(grossSalary).toBeLessThan(3000);
});

test('calculateTax should return zero for non-taxable income', () => {
    expect(calculateTax(0)).toBe(0);
    expect(calculateTax(365)).toBe(0);
});

test('calculateGrossSalary handles zero allowances correctly', () => {
    let netSalary = 3000;
    let allowances = 0;
    let grossSalary = calculateGrossSalary(netSalary, allowances);
    expect(grossSalary).toBeGreaterThan(3000);
    expect(grossSalary).toBeLessThan(6000);
});

test('calculateGrossSalary handles high allowances correctly', () => {
    let netSalary = 1000;
    let allowances = 5000;
    let grossSalary = calculateGrossSalary(netSalary, allowances);
    expect(grossSalary).toBeGreaterThan(6000);
    expect(grossSalary).toBeLessThan(8000);
});

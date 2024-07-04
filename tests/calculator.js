// calculator.js

function calculateTax(taxableIncome) {
    const taxBrackets = [
        { limit: 365, rate: 0.00 },
        { limit: 110, rate: 0.05 },
        { limit: 130, rate: 0.10 },
        { limit: 3000, rate: 0.175 },
        { limit: 16395, rate: 0.25 },
        { limit: 20000, rate: 0.30 },
        { limit: Infinity, rate: 0.30 }
    ];

    let tax = 0;
    let previousLimit = 0;

    for (let i = 0; i < taxBrackets.length; i++) {
        const { limit, rate } = taxBrackets[i];
        let incomeInBracket = Math.min(taxableIncome, limit - previousLimit);

        tax += incomeInBracket * rate;
        taxableIncome -= incomeInBracket;
        previousLimit = limit;

        if (taxableIncome <= 0) {
            break;
        }
    }

    return tax;
}

function calculateGrossSalary(netSalary, allowances) {
    const tier1EmployerRate = 0.13;
    const tier2EmployeeRate = 0.055;
    const tier3EmployeeRate = 0.05;
    const tier3EmployerRate = 0.05;

    let estimatedGross = netSalary / 0.75 + allowances;
    let tolerance = 0.01;
    let netCalculated;

    while (true) {
        let basicSalary = estimatedGross - allowances;
        let tier2Contribution = basicSalary * tier2EmployeeRate;
        let tier3EmployeeContribution = basicSalary * tier3EmployeeRate;
        let taxableIncome = basicSalary - tier2Contribution - tier3EmployeeContribution + allowances;
        let tax = calculateTax(taxableIncome);
        netCalculated = estimatedGross - tax - tier2Contribution - tier3EmployeeContribution;
        let difference = netSalary - netCalculated;
        if (Math.abs(difference) < tolerance) {
            break;
        }
        estimatedGross += difference / 0.75;
    }

    return estimatedGross;
}

module.exports = { calculateTax, calculateGrossSalary };

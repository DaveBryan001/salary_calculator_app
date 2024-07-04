function calculateSalary() {
    let netSalary = parseFloat(document.getElementById('netSalary').value);
    let allowances = parseFloat(document.getElementById('allowances').value);

    if (isNaN(netSalary) || isNaN(allowances)) {
        alert("Please enter valid numbers for net salary and allowances.");
        return;
    }

    // Pension rates
    const tier1EmployerRate = 0.13;
    const tier2EmployeeRate = 0.055;
    const tier3EmployeeRate = 0.05;
    const tier3EmployerRate = 0.05;

    // Tax brackets for PAYE
    const taxBrackets = [
        { limit: 365, rate: 0.00 },
        { limit: 110, rate: 0.05 },
        { limit: 130, rate: 0.10 },
        { limit: 3000, rate: 0.175 },
        { limit: 16395, rate: 0.25 },
        { limit: 20000, rate: 0.30 },
        { limit: Infinity, rate: 0.30 }
    ];

    function calculateTax(taxableIncome) {
        let tax = 0;
        for (let i = 0; i < taxBrackets.length; i++) {
            const { limit, rate } = taxBrackets[i];
            if (taxableIncome > limit) {
                tax += limit * rate;
                taxableIncome -= limit;
            } else {
                tax += taxableIncome * rate;
                break;
            }
        }
        return tax;
    }

    function calculateGrossSalary(net, allowances) {
        let estimatedGross = net / 0.3 + allowances; 
        let tolerance = 0.1;
        let netCalculated;

        while (true) {
            let basicSalary = estimatedGross - allowances;

            let tier2Contribution = basicSalary * tier2EmployeeRate;
            let tier3EmployeeContribution = basicSalary * tier3EmployeeRate;

            let taxableIncome = basicSalary - tier2Contribution - tier3EmployeeContribution + allowances;
            let tax = calculateTax(taxableIncome);

            netCalculated = estimatedGross - tax - tier2Contribution - tier3EmployeeContribution;

            let difference = net - netCalculated;
            if (Math.abs(difference) < tolerance) {
                break;
            }
            estimatedGross += difference / 0.75;
        }

        return estimatedGross;
    }

    let grossSalary = calculateGrossSalary(netSalary, allowances);
    let basicSalary = grossSalary - allowances;

    let tier1EmployerContribution = basicSalary * tier1EmployerRate;
    let tier2EmployeeContribution = basicSalary * tier2EmployeeRate;
    let tier3EmployeeContribution = basicSalary * tier3EmployeeRate;
    let tier3EmployerContribution = basicSalary * tier3EmployerRate;

    let totalEmployeeContribution = tier2EmployeeContribution + tier3EmployeeContribution;
    let totalEmployerContribution = tier1EmployerContribution + tier3EmployerContribution;

    let taxableIncome = basicSalary - totalEmployeeContribution + allowances;
    let totalTax = calculateTax(taxableIncome);

    document.getElementById('results').innerHTML = `
        <p>Gross Salary: ${grossSalary.toFixed(2)} GHS</p>
        <p>Basic Salary: ${basicSalary.toFixed(2)} GHS</p>
        <p>Total PAYE Tax: ${totalTax.toFixed(2)} GHS</p>
        <p>Employee Pension Contribution: ${totalEmployeeContribution.toFixed(2)} GHS</p>
        <p>Employer Pension Contribution: ${totalEmployerContribution.toFixed(2)} GHS</p>
    `;
}

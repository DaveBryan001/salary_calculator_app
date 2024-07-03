function calculateSalary() {
    let netSalary = parseFloat(document.getElementById('netSalary').value);
    let allowances = parseFloat(document.getElementById('allowances').value);

    if (isNaN(netSalary) || isNaN(allowances)) {
        alert("Please enter valid numbers for net salary and allowances.");
        return;
    }

    // Define pension rates
    const tier1EmployerRate = 0.13;
    const tier2EmployeeRate = 0.055;
    const tier3EmployeeRate = 0.05;
    const tier3EmployerRate = 0.05;

    // Define GRA tax brackets
    const taxBrackets = [
        { limit: 365, rate: 0.00 },
        { limit: 110, rate: 0.05 },
        { limit: 130, rate: 0.10 },
        { limit: 3000, rate: 0.175 },
        { limit: 16395, rate: 0.25 },
        { limit: 20000, rate: 0.30 },
        { limit: Infinity, rate: 0.30 }
    ];

    function calculateGrossSalary(net, allowances) {
        let estimatedGross = net / 0.75 + allowances;
        return estimatedGross;
    }

    let grossSalary = calculateGrossSalary(netSalary, allowances);
    let basicSalary = grossSalary - allowances;

    document.getElementById('results').innerHTML = `
        <p>Gross Salary: ${grossSalary.toFixed(2)}</p>
        <p>Basic Salary: ${basicSalary.toFixed(2)}</p>
    `;
}

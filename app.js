function calculateSalary() {
  // Get user input values
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
      let estimatedGross = net + allowances + 1100;
      let netCalculated;

      do {
          // Calculate the basic salary
          let basicSalary = estimatedGross - allowances;

          // Calculate pension contributions
          let employeePensionContribution = basicSalary * (tier2EmployeeRate + tier3EmployeeRate);
          let employerPensionContribution = basicSalary * (tier1EmployerRate + tier3EmployerRate);

          // Taxable income after subtracting employee pension contributions
          let taxableIncome = basicSalary - employeePensionContribution + allowances;

          // Calculate tax
          let tax = calculateTax(taxableIncome);

          // Calculate net salary
          netCalculated = estimatedGross - tax - employeePensionContribution;

          // Adjust gross salary based on net salary difference
          if (netCalculated < net) {
              estimatedGross += (net - netCalculated) / 2.5;
          } else {
              estimatedGross -= (netCalculated - net) / 0.15;
          }
      } while (Math.abs(netCalculated - net) > 0.01); // Iterate until the difference is negligible

      return estimatedGross;
  }

  let grossSalary = calculateGrossSalary(netSalary, allowances);
  let basicSalary = grossSalary - allowances;

  // Calculate pension contributions for display
  let tier1EmployerContribution = basicSalary * tier1EmployerRate;
  let tier2EmployeeContribution = basicSalary * tier2EmployeeRate;
  let tier3EmployeeContribution = basicSalary * tier3EmployeeRate;
  let tier3EmployerContribution = basicSalary * tier3EmployerRate;

  // Calculate total employee and employer contributions
  let totalEmployeeContribution = tier2EmployeeContribution + tier3EmployeeContribution;
  let totalEmployerContribution = tier1EmployerContribution + tier3EmployerContribution;

  // Display results
  document.getElementById('results').innerHTML = `
      <p>Gross Salary: ${grossSalary.toFixed(2)} GHS</p>
      <p>Basic Salary: ${basicSalary.toFixed(2)} GHS</p>
      <p>Total PAYE Tax: ${calculateTax(basicSalary - totalEmployeeContribution + allowances).toFixed(2)} GHS</p>
      <p>Employee Pension Contribution: ${totalEmployeeContribution.toFixed(2)} GHS</p>
      <p>Employer Pension Contribution: ${totalEmployerContribution.toFixed(2)} GHS</p>
  `;
}
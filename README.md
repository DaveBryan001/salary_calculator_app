## Salary Calculator Documentation
### Overview
This JavaScript code calculates the gross salary required to achieve a specified net salary after considering tax deductions and pension contributions. The calculation also factors in additional allowances.

### Features
- Gross Salary Calculation: Estimates gross salary based on desired net salary and allowances.
 -Tax Calculation: Applies progressive tax rates to determine total PAYE tax.
- Pension Contributions: Computes both employee and employer contributions for different pension tiers.
### Code Structure
- calculateSalary Function: Main function triggered by the user to calculate gross salary.
- Pension Rates: Defined rates for tiered pension contributions.
- Tax Brackets: Set up progressive tax rates for PAYE calculations.
#### Helper Functions:
- calculateTax computes PAYE tax based on income.
- calculateGrossSalary iteratively refines the gross salary estimate.

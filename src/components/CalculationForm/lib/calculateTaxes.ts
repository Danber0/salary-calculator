import { calculatePercentage } from "./calculatePercentage";

export const calculateTaxes = (salary: number, isIncludeTax: boolean) => {
  const TAX_RATE = 13;
  const TAX_FACTOR = 1 - TAX_RATE / 100; // 0.87

  if (isIncludeTax) {
    const salaryBeforeTax = salary / TAX_FACTOR;
    const taxAmount = salaryBeforeTax - salary;
    return { salaryAfterTax: salary, salaryBeforeTax, taxAmount };
  } else {
    const taxAmount = calculatePercentage(salary, TAX_RATE);

    return {
      salaryAfterTax: salary - taxAmount,
      salaryBeforeTax: salary,
      taxAmount,
    };
  }
};

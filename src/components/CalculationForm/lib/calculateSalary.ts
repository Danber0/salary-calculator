import { calculatePercentage } from "./calculatePercentage";

export const calculateSalary = (salary: number, isIncludeTax: boolean) => {
  const taxAmount = calculatePercentage(salary, 13);
  const salaryAfterTax = isIncludeTax ? salary : salary - taxAmount;
  const salaryBeforeTax = isIncludeTax ? salary / 0.87 : salary;

  return {
    salaryAfterTax,
    salaryBeforeTax,
    taxAmount,
  };
};

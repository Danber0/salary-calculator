export interface EmployeePaid {
  pension: number;
  medical: number;
  sickDays: number;
  injury: number;
  total: number;
}

export interface SalaryDetails {
  firstPayment: number;
  secondPayment: number;
  totalSalary: number;
  salaryAfterTax: number;
  salaryBeforeTax: number;
  taxAmount: number;
  employeePaid: EmployeePaid;
}

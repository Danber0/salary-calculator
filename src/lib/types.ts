export interface FormData {
  month: number;
  year: number;
  salary: number;
  firstPaymentDay: number;
  secondPaymentDay: number;
  isIncludeTax: boolean;
  secondPaymentFixed: number;
  isSecondPaymentPercent: boolean;
}

export interface EmployeePaid {
  pension: number;
  medical: number;
  sickDays: number;
  injury: number;
  total: number;
}

export interface SalaryDetails {
  firstPayment: number;
  firstPaymentDay: number;
  secondPayment: number;
  secondPaymentDay: number;
  totalSalary: number;
  salaryAfterTax: number;
  salaryBeforeTax: number;
  taxAmount: number;
  employeePaid: EmployeePaid;
}

export const defaultSalaryDetails: SalaryDetails = {
  firstPayment: 0,
  firstPaymentDay: 0,
  secondPayment: 0,
  secondPaymentDay: 0,
  totalSalary: 0,
  salaryAfterTax: 0,
  salaryBeforeTax: 0,
  taxAmount: 0,
  employeePaid: {
    pension: 0,
    medical: 0,
    sickDays: 0,
    injury: 0,
    total: 0,
  },
};

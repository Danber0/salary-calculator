import { getDaysInMonth } from "date-fns";
import { getWorkingDaysInMonth } from "./getWorkingDaysInMonth";
import { getWorkingDays } from "@/components/CalculationForm/lib/getWorkingDays.ts";
import { calculatePercentage } from "@/components/CalculationForm/lib/calculatePercentage.ts";
import { FormData } from "@/lib/types";

export const calculateSalary = async ({
  year,
  month,
  salary,
  firstPaymentDay,
  secondPaymentDay,
  isIncludeTax,
}: FormData) => {
  const response = await getWorkingDays(+year, +month);

  const str: string = response.request.response;

  const salaryTax = calculatePercentage(salary, 13);
  const salaryAfterTax = isIncludeTax ? salary : salary - salaryTax;
  const salaryBeforeTax = isIncludeTax ? salary / 0.87 : salary;

  const prevMonthDays = getDaysInMonth(new Date(year, month - 2));

  const prevMonthWorkingDays = getWorkingDaysInMonth(
    str.substring(0, prevMonthDays),
  );
  const prevMontLastHalfWorkingDays = getWorkingDaysInMonth(
    str.substring(15, prevMonthDays),
  );
  const currentMonthWorkingDays = getWorkingDaysInMonth(
    str.substring(prevMonthDays, str.length),
  );
  const currentMontFirstHalfWorkingDays = getWorkingDaysInMonth(
    str.substring(prevMonthDays, prevMonthDays + 15),
  );

  const firstPayment = Math.round(
    (salaryAfterTax / prevMonthWorkingDays) * prevMontLastHalfWorkingDays,
  );
  const secondPayment = Math.round(
    (salaryAfterTax / currentMonthWorkingDays) *
      currentMontFirstHalfWorkingDays,
  );

  return {
    firstPayment,
    firstPaymentDay,
    secondPayment,
    secondPaymentDay,
    totalSalary: firstPayment + secondPayment,
    salaryAfterTax,
    salaryBeforeTax,
    taxAmount: salaryBeforeTax - salaryAfterTax,
    employeePaid: {
      pension: calculatePercentage(salaryBeforeTax, 22),
      medical: calculatePercentage(salaryBeforeTax, 5.1),
      sickDays: calculatePercentage(salaryBeforeTax, 2.9),
      injury: calculatePercentage(salaryBeforeTax, 0.2),
      total: calculatePercentage(salaryBeforeTax, 30.2),
    },
  };
};

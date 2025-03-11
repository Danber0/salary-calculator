import { getDaysInMonth } from "date-fns";
import { getWorkingDaysInMonth } from "./getWorkingDaysInMonth";
import { getWorkingDays } from "./getWorkingDays";
import { calculatePercentage } from "./calculatePercentage";
import { calculateSalary } from "./calculateSalary";
import { FormData } from "@/lib/types";

export const calculateInformation = async ({
  year,
  month,
  salary,
  isIncludeTax,
  firstPaymentDay,
  secondPaymentDay,
}: FormData) => {
  const response = await getWorkingDays(+year, +month);

  const str = response.request.response as string;

  const { salaryAfterTax, salaryBeforeTax, taxAmount } = calculateSalary(
    salary,
    isIncludeTax,
  );

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
    taxAmount,
    employeePaid: {
      pension: calculatePercentage(salaryBeforeTax, 22),
      medical: calculatePercentage(salaryBeforeTax, 5.1),
      sickDays: calculatePercentage(salaryBeforeTax, 2.9),
      injury: calculatePercentage(salaryBeforeTax, 0.2),
      total: calculatePercentage(salaryBeforeTax, 30.2),
    },
  };
};

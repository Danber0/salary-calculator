import { getDaysInMonth } from "date-fns";
import { getWorkingDaysInMonth } from "./getWorkingDaysInMonth";

export const calculateSalary = (
  str: string,
  year: number,
  month: number,
  salary: number,
) => {
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
    (salary / prevMonthWorkingDays) * prevMontLastHalfWorkingDays,
  );
  const secondPayment = Math.round(
    (salary / currentMonthWorkingDays) * currentMontFirstHalfWorkingDays,
  );

  return {
    firstPayment,
    secondPayment,
    totalSalary: firstPayment + secondPayment,
  };
};

import { getDaysInMonth } from "date-fns";
import { getWorkingDaysInMonth } from "./getWorkingDaysInMonth";
import { getWorkingDays } from "./getWorkingDays";
import { calculatePercentage } from "./calculatePercentage";
import { calculateTaxes } from "./calculateTaxes";
import { FormData } from "@/lib/types";

/**
 * Рассчитывает платежи на основе рабочих дней
 */
const calculatePayments = (
  workingDaysData: string,
  salaryAfterTax: number,
  year: number,
  month: number,
) => {
  const {
    prevMonthWorkingDays,
    prevMontLastHalfWorkingDays,
    currentMonthWorkingDays,
    currentMontFirstHalfWorkingDays,
  } = parseWorkingDays(workingDaysData, year, month);

  const firstPayment = Math.round(
    (salaryAfterTax / prevMonthWorkingDays) * prevMontLastHalfWorkingDays,
  );

  const secondPayment = Math.round(
    (salaryAfterTax / currentMonthWorkingDays) *
      currentMontFirstHalfWorkingDays,
  );

  return { firstPayment, secondPayment };
};

/**
 * Парсит данные о рабочих днях
 */
const parseWorkingDays = (
  workingDaysData: string,
  year: number,
  month: number,
) => {
  const prevMonthDays = getDaysInMonth(new Date(year, month - 2));

  const prevMonthString = workingDaysData.substring(0, prevMonthDays);
  const currentMonthString = workingDaysData.substring(prevMonthDays);

  return {
    prevMonthWorkingDays: getWorkingDaysInMonth(prevMonthString),
    prevMontLastHalfWorkingDays: getWorkingDaysInMonth(
      prevMonthString.substring(15),
    ),
    currentMonthWorkingDays: getWorkingDaysInMonth(currentMonthString),
    currentMontFirstHalfWorkingDays: getWorkingDaysInMonth(
      currentMonthString.substring(0, 15),
    ),
  };
};

/**
 * Рассчитывает взносы работодателя
 */
const calculateEmployerContributions = (salaryBeforeTax: number) => {
  const CONTRIBUTION_RATES = {
    pension: 22,
    medical: 5.1,
    sickDays: 2.9,
    injury: 0.2,
    total: 30.2,
  };

  return {
    pension: calculatePercentage(salaryBeforeTax, CONTRIBUTION_RATES.pension),
    medical: calculatePercentage(salaryBeforeTax, CONTRIBUTION_RATES.medical),
    sickDays: calculatePercentage(salaryBeforeTax, CONTRIBUTION_RATES.sickDays),
    injury: calculatePercentage(salaryBeforeTax, CONTRIBUTION_RATES.injury),
    total: calculatePercentage(salaryBeforeTax, CONTRIBUTION_RATES.total),
  };
};

/**
 * Получает данные о рабочих днях с сервера
 */
const fetchWorkingDays = async (year: number, month: number) => {
  const response = await getWorkingDays(year, month);

  return response.request.response as string;
};

/**
 * Рассчитывает налоги и чистую зарплату
 */
export const calculateSalaryInformation = async ({
  year,
  month,
  salary,
  isIncludeTax,
  firstPaymentDay,
  secondPaymentDay,
}: FormData) => {
  // Получаем данные о рабочих днях
  const workingDaysData = await fetchWorkingDays(+year, +month);

  // Расчет зарплаты с учетом налогов
  const { salaryAfterTax, salaryBeforeTax, taxAmount } = calculateTaxes(
    salary,
    isIncludeTax,
  );

  // Расчет платежей
  const { firstPayment, secondPayment } = calculatePayments(
    workingDaysData,
    salaryAfterTax,
    +year,
    +month,
  );

  // Формируем и возвращаем итоговый объект с данными
  return {
    firstPayment,
    firstPaymentDay,
    secondPayment,
    secondPaymentDay,
    totalSalary: firstPayment + secondPayment,
    salaryAfterTax,
    salaryBeforeTax,
    taxAmount,
    employeePaid: calculateEmployerContributions(salaryBeforeTax),
  };
};

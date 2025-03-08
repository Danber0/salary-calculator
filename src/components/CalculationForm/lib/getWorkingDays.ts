import { getDaysInMonth } from "date-fns";
import axios from "axios";

export const getWorkingDays = async (year: number, month: number) => {
  const daysInMonth = getDaysInMonth(new Date(year, month - 1));

  if (month === 1) {
    return await axios.get(
      `https://isdayoff.ru/api/getdata?date1=${year - 1}1201&date2=${year}0131`,
    );
  }

  if (month === 10) {
    return await axios.get(
      `https://isdayoff.ru/api/getdata?date1=${year}0901&date2=${year}1031`,
    );
  }

  if (month < 10) {
    return await axios.get(
      `https://isdayoff.ru/api/getdata?date1=${year}0${month - 1}01&date2=${year}0${month}${daysInMonth}`,
    );
  }

  return await axios.get(
    `https://isdayoff.ru/api/getdata?date1=${year}${month - 1}01&date2=${year}${month}${daysInMonth}`,
  );
};

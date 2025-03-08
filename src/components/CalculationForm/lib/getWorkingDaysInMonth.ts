export const getWorkingDaysInMonth = (days: string) => {
  let workingDays = 0;

  for (let i = 0; i < days.length; i++) {
    if (days[i] === "0") {
      workingDays++;
    }
  }

  return workingDays;
};

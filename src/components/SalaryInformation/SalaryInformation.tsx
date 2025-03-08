import { FC } from "react";
import { useSalary } from "@/lib/context";
import { InfoRow } from "@/components/InfoRow";

export const SalaryInformation: FC = () => {
  const { salaryDetails } = useSalary();

  if (!salaryDetails.totalSalary) {
    return null;
  }

  return (
    <div className={"flex justify-between items-start gap-7 p-10"}>
      <div className={"flex flex-col gap-2 flex-[50%]"}>
        <h1 className={"text-2xl font-bold"}>Расчет зарплаты</h1>
        <InfoRow text={"Зарплата"} value={salaryDetails.firstPayment} />
        <InfoRow text={"Аванс"} value={salaryDetails.secondPayment} />
        <InfoRow text={"Итого"} value={salaryDetails.totalSalary} />
        <div className={"flex items-center justify-between"}>
          <h1 className={"text-2xl font-bold"}>Дополнительная информация</h1>
        </div>
        <InfoRow
          text={"Зарплата до вычета налога"}
          value={salaryDetails.salaryBeforeTax}
        />
        <InfoRow
          text={"Зарплата после вычета налога"}
          value={salaryDetails.salaryAfterTax}
        />
        <InfoRow text={"Налог"} value={salaryDetails.taxAmount} />
      </div>
      <div className={"flex flex-col gap-2 flex-[50%]"}>
        <h1 className={"text-2xl font-bold"}>Отчисления работодателя</h1>
        <InfoRow
          text={"Пенсия"}
          value={salaryDetails.employeePaid.pension}
          percent={22}
        />
        <InfoRow
          text={"Медицина"}
          value={salaryDetails.employeePaid.medical}
          percent={5.1}
        />
        <InfoRow
          text={"Больничные"}
          value={salaryDetails.employeePaid.sickDays}
          percent={2.9}
        />
        <InfoRow
          text={"Травматизм"}
          value={salaryDetails.employeePaid.injury}
          percent={0.2}
        />
        <InfoRow
          text={"Итого"}
          value={salaryDetails.employeePaid.total}
          percent={30.2}
        />
      </div>
    </div>
  );
};

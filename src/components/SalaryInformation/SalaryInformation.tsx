import { FC } from "react";
import { useSalary } from "@/lib/context";
import { InfoRow } from "@/components/InfoRow";

export const SalaryInformation: FC = () => {
  const { salaryDetails } = useSalary();

  if (!salaryDetails.totalSalary) {
    return null;
  }

  return (
    <div className={"flex flex-wrap justify-between items-start gap-7"}>
      <div className={"flex flex-col gap-2 grow-1"}>
        <h1 className={"text-xl lg:text-2xl font-bold"}>Расчет зарплаты</h1>
        <InfoRow
          text={`Зарплата - ${salaryDetails.firstPaymentDay} числа`}
          value={salaryDetails.firstPayment}
        />
        <InfoRow
          text={`Аванс - ${salaryDetails.secondPaymentDay} числа`}
          value={salaryDetails.secondPayment}
        />
        <InfoRow text={"Итого"} value={salaryDetails.totalSalary} />
        <h1 className={"text-xl lg:text-2xl font-bold"}>Налоги</h1>
        <InfoRow
          text={"До вычета налога"}
          value={salaryDetails.salaryBeforeTax}
        />
        <InfoRow
          text={"После вычета налога"}
          value={salaryDetails.salaryAfterTax}
        />
        <InfoRow text={"Налог"} value={salaryDetails.taxAmount} />
      </div>
      <div className={"flex flex-col gap-2 grow-1"}>
        <h1 className={"text-xl lg:text-2xl font-bold"}>
          Отчисления работодателя
        </h1>
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

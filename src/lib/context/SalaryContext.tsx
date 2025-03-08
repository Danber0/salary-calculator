import { createContext, FC, ReactNode, useContext, useState } from "react";
import { SalaryDetails } from "../types.ts";

interface SalaryContextProps {
  salaryDetails: SalaryDetails;
  setSalaryDetails: (salaryDetails: SalaryDetails) => void;
}

interface SalaryContextProviderProps {
  children: ReactNode;
}

const SalaryContext = createContext<SalaryContextProps>(
  {} as SalaryContextProps,
);

export const SalaryProvider: FC<SalaryContextProviderProps> = ({
  children,
}) => {
  const [salaryDetails, setSalaryDetails] = useState<SalaryDetails>({
    firstPayment: 0,
    secondPayment: 0,
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
  } as SalaryDetails);

  return (
    <SalaryContext.Provider
      value={{
        salaryDetails,
        setSalaryDetails,
      }}
    >
      {children}
    </SalaryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSalary = () => {
  const context = useContext(SalaryContext);

  if (!context) {
    throw new Error("useSalary must be used within a SalaryProvider");
  }

  return context;
};

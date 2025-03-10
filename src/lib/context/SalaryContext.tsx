import { createContext, FC, ReactNode, useContext, useState } from "react";
import { defaultSalaryDetails, SalaryDetails } from "../types";

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
  const [salaryDetails, setSalaryDetails] =
    useState<SalaryDetails>(defaultSalaryDetails);

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

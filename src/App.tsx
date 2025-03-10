import { Header } from "@/components/Header";
import { CalculationForm } from "@/components/CalculationForm";
import { Wrapper } from "@/components/Wrapper/Wrapper.tsx";
import { SalaryInformation } from "@/components/SalaryInformation";

import "@ant-design/v5-patch-for-react-19";

export const App = () => {
  return (
    <Wrapper>
      <Header />
      <CalculationForm />
      <SalaryInformation />
    </Wrapper>
  );
};

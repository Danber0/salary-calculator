import { useEffect } from "react";
import { Button, Collapse, Form, Space } from "antd";

import { useSalary } from "@/lib/context";
import { defaultSalaryDetails, FormData } from "@/lib/types";

import {
  Header,
  SalaryInformation,
  CalculationForm,
  Wrapper,
  AdditionalConditions,
} from "@/components";

import { calculateSalaryInformation } from "@/components/CalculationForm/lib";

import "@ant-design/v5-patch-for-react-19";

export const App = () => {
  const [form] = Form.useForm<FormData>();
  const { setSalaryDetails } = useSalary();

  useEffect(() => {
    const currentDate = new Date();

    if (import.meta.env.DEV) {
      form.setFieldsValue({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        salary: 205000,
        firstPaymentDay: 10,
        secondPaymentDay: 25,
        isIncludeTax: false,
        secondPaymentFixedType: "fixed",
      });
    }
  }, []);

  const handleSubmit = async (data: FormData) => {
    const calculatedData = await calculateSalaryInformation(data);

    setSalaryDetails(calculatedData);
  };

  return (
    <Wrapper>
      <Header />
      <Form
        form={form}
        onFinish={handleSubmit}
        layout={"vertical"}
        variant={"filled"}
      >
        <Space direction={"vertical"} className={"w-full p-8"} size={"small"}>
          <h1 className={"text-3xl font-bold"}>Умный калькулятор зарплаты</h1>
          <CalculationForm />
          <Collapse
            ghost
            destroyInactivePanel
            size={"large"}
            items={[
              {
                key: "1",
                label: "Дополнительные условия",
                children: <AdditionalConditions />,
              },
            ]}
          />
          <div className={"flex items-center gap-3 mb-5"}>
            <Button type={"primary"} htmlType={"submit"}>
              Рассчитать зарплату
            </Button>
            <Button
              color={"danger"}
              type={"default"}
              onClick={() => {
                form.resetFields();
                setSalaryDetails(defaultSalaryDetails);
              }}
            >
              Очистить форму
            </Button>
          </div>
          <SalaryInformation />
        </Space>
      </Form>
    </Wrapper>
  );
};

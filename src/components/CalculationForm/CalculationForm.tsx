import { FC, useEffect } from "react";
import {
  calculatePercentage,
  calculateSalary,
  getWorkingDays,
} from "@/components/CalculationForm/lib";
import { FormData } from "./types";
import { useSalary } from "@/lib/context";
import { Button, Checkbox, Form, InputNumber, Select } from "antd";
import { getYear } from "date-fns";
import { Inline } from "@/components";
import { defaultSalaryDetails } from "@/lib/types";

export const CalculationForm: FC = () => {
  const [form] = Form.useForm<FormData>();

  useEffect(() => {
    form.setFieldsValue({
      year: 2025,
      month: 1,
      salary: 205000,
      firstPaymentDay: 10,
      secondPaymentDay: 25,
      isIncludeTax: true,
    });
  }, [form]);

  const { setSalaryDetails } = useSalary();

  const handleSubmit = async (data: FormData) => {
    const {
      year,
      month,
      salary,
      isIncludeTax,
      firstPaymentDay,
      secondPaymentDay,
    } = data;

    const response = await getWorkingDays(+year, +month);

    const salaryTax = calculatePercentage(salary, 13);
    const salaryAfterTax = isIncludeTax ? salary : salary - salaryTax;
    const salaryBeforeTax = isIncludeTax ? salary / 0.87 : salary;

    if ("response" in response.request) {
      const { firstPayment, secondPayment, totalSalary } = calculateSalary(
        response.request.response,
        +year,
        +month,
        salaryAfterTax,
      );

      setSalaryDetails({
        firstPayment,
        firstPaymentDay,
        secondPayment,
        secondPaymentDay,
        totalSalary,
        salaryAfterTax,
        salaryBeforeTax,
        taxAmount: salaryBeforeTax - salaryAfterTax,
        employeePaid: {
          pension: calculatePercentage(salaryBeforeTax, 22),
          medical: calculatePercentage(salaryBeforeTax, 5.1),
          sickDays: calculatePercentage(salaryBeforeTax, 2.9),
          injury: calculatePercentage(salaryBeforeTax, 0.2),
          total: calculatePercentage(salaryBeforeTax, 30.2),
        },
      });
    }
  };

  return (
    <div className={"p-10"}>
      <h1 className={"text-3xl lg:text-4xl font-bold mb-10"}>
        Калькулятор зарплаты
      </h1>
      <Form
        form={form}
        defaultValue={"1"}
        onFinish={handleSubmit}
        layout={"vertical"}
      >
        <Inline>
          <Form.Item
            label={"Год"}
            name={"year"}
            rules={[{ required: true, message: "Выберите год" }]}
          >
            <Select
              options={[{ value: 2024 }, { value: 2025 }]}
              placeholder={`Например, ${getYear(new Date())}`}
            />
          </Form.Item>
          <Form.Item
            label={"Месяц"}
            name={"month"}
            rules={[{ required: true, message: "Выберите месяц" }]}
          >
            <Select
              placeholder={"Например, Январь"}
              options={[
                { value: 1, label: "Январь" },
                { value: 2, label: "Февраль" },
                { value: 3, label: "Март" },
                { value: 4, label: "Апрель" },
                { value: 5, label: "Май" },
                { value: 6, label: "Июнь" },
                { value: 7, label: "Июль" },
                { value: 8, label: "Август" },
                { value: 9, label: "Сентябрь" },
                { value: 10, label: "Октябрь" },
                { value: 11, label: "Ноябрь" },
                { value: 12, label: "Декабрь" },
              ]}
            />
          </Form.Item>
        </Inline>
        <Inline>
          <Form.Item
            label={"Дата получения зарплаты"}
            name={"firstPaymentDay"}
            rules={[
              { required: true, message: "Введите число" },
              {
                type: "number",
                min: 1,
                max: 31,
                message: "Введите число больше 1 и меньше 31",
              },
              {
                type: "integer",
                message: "Введите число без дроби",
              },
            ]}
          >
            <InputNumber
              type={"number"}
              placeholder={"Например, 10"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label={"Дата получения аванса"}
            name={"secondPaymentDay"}
            rules={[
              { required: true, message: "Введите число" },
              {
                type: "number",
                min: 1,
                max: 31,
                message: "Введите число больше 1 и меньше 31",
              },
              {
                type: "integer",
                message: "Введите число без дроби",
              },
            ]}
          >
            <InputNumber
              type={"number"}
              placeholder={"Например, 25"}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Inline>
        <Form.Item label={"Оклад"} name={"salary"} rules={[{ required: true }]}>
          <InputNumber
            className={"w-full!"}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }
            placeholder={"Например, 250000"}
          />
        </Form.Item>
        <Form.Item name={"isIncludeTax"}>
          <Checkbox>Вместе с налогом НДФЛ(подоходный налог)</Checkbox>
        </Form.Item>
        <div className={"flex items-center gap-3"}>
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
      </Form>
    </div>
  );
};

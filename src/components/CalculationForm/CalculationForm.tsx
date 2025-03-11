import { FC } from "react";
import { getYear } from "date-fns";
import { Checkbox, Form, InputNumber, Select } from "antd";

import { Inline } from "@/components";

export const CalculationForm: FC = () => {
  return (
    <>
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
              type: "integer",
              message: "Введите число без дроби",
            },
          ]}
        >
          <InputNumber
            className={"w-full!"}
            type={"number"}
            min={1}
            max={31}
            placeholder={"Например, 10"}
          />
        </Form.Item>
        <Form.Item
          label={"Дата получения аванса"}
          name={"secondPaymentDay"}
          rules={[
            { required: true, message: "Введите число" },
            {
              type: "integer",
              message: "Введите число без дроби",
            },
          ]}
        >
          <InputNumber
            className={"w-full!"}
            type={"number"}
            min={1}
            max={31}
            placeholder={"Например, 25"}
          />
        </Form.Item>
      </Inline>
      <Form.Item
        label={"Оклад"}
        name={"salary"}
        rules={[{ required: true, message: "Введите оклад" }]}
      >
        <InputNumber
          className={"w-full!"}
          placeholder={"Например, 250 000"}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
        />
      </Form.Item>
      <Form.Item noStyle name={"isIncludeTax"} valuePropName={"checked"}>
        <Checkbox>Вместе с налогом НДФЛ(подоходный налог)</Checkbox>
      </Form.Item>
    </>
  );
};

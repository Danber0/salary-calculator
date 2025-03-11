import { Checkbox, Form, InputNumber } from "antd";

import { FormData } from "@/lib/types";

export const AdditionalConditions = () => {
  const form = Form.useFormInstance<FormData>();
  const isSecondPaymentPercent = Form.useWatch("isSecondPaymentPercent", form);

  return (
    <>
      <Form.Item
        label={"Фиксированный Аванс"}
        tooltip={"Eсли фиксированный аванс, например 40 000₽ или 40% от оклада"}
        name={"secondPaymentFixed"}
        valuePropName={"checked"}
        rules={[{ required: true, message: "Введите Аванс" }]}
        extra={
          <Form.Item
            noStyle
            name={"isSecondPaymentPercent"}
            valuePropName={"checked"}
          >
            <Checkbox>В процентах</Checkbox>
          </Form.Item>
        }
      >
        <InputNumber
          className={"w-full!"}
          placeholder={`Например, ${isSecondPaymentPercent ? "20%" : "40 000₽"}`}
          min={1}
          max={isSecondPaymentPercent ? 100 : undefined}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
        />
      </Form.Item>
    </>
  );
};

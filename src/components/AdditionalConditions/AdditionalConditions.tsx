import { Form, InputNumber, Select } from "antd";

import { FormData } from "@/lib/types";

export const AdditionalConditions = () => {
  const form = Form.useFormInstance<FormData>();
  const secondPaymentFixedType = Form.useWatch("secondPaymentFixedType", form);

  return (
    <>
      <Form.Item
        label={"Фиксированный Аванс"}
        tooltip={"Eсли фиксированный аванс, например 40 000₽ или 40% от оклада"}
        name={"secondPaymentFixed"}
        rules={[{ required: true, message: "Введите Аванс" }]}
      >
        <InputNumber
          className={"w-full!"}
          min={1}
          max={secondPaymentFixedType === "percent" ? 100 : undefined}
          placeholder={`Например, ${secondPaymentFixedType === "percent" ? "20%" : "40 000₽"}`}
          addonBefore={
            <Form.Item noStyle name={"secondPaymentFixedType"}>
              <Select
                options={[
                  { value: "fixed", label: "₽" },
                  { value: "percent", label: "%" },
                ]}
              />
            </Form.Item>
          }
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
          }
        />
      </Form.Item>
    </>
  );
};

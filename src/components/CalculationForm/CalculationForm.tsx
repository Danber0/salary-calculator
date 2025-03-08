import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { getYear } from "date-fns";
import { Input } from "@/components/ui/input.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import {
  calculatePercentage,
  calculateSalary,
  getWorkingDays,
} from "@/components/CalculationForm/lib";
import { FormData, formSchema } from "./types";
import { useSalary } from "@/lib/context";

export const CalculationForm: FC = () => {
  const { setSalaryDetails } = useSalary();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      month: "02",
      year: getYear(new Date()).toString(),
      salary: 205000,
      firstPaymentDay: 15,
      secondPaymentDay: 25,
      includeTax: false,
    },
  });

  const handleSubmit = async (data: FormData) => {
    const { year, month, salary, includeTax } = data;

    const response = await getWorkingDays(+year, +month);

    const salaryTax = calculatePercentage(salary, 13);
    const salaryAfterTax = includeTax ? salary : salary - salaryTax;
    const salaryBeforeTax = includeTax ? salary / 0.87 : salary;

    if ("response" in response.request) {
      const { firstPayment, secondPayment, totalSalary } = calculateSalary(
        response.request.response,
        +year,
        +month,
        salaryAfterTax,
      );

      setSalaryDetails({
        firstPayment,
        secondPayment,
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
    <div className={"p-10 border-b-1"}>
      <h1 className={"text-4xl font-bold mb-10"}>Калькулятор зарплаты</h1>
      <Form {...form}>
        <div className={"flex flex-col gap-5"}>
          <div className={"flex align-middle gap-2"}>
            <div className={"flex-1"}>
              <FormField
                control={form.control}
                name={"year"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Выберете год</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Например, ${getYear(new Date())}`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={"flex-1"}>
              <FormField
                control={form.control}
                name={"month"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Выберете месяц</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Например, Январь" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="01">Январь</SelectItem>
                          <SelectItem value="02">Февраль</SelectItem>
                          <SelectItem value="03">Март</SelectItem>
                          <SelectItem value="04">Апрель</SelectItem>
                          <SelectItem value="05">Май</SelectItem>
                          <SelectItem value="06">Июнь</SelectItem>
                          <SelectItem value="07">Июль</SelectItem>
                          <SelectItem value="08">Август</SelectItem>
                          <SelectItem value="09">Сентябрь</SelectItem>
                          <SelectItem value="10">Октябрь</SelectItem>
                          <SelectItem value="11">Ноябрь</SelectItem>
                          <SelectItem value="12">Декабрь</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={"flex align-middle gap-2"}>
            <div className={"flex flex-col gap-2 flex-1"}>
              <FormField
                control={form.control}
                name={"firstPaymentDay"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата получения зарплаты</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={"number"}
                        placeholder={"Например, 10"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className={"flex flex-col gap-2 flex-1"}>
              <FormField
                control={form.control}
                name={"secondPaymentDay"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата получения аванса</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={"number"}
                        placeholder={"Например, 25"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className={"flex flex-col gap-2"}>
            <FormField
              control={form.control}
              name={"salary"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваша зарплата</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={"number"}
                      placeholder={"Например, 250000"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name={"includeTax"}
            defaultValue={false}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className={"flex align-middle gap-2"}>
                    <Checkbox
                      id={"includeTax"}
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                    <FormLabel htmlFor={"includeTax"}>
                      Вместе с налогом НДФЛ(подоходный налог)
                    </FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className={"w-fit"} onClick={form.handleSubmit(handleSubmit)}>
            Рассчитать зарплату
          </Button>
        </div>
      </Form>
    </div>
  );
};

import { z } from "zod";

export interface FormData {
  month: string;
  year: string;
  salary: number;
  firstPaymentDay: number;
  secondPaymentDay: number;
  includeTax: boolean;
}

export const formSchema = z.object({
  month: z.string(),
  year: z.string(),
  salary: z.coerce.number().min(1),
  firstPaymentDay: z.coerce.number().min(1).max(31),
  secondPaymentDay: z.coerce.number().min(1).max(31),
  includeTax: z.boolean(),
});

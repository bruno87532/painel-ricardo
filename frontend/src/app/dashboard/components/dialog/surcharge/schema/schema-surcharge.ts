import { z } from "zod"
import { WeekDay } from "../../../../../../../types/week-days"

export const SurchargeFormData = z.object({
  propertyId: z.string().min(1, "Selecione uma propriedade"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  surchargeTypeId: z.string().min(1, "Selecione uma taxa"),
  days: z.array(z.enum(WeekDay)),
  amountCents: z.number().min(1, "Valor deve ser maior que zero"),
  appliesPerNight: z.boolean()
})

export type SurchargeFormDataType = z.infer<typeof SurchargeFormData>
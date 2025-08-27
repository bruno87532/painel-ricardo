import { z } from "zod"
import { WeekDay } from "@/../types/week-days"

export const RateRuleFormData = z.object({
  propertyId: z.string().min(1, "Selecione uma propriedade"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  days: z.array(z.enum(WeekDay)),
  minGuests: z.number().min(1, "Mínimo de hóspedes deve ser pelo menos 1"),
  maxGuests: z.number().min(1, "Máximo de hóspedes deve ser pelo menos 1"),
  pricePerNightCents: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "O preço deve ser um número positivo"
    }),
  minNights: z.number().min(1, "Permanência mínima deve ser pelo menos 1 noite"),
}).refine((data) => data.maxGuests >= data.minGuests, {
  message: "Máximo de hóspedes deve ser maior ou igual ao mínimo",
  path: ["maxGuests"],
}).refine((data) => !(data.startDate && !data.endDate), {
  message: "Se houver data de início, data de fim é obrigatória",
  path: ["endDate"],
}).refine((data) => !(data.endDate && !data.startDate), {
  message: "Se houver data de fim, data de início é obrigatória",
  path: ["startDate"],
})

export type RateRuleFormDataType = z.infer<typeof RateRuleFormData>
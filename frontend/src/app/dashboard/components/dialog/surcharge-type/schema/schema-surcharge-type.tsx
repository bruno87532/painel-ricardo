import { z } from "zod"

export const SurchargeTypeFormData = z.object({
  name: z.string().min(1, "Nome da taxa é obrigatório")
})

export type SurchargeTypeFormDataType = z.infer<typeof SurchargeTypeFormData>
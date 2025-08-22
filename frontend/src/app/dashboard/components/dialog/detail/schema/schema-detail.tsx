import { z } from "zod"

export const DetailFormData = z.object({
  description: z.string().min(1, "A descrição é obrigatória"),
  propertyId: z.string().min(1, "Selecione uma propriedade")
})

export type DetailFormDataType = z.infer<typeof DetailFormData>
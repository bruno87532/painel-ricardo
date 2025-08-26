import { z } from "zod"

export const ImageFormData = z.object({
  propertyId: z.string().min(1, "Selecione uma propriedade"),
  description: z.string().min(1, "A descrição é obrigatória"),
  file: z.instanceof(File, { message: "A imagem é obrigatória" }).refine((file) => file.type.startsWith('image/'), { message: 'O arquivo deve ser uma imagem.' })
})

export type ImageFormDataType = z.infer<typeof ImageFormData>
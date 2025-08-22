"use client"

import { z } from "zod"

export const propertySchema = z.object({
  name: z.string().min(1, "Nome da propriedade é obrigatório"),
  baseCapacity: z.number().min(1, "Capacidade mínima deve ser pelo menos 1"),
  maxCapacity: z.number().min(1, "Capacidade máxima deve ser pelo menos 1")
})

export type PropertyFormData = z.infer<typeof propertySchema>
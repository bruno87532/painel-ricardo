"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Form, FormMessage, FormLabel, FormItem, FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

const FormSchema = z.object({
  name: z.string().min(1, "Nome da taxa é obrigatório")
})

type FormSchema = z.infer<typeof FormSchema>

export const SurchargeType: React.FC<{
  id?: string
}> = ({ id }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [surchargeType, setSurchargeType] = useState<{
    name: string
  }>()

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ""
    }
  })

  const handleSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    if (id) {
      await SurchargeTypeService.updateSurchargeTypeById(id, data)
    } else {
      await SurchargeTypeService.createSurchargeType(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const getSurchargeTypeById = async () => {
      if (id) {
        const data = await SurchargeTypeService.getSurchargeTypeById(id)
        setSurchargeType(data.surchargeType)
        form.reset({
          name: data.surchargeType.name
        })
      }
    }

    getSurchargeTypeById()
  }, [id])

  if (id && !surchargeType?.name) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-15 w-15 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <DialogHeader className="space-y-2 text-center">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro de Taxas
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">Nome da Taxa</FormLabel>
                  <Input
                    placeholder="Digite o nome da taxa"
                    className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {id ? "Atualizando..." : "Cadastrando..."}
                </>
              ) : (
                <>
                  {id ? "Atualizar" : "Cadastrar"}
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
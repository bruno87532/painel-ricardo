"use client"

import type React from "react"
import { Form, FormMessage, FormLabel, FormItem, FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SurchargeTypeFormData, SurchargeTypeFormDataType } from "./schema/schema-surcharge-type"
import { useSurchargeTypeHook } from "./hook/use-surcharge-type.hook"

export const SurchargeType: React.FC<{
  id?: string,
  onClose: () => void,
  data?: {
    name: string
  } 
}> = ({
  id,
  onClose,
  data
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<SurchargeTypeFormDataType>({
      resolver: zodResolver(SurchargeTypeFormData),
      defaultValues: {
        name: data?.name ?? ""
      }
    })

    const { handleSubmit } = useSurchargeTypeHook(onClose, setIsLoading, form, id)

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
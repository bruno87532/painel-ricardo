"use client"

import { Form, FormField, FormItem, FormLabel, FormDescription, FormMessage } from "@/components/ui/form"
import { Home, Users, Loader2 } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePropertyHook } from "./hook/use-property.hook"
import { Input } from "@/components/ui/input"
import { DialogTitle, DialogHeader } from "@/components/ui/dialog"
import { propertySchema } from "./schema/schema-property"
import type { PropertyFormData } from "./schema/schema-property"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const Property: React.FC<{
  id?: string,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  id,
  setIsOpen
}) => {
    const form = useForm<PropertyFormData>({
      resolver: zodResolver(propertySchema),
      defaultValues: {
        baseCapacity: 1,
        maxCapacity: 1,
        name: ""
      }
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { handleSubmit } = usePropertyHook(setIsLoading, setIsOpen, form, id)

    return (
      <>
        <DialogHeader className="space-y-2 text-center pb-8">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cadastro de Propriedades
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
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Home className="h-4 w-4 text-blue-500" />
                      Nome da propriedade
                    </FormLabel>
                    <Input
                      placeholder="Digite o nome da propriedade"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                    <FormDescription className="text-xs text-gray-500">
                      Escolha um nome único e descritivo para sua propriedade
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baseCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      Capacidade mínima
                    </FormLabel>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                    <FormDescription className="text-xs text-gray-500">
                      Número mínimo de pessoas que a propriedade pode acomodar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      Capacidade máxima
                    </FormLabel>
                    <Input
                      type="number"
                      min={1}
                      placeholder="1"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                      value={field.value}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                    <FormDescription className="text-xs text-gray-500">
                      Número máximo de pessoas que a propriedade pode acomodar
                    </FormDescription>
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
                  id ? "Atualizar" : "Cadastrar"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </>
    )
  }

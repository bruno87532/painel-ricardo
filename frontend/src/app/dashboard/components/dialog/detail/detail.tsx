import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { DetailFormData, DetailFormDataType } from "./schema/schema-detail"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDetailHook } from "./hook/use-detail.hook"
import { Loader2 } from "lucide-react"
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select"
import { useDataContext } from "@/app/dashboard/context/use-data"

export const Detail: React.FC<{
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id?: string,
}> = ({
  setIsOpen,
  id
}) => {
    const { properties } = useDataContext()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const form = useForm<DetailFormDataType>({
      resolver: zodResolver(DetailFormData),
      defaultValues: {
        description: "",
        propertyId: ""
      }
    })
    
    const { handleSubmit } = useDetailHook(setIsLoading, setIsOpen, form, id)

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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">Detalhe</FormLabel>
                    <Input
                      placeholder="Digite os detalhes"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                      {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">Propriedade</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full h-11 border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Selecione uma propriedade" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          properties.map((property) => (
                            <SelectItem value={property.id}>{property.name}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
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
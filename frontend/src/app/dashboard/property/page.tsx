"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2, Home, Users, Coffee, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Schema de validação com Zod
const propertySchema = z.object({
  name: z.string().min(1, "Nome da propriedade é obrigatório"),
  canPet: z.boolean(),
  hasCoffee: z.boolean(),
  baseCapacity: z.number().min(1, "Capacidade mínima deve ser pelo menos 1"),
})

type PropertyFormData = z.infer<typeof propertySchema>

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      canPet: false,
      hasCoffee: false,
      baseCapacity: 1,
    },
  })

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true)

    // Simular envio (mock)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(data)

    // Limpar formulário após sucesso
    form.reset()
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cadastro de Propriedades
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                name="canPet"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        Aceita pets?
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Marque se a propriedade permite animais de estimação
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasCoffee"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Coffee className="h-4 w-4 text-amber-600" />
                        Serve café da manhã?
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Marque se a propriedade oferece café da manhã
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

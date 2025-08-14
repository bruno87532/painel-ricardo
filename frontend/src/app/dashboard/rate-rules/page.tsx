"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MapPin, Clock, Calendar, Users, DollarSign, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const daysOfWeek = [
  { value: "MONDAY", label: "Segunda-feira" },
  { value: "TUESDAY", label: "Terça-feira" },
  { value: "WEDNESDAY", label: "Quarta-feira" },
  { value: "THURSDAY", label: "Quinta-feira" },
  { value: "FRIDAY", label: "Sexta-feira" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
]

const FormSchema = z.object({
  propertyId: z.string().min(1, "Selecione uma propriedade"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  days: z.array(z.string()),
  minGuests: z.number().min(1, "Mínimo de hóspedes deve ser pelo menos 1"),
  maxGuests: z.number().max(1, "Máximo de hóspedes deve ser pelo menos 1"),
  pricePerNightCents: z.number().min(1, "Preço deve ser maior que zero"),
  minNights: z.number().min(1, "Permanência mínima deve ser pelo menos 1 noite"),
}).refine((data) => data.maxGuests >= data.minGuests, {
  message: "Máximo de hóspedes deve ser maior ou igual ao mínimo",
  path: ["maxGuests"]
}).refine((data) => !(data.startDate && !data.endDate), {
  message: "Se houver data de início, data de fim é obrigatória",
  path: ["endDate"]
}).refine((data) => !(data.startDate && data.endDate), {
  message: "Se houver data de fim, data de início é obrigatória",
  path: ["startDate"]
})

type FormSchema = z.infer<typeof FormSchema>

const RateRules = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      "propertyId": "",
      "startDate": "",
      "endDate": "",
      "days": [],
      minGuests: 1,
      maxGuests: 1,
      pricePerNightCents: 0,
      minNights: 1
    }
  })

  const handleSubmit = async (data: FormSchema) => {

  }

  const handleDayToggle = (dayValue: string, checked: boolean) => {
    const currentDays = form.getValues("days")
    if (checked) {
      form.setValue("days", [...currentDays, dayValue])
    } else {
      form.setValue(
        "days",
        currentDays.filter((day) => day !== dayValue),
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cadastro de Regras de Preço
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Propriedade */}
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      Propriedade
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-11 border-gray-200 focus:border-blue-400">
                        <SelectValue placeholder="Selecione uma propriedade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prop1">Casa da Praia - Guarujá</SelectItem>
                        <SelectItem value="prop2">Chalé da Montanha - Campos do Jordão</SelectItem>
                        <SelectItem value="prop3">Apartamento Centro - São Paulo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs text-gray-500">
                      Escolha a propriedade para aplicar esta regra de preço
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Datas de vigência */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        Data de início
                      </FormLabel>
                      <Input
                        type="date"
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormDescription className="text-xs text-gray-500">
                        Opcional - quando a regra começa a valer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        Data de fim
                      </FormLabel>
                      <Input
                        type="date"
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormDescription className="text-xs text-gray-500">
                        Opcional - quando a regra para de valer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dias da semana */}
              <FormField
                control={form.control}
                name="days"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                      Dias da semana (deixe vazio para todos os dias)
                    </FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {daysOfWeek.map((day) => (
                        <FormItem
                          key={day.value}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-3"
                        >
                          <Checkbox
                            checked={form.watch("days").includes(day.value)}
                            onCheckedChange={(checked) => handleDayToggle(day.value, checked as boolean)}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <FormLabel className="text-xs font-medium text-gray-700 leading-none">{day.label}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                    <FormDescription className="text-xs text-gray-500">
                      Selecione os dias em que esta regra se aplica
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Faixa de hóspedes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        Mínimo de hóspedes
                      </FormLabel>
                      <Input
                        type="number"
                        min={1}
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxGuests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        Máximo de hóspedes
                      </FormLabel>
                      <Input
                        type="number"
                        min={1}
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preço e permanência mínima */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pricePerNightCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        Preço por noite (R$)
                      </FormLabel>
                      <Input
                        type="number"
                        min={1}
                        step={0.01}
                        placeholder="100.00"
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value / 100}
                        onChange={(e) => field.onChange(Math.round((Number.parseFloat(e.target.value) || 0) * 100))}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormDescription className="text-xs text-gray-500">Valor em reais por noite</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minNights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        Permanência mínima (noites)
                      </FormLabel>
                      <Input
                        type="number"
                        min={1}
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value}
                        onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 1)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormDescription className="text-xs text-gray-500">
                        Número mínimo de noites para reserva
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Botão de submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando regra...
                  </>
                ) : (
                  "Cadastrar Regra de Preço"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RateRules
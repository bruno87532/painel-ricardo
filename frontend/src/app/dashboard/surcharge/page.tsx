"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MapPin, DollarSign, BadgePercent, CalendarCheck, Calendar, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PropertyService } from "../../../../services/property.service"

const surchargeKinds = [
  { value: "CLEANING_FEE", label: "Taxa de Limpeza" },
  { value: "PET_FEE", label: "Taxa de Pet" },
  { value: "EXTRA_GUEST_FEE", label: "Taxa de Hóspede Extra" },
  { value: "SECURITY_DEPOSIT", label: "Depósito de Segurança" },
  { value: "SERVICE_FEE", label: "Taxa de Serviço" },
  { value: "RESORT_FEE", label: "Taxa de Resort" },
]


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
  kind: z.string().min(1, "Selecione o tipo de taxa"),
  amountCents: z.number().min(1, "Valor deve ser maior que zero"),
  validDays: z.array(z.string()).min(1, "Selecione pelo menos um dia da semana"),
  appliesPerNight: z.boolean()
})

type FormSchema = z.infer<typeof FormSchema>


const Surcharge = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [properties, setProperties] = useState<{
    id: string;
    name: string;
  }[]>([])
  
  useEffect(() => {
    const getProperties = async () => {
      const propertiesDb = await PropertyService.getProperties()
      setProperties(propertiesDb)
    }
  
    getProperties()
  }, [])
  
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      propertyId: "",
      kind: "",
      amountCents: 0,
      validDays: [],
      appliesPerNight: false,
    },
  })
  
  const handleDayToggle = (dayValue: string, checked: boolean) => {
    const currentDays = form.getValues("validDays")
    if (checked) {
      form.setValue("validDays", [...currentDays, dayValue])
    } else {
      form.setValue(
        "validDays",
        currentDays.filter((day) => day !== dayValue),
      )
    }
  }
  const handleSubmit = async (data: FormSchema) => {
    setIsLoading(true)
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Surcharge data:", data)
    setIsLoading(false)
  }

  const weekdays = [
    { id: "monday", label: "Segunda-feira", short: "Segunda" },
    { id: "tuesday", label: "Terça-feira", short: "Terça" },
    { id: "wednesday", label: "Quarta-feira", short: "Quarta" },
    { id: "thursday", label: "Quinta-feira", short: "Quinta" },
    { id: "friday", label: "Sexta-feira", short: "Sexta" },
    { id: "saturday", label: "Sábado", short: "Sábado" },
    { id: "sunday", label: "Domingo", short: "Domingo" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center pb-8">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cadastro de Taxas
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Propriedade e Tipo de Taxa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="propertyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2 h-5">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        Propriedade
                      </FormLabel>
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

                <FormField
                  control={form.control}
                  name="kind"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2 h-5">
                        <BadgePercent className="h-4 w-4 text-purple-500" />
                        Tipo de Taxa
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className="w-full h-11 border-gray-200 focus:border-blue-400">
                          <SelectValue placeholder="Selecione o tipo de taxa" />
                        </SelectTrigger>
                        <SelectContent>
                          {surchargeKinds.map((kind) => (
                            <SelectItem key={kind.value} value={kind.value}>
                              {kind.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Valor da Taxa */}
              <FormField
                control={form.control}
                name="amountCents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Valor da Taxa (R$)
                    </FormLabel>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="50.00"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                      value={field.value / 100}
                      onChange={(e) => field.onChange(Math.round((Number.parseFloat(e.target.value) || 0) * 100))}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                    <FormDescription className="text-xs text-gray-500">
                      Valor em reais da taxa adicional
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="validDays"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                      Dias da semana (deixe vazio para todos os dias)
                    </FormLabel>
                    <div className="space-y-3">
                      {/* Primeira linha: Segunda a Quinta */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {daysOfWeek.slice(0, 4).map((day) => (
                          <FormItem
                            key={day.value}
                            className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-gray-200 p-3"
                          >
                            <Checkbox
                              checked={form.watch("validDays").includes(day.value)}
                              onCheckedChange={(checked) => handleDayToggle(day.value, checked as boolean)}
                              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <FormLabel className="text-xs font-medium text-gray-700 leading-none cursor-pointer">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>

                      {/* Segunda linha: Sexta, Sábado e Domingo ocupando toda largura */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {daysOfWeek.slice(4).map((day) => (
                          <FormItem
                            key={day.value}
                            className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-gray-200 p-3"
                          >
                            <Checkbox
                              checked={form.watch("validDays").includes(day.value)}
                              onCheckedChange={(checked) => handleDayToggle(day.value, checked as boolean)}
                              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                            <FormLabel className="text-xs font-medium text-gray-700 leading-none cursor-pointer">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                    </div>
                    <FormDescription className="text-xs text-gray-500">
                      Selecione os dias em que esta regra se aplica
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox - Aplica por noite */}
              <FormField
                control={form.control}
                name="appliesPerNight"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer">
                        <CalendarCheck className="h-4 w-4 text-orange-500" />
                        Aplica por noite
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Marque se esta taxa deve ser cobrada por cada noite da estadia
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botão de submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando taxa...
                  </>
                ) : (
                  "Cadastrar Taxa"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div >
  )
}

export default Surcharge
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState, useEffect } from "react"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MapPin, Clock, Calendar, Users, DollarSign, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RateRuleService } from "../../../../../../services/rate-rule.service"
import { WeekDays, WeekDay } from "../../../../../../types/week-days"
import { PropertyService } from "../../../../../../services/property.service"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

const daysOfWeek: { value: WeekDays; label: string }[] = [
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
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  days: z.array(z.enum(WeekDay)),
  minGuests: z.number().min(1, "Mínimo de hóspedes deve ser pelo menos 1"),
  maxGuests: z.number().min(1, "Máximo de hóspedes deve ser pelo menos 1"),
  pricePerNightCents: z.number().min(1, "Preço deve ser maior que zero"),
  minNights: z.number().min(1, "Permanência mínima deve ser pelo menos 1 noite"),
}).refine((data) => data.maxGuests >= data.minGuests, {
  message: "Máximo de hóspedes deve ser maior ou igual ao mínimo",
  path: ["maxGuests"],
}).refine((data) => !(data.startDate && !data.endDate), {
  message: "Se houver data de início, data de fim é obrigatória",
  path: ["endDate"],
}).refine((data) => !(data.endDate && !data.startDate), {
  message: "Se houver data de fim, data de início é obrigatória",
  path: ["startDate"],
})

type FormSchema = z.infer<typeof FormSchema>

export const RateRules: React.FC<{ id?: string }> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setProperties] = useState<{
    id: string;
    name: string;
  }[]>([])
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      propertyId: "",
      startDate: undefined,
      endDate: undefined,
      days: [],
      minGuests: 1,
      maxGuests: 1,
      pricePerNightCents: 0,
      minNights: 1,
    },
  })

  useEffect(() => {
    const getRateRuleById = async () => {
      if (id) {
        const rateRule = await RateRuleService.getRateRuleById(id)
        form.reset({
          propertyId: rateRule.propertyId,
          startDate: rateRule.startDate ? new Date(rateRule.startDate) : undefined,
          endDate: rateRule.endDate ? new Date(rateRule.endDate) : undefined,
          days: rateRule.days,
          minGuests: rateRule.minGuests,
          maxGuests: rateRule.maxGuests,
          pricePerNightCents: rateRule.pricePerNightCents,
          minNights: rateRule.minNights,
        })
      }
    }
    getRateRuleById()
  }, [id, form])

  useEffect(() => {
    const getProperties = async () => {
      const data = await PropertyService.getProperties()
      setProperties(data.properties)
    }
    getProperties()
  }, [])

  const handleSubmit = async (data: FormSchema) => {
    if (data.days.length === 0) {
      data.days = [
        "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
      ]
    }
    setIsLoading(true)
    if (id) {
      await RateRuleService.updateRateRuleById(id, data)
    } else {
      await RateRuleService.createRateRule(data)
    }
    setIsLoading(false)
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-15 w-15 animate-spin" />
      </div>
    )
  }

  return (
    <>
      <DialogHeader className="space-y-2 text-center pb-8">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro de Regras de Preço
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["startDate", "endDate"].map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as "startDate" | "endDate"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className={`h-4 w-4 ${fieldName === "startDate" ? "text-green-500" : "text-red-500"}`} />
                        {fieldName === "startDate" ? "Data de início (opcional)" : "Data de fim (opcional)"}
                      </FormLabel>
                      <Input
                        type="date"
                        className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                        value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                        onBlur={field.onBlur}
                        name={field.name}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                    Dias da semana (deixe vazio para todos os dias)
                  </FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {
                      daysOfWeek.slice(0, 4).map((day) => {
                        const isChecked = field.value.includes(day.value)
                        return (
                          <FormItem
                            key={day.value}
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() => {
                              const newValue = isChecked
                                ? field.value.filter((d) => d !== day.value)
                                : [...field.value, day.value]
                              field.onChange(newValue)
                            }}
                            className="flex flex-row items-center space-x-3 rounded-md border border-gray-200 p-3 cursor-pointer select-none"
                          >
                            <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, day.value]
                                    : field.value.filter((d) => d !== day.value)
                                  field.onChange(newValue)
                                }}
                                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              />
                            </div>
                            <FormLabel className="text-xs font-medium text-gray-700 leading-none cursor-pointer">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        )
                      })
                    }
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {
                      daysOfWeek.slice(4).map((day) => {
                        const isChecked = field.value.includes(day.value)
                        return (
                          <FormItem
                            key={day.value}
                            role="checkbox"
                            aria-checked={isChecked}
                            onClick={() => {
                              const newValue = isChecked
                                ? field.value.filter((d) => d !== day.value)
                                : [...field.value, day.value]
                              field.onChange(newValue)
                            }}
                            className="flex flex-row items-center space-x-3 rounded-md border border-gray-200 p-3 cursor-pointer select-none"
                          >
                            <div onClick={(e) => e.stopPropagation()}>
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...field.value, day.value]
                                    : field.value.filter((d) => d !== day.value)
                                  field.onChange(newValue)
                                }}
                                className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                              />
                            </div>
                            <FormLabel className="text-xs font-medium text-gray-700 leading-none cursor-pointer">
                              {day.label}
                            </FormLabel>
                          </FormItem>
                        )
                      })
                    }
                  </div>
                  <FormDescription className="text-xs text-gray-500">
                    Selecione os dias em que esta regra se aplica
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["minGuests", "maxGuests"].map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as "minGuests" | "maxGuests"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Users className={`h-4 w-4 ${name === "minGuests" ? "text-green-500" : "text-blue-500"}`} />
                        {name === "minGuests" ? "Mínimo de hóspedes" : "Máximo de hóspedes"}
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
              ))}
            </div>
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
                name="minNights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2 h-5">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormMessage />
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
                  {id ? "Atualizando..." : "Cadastrando..."}
                </>
              ) : (
                id ? "Atualizar Regra de Preço" : "Cadastrar Regra de Preço"
              )}
            </Button>

          </form>
        </Form>
      </div>
    </>
  )
}

"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MapPin, Clock, Calendar, Users, DollarSign, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { WeekDays } from "@/../types/week-days"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RateRuleFormDataType, RateRuleFormData } from "./schema/schema-rate-rule"
import { useRateRulesHook } from "./hook/use-rate-rules.hook"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { maskPrice } from "@/../common/functions/mask-price"

const daysOfWeek: { value: WeekDays; label: string }[] = [
  { value: "MONDAY", label: "Segunda-feira" },
  { value: "TUESDAY", label: "Terça-feira" },
  { value: "WEDNESDAY", label: "Quarta-feira" },
  { value: "THURSDAY", label: "Quinta-feira" },
  { value: "FRIDAY", label: "Sexta-feira" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
]

export const RateRules: React.FC<{
  id?: string,
  onClose: () => void,
  data?: {
    days: WeekDays[],
    endDate: Date | undefined,
    startDate: Date | undefined,
    maxGuests: number,
    minGuests: number,
    pricePerNightCents: string,
    minNights: number,
    propertyId: string,
  }
}> = ({
  id,
  onClose,
  data
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const { properties } = useDataContext()

    const form = useForm<RateRuleFormDataType>({
      resolver: zodResolver(RateRuleFormData),
      defaultValues: {
        propertyId: data?.propertyId ?? "",
        startDate: data?.startDate ? new Date(data.startDate) : undefined,
        endDate: data?.endDate ? new Date(data.endDate) : undefined,
        days: data?.days ?? [],
        minGuests: data?.minGuests ?? 1,
        maxGuests: data?.maxGuests ?? 1,
        pricePerNightCents: data?.pricePerNightCents ? maskPrice(data.pricePerNightCents) : "00.00",
        minNights: data?.minNights ?? 1,
      },
    })

    const { handleSubmit } = useRateRulesHook(setIsLoading, onClose, form, id)

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
                              <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
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
                      placeholder="0.00"
                      onChange={(e) => field.onChange(maskPrice(e.target.value))}
                      value={field.value}
                    />
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
                  id ? "Atualizar Regra de Preço" : "Cadastrar Regra de Preço"
                )}
              </Button>

            </form>
          </Form>
        </div>
      </>
    )
  }

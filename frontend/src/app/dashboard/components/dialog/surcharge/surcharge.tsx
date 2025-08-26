"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { Form, FormField, FormItem, FormMessage, FormLabel, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MapPin, DollarSign, BadgePercent, CalendarCheck, Calendar, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { WeekDays } from "@/../types/week-days"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { SurchargeFormData, SurchargeFormDataType } from "./schema/schema-surcharge"
import { useSurchargeHook } from "./hook/use-surcharge.hook"

const daysOfWeek: {
  value: WeekDays,
  label: string,
}[] = [
    { value: "MONDAY", label: "Segunda-feira" },
    { value: "TUESDAY", label: "Terça-feira" },
    { value: "WEDNESDAY", label: "Quarta-feira" },
    { value: "THURSDAY", label: "Quinta-feira" },
    { value: "FRIDAY", label: "Sexta-feira" },
    { value: "SATURDAY", label: "Sábado" },
    { value: "SUNDAY", label: "Domingo" },
  ]

export const Surcharge: React.FC<{
  id?: string
  onClose: () => void
}> = ({
  id,
  onClose
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { properties, surchargeTypes } = useDataContext()

    const form = useForm<SurchargeFormDataType>({
      resolver: zodResolver(SurchargeFormData),
      defaultValues: {
        propertyId: "",
        startDate: undefined,
        endDate: undefined,
        amountCents: 0,
        days: [],
        appliesPerNight: false,
      },
    })

    const { handleSubmit } = useSurchargeHook(setIsLoading, onClose, form, id)
    if (properties.length === 0 || surchargeTypes.length === 0) {
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
            Cadastro de Taxas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        Data de início (opcional)
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
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-red-500" />
                        Data de fim (opcional)
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
                  name="surchargeTypeId"
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
                          {
                            surchargeTypes.map((surchargeType) => (
                              <SelectItem key={surchargeType.id} value={surchargeType.id}>
                                {surchargeType.name}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
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
        </div>
      </>
    )
  }
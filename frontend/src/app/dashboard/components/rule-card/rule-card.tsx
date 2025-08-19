"use client"

import { PropertyService } from "@/../services/property.service"
import type { RateRule } from "@/../types/rate-rule"
import { RateRuleService } from "@/../services/rate-rule.service"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, DollarSign } from "lucide-react"
import { WeekDays } from "@/../types/week-days"
import { Property } from "@/../types/property"
import { RuleProperty } from "@/../types/rule-property"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"

export const RuleCard = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rules, setRules] = useState<RuleProperty[]>([])
  const [hasNext, setHasNext] = useState<boolean>(false)

  const mapDays = {
    "MONDAY": "Segunda",
    "TUESDAY": "Terça",
    "WEDNESDAY": "Quarta",
    "THURSDAY": "Quinta",
    "FRIDAY": "Sexta",
    "SATURDAY": "Sábado",
    "SUNDAY": "Domingo"
  }

  const handleDate = (date: string) => {
    const dateConverted = new Date(date)
    const day = dateConverted.getDate()
    const month = dateConverted.getMonth() + 1
    const year = dateConverted.getFullYear()

    return `${day}/${month}/${year}`
  }

  const handleDelete = async (id: string) => {
    await RateRuleService.deleteRateRuleById(id)
  }

  useEffect(() => {
    const rateRules: RateRule[] = []
    const properties: Property[] = []
    
    const handleData = async () => {
      const getRateRules = async () => {
        const data = await RateRuleService.getRateRules(currentPage)
        setHasNext(data.hasNext)
        rateRules.push(...data.rateRules)
      }

      const getProperties = async () => {
        const idsProperties = Array.from(
          new Set(rateRules.map((rateRule) => rateRule.propertyId))
        )
        const data = await PropertyService.getPropertiesByIds({ ids: idsProperties })
        properties.push(...data)
      }

      const handleRules = () => {
        const propertyMap = new Map<string, { id: string; name: string }>()
        for (const property of properties) {
          propertyMap.set(property.id, property)
        }

        const rulesProperties = rateRules.map((rateRule) => {
          const property = propertyMap.get(rateRule.propertyId)
          if (!property) return null

          return {
            id: rateRule.id,
            propertyName: property.name,
            startDate: rateRule.startDate,
            endDate: rateRule.endDate,
            days: rateRule.days,
            minGuests: rateRule.minGuests,
            maxGuests: rateRule.maxGuests,
            minNights: rateRule.minNights,
            pricePerNightCents: rateRule.pricePerNightCents,
          }
        }).filter((item) => item !== null)

        setRules(rulesProperties)
      }

      await getRateRules()
      await getProperties()
      handleRules()
    }

    handleData()
  }, [currentPage])

  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <DollarSign className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Button>Criar novo</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {rules.map((rule) => (
        <Card
          key={rule.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {rule.propertyName}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hóspedes:</span>
                <span className="font-medium text-gray-800">{rule.minGuests}-{rule.maxGuests} hóspedes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Preço/noite:</span>
                <span className="font-medium text-green-600">R$ {(rule.pricePerNightCents / 100).toString().replace(".", ",")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mínimo:</span>
                <span className="font-medium text-gray-800">{rule.minNights}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Dias válidos:</span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {rule.days.map((day, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-white/50">
                      {mapDays[day]}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Período:</span>
                {
                  rule.startDate && rule.endDate ? (
                    <span className="font-medium text-xs text-gray-800">{handleDate(rule.startDate.toString())} a {handleDate(rule.endDate.toString())}</span>
                  ) : (
                    <span className="font-medium text-xs text-gray-800">Indeterminado</span>
                  )
                }
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
              >
                <Edit className="h-3 w-3 mr-1" />
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir este item? Esta ação não poderá ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      onClick={() => handleDelete(rule.id)}
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

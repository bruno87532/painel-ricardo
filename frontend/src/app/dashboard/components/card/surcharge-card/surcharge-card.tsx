"use client"

import { SurchargeService } from "@/../services/surcharge.service"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Receipt } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter
} from "@/components/ui/alert-dialog"
import React from "react"
import type { Surcharge } from "@/../types/surcharge"
import type { Property } from "@/../types/property"
import { PropertyService } from "@/../services/property.service"
import { SurchargeProperty } from "@/../types/surcharge-property"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import type { SurchargeType } from "@/../types/surcharge-type"
import { toast } from "sonner"

export const SurchargeCard = () => {
  const [surcharges, setSurcharges] = useState<SurchargeProperty[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

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

  useEffect(() => {
    const handleData = async () => {
      const surchargesArr: Surcharge[] = []
      const propertiesArr: Property[] = []
      const surchargeTypesArr: SurchargeType[] = []

      const getSurcharges = async () => {
        const data = await SurchargeService.getSurcharges(currentPage)
        surchargesArr.push(...data.surcharges)
      }

      const getProperties = async () => {
        const ids = Array.from(
          new Set(surchargesArr.map((surcharge) => surcharge.propertyId))
        )
        const data = await PropertyService.getPropertiesByIds({ ids })

        propertiesArr.push(...data.properties)
      }

      const getSurchargeTypes = async () => {
        const ids = Array.from(
          new Set(surchargesArr.map((surcharge) => surcharge.surchargeTypeId))
        )
        const data = await SurchargeTypeService.getSurchargeTypeByIds({ ids })

        surchargeTypesArr.push(...data.surchargeType)
      }

      const handleSurcharges = () => {
        const propertyMap = new Map<string, { id: string; name: string }>()
        const surchargeTypeMap = new Map<string, { id: string; name: string }>()
        for (const property of propertiesArr) {
          propertyMap.set(property.id, property)
        }
        for (const surchargeType of surchargeTypesArr) {
          surchargeTypeMap.set(surchargeType.id, surchargeType)
        }

        const surchargeProperty: SurchargeProperty[] = surchargesArr.map((surcharge) => {
          const property = propertyMap.get(surcharge.propertyId)
          if (!property) return null
          const surchargeType = surchargeTypeMap.get(surcharge.surchargeTypeId)
          if (!surchargeType) return null

          return {
            amountCents: surcharge.amountCents,
            appliesPerNight: surcharge.appliesPerNight,
            days: surcharge.days,
            endDate: surcharge.endDate,
            startDate: surcharge.startDate,
            id: surcharge.id,
            propertyName: property.name,
            surchargeName: surchargeType.name,
          }
        }).filter((item) => item !== null)

        setSurcharges(surchargeProperty)
      }

      await getSurcharges()
      await getProperties()
      await getSurchargeTypes()
      handleSurcharges()
    }

    handleData()
  }, [currentPage])

  const handleDelete = async (id: string) => {
    await SurchargeService.deleteSurchargeById(id)
    toast("Taxa deletada", {
      description: "Taxa deletada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    setSurcharges((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  if (surcharges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Receipt className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Button>Criar novo</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {surcharges.map((surcharge) => (
        <Card
          key={surcharge.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {surcharge.propertyName}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxa:</span>
                <span className="font-medium text-gray-800">{surcharge.surchargeName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Valor:</span>
                <span className="font-medium text-green-600">R$ {(surcharge.amountCents / 100).toString().replace(".", ",")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Aplicado por noite:</span>
                <span className="font-medium text-green-600">{surcharge.appliesPerNight ? "Sim" : "Não"}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Dias válidos:</span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {surcharge.days.map((day, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-white/50">
                      {mapDays[day]}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Período:</span>
                {
                  surcharge.startDate && surcharge.endDate ? (
                    <span className="font-medium text-xs text-gray-800">{handleDate(surcharge.startDate)} a {handleDate(surcharge.endDate)}</span>
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
                      onClick={() => handleDelete(surcharge.id)}
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

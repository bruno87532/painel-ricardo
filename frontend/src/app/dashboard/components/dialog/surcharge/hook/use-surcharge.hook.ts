"use client"

import React, { useEffect } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { PropertyService } from "@/../services/property.service"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import { SurchargeFormDataType } from "../schema/schema-surcharge"
import { SurchargeService } from "@/../services/surcharge.service"
import { toast } from "sonner"
import { UseFormReturn } from "react-hook-form"

export const useSurchargeHook = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
  form: UseFormReturn<SurchargeFormDataType>,
  id?: string
) => {
  const { setProperties, setSurchargeTypes, setSurcharges, properties, surchargeTypes } = useDataContext()

  useEffect(() => {
    const getProperties = async () => {
      const data = await PropertyService.getProperties()
      setProperties(data.properties)
    }

    const getSurchargeTypes = async () => {
      const data = await SurchargeTypeService.getSurchargeTypes()
      setSurchargeTypes(data.surchargeTypes)
    }

    getProperties()
    getSurchargeTypes()
  }, [])

  useEffect(() => {
    const getSurchargeById = async () => {
      if (id) {
        const data = await SurchargeService.getSurchargeById(id)
        const { amountCents, appliesPerNight, days, propertyId, endDate, startDate, surchargeTypeId } = data.surcharge
        form.reset({
          amountCents,
          appliesPerNight,
          days,
          propertyId,
          surchargeTypeId,
          endDate: new Date(endDate),
          startDate: new Date(startDate),
        })
      }
    } 
    
    getSurchargeById()
  }, [id])

  const handleSubmit = async (data: SurchargeFormDataType) => {
    setIsLoading(true)

    const property = properties.find((item) => item.id === data.propertyId)
    const surchargeType = surchargeTypes.find((item) => item.id === data.surchargeTypeId)
    if (!property || !surchargeType) return

    const dataDb = id ? await SurchargeService.updateSurchargeById(id, data) : await SurchargeService.createSurcharge(data)
    
    const { amountCents, appliesPerNight, days, startDate, endDate, propertyId, surchargeTypeId } = dataDb.surcharge
    const newItem = {
      amountCents, 
      appliesPerNight, 
      days,
      startDate,
      endDate,
      propertyId,
      surchargeTypeId,
      propertyName: property.name,
      surchargeName: surchargeType.name,
      id: dataDb.surcharge.id
    }
    setSurcharges((prev) => {
      return [
        ...(id ? prev.filter((item) => item.id !== id) : prev),
        newItem
      ]
    })

    toast(id ? "Taxa atualizada" : "Taxa criada", {
      description: id ? "Taxa atualizada com sucesso" : "Taxa criada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })

    setIsLoading(false)
    onClose()

  }

  return { handleSubmit }
}
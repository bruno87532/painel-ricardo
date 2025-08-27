"use client"

import React, { useEffect } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { PropertyService } from "@/../services/property.service"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import { SurchargeFormDataType } from "../schema/schema-surcharge"
import { SurchargeService } from "@/../services/surcharge.service"
import { toast } from "sonner"
import { UseFormReturn } from "react-hook-form"
import { makePrice } from "@/../common/functions/make-price"

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
  }, [setProperties, setSurchargeTypes])

  useEffect(() => {
    const getSurchargeById = async () => {
      if (id) {
        const data = await SurchargeService.getSurchargeById(id)
        const { amountCents, appliesPerNight, days, propertyId, endDate, startDate, surchargeTypeId } = data.surcharge
        form.reset({
          appliesPerNight,
          days,
          propertyId,
          surchargeTypeId,
          ...(startDate ? { startDate: new Date(startDate) } : {}),
          ...(endDate ? { endDate: new Date(endDate) } : {}),
          amountCents: makePrice(amountCents)
        })
      }
    }

    getSurchargeById()
  }, [id, form])

  const handleSubmit = async (data: SurchargeFormDataType) => {
    setIsLoading(true)

    const property = properties.find((item) => item.id === data.propertyId)
    const surchargeType = surchargeTypes.find((item) => item.id === data.surchargeTypeId)
    if (!property || !surchargeType) return
    data.amountCents = (parseFloat(data.amountCents) * 100).toFixed(0)
    if (data.days.length === 0) {
      data.days = [
        "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
      ]
    }

    const dataDb = id ? await SurchargeService.updateSurchargeById(id, data) : await SurchargeService.createSurcharge(data)
    const { amountCents, appliesPerNight, days, startDate, endDate, propertyId, surchargeTypeId } = dataDb.surcharge
    const newItem = {
      appliesPerNight,
      days,
      startDate,
      endDate,
      propertyId,
      surchargeTypeId,
      propertyName: property.name,
      surchargeName: surchargeType.name,
      id: dataDb.surcharge.id,
      amountCents: makePrice(amountCents),
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
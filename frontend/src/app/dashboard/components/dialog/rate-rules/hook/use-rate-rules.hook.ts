"use client"

import React from "react"
import { RateRuleService } from "@/../services/rate-rule.service"
import { useEffect } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { PropertyService } from "@/../services/property.service"
import { toast } from "sonner"
import { UseFormReturn } from "react-hook-form"
import { RateRuleFormDataType } from "../schema/schema-rate-rule"
import { makePrice } from "@/../common/functions/make-price"

export const useRateRulesHook = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
  form: UseFormReturn<RateRuleFormDataType>,
  id?: string
) => {
  const { setProperties, setRules, properties } = useDataContext()

  useEffect(() => {
    const getRateRuleById = async () => {
      if (id) {
        const data = await RateRuleService.getRateRuleById(id)
        const { propertyId, startDate, endDate, days, minGuests, maxGuests, pricePerNightCents, minNights } = data.rateRule

        form.reset({
          propertyId,
          days,
          minGuests,
          maxGuests,
          minNights,
          ...(startDate ? { startDate: new Date(startDate) } : {}),
          ...(endDate ? { endDate: new Date(endDate) } : {}),
          pricePerNightCents: makePrice(pricePerNightCents),
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
  }, [setProperties])

  const handleSubmit = async (data: RateRuleFormDataType) => {
    setIsLoading(true)

    if (data.days.length === 0) {
      data.days = [
        "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
      ]
    }
    const property = properties.find((item) => item.id === data.propertyId)
    if (!property) return

    data.pricePerNightCents = (parseFloat(data.pricePerNightCents) * 100).toFixed(0)
    const dataDb = id ? await RateRuleService.updateRateRuleById(id, data) : await RateRuleService.createRateRule(data)
    const { days, endDate, startDate, maxGuests, minGuests, minNights, pricePerNightCents, propertyId } = dataDb.rateRule
    const newItem = {
      days,
      endDate,
      startDate,
      maxGuests,
      minGuests,
      minNights,
      propertyId,
      propertyName: property.name,
      id: dataDb.rateRule.id,
      pricePerNightCents: makePrice(pricePerNightCents),
    }

    setRules((prev) => {
      return [
        ...(id ? prev.filter((item) => item.id !== id) : prev),
        newItem
      ]
    })

    toast(id ? "Regra de Preço atualizada" : "Regra de Preço criada", {
      description: id ? "Regra de Preço atualizada com sucesso" : "Regra de Preço criada com sucesso",
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
"use client"

import { SurchargeTypeFormDataType } from "../schema/schema-surcharge-type"
import { toast } from "sonner"
import React, { useEffect } from "react"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { UseFormReturn } from "react-hook-form"

export const useSurchargeTypeHook = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  form: UseFormReturn<SurchargeTypeFormDataType>,
  id?: string,
) => {

  useEffect(() => {
    const getSurchargeTypeById = async () => {
      if (id) {
        const data = await SurchargeTypeService.getSurchargeTypeById(id)
        form.reset({
          name: data.surchargeType.name
        })
      }
    }

    getSurchargeTypeById()
  }, [id])

  
  const { setSurchargeTypes, surchargeTypes } = useDataContext()
  
  useEffect(() => {
  }, [surchargeTypes])
  const handleSubmit = async (data: SurchargeTypeFormDataType) => {
    setIsLoading(true)
    const dataDb = id ? await SurchargeTypeService.updateSurchargeTypeById(id, data) : await SurchargeTypeService.createSurchargeType(data)
    const { name } = dataDb.surchargeType
    setSurchargeTypes((prev) => {
      return [
        ...(id ? prev.filter((item) => item.id !== id) : prev),
        {
          name,
          id: dataDb.surchargeType.id
        }
      ]
    })

    toast(id ? "Tipo de Taxa atualizada" : "Tipo de Taxa criada", {
      description: id ? "Tipo de Taxa atualizada com sucesso" : "Tipo de Taxa criada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })

    setIsLoading(false)
    setIsOpen(false)
  }

  return { handleSubmit }
}
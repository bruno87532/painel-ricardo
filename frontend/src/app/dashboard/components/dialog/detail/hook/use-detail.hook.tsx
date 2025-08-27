"use client"

import React from "react"
import { DetailFormDataType } from "../schema/schema-detail"
import { DetailService } from "@/../services/detail.service"
import { toast } from "sonner"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { useEffect } from "react"
import { PropertyService } from "@/../services/property.service"
import { UseFormReturn } from "react-hook-form"

export const useDetailHook = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
  form: UseFormReturn<DetailFormDataType>,
  id?: string
) => {
  const { setDetails, setProperties, properties } = useDataContext()

  useEffect(() => {
    const getDetailById = async () => {
      if (id) {
        const data = await DetailService.getDetailById(id)
        form.reset({
          description: data.detail.description,
          propertyId: data.detail.propertyId
        })
      }
    }

    getDetailById()
  }, [form, id])

  useEffect(() => {
    const getProperties = async () => {
      const data = await PropertyService.getProperties()
      setProperties(data.properties)
    }

    getProperties()
  }, [setProperties])

  const handleSubmit = async (data: DetailFormDataType) => {
    setIsLoading(true)
    const property = properties.find((item) => item.id === data.propertyId)
    if (!property) return

    const dataDb = id ? await DetailService.updateDetailById(id, data) : await DetailService.createDetail(data)
    const { description, propertyId } = dataDb.detail
    const newItem = {
      description,
      propertyId,
      id: dataDb.detail.id,
      propertyName: property?.name
    }
    setDetails((prev) => {
      return [
        ...(id ? prev.filter((item) => item.id !== id) : prev),
        newItem
      ]
    })

    toast(id ? "Propriedade atualizada" : "Propriedade criada", {
      description: id ? "Propriedade atualizada com sucesso" : "Propriedade criada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    onClose()
    setIsLoading(false)
  }

  return { handleSubmit }
}
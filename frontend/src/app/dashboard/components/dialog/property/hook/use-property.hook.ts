import { PropertyService } from "@/../services/property.service"
import React from "react"
import { PropertyFormData } from "../schema/schema-property"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { toast } from "sonner"
import { UseFormReturn } from "react-hook-form"

export const usePropertyHook = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => void,
  form: UseFormReturn<PropertyFormData>,
  id?: string,
) => {
  const { setProperties } = useDataContext()

  const handleSubmit = async (data: PropertyFormData) => {
    setIsLoading(true)

    const dataDb = id ? await PropertyService.updatePropertyById(id, data) : await PropertyService.createProperty(data)

    const { name, baseCapacity, maxCapacity } = dataDb.property
    const newItem = {
      name, baseCapacity, maxCapacity,
      id: dataDb.property.id
    }

    setProperties((prev) => {
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

    setIsLoading(false)
    onClose()
  }

  return { handleSubmit }
}
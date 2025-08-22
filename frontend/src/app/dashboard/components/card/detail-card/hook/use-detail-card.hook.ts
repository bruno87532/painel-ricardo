"use client"

import { useState, useEffect, useCallback } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { DetailService } from "@/../services/detail.service"
import { PropertyService } from "@/../services/property.service"
import type { Detail } from "@/../types/detail"
import type { Property } from "@/../types/property"

export const UseDetailHook = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { setDetails } = useDataContext()
  const handleData = useCallback(async () => {
    const detailsArr: Detail[] = []
    const propertiesArr: Property[] = []

    const getDetails = async () => {
      const data = await DetailService.getDetails()
      detailsArr.push(...data.details)
    }

    const getPropertiesByIds = async () => {
      const ids = Array.from(
        new Set(detailsArr.map((detail) => detail.propertyId))
      )
      const data = await PropertyService.getPropertiesByIds({ ids })
      propertiesArr.push(...data.properties)
    }

    const handleDetail = () => {
      const propertyMap = new Map<string, { id: string; name: string }>()
      for (const property of propertiesArr) {
        propertyMap.set(property.id, property)
      }

      const details = detailsArr.map((detail) => {
        const property = propertyMap.get(detail.propertyId)
        if (!property) return null

        return {
          description: detail.description,
          id: detail.id,
          propertyName: property.name
        }
      }).filter((item) => !!item)

      setDetails(details)
    }

    await getDetails()
    await getPropertiesByIds()
    handleDetail()
  }, [])

  return { isOpen, setIsOpen, handleData }
}
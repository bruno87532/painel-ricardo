"use client"

import { useDataContext } from "@/app/dashboard/context/use-data"
import { ImageFormDataType } from "../schema/schema-property"
import React, { useEffect } from "react"
import { PropertyService } from "@/../services/property.service"
import { UseFormReturn } from "react-hook-form"
import { ImageService } from "@/../services/image.service"
import { toast } from "sonner"
import { GoogleDriveService } from "@/../services/google-drive.service"

export const useImageHook = (
  form: UseFormReturn<ImageFormDataType>,
  setImagePreview: React.Dispatch<React.SetStateAction<string>>,
  fileInputRef: React.RefObject<HTMLInputElement | null>,
  onClose: () => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  id?: string,
) => {
  const { setProperties, setImages, properties } = useDataContext()

  useEffect(() => {
    const getProperties = async () => {
      const data = await PropertyService.getProperties()
      setProperties(data.properties)
    }

    getProperties()
  }, [setProperties])

  useEffect(() => {
    const getImage = async () => {
      if (id) {
        const data = await ImageService.getImageById(id)
        const file = await GoogleDriveService.getImageFromGoogleDrive(data.image.idDrive)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
        form.reset({
          description: data.image.description,
          propertyId: data.image.propertyId,
          file
        })
      }
    }

    getImage()
  }, [form, id, setImagePreview])

  const handleSubmit = async (data: ImageFormDataType) => {
    setIsLoading(true)
    const property = properties.find((item) => item.id === data.propertyId)
    if (!property) return
    const dataDb = id ? await ImageService.updateImageById(data, id) : await ImageService.createImage(data)
    toast(id ? "Imagem atualizada" : "Imagem criada", {
      description: id ? "Imagem atualizada com sucesso" : "Imagem criada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    const { description, idDrive } = dataDb.image

    setImages((prev) => {
      const newItem = {
        id: dataDb.image.id,
        propertyName: property.name,
        description,
        idDrive
      }

      return [
        ...(id ? prev.filter((item) => item.id !== id) : prev),
        newItem
      ]
    })
    setIsLoading(false)
    onClose()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      form.setValue("file", file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    // form.setValue("file", undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return { handleSubmit, handleImageUpload, removeImage }
}
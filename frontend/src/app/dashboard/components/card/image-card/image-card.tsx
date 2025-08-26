"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Building2, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/../types/property"
import { ImageService } from "@/../services/image.service"
import type { ImageReturn } from "@/../types/image"
import { PropertyService } from "@/../services/property.service"
import type { ImageProperty } from "@/../types/image-property"
import { Image } from "../../dialog/image/image"
import ImageNext from "next/image"
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { toast } from "sonner"

export const ImageCard = () => {
  const { images, setImages } = useDataContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState<boolean>(false)

  useEffect(() => {
    const handleData = async () => {
      const imagesArr: ImageReturn[] = []
      const propertiesArr: Property[] = []

      const getImages = async () => {
        const data = await ImageService.getImages(currentPage)
        imagesArr.push(...data.images)
      }

      const getProperties = async () => {
        const ids = Array.from(new Set(imagesArr.map((image) => image.propertyId)))
        const data = await PropertyService.getPropertiesByIds({ ids })
        propertiesArr.push(...data.properties)
      }

      const handleImages = () => {
        const propertyMap = new Map<string, { id: string; name: string }>()
        for (const property of propertiesArr) {
          propertyMap.set(property.id, property)
        }

        const ImageProperty: ImageProperty[] = imagesArr
          .map((image) => {
            const property = propertyMap.get(image.propertyId)
            if (!property) return null

            return {
              id: image.id,
              propertyName: property.name,
              idDrive: image.idDrive,
              description: image.description,
            }
          })
          .filter((item): item is ImageProperty => item !== null)

        setImages(ImageProperty)
      }

      await getImages()
      await getProperties()
      handleImages()
    }

    handleData()
  }, [currentPage])

  const handleDelete = async (id: string) => {
    await ImageService.deleteImageById(id)
    toast("Imagem deletada", {
      description: "Imagem deletada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    setImages((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Building2 className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Dialog onOpenChange={(open) => setIsCreating(open)} open={isCreating}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Criar novo</Button>
          </DialogTrigger>
          <DialogContent>
            <Image onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {images.map((image) => (
        <Card
          key={image.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {image.propertyName}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-48 rounded-md overflow-hidden">
                <ImageNext
                  src={`https://drive.google.com/uc?export=view&id=${image.idDrive}`}
                  alt={image.propertyName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-gray-500">Descrição:</span>
                  <span className="font-medium text-gray-800 ml-2 break-words max-w-[200px]">
                    {image.description}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Dialog
                onOpenChange={(open) => {
                  if (!open) setSelectedImageId(null)
                }}
                open={selectedImageId === image.id}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedImageId(image.id)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Image onClose={() => setSelectedImageId(null)} id={image.id} />
                </DialogContent>
              </Dialog>

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
                      onClick={() => handleDelete(image.id)}
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

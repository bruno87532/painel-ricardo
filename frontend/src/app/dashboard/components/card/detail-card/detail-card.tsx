"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter, AlertDialogCancel, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Trash2, Edit } from "lucide-react"
import { useEffect, useState } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { PropertyService } from "@/../services/property.service"
import { DetailService } from "@/../services/detail.service"
import { Detail } from "@/../types/detail"
import { Property } from "@/../types/property"

export const DetailCard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { details, setDetails, properties } = useDataContext()

  useEffect(() => {
    const handleData = async () => {
      const detailsArr: Detail[] = []
      const propertiesArr: Property[] = []

      const getDetails = async () => {
        const data = await DetailService.getDetails()
        detailsArr.push(...data.details)
      }

      const getPropertiesByIds = async () => {
        console.log(propertiesArr)
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
    }

    handleData()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {details.map((detail) => (
        <Card
          key={detail.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {detail.propertyName}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm">
                <span className="text-gray-500">Descrição:</span>
                <span className="font-medium text-gray-800 ml-2 break-words max-w-[200px]">
                  {detail.description}
                </span>

              </div>
            </div>

            <div className="flex gap-2">
              <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  {/* <SurchargeComponent setIsOpen={setIsOpen} id={surcharge.id} /> */}
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
                    // onClick={() => handleDelete(surcharge.id)}
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
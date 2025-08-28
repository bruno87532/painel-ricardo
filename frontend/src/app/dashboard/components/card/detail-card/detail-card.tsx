"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogFooter, AlertDialogCancel, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Trash2, Edit, Info, ChevronRight, ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { PropertyService } from "@/../services/property.service"
import { DetailService } from "@/../services/detail.service"
import { Detail } from "@/../types/detail"
import { Property } from "@/../types/property"
import { Detail as DetailComponent } from "../../dialog/detail/detail"
import { toast } from "sonner"

export const DetailCard = () => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { details, setDetails } = useDataContext()
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [quantityDetails, setQuantityDetails] = useState<number>(1)

  useEffect(() => {
    const handleData = async () => {
      const detailsArr: Detail[] = []
      const propertiesArr: Property[] = []

      const getDetails = async () => {
        const data = await DetailService.getDetails(currentPage)
        setQuantityDetails(data.quantity)
        setHasNext(data.hasNext)
        setLastPage(data.lastPage)
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
            propertyName: property.name,
            propertyId: property.id
          }
        }).filter((item) => !!item)

        setDetails(details)
      }

      await getDetails()
      await getPropertiesByIds()
      handleDetail()
    }

    handleData()
  }, [currentPage, setDetails])

  const handleDelete = async (id: string) => {
    await DetailService.deleteDetailById(id)
    setDetails(prev => prev.filter((item) => item.id !== id))
    toast("Detalhe deletado", {
      description: "Detalhe deletado com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
  }

  if (details.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Info className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Dialog onOpenChange={(open) => setIsCreating(open)} open={isCreating}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Criar novo</Button>
          </DialogTrigger>
          <DialogContent>
            <DetailComponent onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-6">
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
                <Dialog onOpenChange={(open) => {
                  if (!open) setSelectedDetailId(null)
                }} open={selectedDetailId === detail.id}>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
                      onClick={() => setSelectedDetailId(detail.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DetailComponent onClose={() => setSelectedDetailId(null)} id={detail.id}
                    data={{
                      description: detail.description,
                      propertyId: detail.propertyId
                    }}
                    />
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
                        onClick={() => handleDelete(detail.id)}
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
      <div className="flex items-center justify-center gap-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          className={`${currentPage !== 1 ? "cursor-pointer" : ""} bg-transparent`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {`Página ${currentPage} de ${lastPage}`}
          </span>
          <span className="text-xs text-gray-500">
            {`(Mostrando ${details.length} de ${quantityDetails} detalhes)`}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={`${hasNext ? "cursor-pointer" : ""} bg-transparent`}
          disabled={!hasNext}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
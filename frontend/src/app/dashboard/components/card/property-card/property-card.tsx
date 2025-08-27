"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Building2, ChevronLeft, ChevronRight } from "lucide-react"
import { useDataContext } from "@/app/dashboard/context/use-data"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import { PropertyService } from "@/../services/property.service"
import { toast } from "sonner"
import { Property } from "../../dialog/property/property"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

export const PropertyCard = () => {
  const { properties, setProperties } = useDataContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [lastPage, setLastPage] = useState<number>(1)
  const [quantityProperties, setQuantityProperties] = useState<number>(1) 
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState<boolean>(false)

  useEffect(() => {
    const getProperties = async () => {
      const data = await PropertyService.getProperties(currentPage)
      setQuantityProperties(data.quantity)
      setLastPage(data.lastPage)
      setHasNext(data.hasNext)
      setProperties(data.properties)
    }

    getProperties()
  }, [currentPage])

  const handleDelete = async (id: string) => {
    await PropertyService.deletePropertyById(id)
    toast("Propriedade deletada", {
      description: "Propriedade deletada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    setProperties((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Building2 className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Dialog onOpenChange={(open) => setIsCreating(open)} open={isCreating}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Criar novo</Button>
          </DialogTrigger>
          <DialogContent>
            <Property onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property) => (
          <Card
            key={property.id}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
          >
            <div>
              <h3 className="font-semibold text-lg mb-2 text-gray-800">Nome: {property.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacidade Mínima:</span>
                  <span className="font-medium text-gray-800">{property.baseCapacity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacidade Máxima:</span>
                  <span className="font-medium text-gray-800">{property.maxCapacity}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog
                  onOpenChange={(open) => {
                    if (!open) setSelectedPropertyId(null)
                  }}
                  open={property.id === selectedPropertyId}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
                      onClick={() => setSelectedPropertyId(property.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <Property id={property.id} onClose={() => setSelectedPropertyId(null)} />
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
                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                        onClick={() => handleDelete(property.id)}
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
            {`(Mostrando ${properties.length} de ${quantityProperties} propriedades)`}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={`${hasNext ? "cursor-pointer": ""} bg-transparent`}
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

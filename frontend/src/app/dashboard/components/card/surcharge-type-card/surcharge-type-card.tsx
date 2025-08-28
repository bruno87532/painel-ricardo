"use client"

import { Button } from "@/components/ui/button"
import { DollarSignIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogFooter
} from "@/components/ui/alert-dialog"
import React, { useEffect, useState } from "react"
import { SurchargeTypeService } from "@/../services/surcharge-type.service"
import { toast } from "sonner"
import { useDataContext } from "@/app/dashboard/context/use-data"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { SurchargeType } from "../../dialog/surcharge-type/surcharge-type"

export const SurchargeTypeCard = () => {
  const [selectedSurchargeTypeId, setSelectedSurchargeTypeId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const { surchargeTypes, setSurchargeTypes } = useDataContext()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [quantitySurchargeTypes, setQuantitySurchargeTypes] = useState<number>(1)
  const [lastPage, setLastPage] = useState<number>(1)

  useEffect(() => {
    const handleData = async () => {
      const data = await SurchargeTypeService.getSurchargeTypes(currentPage)
      setLastPage(data.lastPage)
      setQuantitySurchargeTypes(data.quantity)
      setHasNext(data.hasNext)
      setSurchargeTypes(data.surchargeTypes)
    }

    handleData()
  }, [currentPage, setSurchargeTypes])

  if (surchargeTypes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <DollarSignIcon className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Dialog onOpenChange={(open) => setIsCreating(open)} open={isCreating}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">Criar novo</Button>
          </DialogTrigger>
          <DialogContent>
            <SurchargeType onClose={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    await SurchargeTypeService.deleteSurchargeTypeById(id)
    toast("Tipo de Taxa deletada", {
      description: "Tipo de Taxa deletada com sucesso",
      action: {
        label: "Feito",
        onClick: () => { },
      },
    })
    setSurchargeTypes((prev) => {
      return prev.filter((item) => item.id !== id)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {surchargeTypes.map((surchargeType) => (
          <Card
            key={surchargeType.id}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
          >
            <div>

              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {surchargeType.name}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Dialog
                  onOpenChange={(open) => {
                    if (!open) setSelectedSurchargeTypeId(null)
                  }}
                  open={selectedSurchargeTypeId === surchargeType.id}
                >
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
                      onClick={() => setSelectedSurchargeTypeId(surchargeType.id)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <SurchargeType id={surchargeType.id} onClose={() => setSelectedSurchargeTypeId(null)}
                      data={{
                        name: surchargeType.name
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800 cursor-pointer"
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
                        onClick={() => handleDelete(surchargeType.id)}
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
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{`Página ${currentPage} de ${lastPage}`}</span>
          <span className="text-xs text-gray-500">
            {`(Mostrando ${surchargeTypes.length} de ${quantitySurchargeTypes} tipos de taxas)`}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className={`${hasNext ? "cursor-pointer" : ""} bg-transparent`}
          disabled={!hasNext}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Próxima
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
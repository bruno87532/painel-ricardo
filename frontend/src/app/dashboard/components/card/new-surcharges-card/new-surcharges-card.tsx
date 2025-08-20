"use client"

import { Button } from "@/components/ui/button"
import { DollarSignIcon } from "lucide-react"
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
import { SurchargeType } from "@/../types/surcharge-type"
import { toast } from "sonner"

export const NewSurchargesCard = () => {
  const [surchargeTypes, setSurchargeTypes] = useState<SurchargeType[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const handleData = async () => {
      const data = await SurchargeTypeService.getSurchargeTypes(currentPage)
      setSurchargeTypes(data.surchargeTypes)
    }

    handleData()
  }, [currentPage])
  if (surchargeTypes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <DollarSignIcon className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Button>Criar novo</Button>
      </div>
    )
  }

  const handleDelete = async (id: string) => {
    await SurchargeTypeService.deleteSurchargeTypeById(id)
    toast("Tipo de Taxa desatualizada", {
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {surchargeTypes.map((surchargeType) => (
        <Card
          key={surchargeType.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Nome: {surchargeType.name}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 cursor-pointer"
              >
                <Edit className="h-3 w-3 mr-1" />
                Editar
              </Button>
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
  )
}
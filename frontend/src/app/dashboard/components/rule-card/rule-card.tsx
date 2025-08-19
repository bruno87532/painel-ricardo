"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, DollarSign } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"

export const RuleCard = () => {
  const mockPriceRules = [
    {
      id: "1",
      propertyName: "Casa da Praia",
      guestRange: "2-4 hóspedes",
      pricePerNight: "R$ 250,00",
      minNights: 2,
      validDays: ["Seg", "Ter", "Qua"],
      period: "01/09/2025 a 30/11/2025",
    },
    {
      id: "2",
      propertyName: "Apartamento Centro",
      guestRange: "1-2 hóspedes",
      pricePerNight: "R$ 180,00",
      minNights: 1,
      validDays: ["Todos os dias"],
      period: "01/08/2025 a 31/08/2025",
    },
    {
      id: "3",
      propertyName: "Chalé da Montanha",
      guestRange: "2-6 hóspedes",
      pricePerNight: "R$ 320,00",
      minNights: 3,
      validDays: ["Sex", "Sáb", "Dom"],
      period: "15/07/2025 a 30/09/2025",
    },
    {
      id: "4",
      propertyName: "Chalé da Montanha",
      guestRange: "2-6 hóspedes",
      pricePerNight: "R$ 320,00",
      minNights: 3,
      validDays: ["Sex", "Sáb", "Dom"],
      period: "15/07/2025 a 30/09/2025",
    }
  ]

  const handleDelete = (id: string) => {
  }

  if (mockPriceRules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <DollarSign className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Button>Criar novo</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {mockPriceRules.map((rule) => (
        <Card
          key={rule.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {rule.propertyName}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hóspedes:</span>
                <span className="font-medium text-gray-800">{rule.guestRange}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Preço/noite:</span>
                <span className="font-medium text-green-600">{rule.pricePerNight}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mínimo:</span>
                <span className="font-medium text-gray-800">{rule.minNights}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Dias válidos:</span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {rule.validDays.map((day, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-white/50">
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Período:</span>
                <span className="font-medium text-xs text-gray-800">{rule.period}</span>
              </div>
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
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 text-white hover:bg-red-700"
                      onClick={() => handleDelete(rule.id)}
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

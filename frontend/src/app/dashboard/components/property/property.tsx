import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit, Trash2, Building2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogAction
} from "@/components/ui/alert-dialog"

export const PropertyCard = () => {
  const mockProperties = [
    { id: "1", name: "Casa da Praia", city: "Florianópolis", state: "SC", rulesCount: 3, taxesCount: 2 },
    { id: "2", name: "Apartamento Centro", city: "São Paulo", state: "SP", rulesCount: 5, taxesCount: 1 },
    { id: "3", name: "Chalé da Montanha", city: "Gramado", state: "RS", rulesCount: 2, taxesCount: 3 },
    { id: "4", name: "Loft Moderno", city: "Rio de Janeiro", state: "RJ", rulesCount: 4, taxesCount: 2 },
    { id: "5", name: "Casa de Campo", city: "Tiradentes", state: "MG", rulesCount: 1, taxesCount: 1 },
  ]

  const handleDelete = (id: string) => {
    console.log("delete", id)
  }

  if (mockProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Building2 className="h-12 w-12 text-gray-400 mb-3" />
        <p className="text-gray-500 mb-4">Nenhum item encontrado</p>
        <Button>Criar novo</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {mockProperties.map((property) => (
        <Card
          key={property.id}
          className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-5 transition-all duration-200 hover:shadow-md hover:bg-white/95"
        >
          <div>
            <h3 className="font-semibold text-lg mb-2 text-gray-800">{property.name}</h3>
            <p className="text-gray-600 mb-3">
              {property.city}, {property.state}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Regras:</span>
                <span className="font-medium text-gray-800">{property.rulesCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxas:</span>
                <span className="font-medium text-gray-800">{property.taxesCount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800"
              >
                <Edit className="h-3 w-3 mr-1" />
                Editar
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 hover:text-red-800"
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
                      className="bg-red-600 hover:bg-red-700 text-white"
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
  )
}

"use client"

import { TabType } from "../../../types/tab-type"
import { useState } from "react"
import { TaxCard } from "./components/tax-card/tax-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sidebar } from "./components/sidebar/sidebar"
import { RuleCard } from "./components/rule-card/rule-card"
import { Menu as MenuPage } from "./components/menu/menu"
import { Building2, DollarSign, Receipt, Menu, DollarSignIcon } from "lucide-react"
import { PropertyCard } from "./components/property/property"
import { NewTaxes } from "./components/new-taxes/new-taxes"

const PricingDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("properties")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [visibleItems, setVisibleItems] = useState(10)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const getCurrentTitle = () => {
    switch (activeTab) {
      case "properties":
        return "Propriedades"
      case "rules":
        return "Regras de Preço"
      case "taxes":
        return "Taxas"
      case "new-taxes":
        return "Nova Taxa"
      default:
        return ""
    }
  }

  const sidebarItems = [
    { id: "properties", label: "Propriedades", icon: Building2 },
    { id: "rules", label: "Regras de Preço", icon: DollarSign },
    { id: "taxes", label: "Taxas", icon: Receipt },
    { id: "new-taxes", label: "Tipos de Taxas", icon: DollarSignIcon }
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <MenuPage
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setVisibleItems={setVisibleItems}
        sidebarItems={sidebarItems}
      />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
        setVisibleItems={setVisibleItems}
        sidebarItems={sidebarItems}
        sidebarOpen={sidebarOpen}
      />

      <div className="pt-16 md:ml-64">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="md:hidden bg-white/80 backdrop-blur-sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getCurrentTitle()}
              </h1>
            </div>
          </div>

          {activeTab === "properties" && (
            <PropertyCard />
          )}
          {activeTab === "rules" && (
            <RuleCard />
          )}
          {activeTab === "taxes" && <TaxCard />}
          { activeTab === "new-taxes" && <NewTaxes />  }
        </div>
      </div>

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar {getCurrentTitle().slice(0, -1)}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar {getCurrentTitle().slice(0, -1)}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div >
  )
}

export default PricingDashboard
"use client"

import type { TabType } from "../../../types/tab-type"
import { useState } from "react"
import { SurchargeCard } from "./components/card/surcharge-card/surcharge-card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Sidebar } from "./components/sidebar/sidebar"
import { Menu as MenuPage } from "./components/menu/menu"
import { Building2, DollarSign, Receipt, Menu, DollarSignIcon, Info } from "lucide-react"
import { PropertyCard } from "./components/card/property-card/property-card"
import { SurchargeTypeCard } from "./components/card/surcharge-type-card/surcharge-type-card"
import { RateRuleCard } from "./components/card/rate-rule-card/rate-rule-card" // Added import for RateRuleCard
import { Property } from "./components/dialog/property/property"
import { RateRules } from "./components/dialog/rate-rules/rate-rule"
import { Surcharge } from "./components/dialog/surcharge/surcharge"
import { SurchargeType } from "./components/dialog/surcharge-type/surcharge-type"
import { DetailCard } from "./components/card/detail-card/detail-card"
import { Detail } from "./components/dialog/detail/detail"
import { Image } from "./components/dialog/image/image"
import { ImageCard } from "./components/card/image-card/image-card"

const PricingDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("properties")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [visibleItems, setVisibleItems] = useState(10)

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
      case "details":
        return "Novo Detalhe"
      case "image": 
        return "Nova Imagem"
      default:
        return ""
    }
  }

  const sidebarItems = [
    { id: "properties", label: "Propriedades", icon: Building2 },
    { id: "rules", label: "Regras de Preço", icon: DollarSign },
    { id: "taxes", label: "Taxas", icon: Receipt },
    { id: "new-taxes", label: "Tipos de Taxas", icon: DollarSignIcon },
    { id: "details", label: "Detalhes", icon: Info },
    { id: "image", label: "Imagens", icon: Info }
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
            <Dialog onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
                >
                  {activeTab === "properties" && "Cadastrar Nova Propriedade"}
                  {activeTab === "rules" && "Cadastrar Nova Regra de Precificação"}
                  {activeTab === "taxes" && "Cadastrar Nova Taxa"}
                  {activeTab === "new-taxes" && "Cadastrar Novo Tipo de Taxa"}
                  {activeTab === "details" && "Cadastrar Novo Detalhe"}
                  {activeTab === "image" && "Cadastrar Nova Imagem"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                {activeTab === "properties" && <Property onClose={() => setIsOpen(false)} />}
                {activeTab === "rules" && <RateRules onClose={() => setIsOpen(false)} />}
                {activeTab === "taxes" && <Surcharge onClose={() => setIsOpen(false)} />}
                {activeTab === "new-taxes" && <SurchargeType onClose={() => setIsOpen(false)} />}
                {activeTab === "details" && <Detail onClose={() => setIsOpen(false)} />}
                {activeTab === "image" && <Image onClose={() => setIsOpen(false)} />}
              </DialogContent>
            </Dialog>
          </div>
          {activeTab === "properties" && <PropertyCard />}
          {activeTab === "rules" && <RateRuleCard />}
          {activeTab === "taxes" && <SurchargeCard />}
          {activeTab === "new-taxes" && <SurchargeTypeCard />}
          {activeTab === "details" && <DetailCard />}
          {activeTab === "image" && <ImageCard />}
        </div>
      </div>
    </div>
  )
}

export default PricingDashboard

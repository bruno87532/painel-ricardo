import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import React from "react"
import { TabType } from "../../../../../types/tab-type"
import { LucideIcon } from "lucide-react"

export const Sidebar: React.FC<{
  sidebarItems: { id: string, label: string, icon: LucideIcon }[];
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVisibleItems: React.Dispatch<React.SetStateAction<number>>;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
  activeTab: TabType
}> = ({
  sidebarItems,
  sidebarOpen,
  setSidebarOpen,
  setVisibleItems,
  setActiveTab,
  activeTab
}) => {
    return (
      <div
        className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-md border-r z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800 md:hidden">Dashboard</h2>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType)
                    setVisibleItems(10)
                    setSidebarOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer
                    ${isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    )
  }
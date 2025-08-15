import type { LucideIcon } from "lucide-react"
import { TabType } from "../../../../../types/tab-type"
import React from "react"

export const Menu: React.FC<{
  sidebarItems: { id: string, label: string, icon: LucideIcon }[]
  activeTab: TabType,
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>,
  setVisibleItems: React.Dispatch<React.SetStateAction<number>>
}> = ({ 
  sidebarItems,
  activeTab,
  setActiveTab,
  setVisibleItems
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50 h-16">
      <div className="px-4 md:px-6 py-3 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
            <nav className="hidden md:flex items-center gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType)
                      setVisibleItems(10)
                    }}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      }
                      `}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}
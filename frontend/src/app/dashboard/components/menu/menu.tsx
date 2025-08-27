"use client"

import type { LucideIcon } from "lucide-react"
import type { TabType } from "@/../types/tab-type"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Avatar from "react-initials-avatar"
import { useAdminContext } from "../../context/use-admin"
import { AuthService } from "@/../services/auth.service"
import { useRouter } from "next/navigation"

export const Menu: React.FC<{
  sidebarItems: { id: string; label: string; icon: LucideIcon }[]
  activeTab: TabType
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>
}> = ({ sidebarItems, activeTab, setActiveTab }) => {
  const router = useRouter()
  const { admin } = useAdminContext()
  const name = admin.name

  const handleClick = async () => {
    await AuthService.logout()
    router.push("/auth")
  }

  const handleNavigateToTab = (tabId: string) => {
    setActiveTab(tabId as TabType)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm z-50 h-16">
      <div className="px-6 py-3 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigateToTab(item.id)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
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

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-3 py-2 h-auto hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                    <Avatar name={name} />
                  </div>
                  <span className="font-medium text-gray-700 hidden sm:block">{name.split(" ")[0]}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80 p-3">
                <div className="flex items-center gap-4 p-4 mb-3 bg-gray-50 rounded-lg">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
                    <Avatar name={name} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-base">{name}</p>
                    <p className="text-sm text-gray-500">Administrador</p>
                  </div>
                </div>

                <DropdownMenuSeparator />

                <div className="py-3">
                  <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Navegação</p>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                      <DropdownMenuItem
                        key={item.id}
                        className={`
                          flex items-center gap-4 px-4 py-3 cursor-pointer rounded-md mx-1 transition-colors text-base
                          ${isActive ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}
                        `}
                        onClick={() => handleNavigateToTab(item.id)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                        {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </DropdownMenuItem>
                    )
                  })}
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-red-600 hover:bg-red-50 cursor-pointer px-4 py-3 mx-1 rounded-md font-medium text-base"
                  onClick={handleClick}
                >
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

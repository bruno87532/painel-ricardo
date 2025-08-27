import React from "react"
import { DataProvider } from "./context/use-data"
import { AdminProvider } from "./context/use-admin"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <DataProvider>
      <AdminProvider>
        {children}
      </AdminProvider>
    </DataProvider>
  )
}

export default Layout
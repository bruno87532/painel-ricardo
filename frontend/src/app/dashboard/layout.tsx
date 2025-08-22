import React from "react"
import { DataProvider } from "./context/use-data"

const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <DataProvider>
      { children }
    </DataProvider>
  )
}

export default Layout
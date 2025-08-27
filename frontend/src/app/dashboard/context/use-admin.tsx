"use client"

import React, { useContext, createContext, useState } from "react";
import { useEffect } from "react";
import { AdminService } from "@/../services/admin.service";

type AdminContext = {
  admin: {
    name: string;
    email: string
  }
  setAdmin: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string
  }>>
}

const AdminContext = createContext<AdminContext | undefined>(undefined)

export const AdminProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [admin, setAdmin] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: ""
  })

  useEffect(() => {
    const getAdminById = async () => {
      const admin = await AdminService.getAdminById()
      console.log(admin)
      setAdmin(admin.admin)
    }

    getAdminById()
  }, [])

  return (
    <AdminContext.Provider value={{
      admin,
      setAdmin
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) throw new Error("useAdmin must be used within an AdminProvider")
  return context
}
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const NewSurcharge = () => {
  const [open, setOpen] = useState(false)
  const [taxName, setTaxName] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleConfirm = () => {
    if (taxName.trim()) {
      setTaxName("")
      setOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirm()
    }
  }

  return (
    <div className="flex justify-end mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white cursor-pointer">
            Cadastrar Nova Taxa
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 rounded-md border border-gray-200 dark:border-gray-700 shadow-2xl">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl font-semibold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Cadastrar nova taxa
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Digite o nome da taxa"
                value={taxName}
                onChange={(e) => setTaxName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 text-lg rounded-md border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button
                onClick={handleConfirm}
                disabled={!taxName.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
              >
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

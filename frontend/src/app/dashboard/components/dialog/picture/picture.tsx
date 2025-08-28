"use client"

import type React from "react"
import { useImageHook } from "./hook/use-image.hook"
import { useState, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, X, MapPin, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { ImageFormData, type ImageFormDataType } from "./schema/schema-property"
import { useForm } from "react-hook-form"
import { useDataContext } from "@/app/dashboard/context/use-data"
import Image from "next/image"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

export const Picture: React.FC<{
  onClose: () => void;
  id?: string;
  data?: {
    propertyId: string;
    description: string;
    idDrive: string;
  }
}> = ({ onClose, id, data }) => {
  const form = useForm<ImageFormDataType>({
    resolver: zodResolver(ImageFormData),
    defaultValues: {
      propertyId: data?.propertyId ?? "",
      description: data?.description ?? "",
      file: undefined,
    },
  })

  const [imageIsLoading, setImageIsLoading] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { properties } = useDataContext()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { handleSubmit, handleImageUpload, removeImage } = useImageHook(form, setImagePreview, fileInputRef, onClose, setIsLoading, setImageIsLoading, id, data?.idDrive)

  return (
    <>
      <DialogHeader className="space-y-2 text-center">
        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro de Imagens
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a descrição da imagem"
                      className="h-11 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Propriedade
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 border-gray-200 focus:border-blue-400 transition-colors w-full">
                        <SelectValue placeholder="Selecione uma propriedade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-blue-500" />
                    Imagem da Propriedade
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div
                        className="relative flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer bg-gray-50/50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {
                          imageIsLoading ? (
                            <Loader2 className="animate-spin h-10 w-10" />
                          ) : imagePreview ? (
                            <div className="relative h-full w-full group">
                              <Image
                                src={imagePreview}
                                alt="Preview da imagem"
                                fill
                                className="object-contain rounded-lg p-2"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeImage()
                                  }}
                                  className="bg-white/90 hover:bg-white text-gray-700 cursor-pointer"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Remover
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-center p-6">
                              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <Upload className="h-8 w-8 text-blue-500" />
                              </div>
                              <p className="text-sm font-medium text-gray-700 mb-1">Clique para fazer upload</p>
                              <p className="text-xs text-gray-500">PNG, JPG ou JPEG até 10MB</p>
                            </div>
                          )}
                      </div>

                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {id ? "Atualizando..." : "Cadastrando..."}
                </>
              ) : (
                id ? "Atualizar" : "Cadastrar"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}

"use client"

import React, { useContext, createContext, useState } from "react";
import { Property } from "@/../types/property";
import { SurchargeProperty } from "@/../types/surcharge-property";
import { SurchargeType } from "@/../types/surcharge-type";
import { RuleProperty } from "@/../types/rule-property";
import { DetailProperty } from "@/../types/detail-property";

type DataContext = {
  surchargeTypes: SurchargeType[];
  setSurchargeTypes: React.Dispatch<React.SetStateAction<SurchargeType[]>>;
  properties: Property[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  rules: RuleProperty[];
  setRules: React.Dispatch<React.SetStateAction<RuleProperty[]>>;
  surcharges: SurchargeProperty[];
  setSurcharges: React.Dispatch<React.SetStateAction<SurchargeProperty[]>>;
  details: DetailProperty[];
  setDetails: React.Dispatch<React.SetStateAction<DetailProperty[]>>
}

const DataContext = createContext<DataContext | undefined>(undefined)

export const DataProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [surchargeTypes, setSurchargeTypes] = useState<SurchargeType[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [rules, setRules] = useState<RuleProperty[]>([])
  const [surcharges, setSurcharges] = useState<SurchargeProperty[]>([])
  const [details, setDetails] = useState<DetailProperty[]>([])

  return (
    <DataContext.Provider value={{ surchargeTypes, setSurchargeTypes, properties, setProperties, rules, setRules, surcharges, setSurcharges, details, setDetails }}>
      { children }
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error("useData must be used within an DataProvider")
  return context
}
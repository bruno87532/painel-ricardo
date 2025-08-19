"use client"

import { SurchargeType as SurchargeTypeComponent } from "../components/surcharge-type/surcharge-type"
import { useParams } from "next/navigation"

const SurchargeType = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  
  return (
    <>
      <SurchargeTypeComponent id={id}/>
    </>
  )
}

export default SurchargeType
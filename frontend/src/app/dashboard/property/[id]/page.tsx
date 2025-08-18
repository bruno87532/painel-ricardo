"use client"

import { useParams } from "next/navigation"
import { Property as PropertyComponent } from "../components/property"

const Property = () => {
  const params = useParams<{ id: string }>()
  const id = params.id
  return (
    <>
      <PropertyComponent id={id} />
    </>
  )
}

export default Property
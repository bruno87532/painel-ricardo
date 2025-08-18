"use client"

import { RateRules as RateRulesComponent } from "../components/rate-rule/rate-rule"
import { useParams } from "next/navigation"

const RateRules = () => {
  const params = useParams<{ id: string }>()
  const id = params.id

  return (
    <>
      <RateRulesComponent id={id} />
    </>
  )
}

export default RateRules
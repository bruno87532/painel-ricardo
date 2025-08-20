import axios from "axios"
import { WeekDays } from "../types/week-days"
import type { Surcharge } from "../types/surcharge"

export class SurchargeService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createSurcharge(data: {
    propertyId: string,
    days: WeekDays[],
    startDate?: Date,
    endDate?: Date,
    kind: string,
    amountCents: number,
    appliesPerNight: boolean
  }): Promise<{ surcharge: Surcharge }> {
    const surcharge = await axios.post(this.pathBackend + "/surcharge", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharge: surcharge.data
    }
  }

  static async getSurcharges(page: number): Promise<{
    surcharges: Surcharge[]
  }> {
    const surcharges = await axios.get(this.pathBackend + "/surcharge?page=" + page, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharges: surcharges.data.surcharges
    }
  }
}
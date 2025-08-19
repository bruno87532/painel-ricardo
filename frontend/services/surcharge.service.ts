import axios from "axios"
import { WeekDays } from "../types/week-days"

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
  }) {
    const surcharge = await axios.post(this.pathBackend + "/surcharge", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surcharge.data
  }
}
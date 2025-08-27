import axios from "axios"
import { WeekDays } from "../types/week-days"
import type { Surcharge } from "../types/surcharge"

export class SurchargeService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async updateSurchargeById(id: string, data: {
    propertyId: string,
    days: WeekDays[],
    startDate?: Date,
    endDate?: Date,
    amountCents: number,
    appliesPerNight: boolean
  }): Promise<{
    surcharge: Surcharge
  }> {
    const dataDb = await axios.put(this.pathBackend + "/surcharge/" + id, data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharge: dataDb.data.surcharge
    }
  }

  static async createSurcharge(data: {
    propertyId: string,
    days: WeekDays[],
    startDate?: Date,
    endDate?: Date,
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
    surcharges: Surcharge[],
    hasNext: boolean,
    lastPage: number,
    quantity: number,
  }> {
    const surcharges = await axios.get(this.pathBackend + "/surcharge?page=" + page, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharges: surcharges.data.surcharges,
      hasNext: surcharges.data.hasNext,
      lastPage: surcharges.data.lastPage,
      quantity: surcharges.data.quantity
    }
  }

  static async deleteSurchargeById(id: string): Promise<{
    surcharge: Surcharge
  }> {
    const surcharge = await axios.delete(this.pathBackend + "/surcharge/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharge: surcharge.data
    }
  }

  static async getSurchargeById(id: string): Promise<{
    surcharge: Surcharge
  }> {
    const surcharge = await axios.get(this.pathBackend + "/surcharge/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surcharge: surcharge.data
    }
  }
}
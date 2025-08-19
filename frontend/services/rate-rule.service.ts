import axios from "axios";
import { WeekDays } from "../types/week-days";
import { RateRule } from "../types/rate-rule";

export class RateRuleService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createRateRule(data: {
    propertyId: string,
    startDate?: Date,
    endDate?: Date,
    days: WeekDays[],
    minGuests: number,
    maxGuests: number,
    pricePerNightCents: number,
    minNights: number
  }) {
    const rateRule = await axios.post(this.pathBackend + "/rate-rule", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return rateRule.data
  }

  static async updateRateRuleById(id: string, data: {
    propertyId: string,
    startDate?: Date,
    endDate?: Date,
    days: WeekDays[],
    minGuests: number,
    maxGuests: number,
    pricePerNightCents: number,
    minNights: number
  }) {
    const rateRule = await axios.put(this.pathBackend + "/rate-rule/" + id, data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return rateRule.data
  }

  static async getRateRuleById(id: string) {
    const rateRule = await axios.get(this.pathBackend + "/rate-rule/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return rateRule.data
  }

  static async getRateRules(page: number): Promise<{
    rateRules: RateRule[],
    hasNext: boolean
  }> {
    const rateRules = await axios.get(this.pathBackend + "/rate-rule?page=" + page, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return rateRules.data
  }

  static async deleteRateRuleById(id: string) {
    const rateRule = await axios.delete(this.pathBackend + "/rate-rule/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return rateRule.data
  }
}
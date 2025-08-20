import axios from "axios"
import type { SurchargeType } from "../types/surcharge-type"

export class SurchargeTypeService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createSurchargeType(data: {
    name: string
  }): Promise<{
    surchargeType: SurchargeType
  }> {
    const surchargeType = await axios.post(this.pathBackend + "/surcharge-type", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeType: surchargeType.data
    }
  }

  static async deleteSurchargeTypeById(id: string): Promise<{
    surchargeType: SurchargeType
  }> {
    const surchargeType = await axios.delete(this.pathBackend + "/surcharge-type/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeType: surchargeType.data
    }
  }

  static async getSurchargeTypes(): Promise<{
    surchargeTypes: SurchargeType[]
  }> {
    const surchargeTypes = await axios.get(this.pathBackend + "/surcharge-type", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeTypes: surchargeTypes.data
    }
  }

  static async updateSurchargeTypeById(id: string, data: {
    name: string
  }): Promise<{
    surchargeType: SurchargeType
  }> {
    const surchargeType = await axios.put(this.pathBackend + "/surcharge-type/" + id, data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeType: surchargeType.data
    }
  }

  static async getSurchargeTypeById(id: string): Promise<{
    surchargeType: SurchargeType
  }> {
    const surchargeType = await axios.get(this.pathBackend + "/surcharge-type/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeType: surchargeType.data
    }
  }

  static async getSurchargeTypeByIds(data: { ids: string[] }): Promise<{
    surchargeType: SurchargeType[]
  }> {
    const surchargeType = await axios.post(this.pathBackend + "/surcharge-type/ids", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      surchargeType: surchargeType.data
    }
  }
}
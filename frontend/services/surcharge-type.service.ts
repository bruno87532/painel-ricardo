import axios from "axios"

export class SurchargeTypeService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createSurchargeType(data: {
    name: string
  }) {
    const surchargeType = await axios.post(this.pathBackend + "/surcharge-type", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surchargeType.data
  }

  static async deleteSurchargeTypeById(id: string) {
    const surchargeType = await axios.delete(this.pathBackend + "/surcharge-type/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surchargeType.data
  }

  static async getSurchargeTypes() {
    const surchargeType = await axios.get(this.pathBackend + "/surcharge-type", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surchargeType.data
  } 

  static async updateSurchargeTypeById(id: string, data: {
    name: string
  }) {
    const surchargeType = await axios.put(this.pathBackend + "/surcharge-type/" + id, data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surchargeType.data
  }

  static async getSurchargeTypeById(id: string) {
    const surchargeType = await axios.get(this.pathBackend + "/surcharge-type/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return surchargeType.data
  }
}
import axios from "axios"
import type { Property } from "../types/property"

export class PropertyService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createProperty(data: {
    property: Property
  }) {
    const property = await axios.post(this.pathBackend + "/property/", {
      ...data
    },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
    )

    return {
      property: property.data
    }
  }

  static async getProperties(): Promise<{
    properties: Property[]
  }> {
    const properties = await axios.get(this.pathBackend + "/property/", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      properties: properties.data
    }
  }

  static async deletePropertyById(id: string): Promise<{
    property: Property
  }> {
    const property = await axios.delete(this.pathBackend + "/property/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      property: property.data
    }
  }

  static async updatePropertyById(id: string, data: {
    name?: string,
    canPet?: boolean,
    hasCoffee?: boolean,
    baseCapacity?: number,
  }): Promise<{
    property: Property
  }> {
    const property = await axios.patch(this.pathBackend + "/property/" + id, {
      ...data
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      property: property.data
    }
  }

  static async getPropertyById(id: string): Promise<{
    property: Property
  }> {
    const property = await axios.get(this.pathBackend + "/property/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      property: property.data
    }
  }

  static async getPropertiesByIds(data: { ids: string[] }): Promise<{
    properties: Property[]
  }> {
    const properties = await axios.post(this.pathBackend + "/property/ids", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      properties: properties.data
    }
  }
}
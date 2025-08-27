import axios from "axios"
import type { Detail } from "../types/detail"

export class DetailService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createDetail(data: {
    description: string,
    propertyId: string
  }): Promise<{ detail: Detail }> {
    const detail = await axios.post(this.pathBackend + "/detail", data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      detail: detail.data
    }
  }

  static async getDetailById(id: string): Promise<{
    detail: Detail
  }> {
    const detail = await axios.get(this.pathBackend + "/detail/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      detail: detail.data
    }
  }

  static async getDetails(page?: number): Promise<{
    details: Detail[],
    hasNext: boolean,
    lastPage: number,
    quantity: number,
  }> {
    const details = await axios.get(this.pathBackend + `/detail/${page ? `?page=${page}` : ""}`, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      details: details.data.details,
      hasNext: details.data.hasNext,
      lastPage: details.data.lastPage,
      quantity: details.data.quantity
    }
  }

  static async deleteDetailById(id: string): Promise<{ detail: Detail }> {
    const detail = await axios.delete(this.pathBackend + "/detail/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      detail: detail.data
    }
  }

  static async updateDetailById(id: string, data: {
    description: string,
    propertyId: string
  }): Promise<{ detail: Detail }> {
    const detail = await axios.put(this.pathBackend + "/detail/" + id, data, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return { detail: detail.data }
  }
}
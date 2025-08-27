import axios from "axios"
import { ImageWithoutId, Image, ImageReturn } from "../types/image"

export class ImageService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async createImage(data: ImageWithoutId): Promise<{
    image: ImageReturn
  }> {
    const formData = this.buildProductFormData(data)
    const res = await axios.post(this.pathBackend + "/image", formData, {
      withCredentials: true
    })

    return {
      image: res.data
    }
  }

  static async updateImageById(data: ImageWithoutId, id: string): Promise<{
    image: ImageReturn
  }> {
    const formData = this.buildProductFormData(data)
    const res = await axios.put(this.pathBackend + "/image/" + id, formData, {
      withCredentials: true
    })

    return {
      image: res.data
    }
  }

  static async getImages(page: number): Promise<{
    images: ImageReturn[],
    hasNext: boolean,
    lastPage: number,
    quantity: number,
  }> {
    const images = await axios.get(this.pathBackend + "/image/?page=" + page, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })
    return {
      images: images.data.images,
      hasNext: images.data.hasNext,
      lastPage: images.data.lastPage,
      quantity: images.data.quantity,
    }
  }

  static async getImageById(id: string): Promise<{
    image: ImageReturn
  }> {
    const image = await axios.get(this.pathBackend + "/image/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      image: image.data
    }
  }

  static async deleteImageById(id: string): Promise<{
    image: ImageReturn
  }> {
    const image = await axios.delete(this.pathBackend + "/image/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      image: image.data
    }
  }

  private static buildProductFormData(data: ImageWithoutId | Image) {
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("description", data.description);
    formData.append("propertyId", data.propertyId);

    if ("id" in data && data.id) {
      formData.append("id", data.id);
    }

    return formData;
  }
}
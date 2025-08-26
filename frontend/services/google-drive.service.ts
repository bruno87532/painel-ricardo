import axios from "axios"
import { convertBase64ToBlob } from "../common/functions/convert-base-64-to-blob"

export class GoogleDriveService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND

  static async getImageFromGoogleDrive(id: string): Promise<File> {
    const image = await axios.get(this.pathBackend + "/google-drive/" + id, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    const { buffer, fileName, mimeType } = await image.data
    const blob = convertBase64ToBlob(buffer, mimeType)

    const file = new File([blob], fileName, { type: mimeType })
    return file
  }
}
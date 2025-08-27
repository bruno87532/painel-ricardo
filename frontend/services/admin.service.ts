import axios from "axios"

export class AdminService {
  private static pathBackend = process.env.NEXT_PUBLIC_BACKEND 

  static async getAdminById(): Promise<{
    admin: {
      email: string;
      name: string;
    }
  }> {
    const admin = await axios.get(this.pathBackend + "/admin/me", {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    })

    return {
      admin: admin.data
    }
  }
}
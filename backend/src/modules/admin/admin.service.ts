import { Injectable, NotFoundException, HttpException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) { }

  async getAdminByEmail(email: string) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: { email }
      })

      if (!admin) throw new NotFoundException("Admin not found")

      return admin
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching admin by email", error)
      throw new InternalServerErrorException("An error ocurred while fetching admin")
    }
  }

  async getAdminById(id: string) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: { id }
      })

      if (!admin) throw new NotFoundException("Admin not found")

      return admin
    } catch (error) {
      if (error instanceof HttpException) throw error
      console.error("An error ocurred while fetching admin with id", id, error)
      throw new InternalServerErrorException("An error ocurred while fetching admin with id")
    }
  }
}

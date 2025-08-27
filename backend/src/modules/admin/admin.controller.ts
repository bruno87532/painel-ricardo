import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AuthGuard } from "@nestjs/passport";
import { plainToInstance } from "class-transformer";
import { AdminResponseDto } from "./dto/admin-response.dto";

@Controller("admin")
export class AdminController {
  constructor (private readonly adminService: AdminService) { }

  @UseGuards(AuthGuard("jwt"))
  @Get("/me")
  async getAdminById(@Request() req) {
    return plainToInstance(AdminResponseDto, await this.adminService.getAdminById(req.user.id))
  }
}
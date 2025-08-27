import { Controller, HttpCode, Post, UseGuards, Request, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  @Post("/login")
  async loginUser(@Request() req: Request & { user: { id: string } }, @Res({ passthrough: true }) res: Response) {
    return await this.authService.login(req, res)
  }

  @Get("/logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res)
  }
}

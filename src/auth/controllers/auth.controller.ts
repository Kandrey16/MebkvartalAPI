import { Controller, Get, Param, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res() res: Response) {
    await this.authService.activate(link);
    return res.redirect(process.env.CLIENT_URL ?? '/');
  }
}

import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpInput } from '../dto/signUp.input';
import type { Response, Request } from 'express';
import { Public } from '../decopators/public.decorator';
import { extractDeviceInfo } from '../guards/extractDeviceInfo';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly refreshTokenCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  } as const;

  @Public()
  @Post('signUp')
  async singUp(
    @Body() input: SignUpInput,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const deviceInfo = extractDeviceInfo(req);
    const userData = await this.authService.registration(input, deviceInfo);

    res.cookie(
      'refreshToken',
      userData.refreshToken,
      this.refreshTokenCookieOptions,
    );
    return res.json(userData);
  }

  @Public()
  @Post('signIn')
  async signIn(
    @Body() input: SignUpInput,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const deviceInfo = extractDeviceInfo(req);
    const userData = await this.authService.login(input, deviceInfo);

    res.cookie(
      'refreshToken',
      userData.refreshToken,
      this.refreshTokenCookieOptions,
    );
    return res.json(userData);
  }

  @Public()
  @Get('activate/:link')
  async activate(@Param('link') link: string, @Res() res: Response) {
    await this.authService.activate(link);
    return res.redirect(process.env.MAIL_URL ?? '/');
  }

  @Public()
  async refresh(@Res() res: Response, @Req() req: Request) {
    const refreshToken = req.cookies?.refreshToken;
    const deviceInfo = extractDeviceInfo(req);

    if (typeof refreshToken === 'string') {
      const userData = await this.authService.refresh(refreshToken, deviceInfo);
      res.cookie('refreshToken', refreshToken, this.refreshTokenCookieOptions);
      return res.json(userData);
    }
  }

  @Public()
  @Post('logOut')
  async logOut(@Res({ passthrough: true }) res: Response, @Req() req: Request) {
    const refreshToken = req.cookies?.refreshToken;
    if (typeof refreshToken === 'string') {
      await this.authService.logOut(refreshToken);
    }
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logged out successfully' });
  }
}

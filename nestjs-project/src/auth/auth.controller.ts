import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async verify(@Body('username') username: string) {
    return await this.authService.createToken(username);
  }
}

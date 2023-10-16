// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(username: any) {
    if (!username) {
      throw new UnauthorizedException('Username is required.');
    }
    const payload = { username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  
}

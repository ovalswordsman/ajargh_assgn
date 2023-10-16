// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global : true,
      secret: "fdidhg8hgfbjbugh",
      signOptions: { expiresIn: '1h' }, // expiration time for the token.
    }),
  ],
  controllers : [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

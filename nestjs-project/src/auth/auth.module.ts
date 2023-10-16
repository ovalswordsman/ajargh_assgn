import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    // Import the JwtModule to handle JWT token creation and validation.
    JwtModule.register({
      global: true, // Make the JwtModule available globally.
      secret: process.env.SECRET_KEY, // Secret key for JWT token encryption (replace with a more secure secret).
      signOptions: { expiresIn: '1h' }, // Set the token expiration time to 1 hour.
    }),
  ],
  controllers: [AuthController], // Declare the AuthController for handling authentication routes.
  providers: [AuthService], // Provide the AuthService for dependency injection.
  exports: [AuthService], // Export the AuthService to make it available to other modules.
})
export class AuthModule {}

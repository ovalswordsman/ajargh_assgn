import { Body, Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Define a route that verifies a user by username and creates a token.
  @Get()
  async verify(@Body('username') username: string) {
    try {
      // Call the AuthService to create a token for the provided username.
      const token = await this.authService.createToken(username);
      return token;
    } catch (error) {
      // Handle unauthorized access or any potential errors.
      throw new UnauthorizedException('Unauthorized');
    }
  }
}

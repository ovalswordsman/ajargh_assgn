import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // This method is called to determine whether the request is authorized.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // If there is no token in the request header, throw an UnauthorizedException.
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      // Verify the JWT token and extract the payload.
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY, // Replace with the actual secret key.
      });

      //  We're assigning the payload to the request object here
      // so that we can access it in our route handlers.
      request['user'] = payload;
    } catch {
      // If token verification fails, throw an UnauthorizedException.
      throw new UnauthorizedException();
    }

    return true;
  }
  // For extracting token from the header
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

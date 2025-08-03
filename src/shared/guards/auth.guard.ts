import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const requestId = request['requestId'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn(`No valid Bearer token provided for request ${requestId}`);
      throw new UnauthorizedException('No valid Bearer token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (!payload || !payload.id || !payload.role) {
        this.logger.warn(`Invalid token payload for request ${requestId}`);
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = {
        id: payload.id,
        role: payload.role,
        teamId: payload.teamId,
      };
      this.logger.log(`User authenticated: ${payload.id} for request ${requestId}`);
      return true;
    } catch (error) {
      this.logger.error(`Token verification failed for request ${requestId}: ${error.message}`, error.stack);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
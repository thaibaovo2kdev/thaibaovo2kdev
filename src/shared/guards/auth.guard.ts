import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private logger: LoggerService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      this.logger.warn(`No token provided for request ${request['requestId']}`);
      throw new UnauthorizedException('No token provided');
    }
    // Mock JWT verification
    request.user = { id: 1, role: 'user', teamId: 1 }; // Replace with actual JWT logic
    this.logger.log(`User authenticated: ${request.user.id}`);
    return true;
  }
}
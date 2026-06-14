import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator.js';
import { ClerkAuthService } from './clerk-auth.service.js';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  private reflector: Reflector;

  constructor(
    reflector: Reflector,
    private readonly clerkAuthService: ClerkAuthService,
  ) {
    this.reflector = reflector;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!this.reflector) {
      return true;
    }

    var isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    var request = context.switchToHttp().getRequest();
    var authHeader = request.headers.authorization as string | undefined;
    var token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }

    request.user = await this.clerkAuthService.verifyBearerToken(token);
    return true;
  }
}

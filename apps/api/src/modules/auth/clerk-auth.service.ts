import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '@clerk/backend';
import { getEnv } from '@soccerx/config';

@Injectable()
export class ClerkAuthService {
  private readonly env = getEnv();

  async verifyBearerToken(token: string) {
    try {
      const verified: any = await verifyToken(token, {
        secretKey: this.env.CLERK_SECRET_KEY,
        jwtKey: this.env.CLERK_JWT_KEY,
        authorizedParties: this.env.CLERK_AUTHORIZED_PARTIES.split(',').map((x) => x.trim()),
      });

      const payload = verified?.payload ?? verified;

      return {
        clerkUserId: payload?.sub,
        sessionId: payload?.sid,
        claims: payload,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid Clerk token');
    }
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Request } from 'express';

export interface DecodedFirebaseUser {
  uid: string;
  email?: string;
  [key: string]: any;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedFirebaseUser;
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    // 1. Secure administrative bypass for local scripts (e.g. makeAdmin.cjs)
    if (authHeader.startsWith('ApiKey ')) {
      const apiKey = authHeader.split('ApiKey ')[1];
      const systemSecret =
        process.env.JWT_SECRET || 'blinklean_fallback_secret_123';

      if (apiKey === systemSecret) {
        const body = request.body as Record<string, any>;
        request.user = {
          uid: (body.firebase_uid as string) || '',
          email: (body.email as string) || '',
        };
        return true;
      }
      throw new UnauthorizedException('Invalid administrative API Key');
    }

    // 2. Standard Google/Firebase ID Token verification for clients
    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization header type');
    }

    const token = authHeader.split('Bearer ')[1];

    try {
      const decodedToken = await this.firebaseService.auth.verifyIdToken(token);
      request.user = decodedToken as DecodedFirebaseUser;
      return true;
    } catch (error: any) {
      const msg = error instanceof Error ? error.message : String(error);
      throw new UnauthorizedException(
        `Firebase token verification failed: ${msg}`,
      );
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserRole } from './users.entity';
import { AuthGuard } from '@nestjs/passport';
import * as express from 'express';
import {
  FirebaseAuthGuard,
  AuthenticatedRequest,
} from '../auth/firebase-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** POST /users/upsert — Store/Update user data securely verifying Google/Firebase token */
  @Post('upsert')
  @UseGuards(FirebaseAuthGuard)
  upsert(@Req() req: express.Request, @Body() userData: Partial<User>) {
    const authReq = req as AuthenticatedRequest;
    const firebaseUser = authReq.user; // Securely verified by FirebaseAuthGuard

    if (!firebaseUser) {
      throw new UnauthorizedException(
        'Missing authenticated Firebase user info',
      );
    }

    // Override user inputs to prevent forgery/hijacking
    userData.firebase_uid = firebaseUser.uid;
    userData.email = firebaseUser.email || userData.email;

    // Server-side strict privilege check
    const isAdminEmail =
      userData.email === 'sunilmaharaj1991@gmail.com' ||
      userData.email === 'jeevithgowdasr@gmail.com' ||
      userData.email === 'sushmitha157@gmail.com';
    userData.role = isAdminEmail ? UserRole.ADMIN : UserRole.USER;

    return this.usersService.upsertUser(userData);
  }

  /** GET /users/all — Admin: list all registered users (Guarded with JWT) */
  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.usersService.findAll();
  }

  /** GET /users/:uid — Get single user details (Guarded with JWT) */
  @Get(':uid')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('uid') uid: string) {
    return this.usersService.findByUid(uid);
  }
}

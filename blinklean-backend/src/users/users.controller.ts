import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** POST /users/upsert — Store/Update user data in PostgreSQL */
  @Post('upsert')
  upsert(@Body() userData: Partial<User>) {
    return this.usersService.upsertUser(userData);
  }

  /** GET /users/all — Admin: list all registered users */
  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  /** GET /users/:uid — Get single user details */
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.usersService.findByUid(uid);
  }
}

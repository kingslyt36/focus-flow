import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { DatabaseService } from '../database/database.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategies';

@Module({
  providers: [AuthResolver, AuthService, UsersService, JwtService, JwtStrategy, JwtRefreshStrategy, DatabaseService],
})
export class AuthModule {}

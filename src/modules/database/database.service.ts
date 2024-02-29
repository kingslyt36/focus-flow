import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor(private config: ConfigService) {
    super();
    this.$connect();
  }

  cleanDatabase() {
    if (this.config.get<string>('NODE_ENV') === 'development') {
      return this.$transaction([this.user.deleteMany()]);
    } else {
      throw new ForbiddenException('Clean database is not allowed in this environment');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserInputDto } from './dto';
import { hashData } from '../../utils/helpers';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserInput: CreateUserInputDto): Promise<User> {
    try {
      // Create hashed password for extra security
      const hashedPassword = await hashData(createUserInput.password);

      const user = await this.db.user.create({
        data: {
          username: createUserInput.username,
          email: createUserInput.email,
          password: hashedPassword,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

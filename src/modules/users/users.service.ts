import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { ChangePasswordInputDto, CreateUserInputDto } from './dto';
import { compareHashed, hashData } from '../../utils/helpers';
import { DatabaseService } from '../database/database.service';
import { CustomErrorMessage } from 'src/utils/const/errors/error-message';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserInput: CreateUserInputDto): Promise<User> {
    try {
      const hashedPassword = await hashData(createUserInput.password);

      // ACTION REQUIRED: Implement transaction handling in this function to ensure
      // atomicity when creating a user and associated data (e.g., profile, settings).
      // Consider using Prisma's $transaction method for this.
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

  async changePassword(userId: string, password: ChangePasswordInputDto): Promise<boolean> {
    try {
      return this.db.$transaction(async (prisma) => {
        const user = await this.db.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (!user) {
          throw new HttpException(CustomErrorMessage.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const validPassword = await compareHashed(password.oldPassword, user.password);
        if (!validPassword) {
          throw new HttpException(CustomErrorMessage.OLD_PASSWORD_MISMATCH, HttpStatus.BAD_REQUEST);
        }

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: await hashData(password.newPassword),
          },
        });

        return true;
      });
    } catch (error) {
      throw error;
    }
  }

  async findOneUserById(id: string): Promise<User> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneUserByEmail(email: string): Promise<User> {
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

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { compareHashed } from '../../utils/helpers';
import { UsersService } from '../users/users.service';
import { DatabaseService } from '../database/database.service';
import { AuthPayloadDto, LoginInputDto, RegisterInputDto, UserPayloadDto } from './dto';
import { CustomErrorMessage } from '../../utils/const/errors/error-message';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService,
  ) {}

  async login(loginInput: LoginInputDto): Promise<AuthPayloadDto> {
    try {
      // Find user by email
      const user = await this.userService.findOneUserByEmail(loginInput.email);
      if (!user || !(await compareHashed(loginInput.password, user.password))) {
        throw new UnauthorizedException('Invalid email or password');
      }
      delete user.password;

      // Generate access token and refresh token for user
      const [accessToken, refreshToken] = await this.generateToken(user);
      // Save the refresh token in to database
      await this.updateRefreshTokenHash(user.id, accessToken, refreshToken);

      // Return the user payload with access token
      return { user };
    } catch (error) {
      throw error;
    }
  }

  async register(registerInput: RegisterInputDto): Promise<AuthPayloadDto> {
    try {
      // Save the new user to database
      const user = await this.userService.create({
        email: registerInput.email,
        username: registerInput.username,
        password: registerInput.password,
      });
      delete user.password;

      // Generate access token and refresh token for user
      const [accessToken, refreshToken] = await this.generateToken(user);
      // Save the refresh token in to database
      await this.updateRefreshTokenHash(user.id, accessToken, refreshToken);

      // Return the user payload with access token
      return { user };
    } catch (error) {
      // TODO: Specify which field is already taken
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(CustomErrorMessage.CREDENTIAL_TAKEN);
        }
      }

      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(userId: string): Promise<void> {
    try {
      await this.db.user.update({
        where: {
          id: userId,
        },
        data: {
          accessToken: null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  private async generateToken(userPayload: UserPayloadDto) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userPayload.id,
          email: userPayload.email,
        },
        {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userPayload.id,
          email: userPayload.email,
        },
        {
          secret: this.config.get('REFRESH_SECRET'),
          expiresIn: '1w',
        },
      ),
    ]);

    return [accessToken, refreshToken];
  }

  private async updateRefreshTokenHash(userId: string, accessToken: string, refreshToken: string) {
    // Save it to the database
    await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
}

import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { UsersService } from './users.service';
import { ChangePasswordInputDto } from './dto';
import { ResponseMessage } from '../../utils/const/messages/response-message';
import { CurrentUser } from '../../utils/decorators/user-payload.decorator';
import { JwtAuthGuard } from '../auth/guards';

@Resolver()
export class UsersResolver {
  constructor(private readonly _userService: UsersService) {}

  @Mutation('changePassword')
  @UseGuards(JwtAuthGuard)
  async createUser(
    @CurrentUser() user: any,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInputDto,
  ): Promise<ResponseMessage> {
    await this._userService.changePassword(user.sub, changePasswordInput);

    return {
      status: HttpStatus.OK,
      message: 'Your password has been changed successfully.',
    };
  }

  @Query('findOneUserByEmail')
  async findOneUserByEmail(@Args('email') email: string): Promise<User> {
    return this._userService.findOneUserByEmail(email);
  }
}

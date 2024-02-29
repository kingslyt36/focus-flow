import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { HttpStatus, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginResponseDto, RegisterInputDto, RegisterResponseDto } from './dto';
import { JwtAuthGuard } from './guards';
import { CurrentUser } from '../../utils/decorators/user-payload.decorator';
import { ResponseMessage } from '../../utils/const/messages/response-message';

@Resolver('Auth')
export class AuthResolver {
  constructor(readonly _authService: AuthService) {}

  @Mutation('register')
  async register(@Args('registerInput') registerInput: RegisterInputDto): Promise<RegisterResponseDto> {
    const data = await this._authService.register(registerInput);
    const registerResponse = {
      status: HttpStatus.CREATED,
      message: 'Register successfully',
      data,
    };

    return registerResponse;
  }

  @Mutation('login')
  async login(@Args('loginInput') loginInput: RegisterInputDto): Promise<LoginResponseDto> {
    const data = await this._authService.login(loginInput);
    const loginResponse = {
      status: HttpStatus.OK,
      message: 'Login successfully',
      data,
    };

    return loginResponse;
  }

  @Mutation('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@CurrentUser() user: any): Promise<ResponseMessage> {
    await this._authService.logout(user.sub);
    return {
      status: HttpStatus.OK,
      message: 'User logout successfully',
    };
  }

  @Query('sayHello')
  async sayHello(): Promise<string> {
    return 'Hello World';
  }
}

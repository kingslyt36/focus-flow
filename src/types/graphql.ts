
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export class RegisterInput {
    username: string;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
}

export abstract class IQuery {
    abstract sayHello(): string | Promise<string>;
}

export abstract class IMutation {
    abstract register(registerInput: RegisterInput): RegisterResponse | Promise<RegisterResponse>;

    abstract login(loginInput: LoginInput): LoginResponse | Promise<LoginResponse>;

    abstract logout(): LogoutResponse | Promise<LogoutResponse>;

    abstract changePassword(changePasswordInput: ChangePasswordInput): ChangePasswordResponse | Promise<ChangePasswordResponse>;
}

export class AuthPayload {
    user: UserPayload;
}

export class UserPayload {
    id: string;
    username: string;
    email: string;
}

export class RegisterResponse {
    status: number;
    message: string;
    data: AuthPayload;
}

export class LoginResponse {
    status: number;
    message: string;
    data: AuthPayload;
}

export class LogoutResponse {
    status: number;
    message: string;
}

export class User {
    id: string;
    username: string;
    email: string;
    age?: Nullable<number>;
    gender?: Nullable<Gender>;
    password: string;
    accessToken: string;
    refreshToken: string;
}

export class ChangePasswordResponse {
    status: number;
    message: string;
}

export type DateTime = any;
type Nullable<T> = T | null;

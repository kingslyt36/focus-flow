import { ErrorCode } from './error-codes';

export const CustomErrorMessage = {
  [ErrorCode.REGISTRATION_FAILED]: 'Registration failed. Please try again.',
  [ErrorCode.CREDENTIAL_TAKEN]: 'The user credential is already taken.',
  [ErrorCode.OLD_PASSWORD_MISMATCH]: 'The old password you entered is incorrect. Please try again.',
  [ErrorCode.USER_NOT_FOUND]: 'The user you are trying to access does not exist.',
  // Add more error messages as needed
};

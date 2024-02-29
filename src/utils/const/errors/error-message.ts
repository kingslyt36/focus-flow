import { ErrorCode } from './error-codes';

export const CustomErrorMessage = {
  [ErrorCode.REGISTRATION_FAILED]: 'Registration failed. Please try again.',
  [ErrorCode.CREDENTIAL_TAKEN]: 'The user credential is already taken.',
  // Add more error messages as needed
};

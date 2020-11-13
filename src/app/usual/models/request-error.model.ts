export interface IRequestError {
  error:{ error: string };
  status: number;
}

export enum ErrorEnum {
  USER_NOT_FOUND = 'User not found!',
  INVALID_PASSWORD = 'Invalid password',
  TOKEN_INVALID = 'Token invalid',
  TOKEN_EXPIRED = 'Token expired. Generate a new one'
}

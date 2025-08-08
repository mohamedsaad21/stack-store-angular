export interface AuthModel {
  message: string;
  isAuthenticated: boolean,
  email: string;
  username: string;
  roles: string[],
  token: string;
  expiresOn: string;
  refreshTokenExpiration: string;
}

export interface UserResponse {
    email: string;
    tokens: {
        accessToken: string;
        refreshToken: string;
      };
  }
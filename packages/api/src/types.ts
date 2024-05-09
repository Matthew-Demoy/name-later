export interface User {
    username: string;
    password?: string;
    token?: string;
  }
  
  export interface JwtPayload {
    data: {
      username: string;
    };
    exp: number;
  }
  
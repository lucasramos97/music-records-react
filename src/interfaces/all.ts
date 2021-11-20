export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthenticable {
  token: string;
  username: string;
  email: string;
}

export interface IUser extends ILogin {
  username: string;
}

export interface IUser {
  email: string;
  name: string;
  role: string;
  code: string;
  avatar: string;
}

export interface ILogin {
  email: string;
  token: string;
}

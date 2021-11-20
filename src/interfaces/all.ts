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

export interface IMusic {
  id?: number;
  title: string;
  artist: string;
  release_date: string;
  duration: string;
  number_views?: number;
  feat?: boolean;
}

export interface IPagedMusics {
  content: IMusic[];
  total: number;
}

export interface ILazyParams {
  first: number;
  page: number;
  rows: number;
}

import axios, { AxiosResponse } from 'axios';

import { IAuthenticable, ILogin, IUser } from '../interfaces/all';

export default class UserService {
  private readonly URL = 'http://localhost:8080';

  public async login(login: ILogin): Promise<AxiosResponse<IAuthenticable>> {
    return axios.post<AxiosResponse<IAuthenticable>, any>(
      `${this.URL}/login`,
      login
    );
  }

  public async create(user: IUser): Promise<AxiosResponse<IUser>> {
    return axios.post<AxiosResponse<IUser>, any>(`${this.URL}/users`, user);
  }
}

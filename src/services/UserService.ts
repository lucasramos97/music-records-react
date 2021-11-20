import axios from 'axios';
import { IAuthenticable, ILogin, IUser } from '../interfaces/all';

export default class UserService {
  private readonly URL = 'http://localhost:8080';

  public async login(login: ILogin): Promise<IAuthenticable> {
    return axios.post<IAuthenticable, any>(`${this.URL}/login`, login);
  }

  public async create(user: IUser): Promise<IUser> {
    return axios.post<IUser, any>(`${this.URL}/users`, user);
  }
}

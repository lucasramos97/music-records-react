import axios from 'axios';
import { IAuthenticable, ILogin } from '../interfaces/all';

export default class UserService {
  private readonly URL = 'http://localhost:8080';

  public async login(login: ILogin): Promise<IAuthenticable> {
    return axios.post<IAuthenticable, any>(`${this.URL}/login`, login);
  }
}

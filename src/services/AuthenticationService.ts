import { IAuthenticable } from '../interfaces/all';

export default class AuthenticationService {
  private readonly TOKEN_KEY = 'token';
  private readonly USERNAME_KEY = 'username';
  private readonly EMAIL_KEY = 'email';

  public setUser(authenticable: IAuthenticable) {
    localStorage.setItem(this.TOKEN_KEY, authenticable.token);
    localStorage.setItem(this.USERNAME_KEY, authenticable.username);
    localStorage.setItem(this.EMAIL_KEY, authenticable.email);
  }

  public isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  public getEmail(): string | null {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.EMAIL_KEY);
  }
}

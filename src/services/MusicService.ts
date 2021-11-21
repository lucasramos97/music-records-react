import axios, { AxiosResponse } from 'axios';

import { IMusic, IPagedMusics } from '../interfaces/all';
import AuthenticationService from './AuthenticationService';

const authenticationService = new AuthenticationService();

export default class MusicService {
  private readonly URL = 'http://localhost:8080/musics';

  private readonly HTTP_OPTIONS = {
    headers: {
      Authorization: `Bearer ${authenticationService.getToken()}`,
    },
  };

  public getAll(page = 1, size = 5): Promise<AxiosResponse<IPagedMusics>> {
    return axios.get<AxiosResponse<IPagedMusics>, any>(
      `${this.URL}?page=${page}&size=${size}`,
      this.HTTP_OPTIONS
    );
  }

  public save(music: IMusic): Promise<AxiosResponse<IMusic>> {
    return axios.post<AxiosResponse<IMusic>, any>(
      this.URL,
      music,
      this.HTTP_OPTIONS
    );
  }

  public update(music: IMusic): Promise<AxiosResponse<IMusic>> {
    return axios.put<AxiosResponse<IMusic>, any>(
      `${this.URL}/${music.id}`,
      music,
      this.HTTP_OPTIONS
    );
  }
}

import { IMusic } from '../interfaces/all';

export default class MusicFactory {
  public static createDefaultMusic(): IMusic {
    return {
      title: '',
      artist: '',
      release_date: '',
      duration: '',
      feat: false,
    };
  }

  public static createSubmittedMusic(music: IMusic): IMusic {
    return {
      ...music,
      release_date: this.formatSubmittedReleaseDate(music.release_date),
      duration: this.formatSubmittedDuration(music.duration),
      number_views: this.formatSubmittedNumberViews(music.number_views),
    };
  }

  public static createEditMusic(music: IMusic): IMusic {
    return {
      ...music,
      release_date: this.formatEditReleaseDate(music.release_date),
      duration: this.formatEditDuration(music.duration),
    };
  }

  public static formatSubmittedReleaseDate(releaseDate: string): string {
    const splitReleaseDate = releaseDate.split('/');
    const day = splitReleaseDate[0];
    const month = splitReleaseDate[1];
    const year = splitReleaseDate[2];

    return `${year}-${month}-${day}`;
  }

  private static formatSubmittedDuration(duration: string): string {
    return `00:${duration}`;
  }

  private static formatSubmittedNumberViews(
    numberViews: number | undefined
  ): number {
    if (numberViews) {
      return numberViews;
    }

    return 0;
  }

  private static formatEditReleaseDate(releaseDate: string): string {
    const splitReleaseDate = releaseDate.split('-');
    const day = splitReleaseDate[2];
    const month = splitReleaseDate[1];
    const year = splitReleaseDate[0];

    return `${day}/${month}/${year}`;
  }

  private static formatEditDuration(duration: string): string {
    return duration.slice(3);
  }
}

import MusicFactory from './MusicFactory';

export default class DateUtils {
  public static createReleaseDate(releaseDate: string): Date {
    return new Date(
      `${MusicFactory.formatSubmittedReleaseDate(releaseDate)}T00:00:00`
    );
  }

  public static createDuration(duration: string): Date {
    return new Date(`2021-01-01T00:${duration}`);
  }
}

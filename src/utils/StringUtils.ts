export default class StringUtils {
  public static validEmail(email: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  public static displayReleaseDate(releaseDate: string): string {
    const splitReleaseDate = releaseDate.split('-');
    const day = splitReleaseDate[2];
    const month = splitReleaseDate[1];
    const year = splitReleaseDate[0];

    return `${day}/${month}/${year}`;
  }

  public static displayDuration(duration: string): string {
    return duration.slice(3);
  }
}

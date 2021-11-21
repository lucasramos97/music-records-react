export default class Messages {
  // User Messages
  public static readonly EMAIL_INVALID = 'E-mail invalid!';
  public static readonly USER_SUCCESSFULLY_CREATE = 'User successfully create!';

  // Music Messages
  public static readonly RELEASE_DATE_CANNOT_BE_FUTURE =
    'Release Date cannot be future!';
  public static readonly MUSIC_SUCCESSFULLY_ADDED = 'Music successfully added!';
  public static readonly MUSIC_SUCCESSFULLY_EDITED =
    'Music successfully edited!';
  public static readonly MUSIC_SUCCESSFULLY_DELETED =
    'Music successfully deleted!';
  public static readonly MUSIC_DEFINITELY_DELETED_SUCCESSFULLY =
    'Music definitely deleted successfully!';

  public static getInvalidDate(date: string): string {
    return `'${date}' is not a valid date!`;
  }

  public static getInvalidTime(time: string): string {
    return `'${time}' is not a valid time!`;
  }

  public static getRestoredMusicsSuccessfully(total: number): string {
    return `${total} musics successfully restored!`;
  }

  public static getEmptyListSuccessfully(total: number): string {
    return `${total} musics definitely deleted!`;
  }
}

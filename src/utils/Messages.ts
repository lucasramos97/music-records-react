export default class Messages {
  // User Messages
  public static readonly EMAIL_INVALID = 'E-mail invalid!';
  public static readonly USER_SUCCESSFULLY_CREATE = 'User successfully create!';

  // Music Messages
  public static readonly RELEASE_DATE_CANNOT_BE_FUTURE =
    'Release Date cannot be future!';
  public static readonly MUSIC_SUCCESSFULLY_ADDED = 'Music successfully added!';

  public static getInvalidDate(date: string): string {
    return `'${date}' is not a valid date!`;
  }

  public static getInvalidTime(time: string): string {
    return `'${time}' is not a valid time!`;
  }
}

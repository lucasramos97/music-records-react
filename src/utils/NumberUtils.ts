export default class NumberUtils {
  public static displayNumberViews(numberViews: number): string {
    return new Intl.NumberFormat().format(numberViews);
  }
}

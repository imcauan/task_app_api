export class DateHelper {
  public static now() {
    return new Date();
  }

  public static getNextMonth() {
    const today = this.now();

    return new Date(today.getFullYear(), today.getMonth() + 1, 1);
  }
}

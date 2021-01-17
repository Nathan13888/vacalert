export class Formatter {
  static formatDateTime(isoDateTime: string): string {
    if (isoDateTime) {
      const dt = new Date(isoDateTime);
      return dt.toLocaleString('en-CA').replace(/[,\.]/g, '');
    } else return '';
  }

  static formatDate(date: string): string {
    if (date) {
      return date;
    } else return '';
  }
}

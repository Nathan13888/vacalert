export class Formatter {
  static formatPercent(percent: number): string {
    if (percent) {
      const n = Math.round(percent * 100) / 100;
      return n.toString() + '%';
    } else return '';
  }

  static formatNumber(num: number) {
    if (num) return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    else return '';
  }

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

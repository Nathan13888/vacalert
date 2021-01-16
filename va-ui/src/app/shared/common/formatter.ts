export class Formatter {
  static formatPercent(percent: number): string {
    if (percent) {
      const n = Math.round(percent * 100) / 100;
      return n.toString() + '%';
    } else {
      return '';
    }
  }

  static formatNumber(num: number) {
    if (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return '';
    }
  }

  static formatPhone(str: string) {
    const digits = ('' + str).replace(/\D/g, '');
    let match = digits.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let countryCode = match[1] ? '1 ' : '';
      return [countryCode, '(', match[2], ') ', match[3], '-', match[4]].join(
        ''
      );
    }
    return '';
  }

  static formatDateTime(isoDateTime: string): string {
    if (isoDateTime) {
      const dt = new Date(isoDateTime);

      const d = dt.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const t = dt.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      return d + ' at ' + t;
    } else return '';
  }

  static formatDate(date: string): string {
    if (date) {
      return date;
    } else {
      return '';
    }
  }
}

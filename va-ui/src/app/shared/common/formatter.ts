export class Formatter {
  static formatPercent(percent: number): string {
    if (percent) {
      const n = Math.round(percent * 10000) / 100;
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

  static formatDateRange(startDate: string, endDate?: string): string {
    let from: string;
    let to: string;
    let fromDate = new Date(startDate);
    fromDate = new Date(
      fromDate.getUTCFullYear(),
      fromDate.getUTCMonth(),
      fromDate.getUTCDate()
    );

    let toDate = endDate ? new Date(endDate) : undefined;

    from = fromDate.toLocaleString('en', { month: 'long' });

    if (!toDate || fromDate.getFullYear() !== toDate.getFullYear()) {
      from += ' ' + fromDate.getFullYear();
    }
    if (toDate) {
      toDate = new Date(
        toDate.getUTCFullYear(),
        toDate.getUTCMonth(),
        toDate.getUTCDate()
      );
      to =
        toDate.toLocaleString('en', { month: 'long' }) +
        ' ' +
        toDate.getFullYear();
    }

    if (from && to) return 'between ' + from + ' and ' + to;
    else if (from) {
      return 'from ' + from;
    } else return '';
  }
}

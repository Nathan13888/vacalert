import { Person } from '@app/api';

export class Formatter {
  static formatFileSize(size: number) {
    if (size >= 1024 * 1024 * 1024) {
      const num = size / (1024 * 1024 * 1024);
      return Math.round(num * 100) / 100 + 'GB';
    }
    if (size >= 1024 * 1024) {
      return Math.round(size / (1024 * 1024)) + 'MB';
    }
    if (size >= 1024) {
      return Math.round(size / 1024) + 'KB';
    }
    return size > 0 ? '1' : '0' + 'KB';
  }

  static formatTime(timeInSeconds: number, showMillis: boolean = true): string {
    let millis: string;
    if (showMillis) {
      const totalSeconds = Math.floor(timeInSeconds);
      millis = (timeInSeconds - totalSeconds).toFixed(3);
      millis = '.' + millis.substring(millis.lastIndexOf('.') + 1);
      timeInSeconds = totalSeconds;
    } else {
      timeInSeconds = Math.floor(timeInSeconds);
      millis = '';
    }
    const hours = Math.floor(timeInSeconds / 60 / 60);
    const minutes = Math.floor(timeInSeconds / 60) - hours * 60;
    const seconds = timeInSeconds % 60;
    if (hours > 0) {
      return (
        hours +
        ':' +
        minutes.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0') +
        millis
      );
    } else {
      return minutes + ':' + seconds.toString().padStart(2, '0') + millis;
    }
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

  static formatDimension(width: number, height: number): string {
    if (width && height) {
      return width + ' x ' + height;
    } else return '';
  }

  static formatMeasurements(person: Person) {
    if (person.bust || person.cup || person.waist || person.hip)
      return (
        (person.bust ?? '') +
        (person.cup ?? '') +
        '-' +
        (person.waist ?? '') +
        '-' +
        (person.hip ?? '')
      );
    return '';
  }

  static formatHeight(h: number) {
    if (h != null) {
      const ft = Math.floor(h / 12);
      const ic = h % 12;
      let s = ft + "'";
      if (ic > 0) {
        s += ' ' + ic + '"';
      }
      return s;
    }
    return '';
  }

  static formatWeight(w: number) {
    if (w) {
      return w + ' lbs';
    }
    return '';
  }

  static getAge(birthdate: string): number {
    const dob = new Date(birthdate);
    var diffInMs = Date.now() - dob.getTime();
    var age = new Date(diffInMs);
    return Math.abs(age.getUTCFullYear() - 1970);
  }

  static formatYearsActive(person: Person) {
    return person.activeFrom || person.activeTo
      ? (person.activeFrom ?? '') + ' - ' + (person.activeTo ?? '')
      : '';
  }

  static formatBMI(person: Person) {
    let refinedBmiStatus = '';
    if (person.weight && person.height) {
      const bmiValue = (person.weight / Math.pow(person.height, 2)) * 703;
      const bmi = bmiValue.toFixed(2);
      const bmiStatus = this.getBMIStatus(bmiValue);
      refinedBmiStatus = bmi + ' - ' + this.getRefinedStatus(bmiValue);
    }
    return refinedBmiStatus;
  }

  private static getBMIStatus(bmi: number) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }

  private static getRefinedStatus(bmi: number) {
    if (bmi < 18.5) {
      return 'Underweight (BMI: below 18.5)';
    } else if (bmi < 25) {
      return 'Normal (BMI: 18.5 - 24.9)';
    } else if (bmi < 30) {
      return 'Overweight (BMI: 25 - 29.9)';
    } else {
      return 'Obese (BMI: 30 or higher)';
    }
  }
}

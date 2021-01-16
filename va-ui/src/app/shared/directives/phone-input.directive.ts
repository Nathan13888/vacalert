import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appPhoneInput]',
})
export class PhoneInputDirective {
  constructor(public ngControl: NgControl) {}

  onInputChange(value: string, backspace: boolean) {
    let val = value.replace(/\D/g, '');
    if (backspace && val.length <= 6) {
      val = val.substring(0, val.length - 1);
    }
    if (val.length === 0) {
      val = '';
    } else if (val.length <= 3) {
      val = val.replace(/^(\d{0,3})/, '($1)');
    } else if (val.length <= 6) {
      val = val.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (val.length <= 10) {
      val = val.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    } else {
      val = val.substring(0, 10);
      val = val.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
    }
    this.ngControl.valueAccessor.writeValue(val);
  }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(value: string) {
    this.onInputChange(value, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  onBackspace(event: any) {
    this.onInputChange(event.target.value, true);
  }
}

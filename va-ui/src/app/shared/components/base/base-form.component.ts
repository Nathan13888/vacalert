import { Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component';

@Directive()
export abstract class BaseFormComponent extends BaseComponent {
  form: FormGroup;

  submitting = false;

  constructor() {
    super();
  }

  ngOnInit() {}

  hasError(fieldName: string, validationType: string) {
    const control = fieldName ? this.form.get(fieldName) : this.form;
    return (
      control.hasError(validationType) && (control.dirty || control.touched)
    );
  }

  isDirty() {
    return this.form.dirty;
  }

  flush() {
    this.form.reset(this.form.value);
  }

  trim(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const field = formGroup.get(key);
      if (typeof field.value === 'string') {
        const value = field.value.trim();
        if (value !== field.value) field.setValue(value);
      }
    });
  }
}

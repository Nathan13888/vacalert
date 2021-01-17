import {
  StepperSelectionEvent,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseFormComponent } from '@app/shared/components/base/base-form.component';

@Component({
  selector: 'app-questionaire',
  templateUrl: './questionaire.component.html',
  styleUrls: ['./questionaire.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class QuestionaireComponent extends BaseFormComponent {
  result = false;

  @ViewChild('input') input: ElementRef;

  constructor(protected fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      age: this.fb.control(null),
      homeCare: this.fb.control(false),
      pregnant: this.fb.control(false),
      healthcare: this.fb.control(false),
      indigenous: this.fb.control(false),
      group: this.fb.control(false),
      essnetial: this.fb.control(false),
    });
  }

  onSelectionChange(event: StepperSelectionEvent) {
    console.log('event :>> ', event);
    if (event.selectedIndex === 1) {
      setTimeout(() => this.input.nativeElement.focus(), 200);
    }
  }
}

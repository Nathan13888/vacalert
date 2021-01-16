import {
  StepperSelectionEvent,
  STEPPER_GLOBAL_OPTIONS,
} from '@angular/cdk/stepper';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { UserProfile } from '@app/api/model/userProfile';
import { AppStateService } from '@app/core/services/app-state.service';
import { BaseFormComponent } from '@app/shared/components/base/base-form.component';

interface CloseQuestion {
  text: string;
  control: AbstractControl;
  image?: string;
}

function isUnderage(value: string) {
  const age = +value;
  if (!isNaN(age)) {
    return age < 16;
  }
  return false;
}

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
  userProfile: UserProfile;

  closedQuestions: CloseQuestion[];

  ageControl: AbstractControl;

  phase: string;

  @Output()
  completed = new EventEmitter<UserProfile>();

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatStepper) stepper: MatHorizontalStepper;

  constructor(
    protected fb: FormBuilder,
    private appStateService: AppStateService
  ) {
    super();
    this.userProfile = this.appStateService.userProfile;
  }

  ngOnInit(): void {
    const f = (this.form = this.fb.group({
      province: this.fb.control('', Validators.required),
      age: this.fb.control(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(130),
        // ageValidator,
      ]),
      homeCare: this.fb.control(false),
      healthCare: this.fb.control(false),
      indigenous: this.fb.control(false),
      congregated: this.fb.control(false),
      essential: this.fb.control(false),
      pregnant: this.fb.control(false),
    }));

    this.ageControl = this.form.controls.age;

    if (this.userProfile) {
      this.form.patchValue(this.userProfile);
    }

    const cq: CloseQuestion[] = (this.closedQuestions = []);
    cq.push({
      text: 'Are you a Senior Home resident or staff?',
      control: f.controls.homeCare,
    });
    cq.push({
      text: 'Are you a health care worker?',
      control: f.controls.healthCare,
      image: 'health.png',
    });
    cq.push({
      text: 'Are you an adult in Indigenous communities?',
      control: f.controls.indigenous,
    });
    cq.push({
      text:
        'Are you a resident or staff of a shared living setting,' +
        ' such as homeless shelters, correctional facilities and housing for migrant worker?',
      control: f.controls.congregated,
    });
    cq.push({
      text:
        'Are you an essential worker who faces additional risks' +
        ' to perform services for the functionality of society?',
      control: f.controls.essential,
    });
  }

  goForward(stepper: MatStepper) {
    const steps = stepper.steps.toArray();
    let step = steps[stepper.selectedIndex];
    if (step.stepControl === this.ageControl) {
      if (isUnderage(this.ageControl.value)) {
        this.ageControl.setErrors({ underage: true });
        return;
      }
    }
    stepper.next();
    step = steps[stepper.selectedIndex];

    if (step.completed) {
      this.phase = '2';
      const userProfile = Object.assign({}, this.form.value);
      this.userProfile = userProfile;
      if (this.completed) {
        this.completed.emit(userProfile);
      }
    }
  }

  onSelectionChange(event: StepperSelectionEvent) {
    if (event.selectedStep.stepControl === this.form.controls.age) {
      setTimeout(() => this.input.nativeElement.focus(), 200);
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.appStateService.userProfile = this.userProfile;
  }
}

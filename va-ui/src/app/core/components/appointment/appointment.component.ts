import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationControllerService } from '@app/api';
import { AppStateService } from '@app/core/services/app-state.service';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { Formatter } from '@app/shared/common/formatter';
import { BaseFormComponent } from '@app/shared/components/base/base-form.component';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent extends BaseFormComponent {
  formatter = Formatter;

  @ViewChild('locationInput') locationInput: ElementRef;

  datetimeField: FormControl;
  doseField: FormControl;

  customLocField: FormControl;

  locId: string;
  loc: Location;
  submitted = false;

  minDate: Date;
  maxDate: Date;

  @ViewChild('timeInput') timeInput: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toolbarService: NavToolbarService,
    private locationControllerService: LocationControllerService,
    private appStateService: AppStateService,
    private navigationService: NavigationService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableAppointment = false;

    this.minDate = new Date(2021, 1, 1, 0, 0, 0, 0);
    this.maxDate = new Date(2022, 12, 31, 0, 0, 0, 0);

    this.form = this.fb.group({
      time: (this.datetimeField = new FormControl('', Validators.required)),
      customLocation: (this.customLocField = new FormControl('')),
      dose: (this.doseField = new FormControl(1)),
    });

    const a = this.appStateService.appointment;
    if (a) {
      this.datetimeField.setValue(a.time);
      this.locId = a.locationId;
      this.customLocField.setValue(a.customLocation ?? '');
      this.doseField.setValue(a.dose ?? 1);
      this.submitted = a.submitted;
    }

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const locId = params.get('loc');
          this.locId = locId;
          if (locId) {
            return this.locationControllerService.locationControllerFindById(
              locId
            );
          } else return of(undefined);
        }),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((loc: Location | undefined) => {
        this.loc = loc;
      });
  }

  onEnterLocation() {
    this.locId = undefined;
    this.submitted = false;
    setTimeout(() => {
      if (this.locationInput) {
        this.locationInput.nativeElement.focus();
      }
    }, 200);
  }

  onPickLocation() {
    this.navigationService.navigate('/locator');
  }

  onEdit() {
    this.submitted = false;
  }

  onSubmit() {
    this.submitted = true;
  }

  onCompletion(dose: number) {
    if (dose == 1) {
      this.datetimeField.setValue('');
      this.doseField.setValue(2);
      this.submitted = false;
      setTimeout(() => {
        if (this.timeInput) this.timeInput.nativeElement.focus();
      }, 200);
    } else if (dose === 2) {
      this.navigationService.navigate('/finale', { done: 'Y' });
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.appStateService.appointment = {
      time: this.datetimeField.value,
      locationId: this.locId,
      customLocation: this.customLocField.value,
      dose: this.doseField.value,
      submitted: this.submitted,
    };
  }
}

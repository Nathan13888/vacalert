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
  minDate: Date;
  maxDate: Date;

  customLocField: FormControl;

  locId: string;
  loc: Location;
  submitted = false;

  // get appointmentTime() {
  //   return this.appStateService.appointment.time;
  // }

  // set appointmentTime(time: string) {
  //   this.appStateService.appointment.time = time;
  // }

  // get appointment() {
  //   return this.appStateService.appointment;
  // }

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

    this.datetimeField = new FormControl('', Validators.required);
    this.minDate = new Date(2021, 1, 1, 0, 0, 0, 0);
    this.maxDate = new Date(2022, 12, 31, 0, 0, 0, 0);
    this.customLocField = new FormControl('');

    this.form = this.fb.group({
      time: this.datetimeField,
      customLocation: this.customLocField,
    });

    const a = this.appStateService.appointment;
    if (a) {
      this.datetimeField.setValue(a.time);
      this.locId = a.locationId;
      this.customLocField.setValue(a.customLocation ?? '');
      this.submitted = a.submitted;
    }
    console.log('object :>> ', this.appStateService.appointment);

    //this.appointmentTime = '2021-02-15T10:00:00';

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

    // this.datetimeField.valueChanges
    //   .pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((value: _moment.Moment) => {
    //     if (value) {
    //       console.log('value :>> ', value.toDate());
    //       this.appointmentTime = value.toDate().toISOString();
    //     } else {
    //       this.appointmentTime = undefined;
    //     }
    //   });
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
  ngOnDestroy() {
    super.ngOnDestroy();
    this.appStateService.appointment = {
      time: this.datetimeField.value,
      locationId: this.locId,
      customLocation: this.customLocField.value,
      submitted: this.submitted,
    };
    console.log('object :>> ', this.appStateService.appointment);
  }
}

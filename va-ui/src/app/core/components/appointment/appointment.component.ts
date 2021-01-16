import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationControllerService } from '@app/api';
import { AppStateService } from '@app/core/services/app-state.service';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { Formatter } from '@app/shared/common/formatter';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { of } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent extends BaseComponent {
  loc: Location;

  formatter = Formatter;

  @ViewChild('locationInput') locationInput: ElementRef;

  get appointmentTime() {
    return this.appStateService.appointment.time;
  }

  set appointmentTime(time: string) {
    this.appStateService.appointment.time = time;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private toolbarService: NavToolbarService,
    private locationControllerService: LocationControllerService,
    private appStateService: AppStateService,
    private navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableAppointment = false;

    //this.appointmentTime = '2021-02-15T10:00:00';

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) => {
          const locId = params.get('loc');
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
    this.loc = undefined;
    setTimeout(() => {
      if (this.locationInput) {
        this.locationInput.nativeElement.focus();
      }
    }, 200);
  }

  onPickLocation() {
    this.navigationService.navigate('/locator');
  }
}

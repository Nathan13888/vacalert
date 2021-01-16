import { Component } from '@angular/core';
import { Location, LocationControllerService } from '@app/api';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { Formatter } from '@app/shared/common/formatter';
import { GeoUtils } from '@app/shared/common/geo-utils';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent extends BaseComponent {
  appointmentTime: string;
  loc: Location;

  formatter = Formatter;

  constructor(
    private toolbarService: NavToolbarService,
    private locationControllerService: LocationControllerService
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableAppointment = false;

    this.appointmentTime = '2021-02-15T10:00:00';

    this.locationControllerService
      .locationControllerFind()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locs: Location[]) => {
        const [lat, lng] = [43.5947768, -79.7162122];
        GeoUtils.sortByDistance(lat, lng, locs);
        if (locs.length > 0) this.loc = locs[0];
      });
  }
}

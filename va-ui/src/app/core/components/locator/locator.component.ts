import { Component } from '@angular/core';
import { Location, LocationControllerService } from '@app/api';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { NavigationService } from '@app/core/services/navigation.service';
import { GeoUtils } from '@app/shared/common/geo-utils';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css'],
})
export class LocatorComponent extends BaseComponent {
  locations: Location[];

  constructor(
    private toolbarService: NavToolbarService,
    private locationControllerService: LocationControllerService,
    private navigationService: NavigationService
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableLocator = false;

    this.locationControllerService
      .locationControllerFind()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locs: Location[]) => {
        const [lat, lng] = [43.6, -79.7];
        this.locations = locs;
        GeoUtils.sortByDistance(lat, lng, this.locations);
      });
  }

  onClickAppointment(location?: Location) {
    this.navigationService.navigate(
      '/appointment',
      location ? { loc: location.id } : undefined
    );
  }
}

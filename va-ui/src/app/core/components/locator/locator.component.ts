import { Component } from '@angular/core';
import { Location, LocationControllerService } from '@app/api';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
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
    private locationControllerService: LocationControllerService
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
        const [lat, lng] = [43.5947768, -79.7162122];
        this.locations = locs;
        GeoUtils.sortByDistance(lat, lng, this.locations);
      });
  }
}

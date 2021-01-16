import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { VaccinationControllerService } from '@app/api/api/vaccinationController.service';
import { Vaccination } from '@app/api/model/vaccination';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import { ReferenceService } from '@app/core/services/reference.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { HoverEvent } from '@app/shared/directives/hover.directive';
import Canada from '@svg-maps/canada';
import { takeUntil } from 'rxjs/operators';

interface Label {
  text: string;
  x: number;
  y: number;
  location: Location;
}

interface Location {
  id: string;
  name: string;
  path: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent extends BaseComponent implements AfterViewInit {
  @ViewChildren('path')
  paths: QueryList<ElementRef>;

  map = Canada;
  labels: Label[] = [];

  selectedItem?: Vaccination;

  mapVaccinations: Map<string, Vaccination>;

  constructor(
    private toolbarService: NavToolbarService,
    private referenceService: ReferenceService,
    private vaccinationControllerService: VaccinationControllerService
  ) {
    super();
  }

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableMap = false;
    // this.map.viewBox = '0 0 793 1032';
    this.map.viewBox = '0 520 800 522';

    this.vaccinationControllerService
      .vaccinationControllerFind()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((vs: Vaccination[]) => {
        this.mapVaccinations = new Map<string, Vaccination>();
        vs.forEach((v) =>
          this.mapVaccinations.set(v.province.toLocaleLowerCase(), v)
        );
      });
  }

  ngAfterViewInit(): void {
    for (const path of this.paths) {
      const id = path.nativeElement.id;
      const bounds = path.nativeElement.getBBox();
      const x = bounds.x + bounds.width / 2;
      const y = bounds.y + bounds.height / 2;
      const location = this.map.locations.find(
        (loc: Location) => id === loc.id
      );
      this.labels.push({ text: id, x, y, location });
    }
  }

  onClickLocation(location: Location) {}

  onHoverLocation(location: Location, event: HoverEvent) {
    if (event.activated && this.mapVaccinations && location) {
      this.selectedItem = this.mapVaccinations.get(
        location.id.toLocaleLowerCase()
      );
    } else {
      this.selectedItem = undefined;
    }
  }
}

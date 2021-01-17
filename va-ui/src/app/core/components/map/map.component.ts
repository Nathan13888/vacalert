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
import { Formatter } from '@app/shared/common/formatter';
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

  adjs = [
    { id: 'pe', x: 10, y: -25 },
    { id: 'yt', x: -40, y: 15 },
    { id: 'bc', x: 20, y: 0 },
    { id: 'qc', x: -35, y: 0 },
    { id: 'ab', x: 0, y: 0 },
    { id: 'nt', x: -20, y: 170 },
    { id: 'on', x: -20, y: -20 },
    { id: 'nu', x: -60, y: 240 },
    { id: 'sk', x: 0, y: 0 },
    { id: 'nl', x: 0, y: 0 },
    { id: 'nb', x: -20, y: 0 },
    { id: 'mb', x: -20, y: 0 },
    { id: 'ns', x: 20, y: 20 },
  ];

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
      .subscribe((vacs: Vaccination[]) => {
        vacs.forEach((vac) => {
          const id = vac.province.toLocaleLowerCase();
          const location = this.map.locations.find(
            (loc: Location) => id === loc.id
          );
          location['data-vac'] = vac;
          location['data-percent'] = this.getPercent(vac);
        });
      });
  }

  ngAfterViewInit(): void {
    for (const path of this.paths) {
      const id: string = path.nativeElement.id;
      const bounds = path.nativeElement.getBBox();
      let x = bounds.x + bounds.width / 2;
      let y = bounds.y + bounds.height / 2;
      const adj = this.adjs.find((adj) => adj.id === id);
      if (adj) {
        x += adj.x;
        y += adj.y;
      }
      const location = this.map.locations.find(
        (loc: Location) => id === loc.id
      );
      location['data-path'] = path;
      this.labels.push({ text: id.toLocaleUpperCase(), x, y, location });
    }
  }

  private getPercent(vac: Vaccination) {
    return Formatter.formatPercent(+vac.firstDoses / +vac.population);
  }

  onHoverLocation(location: Location, event: HoverEvent) {
    const path: ElementRef = location['data-path'];
    const vac = location['data-vac']; // may be undefined initially
    const cl = path.nativeElement.classList;
    if (event.activated) {
      this.selectedItem = vac;
      cl.add('selected');
    } else {
      this.selectedItem = undefined;
      cl.remove('selected');
    }
  }

  onClickLocation(location: Location) {}
}

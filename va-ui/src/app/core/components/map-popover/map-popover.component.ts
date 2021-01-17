import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Vaccination } from '@app/api/model/vaccination';
import { ReferenceService } from '@app/core/services/reference.service';
import { Formatter } from '@app/shared/common/formatter';

@Component({
  selector: 'app-map-popover',
  templateUrl: './map-popover.component.html',
  styleUrls: ['./map-popover.component.css'],
})
export class MapPopoverComponent implements OnInit, OnChanges {
  @Input()
  item: Vaccination;

  provinceName: string;
  totalDoses: number;
  percentOfPopulation: number;

  formatter = Formatter;

  constructor(private referenceService: ReferenceService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.item) {
      this.provinceName = this.referenceService.mapProvinces.get(
        this.item.province
      );
      this.totalDoses = +this.item.firstDoses + +this.item.secondDoses;
      this.percentOfPopulation = +this.item.firstDoses / +this.item.population;
    }
  }
}

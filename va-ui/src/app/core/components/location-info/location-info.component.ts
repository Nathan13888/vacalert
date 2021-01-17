import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@app/api';
import { Formatter } from '@app/shared/common/formatter';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.css'],
})
export class LocationInfoComponent implements OnInit {
  @Input()
  location: Location;

  formatter = Formatter;

  constructor() {}

  ngOnInit(): void {}
}

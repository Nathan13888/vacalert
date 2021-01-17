import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NavToolbarService } from '@app/core/services/nav-toolbar.service';
import Canada from '@svg-maps/canada';

interface Label {
  text: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChildren('path')
  paths: QueryList<ElementRef>;

  map = Canada;
  labels: Label[] = [];

  constructor(private toolbarService: NavToolbarService) {}

  ngOnInit(): void {
    const toolbar = this.toolbarService.defaultInstance();
    toolbar.enableMap = false;
    // this.map.viewBox = '0 0 793 1032';
    this.map.viewBox = '0 520 800 522';
  }

  ngAfterViewInit(): void {
    for (const path of this.paths) {
      const id = path.nativeElement.id;
      const bounds = path.nativeElement.getBBox();
      const x = bounds.x + bounds.width / 2;
      const y = bounds.y + bounds.height / 2;
      this.labels.push({ text: id, x, y });
    }
  }

  onClickLocation(location: any) {
    console.log('location :>> ', location);
  }
}
